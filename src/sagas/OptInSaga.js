import { takeLatest, put, call } from 'redux-saga/effects';
import OrderApi from 'yoda-interfaces/lib/Order/OrderApi';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';

function* optInSaga(actions) {
    try {
        const status = yield call(OrderApi.optin, actions.payload);
        yield put({ type: OrderActionTypes.OPT_IN_POST_SUCCESS, status });
    } catch (err) {
        yield put({ type: 'OPT_IN_POST_ERROR', err });
    }
}

export default function* watchOptInRequest() {
    yield takeLatest(OrderActionTypes.OPT_IN_POST_REQUEST, optInSaga);
}
