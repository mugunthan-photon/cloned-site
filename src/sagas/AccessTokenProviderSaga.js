import { takeEvery, put, call, fork, take, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import AccountApi from 'yoda-interfaces/lib/Account/AccountApi';
import Constants from '../common/Constants';
import * as AccessTokenProviderActionTypes from '../actionTypes/AccessTokenProviderActionTypes';
import TokenProvider from '../helpers/TokenProvider/TokenProvider';
// import * as LoadingAction from '../actions/LoadingAction';

export const storeAccessToken = (response, enableServerSideRendering) => {
    TokenProvider.storeTokens(response, 'body', enableServerSideRendering);
};

function* refreshTokenProviderSaga(action) {
    try {
        console.log('***refreshTokenProviderSaga init***');
        const response = yield call(AccountApi.refreshToken, TokenProvider.get(Constants.REFRESH_TOKEN));
        console.log('In getTokens $$$$$$$$$$ ', response);
        if (!isEmpty(response) && response.status !== null && response.status === 200) {
            console.log('In getTokens before storeAccessToken ******** ', response);
            const context = state => state.context;
            const appContext = yield select(context);
            const featureFlags = (appContext || {}).featureFlags || {};
            TokenProvider.storeTokens(response, 'body', featureFlags.enableServerSideRendering);
            yield put({ type: 'GET_REFRESH_TOKEN_REQUEST_SUCCESS', payload: action.payload });
        }
    } catch (error) {
        console.log('***refreshTokenProviderSaga request error***');
        yield put({ type: 'GET_REFRESH_TOKEN_REQUEST_ERROR', error });
    }
}

function* accessTokenProviderSaga(action) {
    try {
        const response = yield call(AccountApi.createGuestAccount);
        console.log('In accessTokenProviderSaga &&&&&&&&&& ', response);
        console.log('In getTokens $$$$$$$$$$ ', response);
        if (!isEmpty(response) && response.status !== null && response.status === 201) {
            console.log('In getTokens before storeAccessToken ******** ', response);
            response.isGuestUser = 'true';
            const context = state => state.context;
            const appContext = yield select(context);
            const featureFlags = (appContext || {}).featureFlags || {};
            storeAccessToken(response, featureFlags.enableServerSideRendering);
            yield put(action.payload);
        } else {
            let errorInfo = Array.isArray(response.data) ? response.data[0] : response.data;
            errorInfo = errorInfo || {};
            const errorHandlerInfo = {};
            errorHandlerInfo.errorCode = isEmpty(errorInfo.errorCode) ?
                Constants.GENERIC_API_ERROR : errorInfo.errorCode;
            errorHandlerInfo.errorMessage = errorInfo.errorMessage;
            errorHandlerInfo.showRefresh = true;
            yield put({ type: Constants.SET_SERVICE_ERROR, errorHandlerInfo });
        }
    } catch (error) {
        // yield put(LoadingAction.removeLoader());
        yield put({ type: 'GET_ACCESS_TOKEN_REQUEST_ERROR', error });
    }
}

export function* watchRefreshTokenProviderRequest() {
    // Stack of action to be trigger when token is refreshed
    let actions = [];
    let waitingResponse = false;
    const {
        GET_REFRESH_TOKEN_REQUEST,
        GET_REFRESH_TOKEN_REQUEST_SUCCESS,
        GET_REFRESH_TOKEN_REQUEST_ERROR } = AccessTokenProviderActionTypes;
    while (true) {
        const action = yield take([
            GET_REFRESH_TOKEN_REQUEST,
            GET_REFRESH_TOKEN_REQUEST_SUCCESS,
            GET_REFRESH_TOKEN_REQUEST_ERROR,
        ]);
        switch (action.type) {
            case GET_REFRESH_TOKEN_REQUEST: {
                if (!waitingResponse) {
                    // Flag of refresh token already going on
                    waitingResponse = true;
                    yield fork(refreshTokenProviderSaga, action);
                    actions.push(action.payload);
                } else {
                    actions.push(action.payload);
                }
                break;
            }
            case GET_REFRESH_TOKEN_REQUEST_SUCCESS: {
                waitingResponse = false;
                const actionProm = [];
                // Dispatch Actions
                while (actions.length > 0) {
                    actionProm.push(put(actions.pop()));
                }
                // Wait actions resolve
                yield actionProm;
                break;
            }
            case GET_REFRESH_TOKEN_REQUEST_ERROR: {
                // Clean Flag and Stack.
                waitingResponse = false;
                actions = [];
                break;
            }
            default:
                break;
        }
    }
}

export default function* watchAccessTokenProviderRequest() {
    yield takeEvery(AccessTokenProviderActionTypes.GET_ACCESS_TOKEN_REQUEST, accessTokenProviderSaga);
}
