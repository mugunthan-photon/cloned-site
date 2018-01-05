import { expect } from 'chai';
import CartReducer from './CartReducer';
import * as types from '../actionTypes/CartActionTypes';

describe('Cart Count Reducer', () => {
    it('should return the initial state', () => {
        const reducer = CartReducer(undefined, {});
        expect(reducer).to.deep.equal(
             { cartCount: 0 },
        );
    });
    it('should return default state', () => {
        const reducer = CartReducer([], {
            type: types.CART_COUNT_GET_NOTPRESENT,
            count: 10,
        });
        expect(reducer.length).equal(0);
    });
    it('should return with no action count state', () => {
        const reducer = CartReducer([], {
            type: types.CART_COUNT_GET_SUCCESS,
            count: 0,
        });
        expect(reducer).to.deep.equal({});
    });
    it('should return cart count: CART_COUNT_GET_SUCCESS', () => {
        const reducer = CartReducer([], {
            type: types.CART_COUNT_GET_SUCCESS,
            count: 10,
        });
        expect(reducer).to.deep.equal(
             { cartCount: 10 },
        );
    });
});
