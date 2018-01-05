import { takeLatest, put, call } from 'redux-saga/effects';
import HomePageContentApi from 'yoda-interfaces/lib/Content/ContentApi';
import * as ProductPromotionActionTypes from '../actionTypes/ProductPromotionListActionTypes';

function* ProductPromotionListSaga(promotionParams) {
    try {
        const departments = yield call(HomePageContentApi.getZoneContent,
            promotionParams.pageName,
            promotionParams.urlParam,
            promotionParams.nType);
        let device = '';
        if (promotionParams.deviceType.isMobile) {
            device = 'mobile';
        } else if (promotionParams.deviceType.isTablet) {
            device = 'tablet';
        } else {
            device = 'dotcom';
        }
        const departmentDataWithPageName = Object.assign({},
            departments,
            {
                pageName: promotionParams.pageName,
                deviceType: device,
            });
        yield [
            put({ type: ProductPromotionActionTypes.PRODUCT_PROMOTION_LIST_GET_SUCCESS, departmentDataWithPageName }),
        ];
    } catch (error) {
        yield put({ type: 'PRODUCT_PROMOTION_LIST_GET_ERROR', error });
    }
}

export default function* watchProductPromortionListRequest() {
    yield takeLatest(ProductPromotionActionTypes.PRODUCT_PROMOTION_LIST_GET_REQUEST,
        ProductPromotionListSaga);
}
