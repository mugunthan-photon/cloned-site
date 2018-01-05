import * as CouponsActionTypes from '../actionTypes/CouponActionTypes';

export default function CouponsReducer(state = [], action) {
    switch (action.type) {
        default:
            return state;

        case CouponsActionTypes.COUPONS_GET_SUCCESS:
            return action.coupons;
    }
}
