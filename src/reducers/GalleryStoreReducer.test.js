import { expect } from 'chai';
import GalleryStoreReducer from './GalleryStoreReducer';
import {
    TOGGLE_STORE_TO_FILTER,
    RESET_SELECTED_STORES,
    SET_STORES_TO_FILTER,
} from '../actionTypes/GalleryStoreActionTypes';
import { GET_STORE_BY_STORE_ID_SUCCESS } from '../actionTypes/OrderActionTypes';
import { FIND_STORES_PAGE_SUCCESS,
         FIND_MORE_STORES_PAGE_SUCCESS } from '../actionTypes/FindAStorePageActionTypes';

describe('GalleryStoreReducer', () => {
    const selectedStore = { id: 1234 };
    const initialState = {
        selectedStores: [selectedStore],
        headerStore: null,
    };
    it('initialstate default prop', () => {
        expect(
            GalleryStoreReducer(undefined, []),
        ).to.deep.equal({
            selectedStores: [],
            headerStore: null,
            storesList: [],
        });
    });

    it('GET_STORE_BY_STORE_ID_SUCCESS', () => {
        expect(
            GalleryStoreReducer(undefined, {
                type: GET_STORE_BY_STORE_ID_SUCCESS,
                selectedStore,
            }),
        ).to.deep.equal({
            selectedStores: [],
            headerStore: selectedStore,
            storesList: [],
        });
    });

    it('GET_STORE_BY_STORE_ID_SUCCESS - With geoStore and defaultStore', () => {
        expect(
            GalleryStoreReducer(undefined, {
                type: GET_STORE_BY_STORE_ID_SUCCESS,
                selectedStore,
                isGeoStore: true,
                defaultStore: true,
            }),
        ).to.deep.equal({
            selectedStores: [],
            headerStore: selectedStore,
            storesList: [],
        });
    });

    it('GET_STORE_BY_STORE_ID_SUCCESS - Without defaultStore', () => {
        expect(
            GalleryStoreReducer(undefined, {
                type: GET_STORE_BY_STORE_ID_SUCCESS,
                selectedStore,
                isGeoStore: false,
                defaultStore: true,
            }),
        ).to.deep.equal({
            selectedStores: [selectedStore],
            headerStore: selectedStore,
            storesList: [],
        });
    });

    it('TOGGLE_STORE_TO_FILTER', () => {
        expect(
            GalleryStoreReducer(initialState, {
                type: TOGGLE_STORE_TO_FILTER,
                payload: selectedStore,
            }),
        ).to.deep.equal({
            selectedStores: [],
            headerStore: null,
        });
    });

    it('RESET_SELECTED_STORES', () => {
        expect(
            GalleryStoreReducer(undefined, {
                type: RESET_SELECTED_STORES,
            }),
        ).to.deep.equal({
            selectedStores: [],
            headerStore: null,
            storesList: [],
        });
    });

    it('SET_STORES_TO_FILTER', () => {
        expect(
            GalleryStoreReducer(undefined, {
                type: SET_STORES_TO_FILTER,
                payload: [selectedStore],
            }),
        ).to.deep.equal({
            headerStore: null,
            selectedStores: [
                {
                    id: 1234,
                },
            ],
            storesList: [
                {
                    id: 1234,
                },
            ],
        });
    });

    it('FIND_STORES_PAGE_SUCCESS', () => {
        expect(
            GalleryStoreReducer(undefined, {
                type: FIND_STORES_PAGE_SUCCESS,
                storeInfo: { stores: [selectedStore] },
            }),
        ).to.deep.equal({
            headerStore: null,
            selectedStores: [],
            storesList: [
                {
                    id: 1234,
                },
            ],
        });
    });

    it('FIND_MORE_STORES_PAGE_SUCCESS', () => {
        expect(
            GalleryStoreReducer(undefined, {
                type: FIND_MORE_STORES_PAGE_SUCCESS,
                payload: { stores: [selectedStore] },
            }),
        ).to.deep.equal({
            headerStore: null,
            selectedStores: [],
            storesList: [
                {
                    id: 1234,
                },
            ],
        });
    });
});
