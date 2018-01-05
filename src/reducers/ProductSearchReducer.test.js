import { expect } from 'chai';
import ProductSearchReducer from './ProductSearchReducer';
import * as types from '../actionTypes/ProductSearchActionTypes';

describe('Product Search Reducer', () => {
    it('should return the initial state', () => {
        const reducer = ProductSearchReducer(undefined, {});
        expect(reducer.length).equal(0);
    });
    it('should return Product Search results', () => {
        const reducer = ProductSearchReducer([], {
            type: types.PRODUCTSEARCH_GET_SUCCESS,
            productSearchResults: { suggestions: [{ term: 'wash cloths' }, { term: 'home expressions wash cloths' }, { term: 'burp cloths' }, { term: 'dish cloths' }] },
        });
        expect(reducer).to.deep.equal(
            { suggestions: [{ term: 'wash cloths' }, { term: 'home expressions wash cloths' }, { term: 'burp cloths' }, { term: 'dish cloths' }] },
        );
    });
    it('should return state on passing no available type: PRODUCTSEARCH_GET_NOPRESENT', () => {
        const reducer = ProductSearchReducer([], {
            type: types.PRODUCTSEARCH_GET_NOPRESENT,
        });
        expect(reducer.length).equal(0);
    });
    it('should return state on passing no available type: RESET_PRODUCTSEARCH_RESULTS', () => {
        const value = [];
        const reducer = ProductSearchReducer([], {
            type: types.RESET_PRODUCTSEARCH_RESULTS,
            value,
        });
        expect(reducer.length).equal(0);
    });
});
