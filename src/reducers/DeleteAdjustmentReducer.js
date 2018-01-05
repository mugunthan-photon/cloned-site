import * as types from '../actionTypes/AdjustmentActionTypes';

export default function AdjustmentReducer(state = [], action) {
    switch (action.type) {
        case types.ADJUSTMENTS_BY_ID_DELETE_SUCCESS:
            return null;
        default:
            return state;
    }
}
