import * as LoadingActionTypes from '../actionTypes/LoadingActionTypes';

export default function LoadingReducer(state = false, action) {
    switch (action.type) {
        case LoadingActionTypes.SHOW_LOADER:
            return true;
        case LoadingActionTypes.REMOVE_LOADER:
            return false;
        default:
            return state;

    }
}
