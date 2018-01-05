import { SHOW_ERROR_PAGE, REMOVE_ERROR_PAGE } from '../actionTypes/ErrorPageActionTypes';

export const showErrorPage = (status, message) => ({
    type: SHOW_ERROR_PAGE,
    payload: { status, message },
});

export const removeErrorPage = () => ({
    type: REMOVE_ERROR_PAGE,
});
