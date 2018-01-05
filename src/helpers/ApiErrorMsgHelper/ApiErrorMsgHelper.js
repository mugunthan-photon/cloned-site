import * as actionTypes from '../../actionTypes/ApiErrorActionTypes';
import * as Constants from '../../common/Constants';

const API_GENERIC_ERROR = {
    errorCode: 'SRV_GENERIC_ERROR',
    errorMessage: Constants.GENERIC_API_ERROR_MESSAGE,
};

export default class ApiErrorMsgHelper {
    static addApiResponseErrorToStore(errorId, errorObj) {
        let payload;
        if (errorObj.data && errorObj.data.length > 0) {
            payload = {
                errorId,
                errorType: 'error',
                errorCode: errorObj.data[0].errorCode,
            };
            const errorMessageObject = Constants.couponErrorMessages[payload.errorCode];
            payload.errorMessage = errorMessageObject || errorObj.data[0].errorMessage;
        } else {
            payload = {
                errorId,
                errorType: 'error',
                errorCode: API_GENERIC_ERROR.errorCode,
                errorMessage: API_GENERIC_ERROR.errorMessage,
            };
        }
        return {
            type: actionTypes.API_RESPONSE_ERROR,
            payload,
        };
    }

    static removeErrorMsgFromStore(errorApiId) {
        return {
            type: actionTypes.CLEAR_ERROR_MSG,
            payload: errorApiId,
        };
    }
}
