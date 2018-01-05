import * as AnalyticsActionTypes from '../actionTypes/AnalyticsActionTypes';

const triggerFormError = errorDetails => ({
    type: AnalyticsActionTypes.FORM_ERROR,
    errorDetails,
});

const triggerNavigationClick = payload => ({
    type: AnalyticsActionTypes.NAVIGATION_CLICK,
    navClick: payload,
});

const selectStoreData = () => ({
    type: AnalyticsActionTypes.ANALYTICS_SELECT_STORE,
});

const storeSearchData = payload => ({
    type: AnalyticsActionTypes.ANALYTICS_STORE_SEARCH, payload,
});

// Gallery store change event
const bopisChangeZip = payload => ({
    type: AnalyticsActionTypes.BOPIS_CHANGE_ZIP,
    payload,
});

const videoLoadedData = payload => ({
    type: AnalyticsActionTypes.ANALYTICS_VIDEO_LOADED,
    payload,
});
/* istanbul ignore next */
const openModelEvent = payload => ({
    type: AnalyticsActionTypes.ANALYTICS_OPEN_MODAL,
    name: payload.name,
});

const updateAnalyticsClickAction = payload => ({
    type: AnalyticsActionTypes.UPDATE_ANALYTICS_CLICK_EVENT,
    payload,
});

const compareProductsClick = payload => ({
    type: AnalyticsActionTypes.COMPARE_PRODUCTS_CLICK,
    payload,
});

export default {
    triggerFormError,
    triggerNavigationClick,
    selectStoreData,
    videoLoadedData,
    openModelEvent,
    updateAnalyticsClickAction,
    storeSearchData,
    bopisChangeZip,
    compareProductsClick,
};
