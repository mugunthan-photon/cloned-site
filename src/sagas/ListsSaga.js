/**
 * This class would be responsible for loading various list in the system like saved items, recently viewed etc
 */

import { takeLatest, put } from 'redux-saga/effects';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import * as ListsActionTypes from '../actionTypes/ListsActionTypes';

function* SavedItemsSaga() {
    try {
        const savedItemPPIds = Cookies.load('DP_SFL_PPIDS');
        let savedItems = [];
        if (savedItemPPIds) {
            savedItems = savedItemPPIds.split('|');
        }
        yield [
            put({ type: ListsActionTypes.SAVED_ITEMS_LOAD_SUCCESS, savedItems }),
        ];
    } catch (error) {
        yield put({ type: ListsActionTypes.SAVED_ITEMS_LOAD_ERROR, error });
    }
}

export default function* watchListsRequest() {
    yield takeLatest(ListsActionTypes.SAVED_ITEMS_LOAD_REQUEST, SavedItemsSaga);
}
