import * as AdjustmentActionTypes from '../actionTypes/AdjustmentActionTypes';

const getAdjustments = () => ({
    type: AdjustmentActionTypes.ADJUSTMENTS_GET_REQUEST,
});

const applyAdjustment = payload => ({
    type: AdjustmentActionTypes.ADJUSTMENTS_POST_REQUEST, payload,
});

const getAdjustmentDetailById = payload => ({
    type: AdjustmentActionTypes.ADJUSTMENTS_BY_ID_GET_REQUEST, payload,
});

const removeAdjustmentById = payload => ({
    type: AdjustmentActionTypes.ADJUSTMENTS_BY_ID_DELETE_REQUEST, payload,
});

const adjustmentUpdated = payload => ({
    type: AdjustmentActionTypes.ADJUSTMENTS_UPDATED, payload,
});

export default {
    getAdjustments,
    applyAdjustment,
    getAdjustmentDetailById,
    removeAdjustmentById,
    adjustmentUpdated,
};
