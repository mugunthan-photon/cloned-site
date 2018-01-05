import * as types from '../actionTypes/AdjustmentActionTypes';

export default function UpdatedAdjustmentReducer(state = false, action) {
    switch (action.type) {
        case types.ADJUSTMENTS_UPDATED:
            return action.payload;
        default:
            return state;
    }
}
