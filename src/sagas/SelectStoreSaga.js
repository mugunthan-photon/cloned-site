import { takeLatest, put, call, select } from 'redux-saga/effects';
import find from 'lodash/find';
import CartApi from 'yoda-interfaces/lib/Cart/CartApi';
import * as AnalyticsActionTypes from '../actionTypes/AnalyticsActionTypes';
import Constants from '../common/Constants';
import FactorySaga from './FactorySaga';
import * as storeActions from '../actions/OrderAction';
import * as actionTypes from '../actionTypes/FindStoresActionTypes';

export const findStoresDetails = state => state.findStoresDetails;

function* selectStoreSaga(action) {
    try {
        const updateAction = {};
        updateAction.payload = action.params.payload;

        const result = yield call(FactorySaga, CartApi.updateStore, updateAction);
        const response = result.response;
        const storeDetails = yield select(findStoresDetails);
        const store = find(storeDetails.stores, { id: updateAction.payload.id });
        const selectActionCallBack = action.params.selectActionCallback;

        yield [
            put({ type: actionTypes.PUT_SELECTED_STORE_SUCCESS, response }),
            // DA => Trigger 'selectStore' when use successfully change store for BOPIS item
            put({
                type: AnalyticsActionTypes.UPDATE_ANALYTICS_CLICK_EVENT,
                payload: Constants.analytics.SELECT_STORE_SUCCESS,
            }),
            put(storeActions.getStoreByStoreId({ storeId: store.id, getStoreCallback: selectActionCallBack })),
        ];
    } catch (error) {
        yield put(actionTypes.PUT_SELECTED_STORE_ERROR, error);
    }
}

export default function* watchSelectStore() {
    yield takeLatest(actionTypes.PUT_SELECTED_STORE_REQUEST, selectStoreSaga);
}
