import * as types from '../actionTypes/AdjustmentActionTypes';

export default function AdjustmentReducer(state = [], action) {
    switch (action.type) {
        case types.ADJUSTMENTS_POST_SUCCESS:
        case types.ADJUSTMENTS_POST_ERROR:
        case types.ADJUSTMENTS_POST_SERIAL:
            return action.adjustmentResponse;
        default:
            return state;
    }
}
