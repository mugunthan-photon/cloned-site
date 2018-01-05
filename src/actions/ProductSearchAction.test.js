import { expect } from 'chai';
import * as productSearchActionTypes from '../actionTypes/ProductSearchActionTypes';
import * as actions from './ProductSearchAction';

describe('RODUCTSEARCHDETAIL_GET_REQUEST Actions', () => {
    let productGetDetail;
    let resetProductGetDetail;
    // describe block for getActiveMenuOnClickAction
    describe('GetDetail', () => {
        beforeEach(() => {
            productGetDetail = actions.getProductSearchDetailAction('women');
            resetProductGetDetail = actions.resetProductSearchResults([]);
            resetProductGetDetail = actions.resetProductSearchResults();
        });
        it('returns correct action type', () => {
            expect(productGetDetail.type).to.equal(productSearchActionTypes.PRODUCTSEARCHDETAIL_GET_REQUEST);
            expect(resetProductGetDetail.type).to.equal(productSearchActionTypes.RESET_PRODUCTSEARCH_RESULTS);
        });
    });
});
