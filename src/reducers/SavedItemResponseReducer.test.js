import { expect } from 'chai';
import SavedItemResponseReducer from './SavedItemResponseReducer';
import * as types from '../actionTypes/SavedItemActionTypes';

describe('SavedItem Response Reducer', () => {
    it('SAVEDITEMS_ADD_ITEM_SFL - should return data if available', () => {
        const reducer = SavedItemResponseReducer([], {
            type: types.SAVEDITEMS_ADD_ITEM_SFL,
            obj: {},
        });
        expect(reducer).deep.equals([{}]);
    });

    it('SAVEDITEMS_REMOVE_ITEM_SFL - should return data if available', () => {
        const reducer = SavedItemResponseReducer([], {
            type: types.SAVEDITEMS_REMOVE_ITEM_SFL,
            obj: {},
        });
        expect(reducer).deep.equals([{}]);
    });

    it('SAVEDITEMS_RESET_STATUS - should return data if available', () => {
        const reducer = SavedItemResponseReducer([{ ppId: 'p1', action: { ppId: 'p1' } }], {
            type: types.SAVEDITEMS_RESET_STATUS,
            obj: {},
        });
        expect(reducer).deep.equals([{ ppId: 'p1', action: { ppId: 'p1' } }]);
    });

    it('SAVEDITEMS_RESET_STATUS - should return data if available', () => {
        const reducer = SavedItemResponseReducer([{ ppId: 'p1', action: { ppId: 'p2' } }], {
            type: types.SAVEDITEMS_RESET_STATUS,
            obj: {},
        });
        expect(reducer).deep.equals([{ ppId: 'p1', action: { ppId: 'p2' } }]);
    });

    it('SAVEDITEMS_RESET_STATUS - wrong action type', () => {
        const reducer = SavedItemResponseReducer([], {
            type: 'wrong action',
        });
        expect(reducer).deep.equals([]);
    });

    it('SAVEDITEMS_RESET_STATUS - no action type', () => {
        const reducer = SavedItemResponseReducer(undefined, {
            type: undefined,
        });
        expect(reducer).deep.equals([]);
    });
});
