import get from 'lodash/get';
import { SHOW_ERROR_PAGE, REMOVE_ERROR_PAGE } from '../actionTypes/ErrorPageActionTypes';

/**
 * Reducer to handle Critical Errors
 */

export default (state = null, action) => {
    switch (action.type) {
        case SHOW_ERROR_PAGE:
            return {
                status: `${get(action, 'payload.status') || 500}`,
                message: action.payload.message,
            };
        case REMOVE_ERROR_PAGE:
            return null;
        default:
            return state;
    }
};
