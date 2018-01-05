import {
    TOGGLE_STORE_TO_FILTER,
    RESET_SELECTED_STORES,
    SET_STORES_TO_FILTER,
} from '../actionTypes/GalleryStoreActionTypes';
import { GET_STORE_BY_STORE_ID_SUCCESS } from '../actionTypes/OrderActionTypes';
import { FIND_STORES_PAGE_SUCCESS,
         FIND_MORE_STORES_PAGE_SUCCESS } from '../actionTypes/FindAStorePageActionTypes';

function searchInList(selectedStores, store) {
    const storeIndex = selectedStores.findIndex(currentStore => currentStore.id === store.id);
    return { inList: storeIndex >= 0, storeIndex };
}

function findInArray(selectedStores, store) {
    const { inList, storeIndex } = searchInList(selectedStores, store);
    if (inList) {
        selectedStores.splice(storeIndex, 1);
    } else {
        selectedStores.push(store);
    }
    return [...selectedStores];
}

function concatStores(stores, selectedStores) {
    const allStores = [...selectedStores];
    stores.forEach((store) => {
        const { inList } = searchInList(allStores, store);
        if (!inList) {
            allStores.push(store);
        }
    });
    return allStores;
}

export default function GalleryStoreReducer(state = {
    selectedStores: [],
    storesList: [], // Includes both selected stores and current store list
    headerStore: null,
}, action) {
    switch (action.type) {
        case GET_STORE_BY_STORE_ID_SUCCESS: {
            let selectedStores = state.selectedStores;
            if (action.defaultStore && !action.isGeoStore && !selectedStores.length) {
                selectedStores = findInArray(state.selectedStores, action.selectedStore);
            }
            return Object.assign({}, state, {
                selectedStores,
                headerStore: action.selectedStore,
            });
        }
        case TOGGLE_STORE_TO_FILTER: {
            return Object.assign({}, state, {
                selectedStores: findInArray(state.selectedStores, action.payload),
            });
        }
        case SET_STORES_TO_FILTER: {
            return Object.assign({}, state, {
                selectedStores: action.payload,
                storesList: concatStores(action.payload, state.selectedStores),
            });
        }
        case RESET_SELECTED_STORES: {
            return Object.assign({}, state, {
                selectedStores: [],
            });
        }
        case FIND_STORES_PAGE_SUCCESS: {
            return Object.assign({}, state, {
                storesList: concatStores(action.storeInfo.stores, state.selectedStores),
            });
        }
        case FIND_MORE_STORES_PAGE_SUCCESS: {
            return Object.assign({}, state, {
                storesList: concatStores(state.storesList.concat(action.payload.stores), state.selectedStores),
            });
        }
        default:
            return state;
    }
}
