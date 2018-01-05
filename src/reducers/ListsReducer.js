import * as types from '../actionTypes/ListsActionTypes';

/* istanbul ignore next */
export default function ListsReducer(state = { savedItems: [] }, action) {
    switch (action.type) {
        case types.SAVED_ITEMS_LOAD_SUCCESS:
            return {
                ...state,
                savedItems: action.savedItems,
            };
        default:
            return state;
    }
}
