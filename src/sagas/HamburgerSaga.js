import { put, call, takeLatest } from 'redux-saga/effects';
import CategoriesApi from 'yoda-interfaces/lib/Catalog/CategoriesApi';
import * as HamburgerActionTypes from '../actionTypes/HamburgerActionTypes';

function* ActiveMenuListSaga() {
    try {
        const categoriesData = yield call(CategoriesApi.getPageTemplate);
        const categories = categoriesData.data.topNavigation;
        yield [
            put({ type: HamburgerActionTypes.SLIDER_CATEGORY_LOAD_SUCCESS, categories }),
        ];
    } catch (error) {
        yield put({ type: HamburgerActionTypes.SLIDER_CATEGORY_LOAD_ERROR, error });
    }
}


function* loadHoverAPI(params) {
    try {
        const nidWithoutN = params.nid.split('-')[1];
        const categoriesData = yield call(CategoriesApi.hoverPannel, nidWithoutN);
        const categories = categoriesData.data;
        yield put({ type: HamburgerActionTypes.SLIDER_HOVER_LOAD_SUCCESS, categories });
    } catch (e) {
        yield put({ type: HamburgerActionTypes.SLIDER_CATEGORY_LOAD_ERROR, e });
    }
}

export function* watchhamburgerchange() {
    yield takeLatest(HamburgerActionTypes.SLIDER_CATEGORY_LOAD_REQUEST, ActiveMenuListSaga);
}

export function* watchHoverApi() {
    yield takeLatest(HamburgerActionTypes.SLIDER_HOVER_LOAD_REQUEST, loadHoverAPI);
}
