import { call, put, takeLatest } from 'redux-saga/effects';
import CouponApi from 'yoda-interfaces/lib/CouponIRIS/CouponApi';
import * as CouponsActionTypes from '../actionTypes/CouponActionTypes';
import * as LoadingAction from '../actions/LoadingAction';

function* CouponsSaga(action) {
    try {
        // Showing Loader
        yield put(LoadingAction.showLoader());

        let clientCall = false; // default is false
        const coupons = yield call(CouponApi.getCouponList, action.priceFlag, action.marketing, action.unmerge);

        /** If it is a client call then set this */
        if (!__SERVER__) {
            clientCall = true;
        }
        coupons.clientCall = clientCall;

        yield [
            put({
                type: CouponsActionTypes.COUPONS_GET_SUCCESS,
                coupons,
            }),
            put({
                type: CouponsActionTypes.COUPONS_SET_CACHE_READY,
            }),
            put(LoadingAction.removeLoader()),
        ];
    } catch (error) {
        yield put({
            type: 'COUPONS_ERROR',
            error,
        });
        yield put(LoadingAction.removeLoader());
    }
}

export default function* watchCouponsRequest() {
    yield takeLatest(CouponsActionTypes.COUPONS_GET_REQUEST, CouponsSaga);
}
