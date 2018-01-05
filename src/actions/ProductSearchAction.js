import * as productSearchActionTypes from '../actionTypes/ProductSearchActionTypes';

const getProductSearchAction = (params, regionZone) => ({
    type: productSearchActionTypes.PRODUCTSEARCH_GET_REQUEST,
    params,
    regionZone,
});

const getProductSearchDetailAction = value => ({
    type: productSearchActionTypes.PRODUCTSEARCHDETAIL_GET_REQUEST,
    value,
});

const resetProductSearchResults = (value = []) => ({
    type: productSearchActionTypes.RESET_PRODUCTSEARCH_RESULTS,
    value,
});

export default {
    getProductSearchAction,
    getProductSearchDetailAction,
    resetProductSearchResults,
};
