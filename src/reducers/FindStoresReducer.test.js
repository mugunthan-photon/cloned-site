import { expect } from 'chai';
import FindStoresReducer from './FindStoresReducer';
import * as types from '../actionTypes/FindStoresActionTypes';

describe('FindStores Reducer', () => {
    it('should return the initial state', () => {
        const reducer = FindStoresReducer(undefined, {});
        expect(reducer).to.deep.equal({});
    });
    it('should return loading state', () => {
        const reducer = FindStoresReducer({ isSlidePanelOpen: true }, {
            type: types.FIND_STORES_REQUEST_ACCOUNT,
        });
        expect(reducer).to.deep.equal({
            isSlidePanelOpen: true,
            isLoading: true,
        });
    });
    it('should return the store details', () => {
        const reducer = FindStoresReducer({ isSlidePanelOpen: true }, {
            type: types.FIND_STORES_SUCCESS,
            payload: {
                showAvailable: true,
                zipCode: 12345,
                miles: 10,
                count: 5,
                stores: [1, 2],
                link: '<https://test>; rel="next"',
                isGeoLocationUsed: false,
            },
        });
        expect(reducer).to.deep.equal({
            showAvailable: true,
            isSlidePanelOpen: true,
            zipCode: 12345,
            miles: 10,
            count: 5,
            stores: [1, 2],
            nextPageLink: 'https://test',
            isGeoLocationUsed: false,
        });
    });
    it('should return the store details for ship to store', () => {
        const reducer = FindStoresReducer({ isSlidePanelOpen: true }, {
            type: types.FIND_STORES_SUCCESS,
            payload: {
                showAvailable: true,
                zipCode: 12345,
                miles: 10,
                count: 5,
                stores: [1, 2],
                link: null,
                nextPageLink: 'https://test',
                isGeoLocationUsed: false,
            },
        });
        expect(reducer).to.deep.equal({
            showAvailable: true,
            isSlidePanelOpen: true,
            zipCode: 12345,
            miles: 10,
            count: 5,
            stores: [1, 2],
            nextPageLink: 'https://test',
            isGeoLocationUsed: false,
        });
    });
    it('should return loading state', () => {
        const reducer = FindStoresReducer({ isSlidePanelOpen: true }, {
            type: types.FIND_STORES_ERROR,
        });
        expect(reducer).to.deep.equal({
            isSlidePanelOpen: true,
            isLoading: false,
        });
    });
    it('should add stores to the state', () => {
        const reducer = FindStoresReducer({ stores: [] }, {
            type: types.FIND_MORE_STORES_SUCCESS,
            payload: {
                stores: [1, 2],
                link: '<https://test>; rel="next"',
            },
        });
        expect(reducer).to.deep.equal({
            stores: [1, 2],
            nextPageLink: 'https://test',
        });
    });
    it('should set nextPageLink to undefined if no more page are there', () => {
        const reducer = FindStoresReducer({ stores: [] }, {
            type: types.FIND_MORE_STORES_SUCCESS,
            payload: {
                stores: [1, 2],
                link: null,
            },
        });
        expect(reducer).to.deep.equal({
            stores: [1, 2],
            nextPageLink: undefined,
        });
    });
    it('should set nextPageLink for ship to store', () => {
        const reducer = FindStoresReducer({ stores: [] }, {
            type: types.FIND_MORE_STORES_SUCCESS,
            payload: {
                stores: [1, 2],
                nextPageLink: 'https://test',
            },
        });
        expect(reducer).to.deep.equal({
            stores: [1, 2],
            nextPageLink: 'https://test',
        });
    });
    it('should set the isSlidePanelOpen as true', () => {
        const reducer = FindStoresReducer({}, {
            type: types.OPEN_FIND_STORES_SLIDE_PANEL,
        });
        expect(reducer).to.deep.equal({ isSlidePanelOpen: true });
    });
    it('should set the isSlidePanelOpen as false', () => {
        const reducer = FindStoresReducer({}, {
            type: types.CLOSE_FIND_STORES_SLIDE_PANEL,
        });
        expect(reducer).to.deep.equal({ isSlidePanelOpen: false });
    });
    it('should set the showAvailable filter based on value passed', () => {
        const reducer = FindStoresReducer({}, {
            type: types.SET_AVAILABLE_FILTER,
            payload: true,
        });
        expect(reducer).to.deep.equal({ showAvailable: true });
    });
});
