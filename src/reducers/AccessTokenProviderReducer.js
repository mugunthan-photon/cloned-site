import * as types from '../actionTypes/AccessTokenProviderActionTypes';

export default function AccessTokenProviderReducer(state = {}, action) {
    switch (action.type) {

        case types.SET_TOKEN_INFO: {
            return { ...state, ...action.payload };
        }

        case types.SET_SERVER_COOKIES: {
            const cookieList = state.cookieList ? state.cookieList : [];
            cookieList.push(action.payload);
            return { ...state, cookieList };
        }

        case types.CLEAR_TOKEN_INFO: {
            return {};
        }

        default:
            return state;

    }
}
