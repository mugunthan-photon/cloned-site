import * as MarketingZonesActionTypes from '../actionTypes/MarketingZonesActionTypes';

export default function ZoneReducer(state = {}, action) {
    let newState = {};

    switch (action.type) {
        case MarketingZonesActionTypes.ZONE_DATA_GET_ALL_SUCCESS:
            if (action.completeZoneData) {
                const tempKeyStore = Object.keys(action.completeZoneData);

                if (tempKeyStore.length) {
                    newState = Object.assign({}, state, action.completeZoneData);
                } else {
                    newState = { ...state };
                }
            } else {
                newState = { ...state };
            }

            return newState;
        case MarketingZonesActionTypes.ZONE_DATA_CLEAR:
            return newState;
        default:
            return state;
    }
}
