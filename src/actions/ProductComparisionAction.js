import {
    TOGGLE_PRODUCTS_TO_COMPARE,
    RESET_PRODUCTS_COMPARE,
} from '../actionTypes/ProductComparisionActionTypes';


const addOrRemoveProducts = productDetails => ({
    type: TOGGLE_PRODUCTS_TO_COMPARE,
    productDetails,
});

const resetProducts = () => ({
    type: RESET_PRODUCTS_COMPARE,
});

export default {
    addOrRemoveProducts,
    resetProducts,
};

