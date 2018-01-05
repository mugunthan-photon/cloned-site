import { expect } from 'chai';
import ShowPreviewZoneReducer from './ShowPreviewZoneReducer';
import * as types from '../actionTypes/ShowPreviewZoneActionTypes';

describe('Show Preview Zone Reducer', () => {
    it('should return the initial default state', () => {
        const reducer = ShowPreviewZoneReducer(undefined, {});
        expect(reducer).to.equals(false);
    });
    it('True State', () => {
        const reducer = ShowPreviewZoneReducer(true, { type: types.SHOW_PREVIEW_ZONE });
        expect(reducer).to.equals(true);
    });
    it('False State', () => {
        const reducer = ShowPreviewZoneReducer(false, { type: types.HIDE_PREVIEW_ZONE });
        expect(reducer).to.equals(false);
    });
});
