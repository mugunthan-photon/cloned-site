import { takeLatest, put, call } from 'redux-saga/effects';
import DepartmentApi from 'yoda-interfaces/lib/Catalog/DepartmentApi';
import * as DepartmentActionTypes from '../actionTypes/DepartmentActionTypes';

function* departmentsSaga() {
    const qparams = {
        expand: true,
        fields: 'groups.categories.id,groups.categories.name,groups.categories.href,groups.categories.links,groups.categories.image,groups.categories.leaf',
    };
    try {
        const departments = yield call(DepartmentApi.getRootDepartments, qparams);
        yield [
            put({ type: DepartmentActionTypes.DEPARTMENTS_GET_SUCCESS, departments }),
        ];
    } catch (error) {
        yield put({ type: 'DEPARTMENT_ERROR', error });
    }
}

export default function* watchDepartmentsRequest() {
    yield takeLatest(DepartmentActionTypes.DEPARTMENTS_GET_REQUEST, departmentsSaga);
}
