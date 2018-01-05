import { call, put, takeLatest, select } from 'redux-saga/effects';
import omit from 'lodash/omit';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import StoreApi from 'yoda-interfaces/lib/Order/StoreApi';
import { updateStore, addStore } from 'yoda-interfaces/lib/Account/AccountApi';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';
import * as StoreActionTypes from '../actionTypes/StoreActionTypes';
import Storage from '../helpers/Storage/Storage';
import FactorySaga from './FactorySaga';
import User from '../helpers/User/User';

const previousSelectedStore = state => state.selectedStore;

export function* getStoresSaga(action) {
    try {
        const payload = omit(action.payload, 'getStoreCallback');
        const storeState = yield select(previousSelectedStore);
        let selectedStore;
        const getStoreCallback = get(action, 'payload.getStoreCallback');

        const storeConfig = JSON.parse(LocalStorage.getData('defaultStore', true));

        const userStoreInfo = Cookies.load('userStoreInfo');
        if (isEmpty(payload) && userStoreInfo) {
            const userStoreArray = userStoreInfo.split('|');
            if (userStoreArray.length > 0) {
                payload.storeId = userStoreArray[0];
            }
        }

        if (storeConfig && (isEmpty(payload) || (storeConfig.id === payload.storeId))) {
            selectedStore = storeConfig;
        }

        // Check if location object exists or else hit google api and getLatLong.
        if (!selectedStore && payload && payload.storeId) {
            const results = yield call(StoreApi.getStoreById, payload);
            selectedStore = results.data.stores[0];

            if (typeof localStorage !== 'undefined') {
                LocalStorage.setData('defaultStore', selectedStore, true);
                Storage.save('userStore', selectedStore.id, true);
            }
            Cookies.save('userStore', selectedStore.id);
            Cookies.save('userStoreInfo', `${selectedStore.id}|${selectedStore.name}|${selectedStore.distance}|${false}`);
        }
        // payload from checkout page should have a flag: shouldTriggerSelectStore = false
        // to avoid select store event being triggered in checkout page, which is not required
        if (typeof payload.shouldTriggerSelectStore === 'undefined' && (!isEmpty(selectedStore) || !isEmpty(storeState))) {
            yield put({ type: OrderActionTypes.GET_STORE_BY_STORE_ID_SUCCESS, selectedStore, defaultStore: true });
        }
        if (!isEmpty(storeState) && (selectedStore || storeConfig)) {
            const param = {
                type: OrderActionTypes.GET_STORE_BY_STORE_ID_SUCCESS_CHECKOUT,
                selectedStore: selectedStore || storeConfig,
                defaultStore: true,
            };
            yield put(param);
        }
        if (getStoreCallback) {
            yield call(getStoreCallback);
        }
    } catch (error) {
        yield put({ type: 'GET_STORES_GET_ERROR', error });
    }
}

function* setMyStoreSaga({ payload }) {
    try {
        if (payload) {
            const storeFrom = Cookies.load('isGeoStore') || 'false';
            const selectedStore = yield select(previousSelectedStore);
            LocalStorage.setData('defaultStore', payload, true);
            Storage.save('userStore', payload.id, true);
            Cookies.save('userStore', payload.id);
            Cookies.save('userStoreInfo', encodeURI(`${payload.id}|${payload.name}|${payload.distance}|${storeFrom}`));
            Cookies.remove('isGeoStore');

            if (User.isUserLoggedIn()) {
                let isStoreInUserList = false;
                const sendData = {
                    payload: {
                        isDefault: true,
                    },
                };

                if (selectedStore.userStores) {
                    const arr = selectedStore.userStores.filter(elm => elm.id === payload.id);
                    isStoreInUserList = !!arr.length;
                }

                if (isStoreInUserList) {
                    sendData.appendToPostData = { storeId: payload.id };
                    yield call(FactorySaga, updateStore, sendData);
                } else {
                    sendData.payload.id = payload.id;
                    yield call(FactorySaga, addStore, sendData);
                }
            }

            // Storing the data to the common store which is used across microsites.
            yield put({
                type: OrderActionTypes.GET_STORE_BY_STORE_ID_SUCCESS,
                selectedStore: payload,
            });
        }
    } catch (error) {
        yield put({ type: 'SET_MY_STORE_ERROR', error });
    }
}

export default function* watchGetStoresRequest() {
    yield takeLatest(OrderActionTypes.GET_STORE_BY_STORE_ID_REQUEST, getStoresSaga);
}

export function* watchSetMyStore() {
    yield takeLatest(StoreActionTypes.SET_MY_STORE, setMyStoreSaga);
}
