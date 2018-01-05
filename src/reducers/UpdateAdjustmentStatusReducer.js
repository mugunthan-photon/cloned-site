import * as types from '../actionTypes/AdjustmentActionTypes';

export default function UpdateAdjustmentStatusReducer(state = {}, action) {
    switch (action.type) {
        case types.ADJUSTMENT_EXPIRED:
            return action.payload;
        default:
            return state;
    }
}
