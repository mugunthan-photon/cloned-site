import * as OverlayActionTypes from '../actionTypes/OverlayActionTypes';

const showOverlay = () => ({
    type: OverlayActionTypes.OVERLAY_SHOW,
});

const removeOverlay = () => ({
    type: OverlayActionTypes.OVERLAY_REMOVE,
});

export default {
    showOverlay,
    removeOverlay,
};
