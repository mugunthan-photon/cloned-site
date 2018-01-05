import * as addToCartActionTypes from '../actionTypes/AddToCartActionTypes';

const addItemToCart = (productDetail, analyticsData) => ({
    type: addToCartActionTypes.ADDTOCART_SITE_REQUEST,
    payload: { productDetail, analyticsData },
});

const closeCartModal = () => ({
    type: addToCartActionTypes.ADDTOCART_SITE_KEEPSHOPPING_ONCLICK,
});

export default {
    addItemToCart,
    closeCartModal,
};
