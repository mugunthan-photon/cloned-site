import {
    TOGGLE_STORE_TO_FILTER,
    RESET_SELECTED_STORES,
} from '../actionTypes/GalleryStoreActionTypes';

export const selectStoreToFilter = payload => ({
    type: TOGGLE_STORE_TO_FILTER,
    payload,
});

export const resetSelectedStores = () => ({
    type: RESET_SELECTED_STORES,
});

export default {
    selectStoreToFilter,
    resetSelectedStores,
};
