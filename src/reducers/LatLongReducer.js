import * as types from '../actionTypes/OrderActionTypes';

export default function LatLongReducer(state = { lat: 60.558151, lng: 22.095773 }, action) {
    switch (action.type) {
        case types.GET_LAT_LONG_GET_SUCCESS:
            return action.latLong;

        default:
            return state;
    }
}
