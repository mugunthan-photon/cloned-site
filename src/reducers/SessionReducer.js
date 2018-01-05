import * as types from '../actionTypes/SessionActionTypes';

export default function SessionReducer(state = { signedOut: false, isSessionTimedOut: false }, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case types.SESSION_DELETE_SUCCESS:
            return action.sessionStatus;
        case types.IS_SESSION_TIMED_OUT:
            newState.isSessionTimedOut = action.payload;
            return newState;
        default:
            return state;
    }
}
