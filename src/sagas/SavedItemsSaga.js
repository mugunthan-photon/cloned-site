import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import SavedItemsApi from 'yoda-interfaces/lib/SavedItems/SavedItemsApi';
import * as SavedItemsActionTypes from '../actionTypes/SavedItemActionTypes';
import TokenProvider from '../helpers/TokenProvider/TokenProvider';
import FactorySaga from './FactorySaga';
import constants from '../common/Constants';

function loadSavedItemsSaga(items) {
    const itemsList = {};
    if (items.isSuccess) {
        const data = ((items.response || {}).data || {}).items || [];
        for (let i = 0; i < data.length; i += 1) {
            itemsList[data[i].product.id] = {
                id: data[i].id,
            };
        }
    }
    TokenProvider.set(constants.DP_SAVED_ITEMS,
        JSON.stringify(itemsList));
    return itemsList;
}

function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i += 1) {
        if (myArray[i].product.id === nameKey) {
            return i;
        }
    }
    return null;
}

function doSavedItems(action, data) {
    let savedItemObj = {};
    let savedItems = [];
    if (TokenProvider.get(constants.DP_SAVED_ITEMS)) {
        savedItemObj = JSON.parse(TokenProvider.get(constants.DP_SAVED_ITEMS));
    }
    if (TokenProvider.get(constants.DP_SAVED_ITEMS_PAYLOAD)) {
        savedItems = JSON.parse(TokenProvider.get(constants.DP_SAVED_ITEMS_PAYLOAD));
    }
    if (action === 'add') {
        savedItemObj[data.product.id] = {
            id: data.product.id,
        };
        savedItems.push(data);
    } else {
        if (savedItemObj[data]) {
            delete savedItemObj[data];
        }
        const index = search(data, savedItems);
        if (index) {
            savedItems.splice(index, 1);
        }
    }
    TokenProvider.set(constants.DP_SAVED_ITEMS,
        JSON.stringify(savedItemObj));
    TokenProvider.set(constants.DP_SAVED_ITEMS_PAYLOAD,
        JSON.stringify(savedItems));
    TokenProvider.set('DP_USER_FAVCOUNT',
            JSON.stringify(savedItems.length));
}

export function* getSavedItemsSaga(action) {
    try {
        let savedItemsList;
        if (TokenProvider.get(constants.DP_USER_STATE) === '1') {
            const savedItems = yield call(FactorySaga, SavedItemsApi.getAllSavedItems, action);
            savedItemsList = loadSavedItemsSaga(savedItems);
        } else {
            savedItemsList = JSON.parse(TokenProvider.get(constants.DP_SAVED_ITEMS)) || [];
        }

        yield [
            put({ type: SavedItemsActionTypes.SAVEDITEMS_GET_SUCCESS, savedItemsList }),
        ];
    } catch (error) {
        yield put({
            type: SavedItemsActionTypes.SAVEDITEMS_GET_ERROR,
            error,
        });
    }
}

