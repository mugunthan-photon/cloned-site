import { call, put, takeEvery } from 'redux-saga/effects';
import SearchApi from 'yoda-interfaces/lib/Search/SearchApi';
import * as productSearchActionTypes from '../actionTypes/ProductSearchActionTypes';

function* productSearchDetailSaga(action) {
    try {
        const productSearchDetailResult = yield call(SearchApi.getSearchDetailResult, action.value);

        yield [
            put({
                type: productSearchActionTypes.PRODUCTSEARCHDETAIL_GET_SUCCESS,
                productSearchDetailResult,
            }),
        ];
    } catch (error) {
        yield put({
            type: productSearchActionTypes.PRODUCTSEARCHDETAIL_GET_ERROR,
            error,
        });
    }
}

export default function* watchProductSearchDetailRequest() {
    yield takeEvery(
        productSearchActionTypes.PRODUCTSEARCHDETAIL_GET_REQUEST,
        productSearchDetailSaga,
    );
}
