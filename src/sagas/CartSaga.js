import { takeLatest, put, call } from 'redux-saga/effects';
import AccountApi from 'yoda-interfaces/lib/Account/AccountApi';
import * as CartActionTypes from '../actionTypes/CartActionTypes';

function* cartSaga() {
    try {
        const count = yield call(AccountApi.getCartCount);
        yield [
            put({ type: CartActionTypes.CART_COUNT_GET_SUCCESS, count }),
        ];
    } catch (error) {
        yield put({ type: 'CART_COUNT_GET_ERROR', error });
    }
}

export default function* watchCartActionsRequest() {
    yield takeLatest(CartActionTypes.CART_COUNT_GET_REQUEST, cartSaga);
}
