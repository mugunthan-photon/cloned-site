import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
    RESET_SELECTED_STORES,
} from '../actionTypes/GalleryStoreActionTypes';
import * as actions from './GalleryStoreAction';

describe('GalleryStoreAction Actions', () => {
    it('returns correct action type', () => {
        const action = actions.resetSelectedStores();
        expect(action.type).to.equal(RESET_SELECTED_STORES);
    });
});
