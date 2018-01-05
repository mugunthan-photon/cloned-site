import { expect } from 'chai';
import AppliedAdjustmentsReducer from './AppliedAdjustmentsReducer';
import * as types from '../actionTypes/AdjustmentActionTypes';

describe('AppliedAdjustmentsReducer', () => {
    it('should return the initial default state', () => {
        const reducer = AppliedAdjustmentsReducer(undefined, {});
        expect(reducer).to.deep.equals([]);
    });
    it('default', () => {
        const reducer = AppliedAdjustmentsReducer(undefined, {});
        expect(reducer).to.deep.equals([]);
    });
    it('should return new state', () => {
        const reducer = AppliedAdjustmentsReducer([], {
            type: types.ADJUSTMENTS_GET_SUCCESS,
            adjustmentResponse: {},
        });
        expect(reducer).to.deep.equal(undefined);
    });
    it('should return new state', () => {
        const reducer = AppliedAdjustmentsReducer([], {
            type: types.ADJUSTMENTS_GET_ERROR,
            adjustmentResponse: {},
        });
        expect(reducer).to.deep.equal([]);
    });
});
