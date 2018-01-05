import { expect } from 'chai';
import sinon from 'sinon';
import * as actionTypes from '../actionTypes/ApiErrorActionTypes';
import ApiErrorReducer from './ApiErrorReducer';

describe('ApiErrorReducer', () => {
    const action = {};
    let errors;

    it('Throws TypeError when no arguments are passed', () => {
        const typeErrorCheck = sinon.spy(ApiErrorReducer);
        expect(typeErrorCheck).to.throw(TypeError);
    });

    it('handles unknown type', () => {
        expect(ApiErrorReducer([], action)).to.be.empty; // eslint-disable-line no-unused-expressions
    });

    it('API_RESPONSE_ERROR', () => {
        action.type = actionTypes.API_RESPONSE_ERROR;
        action.payload = [];

        errors = ApiErrorReducer([], action);
        expect(errors).to.be.an('array');
        expect(errors.length).to.be.equal(1);
        expect(errors[0].length).to.be.equal(0);
    });

    it('CLEAR_ERROR_MSG', () => {
        action.type = actionTypes.CLEAR_ERROR_MSG;
        action.payload = 'ADJUSTMENTS_POST_ERROR';

        errors = ApiErrorReducer([{ errorId: 'ADJUSTMENTS_POST_ERROR' }, { errorId: 'ADJUSTMENTS_DELETE_ERROR' }], action);
        expect(errors).to.be.an('array');
        expect(errors.length).to.be.equal(1);
        expect(errors[0].errorId).to.be.equal('ADJUSTMENTS_DELETE_ERROR');
    });
});
