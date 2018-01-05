import * as types from '../actionTypes/SavedItemActionTypes';

/* istanbul ignore next */

export default function SavedItemsReducer(state = {}, action) {
/* istanbul ignore next */
    switch (action.type) {

        case types.SAVEDITEMS_GET_SUCCESS: {
            const savedItemsList = action.savedItemsList;
            return savedItemsList;
        }

        default:
            return state;
    }
}
