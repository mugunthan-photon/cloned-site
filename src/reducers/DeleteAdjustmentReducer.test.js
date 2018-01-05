import { expect } from 'chai';
import DeleteAdjustmentReducer from './DeleteAdjustmentReducer';
import * as types from '../actionTypes/AdjustmentActionTypes';

describe('DeleteAdjustmentReducer', () => {
    it('should return the initial default state', () => {
        const reducer = DeleteAdjustmentReducer(undefined, {});
        expect(reducer).to.deep.equals([]);
    });
    it('should return new state', () => {
        const reducer = DeleteAdjustmentReducer([], {
            type: types.ADJUSTMENTS_BY_ID_DELETE_SUCCESS,
            adjustmentResponse: {},
        });
        expect(reducer).to.deep.equal(null);
    });
    it('should return new state', () => {
        const reducer = DeleteAdjustmentReducer([], {
            type: types.ADJUSTMENTS_BY_ID_DELETE_ERROR,
            adjustmentResponse: {},
        });
        expect(reducer).to.deep.equal([]);
    });
});