export function* addSavedItemSaga(action) {
    try {
        action.type = {};
        action.payload[0].itemId = null;
        let savedItem = {};
        let authStatus = false;
        if (TokenProvider.get(constants.DP_USER_STATE) === '1') {
            authStatus = true;
            savedItem = yield call(FactorySaga, SavedItemsApi.addSavedItems, action);
        } else {
            const savedItemsData = TokenProvider.get(constants.DP_SAVED_ITEMS_PAYLOAD) ? JSON.parse(TokenProvider.get(constants.DP_SAVED_ITEMS_PAYLOAD)) : '[]';
            if (savedItemsData.length < 50) {
                savedItem = {
                    isSuccess: true,
                    response: {
                        data: {},
                    },
                };
                doSavedItems('add', action.payload[0]);
            } else {
                savedItem = {
                    isSuccess: false,
                    response: {
                        data: {
                            errorCode: 'SRV_ITEMCOUNT_EXCEED',
                            errorMessage: 'limits of list items reached.',
                        },
                    },
                };
            }
        }
        const obj = {
            isSuccess: savedItem.isSuccess,
            errorCode: savedItem.response.data.errorCode,
            errorMessage: savedItem.response.data.errorMessage,
            ppId: action.payload[0].product.id,
            action: 'add',
        };
        yield [
            put({ type: SavedItemsActionTypes.SAVEDITEMS_ADD_ITEM_SFL, obj }),
        ];
        if (savedItem.isSuccess) {
            action.payload = {};
            let getAllItems = {};
            let savedItemsList = {};
            let savedItemsCount = 0;
            if (authStatus) {
                getAllItems = yield call(FactorySaga, SavedItemsApi.getAllSavedItems, action);
                savedItemsList = loadSavedItemsSaga(getAllItems);
                savedItemsCount = (getAllItems.response.data && getAllItems.response.data.items) ?
                                                    getAllItems.response.data.items.length : 0;
            } else {
                savedItemsList = JSON.parse(TokenProvider.get(constants.DP_SAVED_ITEMS));
                savedItemsCount = Object.keys(savedItemsList).length;
            }
            TokenProvider.set(constants.DP_SAVED_ITEMS_COUNT, savedItemsCount.toString());
            yield [
                put({ type: SavedItemsActionTypes.SAVEDITEMS_GET_SUCCESS, savedItemsList }),
            ];
        }
    } catch (error) {
        yield put({
            type: SavedItemsActionTypes.ADD_SAVEDITEMS_ERROR,
            error,
        });
    }
}


export function* removeSavedItemSaga(action) {
    try {
        const itemToRemove = {};
        itemToRemove.payload = action.payload.param.id;
        let removedItem = {};
        let authStatus = false;
        if (TokenProvider.get(constants.DP_USER_STATE) === '1') {
            authStatus = true;
            removedItem = yield call(FactorySaga, SavedItemsApi.removeSavedItem, itemToRemove);
            doSavedItems('remove', action.payload.param.id);
        } else {
            removedItem = {
                isSuccess: true,
                response: {
                    data: {},
                },
            };
            doSavedItems('remove', action.payload.param.id);
        }
        const obj = {
            isSuccess: removedItem.isSuccess,
            errorCode: removedItem.response.data.errorCode ? removedItem.response.data.errorCode : '',
            errorMessage: removedItem.response.data.errorMessage ? removedItem.response.data.errorMessage : '',
            ppId: action.payload.param.ppId,
            action: 'remove',
        };
        yield [
            put({ type: SavedItemsActionTypes.SAVEDITEMS_REMOVE_ITEM_SFL, obj }),
        ];
        if (removedItem.isSuccess) {
            action.payload = {};
            let getAllItems = {};
            let savedItemsList = {};
            let savedItemsCount = 0;
            if (authStatus) {
                getAllItems = yield call(FactorySaga, SavedItemsApi.getAllSavedItems, action);
                savedItemsList = loadSavedItemsSaga(getAllItems);
                savedItemsCount = (getAllItems.response.data && getAllItems.response.data.items) ?
                                                    getAllItems.response.data.items.length : 0;
            } else {
                savedItemsList = JSON.parse(TokenProvider.get(constants.DP_SAVED_ITEMS));
                savedItemsCount = Object.keys(savedItemsList).length;
            }
            TokenProvider.set(constants.DP_SAVED_ITEMS_COUNT, savedItemsCount.toString());
            yield [
                put({ type: SavedItemsActionTypes.SAVEDITEMS_GET_SUCCESS, savedItemsList }),
            ];
        }
    } catch (error) {
        yield put({
            type: SavedItemsActionTypes.DELETE_SAVEDITEMS_ERROR,
            error,
        });
    }
}


export default function* watchSavedItemsSaga() {
    yield takeLatest(SavedItemsActionTypes.SAVEDITEMS_GET_REQUEST, getSavedItemsSaga);
    yield takeEvery(SavedItemsActionTypes.ADD_SAVEDITEMS, addSavedItemSaga);
    yield takeEvery(SavedItemsActionTypes.DELETE_SAVEDITEMS, removeSavedItemSaga);
}
