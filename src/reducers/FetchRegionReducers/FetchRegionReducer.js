import * as RegionActionTypes from '../../actionTypes/RegionActionTypes';

const defaultPriceZone = -1;

export default function RegionReducer(state = {}, action) {
    switch (action.type) {
        case RegionActionTypes.JS_UPDATE_PRICING_STATUS:
            return Object.assign({}, {
                isEnabled: action.payload,
            });

        case RegionActionTypes.JS_SET_REGION:
            return Object.assign({}, {
                regionZone: action.payload || defaultPriceZone,
            });

        default:
            return state;
    }
}
