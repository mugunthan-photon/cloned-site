import * as OverlayActionTypes from '../actionTypes/OverlayActionTypes';

export default function OverlayReducer(state = false, action) {
    switch (action.type) {
        case OverlayActionTypes.OVERLAY_SHOW:
            return true;
        case OverlayActionTypes.OVERLAY_REMOVE:
            return false;
        default:
            return state;

    }
}

