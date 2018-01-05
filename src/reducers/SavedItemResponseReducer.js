import * as types from '../actionTypes/SavedItemActionTypes';

export default function SavedItemResponseReducer(state = [], action) {
    switch (action.type) {

        case types.SAVEDITEMS_ADD_ITEM_SFL: {
            return [...state, action.obj];
        }

        case types.SAVEDITEMS_REMOVE_ITEM_SFL: {
            return [...state, action.obj];
        }

        case types.SAVEDITEMS_RESET_STATUS: {
            return [...state.filter(obj => (obj.ppId !== action.ppId))];
        }

        default:
            return state;
    }
}
