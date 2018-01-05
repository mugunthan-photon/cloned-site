import * as AccessTokenProviderActionTypes from '../actionTypes/AccessTokenProviderActionTypes';

const getAccessToken = payload => ({
    type: AccessTokenProviderActionTypes.GET_ACCESS_TOKEN_REQUEST,
    payload,
});

const getRefreshToken = payload => ({
    type: AccessTokenProviderActionTypes.GET_REFRESH_TOKEN_REQUEST,
    payload,
});

const setTokenInfo = payload => ({
    type: AccessTokenProviderActionTypes.SET_TOKEN_INFO,
    payload,
});

const setServerCookies = payload => ({
    type: AccessTokenProviderActionTypes.SET_SERVER_COOKIES,
    payload,
});

const clearTokenInfo = () => ({
    type: AccessTokenProviderActionTypes.CLEAR_TOKEN_INFO,
});

export default {
    getAccessToken,
    getRefreshToken,
    setTokenInfo,
    clearTokenInfo,
    setServerCookies,
};
