import * as types from '../actionTypes/OrderActionTypes';

export default function OptInReducer(state = [], action) {
    switch (action.type) {
        case types.OPT_IN_POST_SUCCESS:
            return action.status;
        default:
            return state;
    }
}
