import * as types from '../actionTypes/CartActionTypes';

export default function CartReducer(state = { cartCount: 0 }, action) {
    let newState = {};
    switch (action.type) {
        case types.CART_COUNT_GET_SUCCESS:
            if (action.count) {
                newState = { ...state, cartCount: action.count };
            } else {
                newState = { ...state };
            }
            return newState;
        default:
            return state;
    }
}
