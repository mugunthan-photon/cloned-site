import { expect } from 'chai';
import * as ApiErrorActionTypes from '../actionTypes/ApiErrorActionTypes';
import * as actions from './ApiErrorAction';

describe('API Error Actions', () => {
    let action;
    describe('clearErrorMsgs', () => {
        it('returns correct action type', () => {
            action = actions.clearErrorMsgs('ADJUSTMENTS_POST_ERROR');
            expect(action.type).to.equal(ApiErrorActionTypes.CLEAR_ERROR_MSG);
        });
    });
});
