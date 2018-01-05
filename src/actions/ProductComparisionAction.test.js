import { expect } from 'chai';
import * as ProductComparisionActionTypes from '../actionTypes/ProductComparisionActionTypes';
import * as actions from './ProductComparisionAction';

describe('ProductComparisionAction ', () => {
    let addOrRemoveProductAction;
    const productDetails = {
        id: '123',
    };
    describe('addOrRemoveProductAction', () => {
        beforeEach(() => {
            addOrRemoveProductAction = actions.addOrRemoveProducts(productDetails);
        });
        it('returns correct action type', () => {
            expect(addOrRemoveProductAction.type).to.equal(ProductComparisionActionTypes.TOGGLE_PRODUCTS_TO_COMPARE);
        });
        it('returns productDetails', () => {
            expect(addOrRemoveProductAction.productDetails).to.deep.equal(productDetails);
        });
    });

    describe('resetProducts', () => {
        let resetProductsAction;
        beforeEach(() => {
            resetProductsAction = actions.resetProducts(productDetails);
        });
        it('returns correct action type', () => {
            expect(resetProductsAction.type).to.equal(ProductComparisionActionTypes.RESET_PRODUCTS_COMPARE);
        });
    });
});
