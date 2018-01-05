import { takeLatest, put, call } from 'redux-saga/effects';
import AccountApi from 'yoda-interfaces/lib/Account/AccountApi';
import * as SessionActionTypes from '../actionTypes/SessionActionTypes';

function* sessionSaga() {
    try {
        const sessionStatus = yield call(AccountApi.signOut);
        yield [
            put({ type: SessionActionTypes.SESSION_DELETE_SUCCESS, sessionStatus }),
        ];
    } catch (error) {
        yield put({ type: 'SESSION_DELETE_ERROR', error });
    }
}

export default function* watchSessionsRequest() {
    yield takeLatest(SessionActionTypes.SESSION_DELETE_REQUEST, sessionSaga);
}
