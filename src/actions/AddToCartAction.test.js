import { expect } from 'chai';
import * as addToCartActionTypes from '../actionTypes/AddToCartActionTypes';
import * as actions from './AddToCartAction';


describe('AddToCartAction', () => {
    describe('ADDTOCART_POST_REQUEST', () => {
        let AddToCartAction;
        const productDetail = {
            items: [{ id: '10401780018' }],
        };
        const analyticsData = {
            items: [{ id: '10401780018' }],
        };

        it('returns correct action type when no argument is passed', () => {
            AddToCartAction = actions.addItemToCart();
            expect(AddToCartAction.type).to.equal(addToCartActionTypes.ADDTOCART_SITE_REQUEST);
            expect(AddToCartAction.productDetail).to.be.an('undefined');
        });
        it('returns correct action type and payload', () => {
            AddToCartAction = actions.addItemToCart(productDetail, analyticsData);
            expect(AddToCartAction.type).to.equal(addToCartActionTypes.ADDTOCART_SITE_REQUEST);
            expect(AddToCartAction.productDetail).to.be.an('undefined');
        });
    });

    describe('ADDTOCART_KEEPSHOPPING_ONCLICK', () => {
        let AddToCartAction;
        it('returns correct action type when no argument is passed', () => {
            AddToCartAction = actions.closeCartModal();
            expect(AddToCartAction.type).to.equal(addToCartActionTypes.ADDTOCART_SITE_KEEPSHOPPING_ONCLICK);
            expect(AddToCartAction.productDetail).to.be.an('undefined');
        });
    });
});
