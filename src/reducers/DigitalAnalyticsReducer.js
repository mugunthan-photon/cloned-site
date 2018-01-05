import * as AnaltyicsActionTypes from '../actionTypes/AnalyticsActionTypes';

export default function DigitalAnalyticsReducer(state = [], action) {
    switch (action.type) {
        case AnaltyicsActionTypes.UPDATE_ANALYTICS_CLICK_EVENT:
            return action.payload ? action.payload : state;
        default:
            return state;
    }
}
