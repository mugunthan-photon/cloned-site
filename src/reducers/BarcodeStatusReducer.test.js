import { expect } from 'chai';
import ShowBarcodeStatusReducer from './BarcodeStatusReducer';
import * as types from '../actionTypes/BarcodeStatusActionType';

describe('ShowBarcodeStatusReducer', () => {
    it('should return the initial default state', () => {
        const reducer = ShowBarcodeStatusReducer(undefined, {});
        expect(reducer).to.deep.equals(false);
    });
    it('default', () => {
        const reducer = ShowBarcodeStatusReducer(undefined, {});
        expect(reducer).to.deep.equals(false);
    });
    it('should return true if payload is true', () => {
        const reducer = ShowBarcodeStatusReducer([], {
            type: types.SHOW_BARCODE_REQUEST,
            payload: true,
        });
        expect(reducer).to.deep.equal(true);
    });

    it('should return false if payload is false', () => {
        const reducer = ShowBarcodeStatusReducer([], {
            type: types.SHOW_BARCODE_REQUEST,
            payload: false,
        });
        expect(reducer).to.deep.equal(false);
    });
});
