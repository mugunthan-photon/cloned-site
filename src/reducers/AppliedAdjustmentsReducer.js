import * as types from '../actionTypes/AdjustmentActionTypes';

export default function AdjustmentReducer(state = [], action) {
    switch (action.type) {
        case types.ADJUSTMENTS_GET_SUCCESS:
            return action.appliedAdjustmentsResponse;
        default:
            return state;
    }
}
