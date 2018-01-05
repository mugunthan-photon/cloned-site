import { expect } from 'chai';
import SessionReducer from './SessionReducer';
import * as types from '../actionTypes/SessionActionTypes';

describe('Session Logout reducer', () => {
    it('should return the initial state', () => {
        const reducer = SessionReducer(undefined, {});
        expect(reducer.signedOut).to.deep.equal(false);
    });
    it('should return sesion status', () => {
        const reducer = SessionReducer([], {
            type: types.SESSION_DELETE_SUCCESS,
            sessionStatus: true,
        });
        expect(reducer).equal(true);
    });
    it('should return state on passing no available type: SESSION_DELETE_NOTPRESENT', () => {
        const reducer = SessionReducer([], {
            type: types.SESSION_DELETE_NOTPRESENT,
        });
        expect(reducer.length).equal(0);
    });
    it('should return session timedout status', () => {
        const reducer = SessionReducer([], {
            type: types.IS_SESSION_TIMED_OUT,
            payload: true,
        });
        expect(reducer.isSessionTimedOut).equal(true);
    });
});
