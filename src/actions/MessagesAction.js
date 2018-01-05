import uniqueId from 'lodash/uniqueId';

import * as messagesActionTypes from '../actionTypes/MessagesActionTypes';

export const addMessage = ({ section, message: { id, title, type } }) => {
    const payload = {
        section,
        message: {
            id: id || uniqueId('message_'),
            title,
            type: type || 'information',
        },
    };
    return {
        type: messagesActionTypes.MESSAGE_ADD,
        payload,
    };
};

export const removeMessage = ({ id, section }) => ({ // section is optional
    type: messagesActionTypes.MESSAGE_REMOVE,
    payload: { id, section },
});

export const removeAllMessages = payload => ({
    type: messagesActionTypes.MESSAGE_REMOVE_ALL,
    payload,
});
