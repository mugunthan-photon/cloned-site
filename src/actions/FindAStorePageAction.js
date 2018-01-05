import {
    FIND_STORES_PAGE,
    FIND_MORE_STORES_PAGE,
    PRE_POPULATE_STORES,
    GET_AND_PRESELECT_STORES,
    FIND_STORES_PAGE_RESET,
} from '../actionTypes/FindAStorePageActionTypes';

const findStoresPage = payload => ({
    type: FIND_STORES_PAGE,
    payload,
});

const prePopulateStores = () => ({
    type: PRE_POPULATE_STORES,
});

const findMoreStoresPage = payload => ({
    type: FIND_MORE_STORES_PAGE,
    payload,
});

const getAndPreSelectStores = payload => ({
    type: GET_AND_PRESELECT_STORES,
    payload,
});

const findStoresPageReset = () => ({
    type: FIND_STORES_PAGE_RESET,
});

export default {
    findStoresPage,
    findMoreStoresPage,
    prePopulateStores,
    getAndPreSelectStores,
    findStoresPageReset,
};
