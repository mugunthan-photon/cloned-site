import * as actionTypes from '../actionTypes/ApiErrorActionTypes';

const clearErrorById = (apiErrorMsgs, errorId) => {
    const result = apiErrorMsgs.filter(errorobj => errorobj.errorId !== errorId);
    return result;
};

function ApiErrorReducer(state = [], action) {
    switch (action.type) {
        case actionTypes.API_RESPONSE_ERROR:
            return [...state, action.payload];
        case actionTypes.CLEAR_ERROR_MSG:
            return clearErrorById(state, action.payload);
        default:
            return state;
    }
}

export default ApiErrorReducer;
