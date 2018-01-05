import { expect } from 'chai';
import * as messagesActionTypes from '../actionTypes/MessagesActionTypes';
import * as actions from './MessagesAction';

describe('MessagesAction', () => {
    const MESSAGE_TITLE_MOCK = 'MESSAGE_TITLE_MOCK';
    const MESSAGE_ID_MOCK = 'MESSAGE_ID_MOCK';
    const MESSAGE_TYPE_MOCK = 'MESSAGE_TYPE_MOCK';
    const SECTION_MOCK = 'SECTION_MOCK';

    describe(messagesActionTypes.MESSAGE_ADD, () => {
        it('should emit add message event even if params are not provided', () => {
            const action = actions.addMessage({
                section: SECTION_MOCK,
                message: { title: MESSAGE_TITLE_MOCK },
            });

            expect(action.type).to.equal(messagesActionTypes.MESSAGE_ADD);
            expect(action.payload.message.title).to.equal(MESSAGE_TITLE_MOCK);
            expect(action.payload.message.id).to.be.a('string');
            expect(action.payload.message.type).to.be.a('string');
        });

        it('should emit add message event with provided params', () => {
            const action = actions.addMessage({
                section: SECTION_MOCK,
                message: {
                    id: MESSAGE_ID_MOCK,
                    title: MESSAGE_TITLE_MOCK,
                    type: MESSAGE_TYPE_MOCK,
                },
            });

            expect(action.type).to.equal(messagesActionTypes.MESSAGE_ADD);
            expect(action.payload.message.id).to.equal(MESSAGE_ID_MOCK);
            expect(action.payload.message.title).to.equal(MESSAGE_TITLE_MOCK);
            expect(action.payload.message.type).to.equal(MESSAGE_TYPE_MOCK);
        });
    });
    describe(messagesActionTypes.MESSAGE_REMOVE, () => {
        it('should emit remove message event with id', () => {
            const action = actions.removeMessage({ section: SECTION_MOCK, id: MESSAGE_ID_MOCK });

            expect(action.type).to.equal(messagesActionTypes.MESSAGE_REMOVE);
            expect(action.payload.section).to.equal(SECTION_MOCK);
            expect(action.payload.id).to.equal(MESSAGE_ID_MOCK);
        });
    });
    describe(messagesActionTypes.MESSAGE_REMOVE_ALL, () => {
        it('should emit remove all messages event', () => {
            const action = actions.removeAllMessages({ section: SECTION_MOCK });

            expect(action.type).to.equal(messagesActionTypes.MESSAGE_REMOVE_ALL);
            expect(action.payload.section).to.equal(SECTION_MOCK);
        });
    });
});
