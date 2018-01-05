import * as ShowPreviewZoneActionTypes from '../actionTypes/ShowPreviewZoneActionTypes';

const showPreviewZone = () => ({
    type: ShowPreviewZoneActionTypes.SHOW_PREVIEW_ZONE,
});

const hidePreviewZone = () => ({
    type: ShowPreviewZoneActionTypes.HIDE_PREVIEW_ZONE,
});

export default {
    showPreviewZone,
    hidePreviewZone,
};
