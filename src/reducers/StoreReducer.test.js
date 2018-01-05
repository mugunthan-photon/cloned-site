import { expect } from 'chai';
import StoreReducer from './StoreReducer';
import * as types from '../actionTypes/OrderActionTypes';
import { SET_USER_STORES } from '../actionTypes/SetMyDefaultStoreActionTypes';

describe('Store Reducer', () => {
    it('should return the initial state', () => {
        const reducer = StoreReducer(undefined, {});
        expect(reducer).to.deep.equal({
            storeDetails: null,
            isGeoStore: false,
            userStores: [],
        });
    });

    it('should return sesion status', () => {
        const selectedStore = {
            storeId: 1234,
        };
        const reducer = StoreReducer(undefined, {
            type: types.GET_STORE_BY_STORE_ID_SUCCESS,
            selectedStore,
        });
        expect(reducer).to.deep.equal({
            isGeoStore: false,
            storeDetails: selectedStore,
            userStores: [],
        });
    });

    it('should return store info', () => {
        const selectedStore = {
            storeId: 1234,
        };
        const reducer = StoreReducer(undefined, {
            type: types.GET_STORE_BY_STORE_ID_SUCCESS_CHECKOUT,
            selectedStore,
        });
        expect(reducer).to.deep.equal({
            isGeoStore: false,
            storeDetails: selectedStore,
            userStores: [],
        });
    });

    it('should return sesion status', () => {
        const reducer = StoreReducer(undefined, {
            type: SET_USER_STORES,
            stores: [{ id: 123 }],
        });
        expect(reducer).to.deep.equal({
            isGeoStore: false,
            storeDetails: null,
            userStores: [{ id: 123 }],
        });
    });
});
