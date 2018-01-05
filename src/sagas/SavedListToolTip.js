import { takeLatest, put, call } from 'redux-saga/effects';
import Mylist from 'yoda-interfaces/lib/MyList/MyList';
import FSaga from './FactorySaga';
import * as ActionTypes from '../actionTypes/SavedListToolTip';

export function* getListSaga(action) {
    try {
        // yield call(getList, action.payload.accountId);
        const listItems = yield call(FSaga, Mylist.getList, action.payload);

        yield [
            put({ type: ActionTypes.GET_SITE_LIST_SUCCESS, listItems }),
        ];
    } catch (error) {
        yield put({
            type: ActionTypes.GET_SITE_LIST_ERROR,
            error,
        });
    }
}

export function* getPerticularListBasedOnIdSaga(action) {
    try {
        const products = yield call(Mylist.getList, action.payload);

        yield [
            put({ type: ActionTypes.SITE_GETLIST_BASEDON_ID_SUCCESS, products }),
        ];
    } catch (error) {
        yield put({
            type: ActionTypes.SITE_GETLIST_BASEDON_ID_ERROR,
            error,
        });
    }
}

export function* createListSaga(action) {
    try {
        // yield call(getList, action.payload.accountId);
        const list = yield call(Mylist.createList, action.payload, action.payload.accountId);
        yield [put({ type: ActionTypes.CREATENEW_SITE_LIST_SUCCESS, list })];

        if (list.status === 201) {
            yield [
                put({ type: ActionTypes.CREATE_SITE_LIST_CLICK_EVENT, list }),
                put({ type: ActionTypes.GET_MYLIST }),
            ];
        } else if (list.data.errorCode) {
            const errorData = {
                error: [{
                    errorDescription: list.data.errorMessage,
                    errorID: list.data.errorCode,
                }],
            };
            yield put({ type: ActionTypes.ADD_SITE_TO_LIST_ERROR_EVENT, errorData });
        }
    } catch (error) {
        yield put({
            type: ActionTypes.CREATENEW_SITE_LIST_ERROR,
            error,
        });
    }
}

export function* movetoListSaga(action) {
    try {
        // yield call(getList, action.payload.accountId);
        const moveAction = {};
        moveAction.type = action.type;
        moveAction.payload = action.payload;
        moveAction.accessToken = action.accessToken;
        moveAction.accountId = action.accountId;
        /*
            Has to send accountid and accesstoken, since factorysaga
            has issues
        */
        const movedToListResponse = yield call(Mylist.saveToList, moveAction);
        yield [
            put({ type: ActionTypes.MOVETO_SITE_NEWPRODUCT_LIST_SUCCESS, movedToListResponse }),
            put({ type: ActionTypes.GET_MYLIST }),
        ];

        if (movedToListResponse.status === 204) {
            const analyticsData = {
                listType: '',
                product: [{
                    productInfo: {
                        productPPID: action.payload.savedItemId,
                    },
                }],
            };
            if (action.payload.params.value === 'myFavorites') {
                analyticsData.listType = 'my fav';
            } else {
                analyticsData.listType = 'custom';
            }
            // yield put({ type: ActionTypes.ADD_SITE_TO_LIST_EVENT, analyticsData });
        } else if ('data' in movedToListResponse) {
            const payload = [{
                errorID: movedToListResponse.data.errorCode,
                errorDescription: movedToListResponse.data.errorMessage,
            }];

            yield put({ type: ActionTypes.SITE_MOVETOLIST_ERROR_EVENT, payload });
        }
    } catch (error) {
        yield put({
            type: ActionTypes.MOVETO_SITE_NEW_LIST_ERROR,
            error,
        });
    }
}

export function* addToListSaga(action) {
    try {
        const movedToListResponse = yield call(Mylist.addSavedItems, action.payload);
        if (movedToListResponse.status === 201) {
            const analyticsData = {
                listType: '',
                product: [{
                    productInfo: {
                        productPPID: action.payload.payload[0].product.id,
                    },
                }],
                itemsSavedForLater: action.analyticsData.totalItemsSavedForLater,
            };
            if (action.payload.listId === 'myFavorites') {
                analyticsData.listType = 'my fav';
            } else {
                analyticsData.listType = 'custom';
            }
            yield put({ type: ActionTypes.ADD_SITE_TO_LIST_EVENT, analyticsData });
        } else if (movedToListResponse.response.data.errorCode === 'SRV_ITEMCOUNT_EXCEED' || movedToListResponse.data.errorCode === 'SRV_ITEMCOUNT_EXCEED') {
            const errorData = {
                error: [{
                    errorID: movedToListResponse.response.data.errorCode,
                    errorDescription: movedToListResponse.response.data.errorMessage,
                }],
            };
            yield put({ type: ActionTypes.ADD_SITE_TO_LIST_ERROR_EVENT, errorData });
        }
        const payload = action.payload;
        const newListId = payload.listId;
        payload.payload = { listId: newListId, params: { field: 'id,name,totalItems' } };
        yield [
            put({ type: ActionTypes.MOVETO_SITE_NEWPRODUCT_LIST_SUCCESS, movedToListResponse }),
            put({ type: ActionTypes.SITE_GETLIST_BASEDON_ID, payload }),
            put({ type: ActionTypes.GET_MYLIST }),
        ];
    } catch (error) {
        yield put({
            type: ActionTypes.ADD_SITE_ITEM_TO_LIST_ERROR,
            error,
        });
    }
}

export default function* watchMTLToolTipSaga() {
    yield takeLatest(ActionTypes.GET_SITE_LIST, getListSaga);
    yield takeLatest(ActionTypes.CREATE_SITE_NEW_LIST, createListSaga);
    yield takeLatest(ActionTypes.MOVETO_SITE_NEW_LIST, movetoListSaga);
    yield takeLatest(ActionTypes.ADD_SITE_ITEM_TO_LIST, addToListSaga);
    yield takeLatest(ActionTypes.SITE_GETLIST_BASEDON_ID, getPerticularListBasedOnIdSaga);
}
