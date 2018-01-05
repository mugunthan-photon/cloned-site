import parseLinkHeader from 'parse-link-header';
import {
    FIND_STORES_SUCCESS,
    FIND_STORES_REQUEST_ACCOUNT,
    FIND_STORES_ERROR,
    FIND_MORE_STORES_SUCCESS,
    OPEN_FIND_STORES_SLIDE_PANEL,
    CLOSE_FIND_STORES_SLIDE_PANEL,
    PUT_SELECTED_STORE_SUCCESS,
    SET_AVAILABLE_FILTER,
    FIND_STORES_INVALID_INPUT,
} from '../actionTypes/FindStoresActionTypes';
import { findStores } from '../common/Constants';

const parseLinks = (linksHeader) => {
    const links = parseLinkHeader(linksHeader);
    return (links && links.next) ? links.next.url : undefined;
};

/**
 * The object structure for find stores reducer
 *   findStoreDetails: {
 *      isSlidePanelOpen: false,
 *      showAvailable: true,
 *      zipCode: 12345,
 *      nextPageLink: '',
 *      miles: 25,
 *      count: 40,
 *      stores: [{}],
 *      isGeoLocationUsed: true | false <= DA - needed for selectStore event
 *   }
 */
function FindStoresReducer(state = {}, action) {
    const payload = action.payload;
    let newState = {};
    switch (action.type) {
        case FIND_STORES_REQUEST_ACCOUNT:
            // Retain prev value for isSlidePanelOpen
            newState.isSlidePanelOpen = state.isSlidePanelOpen;
            // Put small loader
            newState.isLoading = true;
            return newState;
        case FIND_STORES_SUCCESS:
            // Retain prev value for isSlidePanelOpen
            newState.isSlidePanelOpen = state.isSlidePanelOpen;
            newState.showAvailable = payload.showAvailable;
            newState.zipCode = payload.zipCode;
            newState.miles = payload.miles;
            newState.count = payload.count;
            newState.stores = payload.stores;
            newState.nextPageLink = payload.nextPageLink ? payload.nextPageLink : parseLinks(payload.link);
            newState.isGeoLocationUsed = payload.isGeoLocationUsed; // <= DA - needed for selectStore event
            return newState;
        case FIND_STORES_ERROR:
            // Retain prev value for isSlidePanelOpen
            newState.isSlidePanelOpen = state.isSlidePanelOpen;
            newState.isLoading = false;
            return newState;
        case FIND_MORE_STORES_SUCCESS:
            // Deep copy current state
            newState = JSON.parse(JSON.stringify(state));
            newState.stores = [...newState.stores, ...payload.stores];
            newState.nextPageLink = payload.nextPageLink ? payload.nextPageLink : parseLinks(payload.link);
            return newState;
        case FIND_STORES_INVALID_INPUT:
            // Deep copy current state
            newState = JSON.parse(JSON.stringify(state));
            newState.zipCode = findStores.INVALID_INPUT;
            return newState;
        case OPEN_FIND_STORES_SLIDE_PANEL:
            newState = Object.assign({}, state);
            newState.isSlidePanelOpen = true;
            return newState;
        case PUT_SELECTED_STORE_SUCCESS:
        case CLOSE_FIND_STORES_SLIDE_PANEL:
            newState = Object.assign({}, state);
            newState.isSlidePanelOpen = false;
            return newState;
        case SET_AVAILABLE_FILTER:
            newState = Object.assign({}, state);
            newState.showAvailable = payload;
            return newState;
        default:
            return state;
    }
}

export default FindStoresReducer;
