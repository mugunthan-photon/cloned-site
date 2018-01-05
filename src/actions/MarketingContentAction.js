import * as MarketingContentActionTypes from '../actionTypes/MarketingContentActionTypes';

const getMarketingContentAction = () => ({
    type: MarketingContentActionTypes.MARKETING_CONTENT_GET_REQUEST,
});

export default {
    getMarketingContentAction,
};
