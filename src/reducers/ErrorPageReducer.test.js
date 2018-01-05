import { expect } from 'chai';
import sinon from 'sinon';
import ErrorPageReducer from './ErrorPageReducer';
import { SHOW_ERROR_PAGE, REMOVE_ERROR_PAGE } from '../actionTypes/ErrorPageActionTypes';

const DEFAULT_STATE_MOCK = 'DEFAULT_STATE_MOCK';
const STATUS_MOCK = 'STATUS_MOCK';
const MESSAGE_MOCK = 'MESSAGE_MOCK';

describe('ErrorPageReducer', () => {
    const action = {};

    it('Throws TypeError when no arguments are passed', () => {
        const typeErrorCheck = sinon.spy(ErrorPageReducer);
        expect(typeErrorCheck).to.throw(TypeError);
    });

    it('handles unknown type', () => {
        expect(ErrorPageReducer(DEFAULT_STATE_MOCK, action)).to.eql(DEFAULT_STATE_MOCK);
    });

    it('adds error info to state', () => {
        action.type = SHOW_ERROR_PAGE;
        action.payload = {
            status: STATUS_MOCK,
            message: MESSAGE_MOCK,
        };
        const result = ErrorPageReducer({}, action);

        expect(result.status).to.equal(STATUS_MOCK);
        expect(result.message).to.equal(MESSAGE_MOCK);
    });

    it('adds error info to state', () => {
        action.type = SHOW_ERROR_PAGE;
        action.payload = {
            message: MESSAGE_MOCK,
        };
        const result = ErrorPageReducer({}, action);

        expect(result.status).to.equal('500');
        expect(result.message).to.equal(MESSAGE_MOCK);
    });

    it('removes error info to state', () => {
        action.type = REMOVE_ERROR_PAGE;
        action.payload = null;
        const result = ErrorPageReducer({}, action);

        expect(result).to.be.null; // eslint-disable-line
    });
});
