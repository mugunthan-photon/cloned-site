import { takeLatest, call, put, select, fork } from 'redux-saga/effects';
// import OrderApi from 'yoda-interfaces/lib/Order/OrderApi';
import findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import OrderApi from 'yoda-interfaces/lib/Order/OrderApi';
import VendorApi from 'yoda-interfaces/lib/Vendor/VendorApi';
import StoreApi from 'yoda-interfaces/lib/Order/StoreApi';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';
import { FIND_STORES_PAGE,
    FIND_STORES_PAGE_SUCCESS,
    FIND_MORE_STORES_PAGE,
    FIND_STORES_BY_SERVICE,
    SET_SELECTED_SERVICES,
    FIND_MORE_STORES_PAGE_SUCCESS,
    PRE_POPULATE_STORES,
    GET_AND_PRESELECT_STORES,
    GET_AND_PRESELECT_STORES_ERROR,
    STORES_BY_ID_SUCCESS,
    SHOW_STORE_LOADER,
    HIDE_STORE_LOADER,
    FIND_STORES_ERROR,
    SET_ZIP_CODE,
    STORES_ON_LOAD,
    FIND_STORES_PAGE_INVALID_INPUT } from '../actionTypes/FindAStorePageActionTypes';
import {
    SET_STORES_TO_FILTER,
} from '../actionTypes/GalleryStoreActionTypes';
import Location from '../helpers/Location/Location';

function getPageLinks(responseData) {
    const currentPageIndex = findIndex(responseData.page, { selected: true });
    const nextPage = responseData.page[currentPageIndex + 1];
    return (nextPage && nextPage.url) || '';
}

function getStoreSelectedServices(state, newService) {
    const storeSelectedServices = state.findAStorePageInfo.storeSelectedServices;
    const selectedServicesSet = new Set(storeSelectedServices);
    if (newService) {
        if (selectedServicesSet.has(newService)) {
            selectedServicesSet.delete(newService);
        } else {
            selectedServicesSet.add(newService);
        }
    }
    return [...selectedServicesSet];
}

const previousSelectedStore = state => ({
    selectedStore: state.selectedStore,
    findAStorePageInfo: state.findAStorePageInfo,
});

export function* findStoresSaga(action) {
    try {
        yield put({ type: SHOW_STORE_LOADER });
        yield put({ type: STORES_ON_LOAD });
        const getStoresPayload = {};
        const storeService = action.payload.isPDPMajorAppliances ?
          yield select(getStoreSelectedServices, action.payload.storeService) :
          yield select(getStoreSelectedServices);
        let userLatLong = '';
        getStoresPayload.radius = action.payload.miles;
        // getStoresPayload.pageSize = action.payload.pageSize;

        if (storeService) {
            getStoresPayload.storeService = storeService.toString();
        }

        let address = '';
        const zipCode = action.payload.zipCode;
        const resetStores = {
            zipCode,
            miles: action.payload.miles,
            stores: [],
            nextPageLink: null,
            count: 0,
        };

        if (zipCode) {
            // Todo: Check why call is not working
            // const [latLong, userLocation] = yield all([
            //     call(VendorApi.getLatLong, { address: zipCode }),
            //     call(Location.getLatLongAsPromise),
            // ]);
            yield put({ type: SET_ZIP_CODE, zipCode });
            const latLong = yield call(VendorApi.getLatLong, { address: zipCode });
            const userLocationCords = yield call(Location.getLatLongAsPromise);
            const userLocation = (userLocationCords) ?
            { lat: userLocationCords.lat, lng: userLocationCords.lng } : {};

            if (userLocation && userLocation.lat && userLocation.lng) {
                userLatLong = `${userLocation.lat},${userLocation.lng}`;
                getStoresPayload.userLatitude = userLocation.lat;
                getStoresPayload.userLongitude = userLocation.lng;
            }
            // Invalid address entered. Unable to get lat lng for it.
            if (!latLong.lng || !latLong.lat) {
                yield [
                    put({
                        type: FIND_STORES_PAGE_INVALID_INPUT,
                        storeInfo: resetStores,
                    }),
                    put({ type: HIDE_STORE_LOADER }),
                ];
                return;
            }
            getStoresPayload.latitude = latLong.lat;
            getStoresPayload.longitude = latLong.lng;
            address = `${latLong.lat},${latLong.lng}`;
        } else {
            getStoresPayload.latitude = action.payload.lat;
            getStoresPayload.longitude = action.payload.lng;
            address = `${getStoresPayload.latitude},${getStoresPayload.longitude}`;
            userLatLong = (getStoresPayload.latitude && getStoresPayload.longitude) ?
            `${getStoresPayload.latitude},${getStoresPayload.longitude}` : userLatLong;
        }

        const response = yield call(OrderApi.getStores, getStoresPayload);

        if (response.status === 200) {
            const storesData = {
                count: 0,
                nextPageLink: '',
            };

            if (response.data && response.data.page && response.data.page.length) {
                storesData.nextPageLink = getPageLinks(response.data);
                storesData.initialPageLink = (response.data.page && response.data.page[0].url) || '';
                storesData.count = response.data.meta.totalStores;
            } else {
                storesData.initialPageLink = '';
            }
            storesData.zipCode = zipCode || (yield call(VendorApi.getZipCode, { address }));
            storesData.miles = action.payload.miles;
            storesData.stores = response.data.stores;
            storesData.userLatLong = userLatLong;

            if (action.payload.setMyDefaultStore && storesData.stores.length) {
                Cookies.save('userStore', storesData.stores[0].id);
                yield [
                    put({ type: FIND_STORES_PAGE_SUCCESS, storeInfo: storesData }),
                    put({
                        type: OrderActionTypes.GET_STORE_BY_STORE_ID_SUCCESS,
                        selectedStore: storesData.stores[0],
                        isGeoStore: action.payload.isGeoStore,
                    }),
                    put({ type: HIDE_STORE_LOADER }),
                ];
            } else {
                yield [
                    put({ type: FIND_STORES_PAGE_SUCCESS, storeInfo: storesData }),
                    put({ type: HIDE_STORE_LOADER }),
                ];
            }
        } else {
            yield [
                put({ type: FIND_STORES_PAGE_SUCCESS, storeInfo: resetStores }),
                put({ type: HIDE_STORE_LOADER }),
            ];
        }
    } catch (error) {
        yield [
            put({ type: FIND_STORES_ERROR, error }),
            put({ type: HIDE_STORE_LOADER }),
        ];
    }
}

