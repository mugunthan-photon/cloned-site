import { expect } from 'chai';
import ProductComparisionReducer from './ProductComparisionReducer';
import {
    TOGGLE_PRODUCTS_TO_COMPARE,
    RESET_PRODUCTS_COMPARE,
    SET_ZONE_PARAM,
    PRODUCTS_BY_ID_SUCCESS_FOR_COMPARE,
} from '../actionTypes/ProductComparisionActionTypes';

const mockCompareData = [
    {
        id: 'ppr5007213350',
        name: 'Haier 15 Cu.Ft. Bottom Mount Refrigerator',
        images: [
            {
                url: 'https://s7d9.scene7.com/is/image/JCPenney/DP0112201717234138M',
                type: 'PRIMARY',
                altText: 'Haier 15 Cu.Ft. Bottom Mount Refrigerator',
            },
        ],
        ppUrl: 'http://www.jcpenney.com/p/haier-15-cuft-bottom-mount-refrigerator/ppr5007213350?pTmplType=silver',
    },
];

describe('ProductComparisionReducer', () => {
    const productDetails = {
        ppId: 123,
    };
    const initialState = {
        products: [],
        productToDisplayError: {},
        comparePageUrl: '',
        productsZoneParam: '',
        refUrl: '',
        zoneParam: '',
    };

    const newState = Object.assign({}, initialState, {
        zoneParam: 'refridgerators',
        refUrl: '/g/womens-dresses/N-bwo3xD1nnujc',
    });

    it('initialstate', () => {
        expect(
            ProductComparisionReducer(undefined, []),
        ).to.deep.equal(initialState);
    });

    it('SET_ZONE_PARAM', () => {
        const payload = {
            zoneParam: 'refridgerators',
            refUrl: '/g/womens-dresses/N-bwo3xD1nnujc',
            productsZoneParam: 'refridgerators',
        };
        expect(
            ProductComparisionReducer(initialState, { type: SET_ZONE_PARAM, payload }),
        ).to.deep.equal(Object.assign({}, initialState, payload));
    });

    it('TOGGLE_PRODUCTS_TO_COMPARE -  Add ', () => {
        expect(
            ProductComparisionReducer(newState, { type: TOGGLE_PRODUCTS_TO_COMPARE, productDetails }),
        ).to.deep.equal({
            products: [productDetails],
            productToDisplayError: {},
            comparePageUrl: `/l/productcompare?ppId=123&ref=${encodeURIComponent('/g/womens-dresses/N-bwo3xD1nnujc')}`,
            productsZoneParam: 'refridgerators',
            refUrl: '/g/womens-dresses/N-bwo3xD1nnujc',
            zoneParam: 'refridgerators',
        });
    });

    it('TOGGLE_PRODUCTS_TO_COMPARE -  Remove ', () => {
        const initialStateWithProducts = Object.assign({}, {
            products: [productDetails],
            productToDisplayError: {},
        });
        expect(
            ProductComparisionReducer(initialStateWithProducts, { type: TOGGLE_PRODUCTS_TO_COMPARE, productDetails }),
        ).to.deep.equal({
            products: [],
            productToDisplayError: {},
            productsZoneParam: undefined,
            comparePageUrl: '/l/productcompare?ppId=&ref=undefined',
        });
    });

    it('TOGGLE_PRODUCTS_TO_COMPARE -  Exceeds max selection', () => {
        const productAC = {
            ppId: 4567,
        };
        const initialStateWithProducts = Object.assign({}, {
            products: [productDetails, productDetails, productDetails, productDetails],
            productToDisplayError: {},
        });
        expect(
            ProductComparisionReducer(initialStateWithProducts, {
                type: TOGGLE_PRODUCTS_TO_COMPARE, productDetails: productAC,
            }),
        ).to.deep.equal({
            products: [productDetails, productDetails, productDetails, productDetails],
            productToDisplayError: productAC,
            comparePageUrl: '/l/productcompare?ppId=123,123,123,123&ref=undefined',
            productsZoneParam: undefined,
        });
    });

    it('PRODUCTS_BY_ID_SUCCESS_FOR_COMPARE', () => {
        expect(
            ProductComparisionReducer(initialState, {
                type: PRODUCTS_BY_ID_SUCCESS_FOR_COMPARE,
                payload: { data: mockCompareData },
            }),
        ).to.deep.equal({
            products: [{
                altImageUrl: 'https://s7d9.scene7.com/is/image/JCPenney/DP0112201717234138M',
                imageUrl: 'https://s7d9.scene7.com/is/image/JCPenney/DP0112201717234138M',
                ppId: 'ppr5007213350',
                productUrl: 'http://www.jcpenney.com/p/haier-15-cuft-bottom-mount-refrigerator/ppr5007213350?pTmplType=silver',
                title: 'Haier 15 Cu.Ft. Bottom Mount Refrigerator',
            }],
            productToDisplayError: {},
            comparePageUrl: '/l/productcompare?ppId=ppr5007213350&ref=',
            productsZoneParam: '',
            refUrl: '',
            zoneParam: '',
        });
    });

    it('PRODUCTS_BY_ID_SUCCESS_FOR_COMPARE', () => {
        expect(
            ProductComparisionReducer(initialState, {
                type: PRODUCTS_BY_ID_SUCCESS_FOR_COMPARE,
                payload: { data: mockCompareData },
                resetProducts: true,
            }),
        ).to.deep.equal({
            products: [{
                altImageUrl: 'https://s7d9.scene7.com/is/image/JCPenney/DP0112201717234138M',
                imageUrl: 'https://s7d9.scene7.com/is/image/JCPenney/DP0112201717234138M',
                ppId: 'ppr5007213350',
                productUrl: 'http://www.jcpenney.com/p/haier-15-cuft-bottom-mount-refrigerator/ppr5007213350?pTmplType=silver',
                title: 'Haier 15 Cu.Ft. Bottom Mount Refrigerator',
            }],
            productToDisplayError: {},
            comparePageUrl: '/l/productcompare?ppId=ppr5007213350&ref=',
            productsZoneParam: '',
            refUrl: '',
            zoneParam: '',
        });
    });

    it('RESET_PRODUCTS_COMPARE', () => {
        const initialStateWithProducts = {
            products: [productDetails, productDetails, productDetails, productDetails],
            productToDisplayError: {},
        };
        expect(
            ProductComparisionReducer(initialStateWithProducts, { type: RESET_PRODUCTS_COMPARE }),
        ).to.deep.equal({
            products: [],
            productToDisplayError: {},
        });
    });
});
