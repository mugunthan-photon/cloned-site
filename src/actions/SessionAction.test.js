import { expect } from 'chai';
import * as SessionActionTypes from '../actionTypes/SessionActionTypes';
import * as actions from './SessionAction';

describe('Session Actions', () => {
    let deleteSession;
    let setSessionTimeOut;
    // describe block for getActiveMenuOnClickAction
    describe('deleteSession', () => {
        beforeEach(() => {
            deleteSession = actions.deleteSession();
        });
        it('returns correct action type', () => {
            expect(deleteSession.type).to.equal(SessionActionTypes.SESSION_DELETE_REQUEST);
        });
    });

    describe('setSessionTimeOut', () => {
        beforeEach(() => {
            setSessionTimeOut = actions.setSessionTimeOut(true);
        });
        it('returns correct action type', () => {
            expect(setSessionTimeOut.type).to.equal(SessionActionTypes.IS_SESSION_TIMED_OUT);
        });
    });
});
