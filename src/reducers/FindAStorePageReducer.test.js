import { expect } from 'chai';
import FindAStorePageReducer from './FindAStorePageReducer';
import { FIND_STORES_PAGE_SUCCESS,
        FIND_MORE_STORES_PAGE_SUCCESS,
        FIND_STORES_BY_SERVICE,
        STORES_BY_ID_SUCCESS,
        SET_SELECTED_SERVICES,
        SET_ZIP_CODE,
        SHOW_STORE_LOADER,
        HIDE_STORE_LOADER,
        STORES_ON_LOAD,
        FIND_STORES_PAGE_INVALID_INPUT } from '../actionTypes/FindAStorePageActionTypes';


describe('FindAStorePageReducer testing', () => {
    const initialState = {
        storeSelectedServices: [],
        count: 0,
        miles: 15,
        showLoader: false,
        invokeStoresOnLoad: false,
        invalidInput: false,
    };
    const storeInfo = {
        stores: [{ id: 1234 }, { id: 44444 }],
    };
    it('should return the initial state', () => {
        const reducer = FindAStorePageReducer(undefined, {});
        expect(reducer).to.deep.equal(initialState);
    });

    it('FIND_STORES_PAGE_SUCCESS', () => {
        const reducer = FindAStorePageReducer(initialState, {
            type: FIND_STORES_PAGE_SUCCESS,
            storeInfo,
        });
        const result = Object.assign({}, storeInfo, initialState);

        expect(reducer).to.deep.equal(result);
    });

    it('FIND_MORE_STORES_PAGE_SUCCESS action', () => {
        const initialStateWithStores = {
            storeSelectedServices: [],
            count: 0,
            miles: 15,
            stores: storeInfo.stores,
            invalidInput: false,
        };
        const moreStores = [{ id: 1234 }, { id: 44444 }];
        const totalStores = storeInfo.stores.concat(moreStores);
        const reducer = FindAStorePageReducer(initialStateWithStores, {
            type: FIND_MORE_STORES_PAGE_SUCCESS,
            payload: {
                nextPageLink: 'http:PageLink',
                stores: moreStores,
            },
        });
        const result = Object.assign({}, initialStateWithStores, {
            stores: totalStores,
            nextPageLink: 'http:PageLink',
        });
        expect(reducer).to.deep.equal(result);
    });

    it('FIND_STORES_BY_SERVICE action', () => {
        const reducer = FindAStorePageReducer(initialState, {
            type: FIND_STORES_BY_SERVICE,
            payload: {
                nextPageLink: 'http:PageLink',
                stores: storeInfo.stores,
                count: 10,
            },
        });
        const result = Object.assign({}, initialState, {
            stores: storeInfo.stores,
            nextPageLink: 'http:PageLink',
            count: 10,
        });
        expect(reducer).to.deep.equal(result);
    });

    it('FIND_STORES_PAGE_INVALID_INPUT action', () => {
        const reducer = FindAStorePageReducer(initialState, {
            type: FIND_STORES_PAGE_INVALID_INPUT,
        });
        const result = Object.assign({}, initialState, {
            invalidInput: true,
        });
        expect(reducer).to.deep.equal(result);
    });

    it('SET_SELECTED_SERVICES action', () => {
        const storeService = ['appliances', 'sephora'];
        const reducer = FindAStorePageReducer(initialState, {
            type: SET_SELECTED_SERVICES,
            storeService,
        });
        const result = Object.assign({}, initialState, {
            storeSelectedServices: storeService,
        });
        expect(reducer).to.deep.equal(result);
    });

    it('STORES_BY_ID_SUCCESS action', () => {
        const reducer = FindAStorePageReducer(initialState, {
            type: STORES_BY_ID_SUCCESS,
            payload: { stores: storeInfo.stores, count: storeInfo.stores.length },
        });
        const result = Object.assign({}, initialState, {
            stores: storeInfo.stores, count: storeInfo.stores.length,
        });
        expect(reducer).to.deep.equal(result);
    });

    it('SHOW_STORE_LOADER action', () => {
        const reducer = FindAStorePageReducer(initialState, {
            type: SHOW_STORE_LOADER,
        });
        const result = Object.assign({}, initialState, {
            showLoader: true,
        });
        expect(reducer).to.deep.equal(result);
    });

    it('HIDE_STORE_LOADER action', () => {
        const reducer = FindAStorePageReducer(initialState, {
            type: HIDE_STORE_LOADER,
        });
        const result = Object.assign({}, initialState, {
            showLoader: false,
        });
        expect(reducer).to.deep.equal(result);
    });

    it('SET_ZIP_CODE action', () => {
        const reducer = FindAStorePageReducer(initialState, {
            type: SET_ZIP_CODE,
            zipCode: 12345,
        });
        const result = Object.assign({}, initialState, {
            zipCode: 12345,
        });
        expect(reducer).to.deep.equal(result);
    });

    it('STORES_ON_LOAD action', () => {
        const reducer = FindAStorePageReducer(initialState, {
            type: STORES_ON_LOAD,
        });
        const result = Object.assign({}, initialState, {
            invokeStoresOnLoad: true,
        });
        expect(reducer).to.deep.equal(result);
    });
});