function* FindStoresPaginationSaga(action) {
    try {
        yield put({ type: SHOW_STORE_LOADER });
        // Constructing payload for change store api call
        const findMoreStoresAction = {};
        const { filterByService } = action.payload;
        const storeService = yield select(getStoreSelectedServices, action.payload.filterValue);
        let pageLink = action.payload.nextPageLink;

        if (filterByService) {
            pageLink = `${action.payload.initialPageLink}&storeService=${storeService.toString()}`;
            yield [
                put({ type: SET_SELECTED_SERVICES, storeService }),
            ];
        }
        // findMoreStoresAction.type = action.type;
        findMoreStoresAction.payload = {
            pageLink,
        };

        // Call the check store Api to get the stores list
        const response = yield call(StoreApi.getMoreStoresByLink, findMoreStoresAction);

        if (response.status === 200) {
            const payload = {};
            payload.nextPageLink = getPageLinks(response.data);
            const actionType = filterByService ? FIND_STORES_BY_SERVICE : FIND_MORE_STORES_PAGE_SUCCESS;

            payload.stores = response.data.stores;
            payload.count = response.data.meta.totalStores;

            yield [
                put({ type: actionType, payload }),
                put({ type: HIDE_STORE_LOADER }),
            ];
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        yield [
            put({ type: FIND_STORES_ERROR, error }),
            put({ type: HIDE_STORE_LOADER }),
        ];
    }
}

function* prePopulateStores() {
    try {
        const { selectedStore, findAStorePageInfo: { miles } } = yield select(previousSelectedStore);
        const selectedZip = _get(selectedStore, 'storeDetails.zip');
        if (selectedZip) {
            const selectedStoreDetails = {
                payload: {
                    zipCode: selectedZip,
                    miles,
                },
            };
            yield fork(findStoresSaga, selectedStoreDetails);
        }
    } catch (error) {
        // yield put({
        //     type: FIND_MORE_STORES_ERROR,
        //     error,
        // });
    }
}

/**
 * @description
 * Accepts an array of storeIds and fetch store details
 * Eg: [2055, 2795, 2410, 2982]
 */
function* getAndPreSelectStores(storeIds) {
    try {
        const { payload } = storeIds;
        if (Array.isArray(payload)) {
            yield put({ type: SHOW_STORE_LOADER });
            const storeList = {};
            const storeRequest = payload.map(store => call(StoreApi.getStoreById, { storeId: store }));
            const results = yield storeRequest;
            storeList.stores = results.map(storeDetails => storeDetails.data.stores[0]);
            storeList.count = storeList.stores.length;
            yield [
                put({ type: STORES_BY_ID_SUCCESS, payload: storeList }),
                put({ type: SET_STORES_TO_FILTER, payload: storeList.stores }),
                // put({ type: HIDE_STORE_LOADER }),
                fork(findStoresSaga, { payload: { zipCode: storeList.stores[0].zip } }),
            ];
        }
    } catch (error) {
        yield put({
            type: GET_AND_PRESELECT_STORES_ERROR,
            error,
        });
    }
}


export function* watchfindAStorePage() {
    yield takeLatest(FIND_STORES_PAGE, findStoresSaga);
}

export function* watchMoreFindAStorePage() {
    yield takeLatest(FIND_MORE_STORES_PAGE, FindStoresPaginationSaga);
}

export function* watchPrePopulateStores() {
    yield takeLatest(PRE_POPULATE_STORES, prePopulateStores);
}

export function* watchGetAndPreSelectStores() {
    yield takeLatest(GET_AND_PRESELECT_STORES, getAndPreSelectStores);
}
