import { FIND_STORES_PAGE_SUCCESS,
         FIND_MORE_STORES_PAGE_SUCCESS,
         FIND_STORES_BY_SERVICE,
         SET_SELECTED_SERVICES,
         STORES_BY_ID_SUCCESS,
         FIND_STORES_PAGE_RESET,
         SHOW_STORE_LOADER,
         HIDE_STORE_LOADER,
         SET_ZIP_CODE,
         STORES_ON_LOAD,
         FIND_STORES_PAGE_INVALID_INPUT } from '../actionTypes/FindAStorePageActionTypes';

export default function FindAStorePageReducer(state = {
    storeSelectedServices: [],
    count: 0,
    miles: 15,
    invalidInput: false,
    showLoader: false,
    invokeStoresOnLoad: false,
}, action) {
    const resetState = {
        invalidInput: false,
    };
    switch (action.type) {
        case FIND_STORES_PAGE_SUCCESS: {
            return Object.assign({}, state, action.storeInfo, resetState);
        }
        case FIND_MORE_STORES_PAGE_SUCCESS: {
            const { nextPageLink, stores } = action.payload;
            return Object.assign({}, state, resetState, {
                stores: state.stores.concat(stores),
                nextPageLink,
            });
        }
        case FIND_STORES_BY_SERVICE: {
            const { nextPageLink, stores, count } = action.payload;
            return Object.assign({}, state, resetState, {
                stores,
                nextPageLink,
                count,
            });
        }
        case STORES_BY_ID_SUCCESS: {
            const { stores, count } = action.payload;
            return Object.assign({}, state, resetState, {
                stores: [...stores],
                count,
            });
        }
        case SET_SELECTED_SERVICES: {
            return Object.assign({}, state, {
                storeSelectedServices: action.storeService,
            });
        }
        case FIND_STORES_PAGE_INVALID_INPUT: {
            return Object.assign({}, state, action.storeInfo, {
                invalidInput: true,
            });
        }
        case FIND_STORES_PAGE_RESET: {
            return {};
        }
        case SHOW_STORE_LOADER: {
            return Object.assign({}, state, {
                showLoader: true,
            });
        }
        case HIDE_STORE_LOADER: {
            return Object.assign({}, state, {
                showLoader: false,
            });
        }
        case SET_ZIP_CODE: {
            return Object.assign({}, state, {
                zipCode: action.zipCode,
            });
        }
        case STORES_ON_LOAD: {
            return Object.assign({}, state, {
                invokeStoresOnLoad: true,
            });
        }
        default:
            return state;
    }
}
