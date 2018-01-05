import * as actionTypes from '../actionTypes/ProductSearchActionTypes';

export default function ProductSearchReducer(state = [], action) {
    switch (action.type) {
        case actionTypes.PRODUCTSEARCH_GET_SUCCESS:
            return action.productSearchResults;
        case actionTypes.RESET_PRODUCTSEARCH_RESULTS:
            state = action.value;
            return state;
        default:
            return state;
    }
}
