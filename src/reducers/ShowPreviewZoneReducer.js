import * as ShowPreviewZoneActionTypes from '../actionTypes/ShowPreviewZoneActionTypes';

export default function ShowZoneReducer(state = false, action) {
    switch (action.type) {
        case ShowPreviewZoneActionTypes.SHOW_PREVIEW_ZONE:
            return true;
        case ShowPreviewZoneActionTypes.HIDE_PREVIEW_ZONE:
            return false;
        default:
            return state;

    }
}
