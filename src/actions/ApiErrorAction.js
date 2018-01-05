import * as actionTypes from '../actionTypes/ApiErrorActionTypes';

const clearErrorMsgs = errorApiId => ({
    type: actionTypes.CLEAR_ERROR_MSG,
    payload: errorApiId,
});

export default {
    clearErrorMsgs,
};
