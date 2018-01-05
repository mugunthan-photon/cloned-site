import { PRODUCT_PROMOTION_LIST_GET_REQUEST, PRODUCT_PROMOTION_LOAD_MORE_EVENT } from '../actionTypes/ProductPromotionListActionTypes';

const getProductPromotionListAction = (pageName, urlParam, nType, deviceType) => {
    const returnPrams = {
        type: PRODUCT_PROMOTION_LIST_GET_REQUEST,
        pageName,
        urlParam,
        nType,
        deviceType,
    };
    return returnPrams;
};
/* istanbul ignore next */
const trackEventProductPromotionLoadMoreAction = () => {
    const returnPrams = {
        type: PRODUCT_PROMOTION_LOAD_MORE_EVENT,
    };
    return returnPrams;
};


export default {
    getProductPromotionListAction,
    trackEventProductPromotionLoadMoreAction,
};
