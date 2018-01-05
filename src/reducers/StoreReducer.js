/* istanbul ignore next */
import * as types from '../actionTypes/OrderActionTypes';
import { SET_USER_STORES } from '../actionTypes/SetMyDefaultStoreActionTypes';
/* istanbul ignore next */
export default function StoreReducer(state = {
    storeDetails: null,
    isGeoStore: false,
    userStores: [],
}, action) {
    /* istanbul ignore next */
    switch (action.type) {
        case types.GET_STORE_BY_STORE_ID_SUCCESS:
            return Object.assign({}, state, {
                storeDetails: action.selectedStore,
                isGeoStore: action.isGeoStore ? action.isGeoStore : false,
            });
        case types.GET_STORE_BY_STORE_ID_SUCCESS_CHECKOUT:
            return Object.assign({}, state, {
                storeDetails: action.selectedStore,
                isGeoStore: action.isGeoStore ? action.isGeoStore : false,
            });
        case SET_USER_STORES:
            return Object.assign({}, state, {
                userStores: action.stores,
            });
        default:
            return state;
    }
}
