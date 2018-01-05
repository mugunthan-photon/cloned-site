import { takeLatest, put, call } from 'redux-saga/effects';
import OrderApi from 'yoda-interfaces/lib/Order/OrderApi';
import VendorApi from 'yoda-interfaces/lib/Vendor/VendorApi';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';

function* getStoresSaga(action) {
    const payload = action.payload;
    let latLong = null;
    let tempStores = null;
    let stores = { data: { stores: [] } };

    try {
        //  Check if location object exists or else hit google api and getLatLong.
        if (payload.location) {
            latLong = action.payload.location;
        } else {
            latLong = yield call(VendorApi.getLatLong, { address: payload.address });
        }

        if (latLong.lat && latLong.lng) {
            tempStores = yield [
                put({ type: OrderActionTypes.GET_LAT_LONG_GET_SUCCESS, latLong }),
                call(OrderApi.getStores,
                    { ...payload, latitude: latLong.lat, longitude: latLong.lng, address: undefined },
                ),
            ];
        }

        if (tempStores === null) {
            yield [
                put({ type: 'GET_STORES_GET_ERROR', stores }),
            ];
        } else {
            stores = tempStores[1].data;
            if (payload.patchPayload && payload.patchPayload === true) {
                stores.patchPayload = true;
            }

            yield [
                put({ type: OrderActionTypes.GET_STORES_GET_SUCCESS, stores }),
            ];
        }
    } catch (error) {
        yield put({ type: 'GET_STORES_GET_ERROR', error });
    }
}

export default function* watchGetStoresRequest() {
    yield takeLatest(OrderActionTypes.GET_STORES_GET_REQUEST, getStoresSaga);
}
