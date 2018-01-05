import { expect } from 'chai';
import * as AdjustmentActionTypes from '../actionTypes/AdjustmentActionTypes';
import * as actions from './AdjustmentAction';

describe('Adjustment Actions', () => {
    let action;
    describe('getAdjustments', () => {
        it('returns correct action type', () => {
            action = actions.getAdjustments();
            expect(action.type).to.equal(AdjustmentActionTypes.ADJUSTMENTS_GET_REQUEST);
        });
    });
    describe('applyAdjustment', () => {
        it('returns correct action type', () => {
            action = actions.applyAdjustment({ code: 'FUNDEAL', serialNumber: null });
            expect(action.type).to.equal(AdjustmentActionTypes.ADJUSTMENTS_POST_REQUEST);
        });
    });
    describe('getAdjustmentDetailById', () => {
        it('returns correct action type', () => {
            action = actions.getAdjustmentDetailById();
            expect(action.type).to.equal(AdjustmentActionTypes.ADJUSTMENTS_BY_ID_GET_REQUEST);
        });
    });
    describe('removeAdjustmentById', () => {
        it('returns correct action type', () => {
            action = actions.removeAdjustmentById();
            expect(action.type).to.equal(AdjustmentActionTypes.ADJUSTMENTS_BY_ID_DELETE_REQUEST);
        });
    });
    describe('adjustmentUpdated', () => {
        it('returns correct action type', () => {
            action = actions.adjustmentUpdated(true);
            expect(action.type).to.equal(AdjustmentActionTypes.ADJUSTMENTS_UPDATED);
        });
    });
});
