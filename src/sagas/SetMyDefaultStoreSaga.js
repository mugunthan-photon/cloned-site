import { takeLatest, call, fork, put } from 'redux-saga/effects';
import { getStores } from 'yoda-interfaces/lib/Account/AccountApi';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import _get from 'lodash/get';
import TokenProvider from '../helpers/TokenProvider/TokenProvider';
import Constants from '../common/Constants';
import Storage from '../helpers/Storage/Storage';
import { SET_MY_DEFAULT_STORE,
        SET_MY_DEFAULT_STORE_ERROR,
        SET_USER_STORES } from '../actionTypes/SetMyDefaultStoreActionTypes';
import { findStoresSaga } from './FindAStorePageSaga';
import { getStoresSaga } from './StoreSaga';
import Location from '../helpers/Location/Location';
import User from '../helpers/User/User';
import FactorySaga from './FactorySaga';

function* FindSetMyDefaultStoreSaga(action) {
    try {
        let stores = [];

        // Check for default store
        const userStore = JSON.parse(Storage.load('userStore', true)) || Cookies.load('userStore');
        // If we have the store Id then fetch the store info using store Id else find a store using location.
        if (userStore) {
            yield fork(getStoresSaga, { payload: { storeId: userStore } });
        } else {
            const additionalParams = {
                miles: 15,
                setMyDefaultStore: true,
                isGeoStore: true,
            };
            const userLocation = yield call(Location.getLatLongAsPromise, additionalParams);

            if (userLocation.lat && userLocation.lng) {
                yield fork(findStoresSaga, { payload: userLocation });
            }
        }

        // If user is authenticated then fetch user stores and set it as default store in header
        // TODO: Setting user stores is not required - CHeck and remove
        if (User.isUserLoggedIn()) {
            const userDefLocalStore = TokenProvider.get(Constants.DP_USER_DEFAULT_STORE);
            if (userDefLocalStore && userDefLocalStore !== '') {
                stores = userDefLocalStore;
            } else {
                const userDefaultStores = yield call(FactorySaga, getStores, action);
                stores = _get(userDefaultStores, 'response.data.data', []);
                TokenProvider.set(Constants.DP_USER_DEFAULT_STORE, stores);
            }
        }

        if (stores.length) {
            yield put({
                type: SET_USER_STORES,
                stores,
            });
        }
    } catch (error) {
        yield put({
            type: SET_MY_DEFAULT_STORE_ERROR,
            error,
        });
    }
}


export default function* watchSetMyDefaultStore() {
    yield takeLatest(SET_MY_DEFAULT_STORE, FindSetMyDefaultStoreSaga);
}
