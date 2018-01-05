import * as CouponsActionTypes from '../actionTypes/CouponActionTypes';

const getCouponsAction = (priceFlag, marketing, unmerge) => ({
    type: CouponsActionTypes.COUPONS_GET_REQUEST,
    priceFlag,
    marketing,
    unmerge,
});

const getCouponsLoaded = () => ({
    type: CouponsActionTypes.COUPONS_LOADED,
    payload: { pageName: 'coupon' },
});

export default {
    getCouponsAction,
    getCouponsLoaded,
};
