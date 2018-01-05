import * as PromotionalBannerActionTypes from '../actionTypes/PromotionalBannerActionTypes';

export default function OfferDetailsReducer(state = [], action) {
    let promotionalBannerData = state;
    switch (action.type) {
        case PromotionalBannerActionTypes.PROMOTIONALBANNERDATA_GET_SUCCESS:
            if (action.promotionalBannerData.data) {
                promotionalBannerData = action.promotionalBannerData.data;
            }
            return promotionalBannerData;
        default:
            return state;
    }
}
