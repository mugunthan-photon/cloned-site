import * as actionTypes from '../actionTypes/ProductSearchActionTypes';

export default function ProductSearchDetailReducer(state = [], action) {
    switch (action.type) {
        default:
            return state;

        case actionTypes.PRODUCTSEARCHDETAIL_GET_SUCCESS:
            return Object.assign({}, action.productSearchDetailResult);
    }
}
