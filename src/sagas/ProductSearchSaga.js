import { takeLatest, put, call } from 'redux-saga/effects';
import SearchApi from 'yoda-interfaces/lib/Search/SearchApi';
import * as productSearchActionTypes from '../actionTypes/ProductSearchActionTypes';

function* productSearchSaga(action) {
    try {
        const productSearchResults = yield call(SearchApi.getSearchResults, action.params, action.regionZone);
        yield [
            put({ type: productSearchActionTypes.PRODUCTSEARCH_GET_SUCCESS, productSearchResults }),
        ];
    } catch (error) {
        yield put({ type: productSearchActionTypes.PRODUCTSEARCH_GET_ERROR, error });
    }
}

export default function* watchProductSearchRequest() {
    yield takeLatest(productSearchActionTypes.PRODUCTSEARCH_GET_REQUEST, productSearchSaga);
}
