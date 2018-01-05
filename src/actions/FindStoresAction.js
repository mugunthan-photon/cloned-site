import {
    FIND_STORES_REQUEST,
    FIND_STORES_REQUEST_ACCOUNT,
    FIND_MORE_STORES_REQUEST,
    PUT_SELECTED_STORE_REQUEST,
    OPEN_FIND_STORES_SLIDE_PANEL,
    CLOSE_FIND_STORES_SLIDE_PANEL,
    SET_AVAILABLE_FILTER,
} from '../actionTypes/FindStoresActionTypes';

export const findStores = payload => ({
    type: FIND_STORES_REQUEST,
    payload,
});

export const findMoreStores = payload => ({
    type: FIND_MORE_STORES_REQUEST,
    payload,
});

export const findAllStores = payload => ({
    type: FIND_STORES_REQUEST_ACCOUNT,
    payload,
});

export const setAvailableFilter = payload => ({
    type: SET_AVAILABLE_FILTER,
    payload,
});

export const selectStore = params => ({
    type: PUT_SELECTED_STORE_REQUEST,
    params,
});

export const openSlidePanel = () => ({
    type: OPEN_FIND_STORES_SLIDE_PANEL,
});

export const closeSlidePanel = () => ({
    type: CLOSE_FIND_STORES_SLIDE_PANEL,
});

export default {
    findStores,
    findAllStores,
    findMoreStores,
    selectStore,
    openSlidePanel,
    closeSlidePanel,
};
