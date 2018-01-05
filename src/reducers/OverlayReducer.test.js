import { expect } from 'chai';
import OverlayReducer from './OverlayReducer';
import * as types from '../actionTypes/OverlayActionTypes';

describe('Overlay Reducer', () => {
    it('should return the initial default state', () => {
        const reducer = OverlayReducer(undefined, {});
        expect(reducer).to.equals(false);
    });
    it('True State', () => {
        const reducer = OverlayReducer(true, { type: types.OVERLAY_SHOW });
        expect(reducer).to.equals(true);
    });
    it('False State', () => {
        const reducer = OverlayReducer(false, { type: types.OVERLAY_REMOVE });
        expect(reducer).to.equals(false);
    });
});
