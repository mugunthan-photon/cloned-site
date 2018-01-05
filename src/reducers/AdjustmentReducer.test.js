import { expect } from 'chai';
import AdjustmentReducer from './AdjustmentReducer';
import * as types from '../actionTypes/AdjustmentActionTypes';

describe('AdjustmentReducer', () => {
    it('should return the initial default state', () => {
        const reducer = AdjustmentReducer(undefined, {});
        expect(reducer).to.deep.equals([]);
    });
    it('default', () => {
        const reducer = AdjustmentReducer(undefined, {});
        expect(reducer).to.deep.equals([]);
    });

    it('should return new state', () => {
        const reducer = AdjustmentReducer([], {
            type: types.ADJUSTMENTS_POST_SUCCESS,
            adjustmentResponse: {},
        });
        expect(reducer).to.deep.equal({});
    });
    it('should return new state', () => {
        const reducer = AdjustmentReducer([], {
            type: types.ADJUSTMENTS_POST_ERROR,
            adjustmentResponse: {},
        });
        expect(reducer).to.deep.equal({});
    });
    it('should return new state', () => {
        const reducer = AdjustmentReducer([], {
            type: types.ADJUSTMENTS_POST_SERIAL,
            adjustmentResponse: {},
        });
        expect(reducer).to.deep.equal({});
    });
});
