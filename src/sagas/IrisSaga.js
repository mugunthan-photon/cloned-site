import { takeLatest, put } from 'redux-saga/effects';
import * as IrisActionTypes from '../actionTypes/IrisActionTypes';
import mock from '../components/IrisParser/__stories/mock';

function* SavedItemsSaga() {
    try {
        // const irisData = yield call();
        const irisData = mock;
        yield [
            put({ type: IrisActionTypes.IRIS_TEMPLATE_LOAD_SUCCESS, irisData }),
        ];
    } catch (error) {
        yield put({ type: IrisActionTypes.IRIS_TEMPLATE_LOAD_ERROR, error });
    }
}

export default function* watchIrisRequest() {
    yield takeLatest(IrisActionTypes.IRIS_TEMPLATE_LOAD_REQUEST, SavedItemsSaga);
}
