import { expect } from 'chai';
import ProductSearchDetailReducer from './ProductSearchDetailReducer';
import * as types from '../actionTypes/ProductSearchActionTypes';

describe('Product Search Detail Reducer', () => {
    it('should return the initial state', () => {
        const reducer = ProductSearchDetailReducer(undefined, {});
        expect(reducer.length).equal(0);
    });
    it('should return Product Search results', () => {
        const reducer = ProductSearchDetailReducer([], {
            type: types.PRODUCTSEARCHDETAIL_GET_SUCCESS,
            productSearchDetailResult: {
                query: 'women',
                count: 10,
                redirectUrl:
                [
                    {
                        channel: 'tablet',
                        url: 'https://m.jcpenney.com/tablet/g/women/N-bwo3x?redirectTerm=Women',
                    },
                    {
                        channel: 'mobile',
                        url: 'https://m.jcpenney.com/mobile/g/women/N-bwo3x?redirectTerm=Women',
                    },
                    {
                        channel: 'online',
                        url: 'https://m.jcpenney.com/dotcom/g/women/N-bwo3x?redirectTerm=Women',
                    },
                ],
            },
        });
        expect(reducer).to.deep.equal(
            {
                query: 'women',
                count: 10,
                redirectUrl:
                [
                    {
                        channel: 'tablet',
                        url: 'https://m.jcpenney.com/tablet/g/women/N-bwo3x?redirectTerm=Women',
                    },
                    {
                        channel: 'mobile',
                        url: 'https://m.jcpenney.com/mobile/g/women/N-bwo3x?redirectTerm=Women',
                    },
                    {
                        channel: 'online',
                        url: 'https://m.jcpenney.com/dotcom/g/women/N-bwo3x?redirectTerm=Women',
                    },
                ],
            },
       );
    });

    it('should return state on passing no available type: PRODUCTSEARCH_GET_NOPRESENT', () => {
        const reducer = ProductSearchDetailReducer([], {
            type: types.PRODUCTSEARCH_GET_NOPRESENT,
        });
        expect(reducer.length).equal(0);
    });
});
