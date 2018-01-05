import { put, call, takeLatest } from 'redux-saga/effects';
import CategoriesApi from 'yoda-interfaces/lib/Catalog/CategoriesApi';
import * as NavigationMenuActionTypes from '../actionTypes/NavigationMenuActionTypes';


function* ActiveMenuListSaga(action) {
    try {
        const categoriesData = yield call(CategoriesApi.getCategoryById, action.payload);
        const categories = categoriesData.data;
        yield [
            put({ type: NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_GET_SUCCESS, categories }),
        ];
    } catch (error) {
        yield put({ type: NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_GET_ERROR, error });
    }
}

export default function* watchActiveMenuListRequest() {
    yield takeLatest(NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_ONCLICK_GET_REQUEST, ActiveMenuListSaga);
}
