import * as SavedItemsTypes from '../actionTypes/SavedItemActionTypes';

export const getSavedItems = param => ({
    type: SavedItemsTypes.SAVEDITEMS_GET_REQUEST,
    payload: param,
});

export const addItem = param => ({
    type: SavedItemsTypes.ADD_SAVEDITEMS,
    payload: param,
});

export const removeItem = param => ({
    type: SavedItemsTypes.DELETE_SAVEDITEMS,
    payload: { param },
});

export const resetStatus = ppId => ({
    type: SavedItemsTypes.SAVEDITEMS_RESET_STATUS,
    ppId,
});
