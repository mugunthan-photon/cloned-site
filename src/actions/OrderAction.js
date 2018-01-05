import * as OrderActionTypes from '../actionTypes/OrderActionTypes';
import * as VendorActionTypes from '../actionTypes/VendorActionTypes';

const getLatLong = payload => ({
    type: VendorActionTypes.GET_LAT_LONG_GET_REQUEST,
    payload,
});

const optin = payload => ({
    type: OrderActionTypes.OPT_IN_POST_REQUEST, payload,
});
/* istanbul ignore next */
const getStoresAction = payload => ({
    type: OrderActionTypes.GET_STORES_GET_REQUEST, payload,
});
/* istanbul ignore next */
const getStoreByStoreId = payload => ({
    type: OrderActionTypes.GET_STORE_BY_STORE_ID_REQUEST, payload,
});
/* istanbul ignore next */
const clearStore = payload => ({
    type: OrderActionTypes.CLEAR_STORE, payload,
});

export default {
    getLatLong,
    optin,
    getStoresAction,
    clearStore,
    getStoreByStoreId,
};
