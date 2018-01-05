import { expect } from 'chai';
import sinon from 'sinon';
import MessagesReducer from './MessagesReducer';
import * as messagesActionTypes from '../actionTypes/MessagesActionTypes';

const DEFAULT_STATE_MOCK = {};
const SECTION_MOCK = 'SECTION_MOCK';
const SECTION_MOCK_2 = 'SECTION_MOCK_2';
const MESSAGE_MOCK_ID = 'MESSAGE_MOCK_ID';
const MESSAGE_MOCK_ID_2 = 'MESSAGE_MOCK_ID_2';
const MESSAGE_MOCK = {
    id: MESSAGE_MOCK_ID,
    title: 'MESSAGE_MOCK_TITLE',
};
const MESSAGE_MOCK_2 = {
    id: MESSAGE_MOCK_ID_2,
    title: 'MESSAGE_MOCK_TITLE',
};

describe('MessagesReducer', () => {
    const action = {};

    it('Throws TypeError when no arguments are passed', () => {
        const typeErrorCheck = sinon.spy(MessagesReducer);
        expect(typeErrorCheck).to.throw(TypeError);
    });

    it('handles unknown type', () => {
        expect(MessagesReducer(DEFAULT_STATE_MOCK, action)).to.eql(DEFAULT_STATE_MOCK);
    });

    it('adds page message to state', () => {
        action.type = messagesActionTypes.MESSAGE_ADD;
        const payloadMock = {
            section: SECTION_MOCK,
            message: MESSAGE_MOCK,
        };
        action.payload = payloadMock;
        const result = MessagesReducer({}, action);

        expect(result[SECTION_MOCK][0]).to.equal(MESSAGE_MOCK);
    });

    it('changes ordering of messages in case there is an the same message exist', () => {
        action.type = messagesActionTypes.MESSAGE_ADD;
        const payloadMock = {
            section: SECTION_MOCK,
            message: MESSAGE_MOCK,
        };
        action.payload = payloadMock;
        const result = MessagesReducer({
            [SECTION_MOCK]: [MESSAGE_MOCK, MESSAGE_MOCK_2],
        }, action);

        expect(result[SECTION_MOCK][result[SECTION_MOCK].length - 1]).to.equal(MESSAGE_MOCK);
    });

    it('removes page message from state by id', () => {
        action.type = messagesActionTypes.MESSAGE_REMOVE;
        const payloadMock = {
            section: SECTION_MOCK,
            id: MESSAGE_MOCK_ID,
        };
        action.payload = payloadMock;
        const result = MessagesReducer({
            [SECTION_MOCK]: [MESSAGE_MOCK],
        }, action);

        expect(result[SECTION_MOCK]).to.have.length(0);
    });

    it('removes page message from state by id even if section is not provided', () => {
        action.type = messagesActionTypes.MESSAGE_REMOVE;
        const payloadMock = {
            id: MESSAGE_MOCK_ID,
        };
        action.payload = payloadMock;
        const result = MessagesReducer({
            [SECTION_MOCK_2]: [MESSAGE_MOCK_2],
            [SECTION_MOCK]: [MESSAGE_MOCK],
        }, action);

        expect(result[SECTION_MOCK]).to.have.length(0);
    });

    it('does not remove message in case message is not found', () => {
        action.type = messagesActionTypes.MESSAGE_REMOVE;
        const stateMock = {
            [SECTION_MOCK]: [],
        };
        const payloadMock = {
            section: SECTION_MOCK,
            id: MESSAGE_MOCK_ID,
        };
        action.payload = payloadMock;
        const result = MessagesReducer(stateMock, action);

        expect(result).to.equal(stateMock);
        expect(result[SECTION_MOCK]).to.have.lengthOf(0);
    });

    it('removes all page messages', () => {
        action.type = messagesActionTypes.MESSAGE_REMOVE_ALL;
        const result = MessagesReducer({
            [SECTION_MOCK]: [MESSAGE_MOCK, MESSAGE_MOCK_2],
        }, action);

        expect(result[SECTION_MOCK]).to.have.length(0);
    });
});
