import findIndex from 'lodash/findIndex';

import * as MessagesActionTypes from '../actionTypes/MessagesActionTypes';

function MessagesReducer(state = {}, action) {
    switch (action.type) {
        case MessagesActionTypes.MESSAGE_ADD: {
            const sectionArr = state[action.payload.section] || [];
            const messageIndex = findIndex(
                state[action.payload.section],
                { id: action.payload.message.id },
            );
            let result;
            if (messageIndex !== -1) {
                // remove that message from section
                result = {
                    ...state,
                    [action.payload.section]: [
                        ...sectionArr.slice(0, messageIndex),
                        ...sectionArr.slice(messageIndex + 1),
                    ],
                };
                // and push it again to have proper ordering
                result[action.payload.section].push(action.payload.message);
            } else {
                result = {
                    ...state,
                    [action.payload.section]: [
                        ...sectionArr,
                        action.payload.message,
                    ],
                };
            }
            return result;
        }
        case MessagesActionTypes.MESSAGE_REMOVE: {
            let section = action.payload.section;
            let messageIndex;
            if (!section) {
                const sections = Object.keys(state);
                for (let i = 0; i < sections.length; i++) {  // eslint-disable-line
                    messageIndex = findIndex(
                        state[sections[i]],
                        { id: action.payload.id },
                    );
                    if (messageIndex !== -1) {
                        section = sections[i];
                        break;
                    }
                }
            } else {
                messageIndex = findIndex(
                    state[section],
                    { id: action.payload.id },
                );
            }
            const sectionArr = state[section] || [];
            let result = state;
            if (messageIndex !== -1) {
                result = {
                    ...state,
                    [section]: [
                        ...sectionArr.slice(0, messageIndex),
                        ...sectionArr.slice(messageIndex + 1),
                    ],
                };
            }
            return result;
        }
        case MessagesActionTypes.MESSAGE_REMOVE_ALL: {
            return {
                ...state,
                [action.payload.section]: [],
            };
        }
        default: {
            return state;
        }
    }
}

export default MessagesReducer;
