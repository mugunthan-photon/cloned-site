import * as SessionActionTypes from '../actionTypes/SessionActionTypes';

const deleteSession = () => ({
    type: SessionActionTypes.SESSION_DELETE_REQUEST,
});

const setSessionTimeOut = payload => ({
    type: SessionActionTypes.IS_SESSION_TIMED_OUT,
    payload,
});

export default {
    deleteSession,
    setSessionTimeOut,
};
