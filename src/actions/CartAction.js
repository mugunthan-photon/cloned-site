import * as CartActionTypes from '../actionTypes/CartActionTypes';

const getCartCountAction = () => ({
    type: CartActionTypes.CART_COUNT_GET_REQUEST,
});

export default {
    getCartCountAction,
};
