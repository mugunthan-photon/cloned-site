import { takeLatest, put, call } from 'redux-saga/effects';
import OrderApi from 'yoda-interfaces/lib/Order/OrderApi';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import get from 'lodash/get';
import { messagesActions, messageTypes } from '../components/Messages';
import * as analyticsActions from '../actions/AnalyticsAction';
import * as AdjustmentActionTypes from '../actionTypes/AdjustmentActionTypes';
import * as AnalyticsActionTypes from '../actionTypes/AnalyticsActionTypes';
import * as LoadingAction from '../actions/LoadingAction';
import * as Constants from '../common/Constants';
import * as Config from '../components/CouponCard/CouponConfig';
import FactorySaga from './FactorySaga';

function* applyAdjustmentsSaga(action) {
    try {
        yield [
            // Showing Loader
            put(LoadingAction.showLoader()),
            put(messagesActions.removeAllMessages({ section: Config.COUPON_INLINE_MESSAGES_ID })), // Clearing Inline Messages
            put(messagesActions.removeAllMessages({ section: Config.SERIAL_CODE_MESSAGES_ID })), // Clearing Inline Messages
            put(messagesActions.removeAllMessages({ section: Config.COUPON_POPUP_MESSAGES_ID })), // Clearing Pop Up Messages
        ];
        const adjustmentMethod = action.payload.method;
        delete action.payload.method;

        let removeLoader = true; // Used for corner case scenario.

        const adjustmentResponse = yield call(FactorySaga, OrderApi.applyAdjustment, action);
        console.log('*** AdjustmentResponse ****', adjustmentResponse);
        if (!isEmpty(adjustmentResponse)) {
            let getAdjustmentData = null;
            let adjustmentDataItem = null;
            let errorCode = null;
            let errorMessage = null;
            const { status, statusText } = adjustmentResponse.response;

            console.log('** Adding consoles for Testing as we cannot add breakpoints in Sagas **');
            console.log('API Response status', status);
            console.log('API Response statusText', statusText);
            console.log('***********End*********');

            switch (status) {
                case 201:

                    yield [
                        // To indicate that the adjustments have updated recently.
                        put({
                            type: AdjustmentActionTypes.ADJUSTMENTS_UPDATED,
                            payload: {
                                result: true,
                                method: adjustmentMethod,
                            },
                        }),
                    ];

                    // Call the get adjustments API method to get details about the newly applied coupon / reward.
                    getAdjustmentData = yield call(FactorySaga, OrderApi.getAdjustment, action);
                    if (!isEmpty(getAdjustmentData) && getAdjustmentData.response.status === 200) {
                        adjustmentDataItem = find(getAdjustmentData.response.data, {
                            value: action.payload.code,
                            serialNumber: action.payload.serialNumber,
                        });
                        if (isEmpty(adjustmentDataItem)) {
                            adjustmentDataItem = find(getAdjustmentData.response.data, {
                                code: 'ENTERPRISE',
                                serialNumber: action.payload.serialNumber,
                            });
                        }
                        adjustmentResponse.response.data = adjustmentDataItem;
                        if (!isEmpty(adjustmentDataItem) && !isEmpty(adjustmentDataItem.message) && adjustmentDataItem.message.indexOf('has expired') !== -1) {
                            const code = adjustmentDataItem.value;
                            const id = adjustmentDataItem.id;
                            const payload = { status: AdjustmentActionTypes.ADJUSTMENT_EXPIRED, code, id };
                            yield [
                                put({
                                    type: AdjustmentActionTypes.ADJUSTMENT_EXPIRED,
                                    payload,
                                }),
                            ];
                        }
                        yield [
                            put({
                                type: AdjustmentActionTypes.ADJUSTMENTS_POST_SUCCESS,
                                adjustmentResponse,
                            }),
                        ];
                        const appliedAdjustmentsResponse = getAdjustmentData.response.data;
                        yield [
                            put({
                                type: AdjustmentActionTypes.ADJUSTMENTS_GET_SUCCESS,
                                appliedAdjustmentsResponse,
                            }),
                            put({
                                type: AnalyticsActionTypes.UPDATE_ANALYTICS_CLICK_EVENT,
                                payload: Constants.COUPON_APPLIED_SUCCESS,
                            }),
                        ];
                    }
                    break;
                case 400:
                    errorCode = get(adjustmentResponse, 'response.data[0].errorCode');
                    errorMessage = Constants.couponErrorMessages[errorCode] || get(adjustmentResponse, 'response.data[0].errorMessage');
                    // The following error codes require the Serial code modal to be displayed.
                    if (errorCode === 'SVC_ORD_ERR_SERIAL_RESTRICTED' ||
                        errorCode === 'SRV_REWARD_TOKEN_MISSING' ||
                        errorCode === 'SERIAL_NUMBER_INVALID_LENGTH' ||
                        errorCode === 'SVC_ORD_ERR_REWARD_CODE_INVALID' ||
                        errorCode === 'SRV_ORD_ERR_COUPON_SERIALNUM_INVALID' ||
                        errorCode === 'SRV_ORD_ERR_REWARD_SERIAL_INVALID' ||
                        errorCode === 'BUS_OCS_COUPON_ERR_001') {
                        adjustmentResponse.payload = action.payload;
                        adjustmentResponse.response.statusText = Config.SERIAL_CODE_NEED;
                        yield [
                            put({
                                type: AdjustmentActionTypes.ADJUSTMENTS_POST_SERIAL,
                                adjustmentResponse,
                            }),
                        ];

                        if (
                        errorCode === 'SERIAL_NUMBER_INVALID_LENGTH' ||
                        errorCode === 'SVC_ORD_ERR_REWARD_CODE_INVALID' ||
                        errorCode === 'SRV_ORD_ERR_COUPON_SERIALNUM_INVALID' ||
                        errorCode === 'SRV_ORD_ERR_REWARD_SERIAL_INVALID' ||
                        errorCode === 'BUS_OCS_COUPON_ERR_001') {
                            const section = Config.SERIAL_CODE_MESSAGES_ID;
                            yield [
                                put(analyticsActions.default.triggerFormError([{ errorDescription:
                                    `${Config.TOF}|${errorMessage}` }])),

                                put(messagesActions.addMessage({ section,
                                    message: {
                                        id: errorCode,
                                        title: errorMessage,
                                        type: messageTypes.error,
                                    },
                                })),
                            ];
                        }
                    } else {
                        /** Based on the application method error display precedence set */
                        errorCode = (adjustmentMethod === Constants.CouponAppledMethod.SELECT_COUPON)
                                                        ? Config.COUPON_POPUP_MESSAGES_ID
                                                        : Config.COUPON_INLINE_MESSAGES_ID;
                        const section = errorCode;

                        // const section = errorCode === 'SVC_ORD_ERR_COUPON_PROMO_INVALID' || 'SRV_PROMOCODE_INVALID' ?
                        // Config.COUPON_INLINE_MESSAGES_ID : Config.COUPON_POPUP_MESSAGES_ID;
                        yield [
                            put({
                                type: AdjustmentActionTypes.ADJUSTMENTS_POST_ERROR,
                                adjustmentResponse,
                            }),
                            put(analyticsActions.default.triggerFormError([{ errorDescription:
                                `${Config.TOF}|${errorMessage}` }])),
                            put(messagesActions.addMessage({ section,
                                message: {
                                    id: errorCode,
                                    title: errorMessage,
                                    type: messageTypes.error,
                                },
                            })),
                        ];
                    }
                    break;

                case 401:
                case 412: {
                    /** Corner Case Handling for Unauthorized Access
                     *  and Precondition failure breaking for now
                     *  will add additional code for Interminent Message
                     * */
                    errorCode = (adjustmentMethod === Constants.CouponAppledMethod.SELECT_COUPON)
                                                    ? Config.COUPON_POPUP_MESSAGES_ID
                                                    : Config.COUPON_INLINE_MESSAGES_ID;
                    const section = errorCode;
                    errorMessage = get(adjustmentResponse, 'response.data[0].errorMessage');

                    if (errorCode === 'SRV_GENERIC_ERROR') {
                        yield [
                            put({
                                type: AdjustmentActionTypes.ADJUSTMENTS_POST_ERROR,
                                adjustmentResponse,
                            }),
                            put(analyticsActions.default.triggerFormError([{ errorDescription:
                                `${Config.TOF}|${errorMessage}` }])),
                            put(messagesActions.addMessage({ section,
                                message: {
                                    id: errorCode,
                                    title: errorMessage,
                                    type: messageTypes.error,
                                },
                            })),
                        ];
                    } else {
                        removeLoader = false; // keep loader for more time
                    }
                    break;
                }
                case 404: {
                    errorCode = (adjustmentMethod === Constants.CouponAppledMethod.SELECT_COUPON)
                                                    ? Config.COUPON_POPUP_MESSAGES_ID
                                                    : Config.COUPON_INLINE_MESSAGES_ID;
                    const section = errorCode;
                    errorMessage = get(adjustmentResponse, 'response.data[0].errorMessage');

                    yield [
                        put({
                            type: AdjustmentActionTypes.ADJUSTMENTS_POST_ERROR,
                            adjustmentResponse,
                        }),
                        put(analyticsActions.default.triggerFormError([{ errorDescription:
                            `${Config.TOF}|${errorMessage}` }])),
                        put(messagesActions.addMessage({ section,
                            message: {
                                id: errorCode,
                                title: errorMessage,
                                type: messageTypes.error,
                            },
                        })),
                    ];

                    break;
                }
                default:
                    errorCode = get(adjustmentResponse, 'response.data[0].errorCode') || status;
                    errorMessage = get(adjustmentResponse, 'response.data[0].errorMessage') || statusText;
                    yield [
                        put({
                            type: AdjustmentActionTypes.ADJUSTMENTS_POST_ERROR,
                            adjustmentResponse,
                        }),
                        put(analyticsActions.default.triggerFormError([{ errorDescription:
                                `${Config.TOF}|${errorMessage}` }])),
                        put(messagesActions.addMessage({
                            section: Config.COUPON_POPUP_MESSAGES_ID,
                            message: {
                                id: errorCode,
                                title: Constants.couponErrorMessages.COUPON_REQUEST_ERROR,
                                type: messageTypes.error,
                            },
                        })),
                    ];
                    break;
            }
        }

        if (removeLoader) {
            // hiding Loader
            yield put(LoadingAction.removeLoader());
        }
    } catch (error) {
        // hiding Loader
        yield [
            put(LoadingAction.removeLoader()),
            put(analyticsActions.default.triggerFormError([{ errorDescription:
                                `${Config.TOF}|${error.errorMessage}` }])),
            put(messagesActions.addMessage({
                section: Config.COUPON_POPUP_MESSAGES_ID,
                message: {
                    id: error.errorCode,
                    title: Constants.couponErrorMessages.COUPON_REQUEST_ERROR,
                    type: messageTypes.error,
                },
            })),
        ];
    }
}


