import { call, put, takeLatest } from 'redux-saga/effects';
import BreadCrumbsApi from 'yoda-interfaces/lib/BreadCrumbs/BreadCrumbsApi';
import * as BreadCrumbNavActionTypes from '../actionTypes/BreadCrumbNavActionTypes';

function* BreadCrumbNavSaga(actions) {
    try {
        const breadCrumbs = yield call(BreadCrumbsApi.getBreadCrumbs, actions.payload);

        yield [
            put({
                type: BreadCrumbNavActionTypes.BREADCRUMBNAV_GET_SUCCESS,
                breadCrumbs,
            }),
        ];
    } catch (error) {
        yield put({
            type: BreadCrumbNavActionTypes.BREADCRUMBNAV_GET_ERROR,
            error,
        });
    }
}

export default function* watchBreadCrumbNavRequest() {
    yield takeLatest(BreadCrumbNavActionTypes.BREADCRUMBNAV_GET_REQUEST, BreadCrumbNavSaga);
}
