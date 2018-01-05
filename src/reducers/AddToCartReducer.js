import * as addToCartActionTypes from '../actionTypes/AddToCartActionTypes';

function AddToCartReducer(state = { isAddToCartSuccess: false, isUpdateCartSuccess: false }, action) {
    switch (action.type) {
        case addToCartActionTypes.ADDTOCART_SITE_REQUEST_SUCCESS:
            return {
                isAddToCartSuccess: true,
                isUpdateCartSuccess: false,
                ppId: action.cartSuccess.ppId,
                skuId: action.cartSuccess.skuId };
        case addToCartActionTypes.ADDTOCART_SITE_REQUEST_ERROR:
            return { isAddToCartSuccess: false, isUpdateCartSuccess: false, error: action.error };
        case addToCartActionTypes.ADDTOCART_SITE_KEEPSHOPPING_ONCLICK:
            return { isAddToCartSuccess: false, isUpdateCartSuccess: false };
        default:
            return state;
    }
}

export default AddToCartReducer;
