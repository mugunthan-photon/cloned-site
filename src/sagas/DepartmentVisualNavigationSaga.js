import { takeLatest, put, call } from 'redux-saga/effects';
import _forEach from 'lodash/forEach';
import _merge from 'lodash/merge';
import _head from 'lodash/head';
import _map from 'lodash/map';
import DepartmentApi from 'yoda-interfaces/lib/Catalog/DepartmentApi';
import CategoriesApi from 'yoda-interfaces/lib/Catalog/CategoriesApi';
import * as DepartmentVisualNavigationActionTypes from '../actionTypes/DepartmentVisualNavigationActionTypes';

function* DepartmentVisualNavigationSaga(actionParams) {
    try {
        const departments = yield call(DepartmentApi.getDepartments, actionParams.pageName, actionParams.nTypeID);
        yield [
            put({
                type: DepartmentVisualNavigationActionTypes.DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS,
                departments,
                deviceType: actionParams.deviceType,
            }),
        ];
    } catch (error) {
        yield put({ type: 'VISUAL_NAVIGATION_ERROR', error });
    }
}

const getDepartmentList = (hOverItem) => {
    if (hOverItem && hOverItem.hoverPanelMap) {
        let categotyList = {};
        _forEach(hOverItem.hoverPanelMap, (x) => {
            categotyList = _merge(categotyList, x);
        });
        return categotyList;
    }
    return null;
};

const fetchCategories = (departments) => {
    if (departments) {
        const categoriesURL = _map(departments, x =>
            CategoriesApi.hoverPanelByURL(x.hoverPanelUrl));
        return new Promise((resolve) => {
            Promise.all(categoriesURL).then((categories) => {
                const dataList = [];
                let index = -1;
                _map(departments, (department) => {
                    const cat = categories[index += 1];
                    const deptList = getDepartmentList(cat.data);
                    department.departments = [];
                    if (deptList) {
                        _map(deptList, (value, key) => {
                            department.departments.push({
                                key,
                                categories: value,
                            });
                        });
                    }
                    dataList.push(department);
                });
                resolve(dataList);
            });
        });
    }
    return null;
};

const fetchDepartments = (departments) => {
    const newState = [];
    _forEach(departments.data.topNavigation, (x) => {
        const department = _head(x);
        newState.push(department);
    });
    return newState;
};

function* DesktopCategoriesVisualNavigationSaga(actionParams) {
    try {
        const categories = yield call(fetchCategories, actionParams.departments);
        yield [
            put({
                type: DepartmentVisualNavigationActionTypes.DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS,
                categories,
            }),
        ];
    } catch (error) {
        yield put({ type: 'VISUAL_NAVIGATION_ERROR', error });
    }
}

function* DesktopDepartmentVisualNavigationSaga(actionParams) {
    try {
        const departments = fetchDepartments(yield call(DepartmentApi.getDesktopDepartments, actionParams.pageName));
        yield [
            put({
                type: DepartmentVisualNavigationActionTypes.DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS,
                departments,
                deviceType: actionParams.deviceType,
            }),
        ];
    } catch (error) {
        yield put({ type: 'VISUAL_NAVIGATION_ERROR', error });
    }
}

function* DepartmentVisualLeftNavigationSaga(actionParams) {
    try {
        console.info(actionParams);
        const departments = yield call(DepartmentApi.getDeptLeftNavByDeptId, actionParams.nTypeID);
        yield [
            put({
                type: DepartmentVisualNavigationActionTypes.DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_SUCCESS,
                departments,
                deviceType: actionParams.deviceType,
            }),
        ];
    } catch (error) {
        yield put({ type: 'VISUAL_LEFT_NAVIGATION_ERROR', error });
    }
}

export function* watchVisualNavigationRequest() {
    yield takeLatest(DepartmentVisualNavigationActionTypes.DEPARTMENT_VISUAL_NAVIGATION_GET_REQUEST,
        DepartmentVisualNavigationSaga);
    yield takeLatest(DepartmentVisualNavigationActionTypes.DESKTOP_DEPARTMENT_VISUAL_NAVIGATION_GET_REQUEST,
        DesktopDepartmentVisualNavigationSaga);
    yield takeLatest(DepartmentVisualNavigationActionTypes.DESKTOP_CATEGORIES_VISUAL_NAVIGATION_GET_REQUEST,
        DesktopCategoriesVisualNavigationSaga);
}

export function* watchVisualLeftNavigationRequest() {
    yield takeLatest(DepartmentVisualNavigationActionTypes.DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_REQUEST,
        DepartmentVisualLeftNavigationSaga);
}
