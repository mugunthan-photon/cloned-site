import { expect } from 'chai';
import * as CartActionTypes from '../actionTypes/CartActionTypes';
import * as actions from './CartAction';

describe('Cart Actions', () => {
    let action;
    // describe block for getMarketingContentAction
    describe('getMarketingContentAction', () => {
        beforeEach(() => {
            action = actions.getCartCountAction();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(CartActionTypes.CART_COUNT_GET_REQUEST);
        });
        it('returns no payload', () => {
            expect(action.payload).to.be.an('undefined');
        });
    });
});