function* getAppliedAdjustments(action) {
    try {
        // Showing Loader
        yield [
            put(LoadingAction.showLoader()),
            put(messagesActions.removeAllMessages({ section: Config.COUPON_INLINE_MESSAGES_ID })), // Clearing Inline Messages
            put(messagesActions.removeAllMessages({ section: Config.SERIAL_CODE_MESSAGES_ID })), // Clearing Inline Messages
            put(messagesActions.removeAllMessages({ section: Config.COUPON_POPUP_MESSAGES_ID })), // Clearing Pop Up Messages
        ];

        let getAdjustmentData = null;
        let appliedAdjustmentsResponse = null;
        getAdjustmentData = yield call(FactorySaga, OrderApi.getAdjustment, action);
        if (!isEmpty(getAdjustmentData) && getAdjustmentData.response.status === 200) {
            appliedAdjustmentsResponse = getAdjustmentData.response.data;
            yield [
                put({
                    type: AdjustmentActionTypes.ADJUSTMENTS_GET_SUCCESS,
                    appliedAdjustmentsResponse,
                }),
            ];
        }
        // hiding Loader
        yield put(LoadingAction.removeLoader());
        yield [
            put({
                type: AdjustmentActionTypes.ADJUSTMENTS_GET_SUCCESS_COUPONPAGE,
                appliedAdjustmentsResponse,
            }),
        ];
    } catch (error) {
        yield [
            put(LoadingAction.removeLoader()),
            put(analyticsActions.default.triggerFormError([{ errorDescription:
                                `${Config.TOF}|${error.errorMessage}` }])),
            put(messagesActions.addMessage({
                section: Config.COUPON_POPUP_MESSAGES_ID,
                message: {
                    id: error.errorCode,
                    title: Constants.couponErrorMessages.COUPON_REQUEST_ERROR,
                    type: messageTypes.error,
                },
            })),
        ];
    }
}

