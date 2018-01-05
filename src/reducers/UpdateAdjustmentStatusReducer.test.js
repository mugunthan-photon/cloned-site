import { expect } from 'chai';
import UpdateAdjustmentStatusReducer from './UpdateAdjustmentStatusReducer';
import * as types from '../actionTypes/AdjustmentActionTypes';

describe('UpdatedAdjustmentReducer', () => {
    it('should return the initial default state', () => {
        const reducer = UpdateAdjustmentStatusReducer(undefined, {});
        expect(reducer).to.deep.equals({});
    });
    it('default', () => {
        const reducer = UpdateAdjustmentStatusReducer(undefined, {});
        expect(reducer).to.deep.equals({});
    });

    it('should return new state', () => {
        const reducer = UpdateAdjustmentStatusReducer(false, {
            type: types.ADJUSTMENT_EXPIRED,
            payload: true,
        });
        expect(reducer).to.deep.equal(true);
    });
});
