import { expect } from 'chai';
import UpdatedAdjustmentReducer from './UpdatedAdjustmentReducer';
import * as types from '../actionTypes/AdjustmentActionTypes';

describe('UpdatedAdjustmentReducer', () => {
    it('should return the initial default state', () => {
        const reducer = UpdatedAdjustmentReducer(undefined, {});
        expect(reducer).to.deep.equals(false);
    });
    it('default', () => {
        const reducer = UpdatedAdjustmentReducer(undefined, {});
        expect(reducer).to.deep.equals(false);
    });

    it('should return new state', () => {
        const reducer = UpdatedAdjustmentReducer(false, {
            type: types.ADJUSTMENTS_UPDATED,
            payload: { result: true },
        });
        expect(reducer).to.deep.equal({ result: true });
    });
});
