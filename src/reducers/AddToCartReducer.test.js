import { expect } from 'chai';
import sinon from 'sinon';
import AddToCartReducer from './AddToCartReducer';
import * as addToCartActionTypes from '../actionTypes/AddToCartActionTypes';

describe('AddToCartReducer', () => {
    const action = {
        cartSuccess: {
            ppId: 123,
            skuId: 12345,
        },
    };
    const cartResponse = {
        isAddToCartSuccess: false,
        isUpdateCartSuccess: false,
    };

    it('Throws TypeError when no arguments are passed', () => {
        const typeErrorCheck = sinon.spy(AddToCartReducer);
        expect(typeErrorCheck).to.throw(TypeError);
    });
    it('handles unknown type', () => {
        expect(AddToCartReducer(cartResponse, action)).to.be.an('object');
    });
    it('ADDTOCART_SITE_REQUEST_SUCCESS', () => {
        action.type = addToCartActionTypes.ADDTOCART_SITE_REQUEST_SUCCESS;
        expect(AddToCartReducer(cartResponse, action)).to.be.an('object');
        expect(AddToCartReducer(cartResponse, action).isAddToCartSuccess).to.be.true;  // eslint-disable-line no-unused-expressions
        expect(AddToCartReducer(cartResponse, action).isUpdateCartSuccess).to.be.false;  // eslint-disable-line no-unused-expressions
    });
    it('ADDTOCART_SITE_REQUEST_ERROR', () => {
        action.type = addToCartActionTypes.ADDTOCART_SITE_REQUEST_ERROR;
        expect(AddToCartReducer(cartResponse, action)).to.be.an('object');
        expect(AddToCartReducer(cartResponse, action).isAddToCartSuccess).to.be.false;  // eslint-disable-line no-unused-expressions
        expect(AddToCartReducer(cartResponse, action).isUpdateCartSuccess).to.be.false;  // eslint-disable-line no-unused-expressions
    });
    it('ADDTOCART_SITE_KEEPSHOPPING_ONCLICK', () => {
        action.type = addToCartActionTypes.ADDTOCART_SITE_KEEPSHOPPING_ONCLICK;
        expect(AddToCartReducer(cartResponse, action)).to.be.an('object');
        expect(AddToCartReducer(cartResponse, action).isAddToCartSuccess).to.be.false;  // eslint-disable-line no-unused-expressions
        expect(AddToCartReducer(cartResponse, action).isUpdateCartSuccess).to.be.false;  // eslint-disable-line no-unused-expressions
    });
});
