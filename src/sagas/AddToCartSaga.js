import { takeLatest, call, put } from 'redux-saga/effects';
import CartApi from 'yoda-interfaces/lib/Cart/CartApi';
import FactorySaga from './FactorySaga';
import { messagesActions } from '../components/Messages';
import * as loadingActions from '../actions/LoadingAction';
import { ADD_TO_CART_MESSAGES_ID } from '../components/AddToCart/AddToCart.config';
import * as addToCartActionTypes from '../actionTypes/AddToCartActionTypes';

let apiCounter = 0;

function* AddToCartSaga(action) {
    try {
        yield put(messagesActions.removeAllMessages({ section: ADD_TO_CART_MESSAGES_ID }));
        // const GenericApiErrorMessages = yield select(getGenericApiErrorMessages);
        const addItemAction = {};
        addItemAction.payload = action.payload.productDetail;
        addItemAction.type = action.type;
        apiCounter++; // eslint-disable-line
        const cartSuccess = yield call(FactorySaga, CartApi.addItemToCart, addItemAction);
        if (cartSuccess.isSuccess) {
            cartSuccess.ppId = action.payload.productDetail.data[0].ppId;
            cartSuccess.skuId = action.payload.productDetail.data[0].skuId;
            apiCounter = 0;
            yield put({ type: addToCartActionTypes.ADDTOCART_SITE_REQUEST_SUCCESS, cartSuccess });
            const analyticsData = action.payload.analyticsData;
            yield put({ type: addToCartActionTypes.MYLIST_CART_ADD_ANALYTICS, analyticsData });
        } else if (cartSuccess.response && cartSuccess.response.status !== 401) {
            const { errorCode, errorMessage } = Array.isArray(cartSuccess.response.data) ?
                cartSuccess.response.data[0] :
                cartSuccess.response.data;
            cartSuccess.ppId = action.payload.productDetail.data[0].ppId;
            cartSuccess.skuId = action.payload.productDetail.data[0].skuId;
            yield put(
                    { type: addToCartActionTypes.ADDTOCART_SITE_REQUEST_ERROR, error: cartSuccess },
                );
            if (cartSuccess.response.status !== 412 || errorCode !== 'INITIATE_CHECKOUT_AGAIN' || apiCounter === 2) {
                const errorTitle = errorMessage;
                // || GenericApiErrorMessages.apiErrorMessage;
                yield put(loadingActions.removeLoader());
                yield put(messagesActions.addMessage({
                    section: ADD_TO_CART_MESSAGES_ID,
                    message: {
                        id: errorCode,
                        title: errorTitle,
                    },
                }));
                // yield put(AnalyticsAction.formErrorAnalytics([{ errorDescription: errorTitle }]));
            }
        }
    } catch (error) {
        // const GenericApiErrorMessages = yield select(getGenericApiErrorMessages);
        yield put(loadingActions.removeLoader());
        yield put(
            { type: addToCartActionTypes.ADDTOCART_SITE_REQUEST_ERROR, error },
        );
        const errorTitle = error.errorMessage;
        // || GenericApiErrorMessages.apiErrorMessage;
        yield put(messagesActions.addMessage({
            section: ADD_TO_CART_MESSAGES_ID,
            message: {
                id: error.errorCode,
                title: errorTitle,
            },
        }));
        // yield put(AnalyticsAction.formErrorAnalytics([{ errorDescription: errorTitle }]));
    }
}

export default function* watchAddToCartSaga() {
    yield takeLatest(addToCartActionTypes.ADDTOCART_SITE_REQUEST, AddToCartSaga);
}