function* removeAdjustmentSaga(action) {
    try {
        yield [
            // Showing Loader
            put(LoadingAction.showLoader()),
            put(messagesActions.removeAllMessages({ section: Config.COUPON_INLINE_MESSAGES_ID })), // Clearing Inline Messages
            put(messagesActions.removeAllMessages({ section: Config.SERIAL_CODE_MESSAGES_ID })), // Clearing Inline Messages
            put(messagesActions.removeAllMessages({ section: Config.COUPON_POPUP_MESSAGES_ID })), // Clearing Pop Up Messages
        ];
        const adjustmentResponse = yield call(FactorySaga, OrderApi.removeAdjustment, action);

        if (!isEmpty(adjustmentResponse)) {
            if (adjustmentResponse.response.status === 204) {
                yield [
                    put({
                        type: AdjustmentActionTypes.ADJUSTMENTS_BY_ID_DELETE_SUCCESS,
                        adjustmentResponse,
                    }),
                    // To indicate that the adjustments have updated recently.
                    put({
                        type: AdjustmentActionTypes.ADJUSTMENTS_UPDATED,
                        payload: { result: true },
                    }),
                ];
            }
        }

        // Call the get adjustments API method to get details about the newly applied coupon / reward.
        const getAdjustmentData = yield call(FactorySaga, OrderApi.getAdjustment, action);
        if (!isEmpty(getAdjustmentData) && getAdjustmentData.response.status === 200) {
            const appliedAdjustmentsResponse = getAdjustmentData.response.data;
            yield [
                put({
                    type: AdjustmentActionTypes.ADJUSTMENTS_GET_SUCCESS,
                    appliedAdjustmentsResponse,
                }),
            ];
        }
        // hiding Loader
        yield put(LoadingAction.removeLoader());
    } catch (error) {
        // hiding Loader
        yield [
            put(LoadingAction.removeLoader()),
            put(analyticsActions.default.triggerFormError([{ errorDescription:
                                `${Config.TOF}|${error.errorMessage}` }])),
            put(messagesActions.addMessage({
                section: Config.COUPON_POPUP_MESSAGES_ID,
                message: {
                    id: error.errorCode,
                    title: Constants.couponErrorMessages.COUPON_REQUEST_ERROR,
                    type: messageTypes.error,
                },
            })),
        ];
    }
}

export function* watchApplyAdjustmentsRequest() {
    yield takeLatest(AdjustmentActionTypes.ADJUSTMENTS_POST_REQUEST, applyAdjustmentsSaga);
}

export function* watchgetAppliedAdjustmentsRequest() {
    yield takeLatest(AdjustmentActionTypes.ADJUSTMENTS_GET_REQUEST, getAppliedAdjustments);
}

export function* watchRemoveAdjustmentsRequest() {
    yield takeLatest(AdjustmentActionTypes.ADJUSTMENTS_BY_ID_DELETE_REQUEST, removeAdjustmentSaga);
}
