import { expect } from 'chai';
import ProductCartridgeReducer from './ProductCartridgeReducer';
import * as types from '../actionTypes/ProductCartridgeActionTypes';

describe('ProductCartridgeReducer', () => {
    it('initialstate default prop', () => {
        expect(
            ProductCartridgeReducer(undefined, []),
        ).to.deep.equal({
            productCartridgeSlots: {},
            loaders: {},
        });
    });

    it('initialstate, override default prop', () => {
        expect(
            ProductCartridgeReducer({
                productCartridgeSlots: {},
                loaders: {},
            }, []),
        ).to.deep.equal({
            productCartridgeSlots: {},
            loaders: {},
        });
    });

    it('ADD_PRODUCT_CARTRIDGE_SLOT', () => {
        expect(
            ProductCartridgeReducer([], {
                type: types.ADD_PRODUCT_CARTRIDGE_SLOT,
                productCartridgeSlots: {},
                loaders: {},
            }),
        ).to.deep.equal({ productCartridgeSlots: {} });
    });

    it('ADD_CERTONA_LOADER_TO_LIST no state.loaders[loader]', () => {
        expect(
            ProductCartridgeReducer({
                loaders: {
                    loader: { loaddata: '' },
                },
                responseData: 'data',
            }, {
                type: types.ADD_CERTONA_LOADER_TO_LIST,
                initialData: {
                    payload: {
                        loader: 'loaddata',
                        pageType: '',
                    },
                },
            }),
        ).to.deep.equal({ loaders: { loader: { loaddata: '' }, loaddata: { '': {} } }, responseData: 'data' });
    });

    it('ADD_CERTONA_LOADER_TO_LIST, falls in state.loaders[loader]', () => {
        expect(
            ProductCartridgeReducer({
                loaders: {
                    loaddata: { loaddata: '' },
                },
                responseData: 'data',
            }, {
                type: types.ADD_CERTONA_LOADER_TO_LIST,
                initialData: {
                    payload: {
                        loader: 'loaddata',
                        pageType: '',
                    },
                },
            }),
        ).to.deep.equal({ loaders: { loaddata: '', '': undefined }, responseData: 'data' });
    });

    it('Reset product cartridge reducer', () => {
        expect(
            ProductCartridgeReducer({
                productCartridgeSlots: {},
                loaders: {},
            }, {
                type: types.RESET_PRODUCT_CARTRIDGE_REDUCER,
            }),
        ).to.deep.equal({
            productCartridgeSlots: {},
            loaders: {},
        });
    });
});
