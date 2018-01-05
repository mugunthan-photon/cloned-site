import { takeLatest, put, call, all } from 'redux-saga/effects';
import StoreApi from 'yoda-interfaces/lib/Order/StoreApi';
import AccountStoreApi from 'yoda-interfaces/lib/Account/StoreApi';
import VendorApi from 'yoda-interfaces/lib/Vendor/VendorApi';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import FactorySaga from './FactorySaga';
import { findStores } from '../common/Constants';
import {
    FIND_STORES_REQUEST,
    FIND_STORES_SUCCESS,
    FIND_STORES_ERROR,
    FIND_MORE_STORES_REQUEST,
    FIND_MORE_STORES_SUCCESS,
    FIND_MORE_STORES_ERROR,
    FIND_STORES_INVALID_INPUT,
    FIND_STORES_REQUEST_ACCOUNT,
} from '../actionTypes/FindStoresActionTypes';

export function* FindStoresSaga(action) {
    try {
        // Constructing payload for change store api call
        const zipCode = action.payload.zipCode;
        // Payload resent by FactorySaga when token is expired
        const payload = action.payload.address ? action.payload : {};
        let isGeoLocationUsed = false;

        if (isEmpty(payload)) {
            // DA => To know whether user has used geo location to fetch stores list or not
            isGeoLocationUsed = true;
            payload.showAvailable = action.payload.showAvailable;
            payload.radius = action.payload.miles;
            if (zipCode) {
                // Check if the zipCode is present then call google api to determine the lat, long from it
                const latLong = yield call(VendorApi.getLatLong, { address: zipCode });
                // Check for incorrect zip codes
                if (!latLong) {
                    yield put({ type: FIND_STORES_ERROR });
                    return;
                } else if (!latLong.lng || !latLong.lat) {
                    yield put({ type: FIND_STORES_INVALID_INPUT });
                    return;
                }
                payload.address = `${latLong.lat},${latLong.lng}`;
                isGeoLocationUsed = false;
            } else {
                payload.address = `${action.payload.lat},${action.payload.lng}`;
            }

            if (action.payload.skus) {
                payload.skus = action.payload.skus;
            }
        }

        const findStoresAction = {};
        findStoresAction.payload = payload;
        findStoresAction.type = action.type;

        // Call the check store Api to get the stores list
        const result = yield call(FactorySaga, StoreApi.getStoresWithAvailability, findStoresAction);
        const response = result.response;
        if (result.isSuccess) {
            const storesData = {};
            storesData.zipCode = zipCode || (yield call(VendorApi.getZipCode, { address: payload.address }));
            storesData.miles = payload.radius;
            storesData.stores = response.data;
            storesData.showAvailable = payload.showAvailable;
            storesData.count = response.headers.get(findStores.STORES_COUNT);
            storesData.link = response.headers.get(findStores.LINK);
            storesData.isGeoLocationUsed = isGeoLocationUsed; // <= DA-selectSrore Click Event Data attribute

            yield all([
                put({ type: FIND_STORES_SUCCESS, payload: storesData }),
            ]);
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        yield put({
            type: FIND_STORES_ERROR,
            error,
        });
    }
}

export function* FindStoresPaginationSaga(action) {
    try {
        // Constructing payload for change store api call
        const findMoreStoresAction = {};
        findMoreStoresAction.type = action.type;
        findMoreStoresAction.payload = {
            pageLink: action.payload.pageLink || action.payload.nextPageLink,
        };

        // Call the check store Api to get the stores list
        const result = yield call(FactorySaga, StoreApi.getStoresByPageLink, findMoreStoresAction);
        const response = result.response;
        if (result.isSuccess) {
            const payload = {
                stores: response.data,
                link: response.headers.get(findStores.LINK),
            };
            const isShipToStoreInfo = (response.data && response.data.stores);
            if (isShipToStoreInfo) {
                const pages = response.data.page;
                const currentPageIndex = findIndex(pages, { selected: true });
                payload.stores = response.data.stores;
                payload.nextPageLink = pages[currentPageIndex + 1] ? pages[currentPageIndex + 1].url : '';
            }
            yield all([
                put({ type: FIND_MORE_STORES_SUCCESS, payload }),
            ]);
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        yield put({
            type: FIND_MORE_STORES_ERROR,
            error,
        });
    }
}


export function* FindAllStoresSaga(action) {
    try {
        // Constructing payload for change store api call
        const zipCode = action.payload.zipCode;
        // Payload resent by FactorySaga when token is expired
        const payload = action.payload.address ? action.payload : {};
        let isGeoLocationUsed = false;
        if (isEmpty(payload)) {
            // DA => To know whether user has used geo location to fetch stores list or not
            isGeoLocationUsed = true;
            payload.showAvailable = action.payload.showAvailable;
            payload.radius = action.payload.miles;
            if (zipCode) {
                // Check if the zipCode is present then call google api to determine the lat, long from it
                const latLong = yield call(VendorApi.getLatLong, { address: zipCode });
                // Check for incorrect zip codes
                if (!latLong.lng || !latLong.lat) {
                    yield all([
                        put({ type: FIND_STORES_INVALID_INPUT }),
                    ]);
                    return;
                }
                payload.longitude = latLong.lng;
                payload.latitude = latLong.lat;
                isGeoLocationUsed = false;
            } else {
                payload.longitude = action.payload.lng;
                payload.latitude = action.payload.lat;
            }

            if (action.payload.skus) {
                payload.skus = action.payload.skus;
            }
        }

        const findStoresAction = {};
        findStoresAction.payload = payload;
        findStoresAction.type = action.type;

        // Call the check store Api to get the stores list
        const result = yield call(FactorySaga, AccountStoreApi.getStoresWithRange, findStoresAction);
        const response = result.response;
        if (result.isSuccess) {
            const storesData = {};
            storesData.zipCode = zipCode || (yield call(VendorApi.getZipCode, { address: payload.address }));
            storesData.miles = payload.radius;
            storesData.stores = response.data.stores;
            storesData.showAvailable = payload.showAvailable;
            storesData.count = response.data.stores.length;
            storesData.isGeoLocationUsed = isGeoLocationUsed; // <= DA-selectSrore Click Event Data attribute
            if (response.data.page && response.data.page.length > 1) {
                const nextLinkIndex = response.data.page.find(x => x.selected).number;
                storesData.nextPageLink = response.data.page[nextLinkIndex].url;
            }
            yield all([
                put({ type: FIND_STORES_SUCCESS, payload: storesData }),
            ]);
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        yield put({
            type: FIND_STORES_ERROR,
            error,
        });
    }
}

export function* watchFindStoresRequest() {
    yield takeLatest(FIND_STORES_REQUEST, FindStoresSaga);
    yield takeLatest(FIND_STORES_REQUEST_ACCOUNT, FindAllStoresSaga);
}

export function* watchFindMoreStoresRequest() {
    yield takeLatest(FIND_MORE_STORES_REQUEST, FindStoresPaginationSaga);
}
