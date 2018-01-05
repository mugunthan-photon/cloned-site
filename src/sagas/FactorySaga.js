import { call, put, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import forEach from 'lodash/forEach';
import OrderApi from 'yoda-interfaces/lib/Order/OrderApi';
import AccountApi from 'yoda-interfaces/lib/Account/AccountApi';
import TokenProvider from '../helpers/TokenProvider/TokenProvider';
import sessionActions from '../actions/SessionAction';
import { setTokenInfo, setServerCookies } from '../actions/AccessTokenProviderAction';
import Constants from '../common/Constants';
import Utils from '../helpers/Utils/Utils';

export function* setServerCookieFromResponse (response) {
    if (__SERVER__ && response && response.headers) {
        const cookie = response.headers.get('X-Set-Cookie');
        if (cookie) {
            yield put(setServerCookies({ cookie }));
        }
    }
}

function* getFilterCookies(cookies) {
    const context = state => state.context;
    const appContext = yield select(context);
    const disabledBlackListedCookies = ((appContext || {}).featureFlags || {}).disabledBlackListedCookies;
    if (disabledBlackListedCookies || isEmpty(cookies)) {
        return cookies;
    }
    const blackListedCookies = ((appContext || {}).preferences || {}).blackListedCookies || [];
    const filterCookie = Object.assign({}, cookies);
    forEach(blackListedCookies, (blackListedCookie) => {
        const isBlackListedCookie = Object.prototype.hasOwnProperty.call(filterCookie, blackListedCookie.key);
        if (isBlackListedCookie) {
            delete filterCookie[blackListedCookie.key];
        }
    });
    return filterCookie;
}


function* storeTokenInfo(tokenInfo) {
    const context = state => state.context;
    const appContext = yield select(context);
    const enableServerSideRendering = ((appContext || {}).featureFlags || {}).enableServerSideRendering;
    TokenProvider.storeTokenFromServer(tokenInfo, enableServerSideRendering);
}

function* getElbUrlHost() {
    const context = state => state.context;
    const appContext = yield select(context);
    const elbPreferences = {};
    if (__SERVER__ && appContext.featureFlags.useElbUrlForApi) {
        const environmentName = (appContext.preferences || {}).environment;
        const environmentInfo = ((appContext.preferences || {}).environments || {})[environmentName];
        elbPreferences.elbUrl = (((environmentInfo || {}).apiHosts || {}).server || {}).elb;
    }
    return elbPreferences;
}

function* doCreateAccout(logger, cookies, accountId) {
    const createAccountResponse = yield call(AccountApi.createGuestAccount, accountId);
    Utils.doPostSSRLogs(logger, {
        requestInfo: 'GET ACCOUNT API',
        response: createAccountResponse,
    }, cookies);
    const tokenInfo = {};
    if ((createAccountResponse || {}).status === 201) {
        createAccountResponse.data = createAccountResponse.data || {};
        tokenInfo[Constants.ACCESS_TOKEN] = createAccountResponse.data.access_token;
        tokenInfo[Constants.ACCOUNT_ID] = createAccountResponse.data.account_id;
        tokenInfo[Constants.REFRESH_TOKEN] = createAccountResponse.data.refresh_token;
    }
    __SERVER__ ? yield put(setTokenInfo(tokenInfo)) : yield call(storeTokenInfo, tokenInfo);
    return tokenInfo;
}

function* doSoftLogout(isCheckout, logger, apiNotRequired, cookies) {
    let accountId = null;
    if (!apiNotRequired) {
        accountId = TokenProvider.get(Constants.ACCOUNT_ID);
        Utils.doPostSSRLogs(logger, {
            requestInfo: 'SOFT LOGOUT API',
        }, cookies);
        TokenProvider.logout();
        const context = state => state.context;
        const appContext = yield select(context);
        const enableAtgDeleteSessionCall = ((appContext || {}).featureFlags || {}).enableAtgDeleteSessionCall;
        if (enableAtgDeleteSessionCall) {
            yield call(OrderApi.softLogout);
        }
    } else {
        Utils.doPostSSRLogs(logger, {
            requestInfo: 'SOFT LOGOUT API - Without access token or account id',
        }, cookies);
    }
    let tokenInfo = {};
    if (isCheckout) {
        yield put(sessionActions.setSessionTimeOut(true));
    } else {
        tokenInfo = yield call(doCreateAccout, logger, cookies, accountId);
    }
    return tokenInfo;
}

function* doUpdateAccount(refreshToken, isCheckout, logger, cookies) {
    const accountId = TokenProvider.get(Constants.ACCOUNT_ID);
    const refreshTokenResponse = yield call(AccountApi.refreshToken, refreshToken, accountId);
    Utils.doPostSSRLogs(logger, {
        requestInfo: 'GET REFRESH TOKEN API',
        response: refreshTokenResponse,
    }, cookies);
    let tokenInfo = {};
    if ((refreshTokenResponse || {}).status === 200) {
        refreshTokenResponse.data = refreshTokenResponse.data || {};
        tokenInfo[Constants.ACCESS_TOKEN] = refreshTokenResponse.data.access_token;
        tokenInfo[Constants.ACCOUNT_ID] = refreshTokenResponse.data.account_id;
        tokenInfo[Constants.REFRESH_TOKEN] = refreshTokenResponse.data.refresh_token;
        __SERVER__ ? yield put(setTokenInfo(tokenInfo)) : yield call(storeTokenInfo, tokenInfo);
    } else if (!__SERVER__) {
        tokenInfo = yield call(doSoftLogout, isCheckout, logger, false, cookies);
    }
    return tokenInfo;
}

export default function* FactorySaga(api, action, logger) {
    const result = {};
    try {
        let isCheckout = !__SERVER__ && includes(window.location.pathname, Constants.CHECKOUT_PAGE_URL);
        if (__SERVER__) {
            const context = state => state.context;
            const appContext = yield select(context);
            isCheckout = includes(appContext.requestUrl, Constants.CHECKOUT_PAGE_URL);
        }
        const postData = {};
        let tokenInfo = {};
        let cookies = {};
        tokenInfo[Constants.ACCESS_TOKEN] = TokenProvider.get(Constants.ACCESS_TOKEN);
        tokenInfo[Constants.ACCOUNT_ID] = TokenProvider.get(Constants.ACCOUNT_ID);
        tokenInfo[Constants.REFRESH_TOKEN] = TokenProvider.get(Constants.REFRESH_TOKEN);
        if (__SERVER__) {
            cookies = (action.headers || {}).cookies || {};
            const accessToken = cookies[Constants.ACCESS_TOKEN];
            const accountId = cookies[Constants.ACCOUNT_ID];
            if (accessToken && accountId) {
                tokenInfo[Constants.ACCOUNT_ID] = accountId;
                tokenInfo[Constants.ACCESS_TOKEN] = accessToken;
                postData.requestHeaderCookie = yield call(getFilterCookies, cookies);
                const elbPreferences = yield call(getElbUrlHost);
                postData.elbApiHost = elbPreferences.elbUrl;
            }
        } else if (isEmpty(tokenInfo[Constants.ACCESS_TOKEN]) || isEmpty(tokenInfo[Constants.ACCOUNT_ID])) {
            tokenInfo = yield call(doSoftLogout, isCheckout, logger, true, cookies);
        }
        if (isEmpty(tokenInfo) || isEmpty(tokenInfo[Constants.ACCESS_TOKEN]) ||
                isEmpty(tokenInfo[Constants.ACCOUNT_ID])) {
            result.isSuccess = false;
            return result;
        }
        postData.payload = action.payload ? action.payload : {};
        postData.accountId = tokenInfo[Constants.ACCOUNT_ID];
        postData.accessToken = tokenInfo[Constants.ACCESS_TOKEN];
        const errorHandlerInfo = {};
        const errorHandler = action.payload ? action.payload.errorHandler : null;
        if (errorHandler) {
            delete postData.payload.errorHandler;
            errorHandlerInfo.errorComponent = errorHandler.errorComponent;
            errorHandlerInfo.errorComponentIndex = errorHandler.index;
            errorHandlerInfo.context = errorHandler.context;
        }
        const response = yield call(api, postData);
        Utils.doPostSSRLogs(logger, {
            requestInfo: action.apiName || 'Unhandled - API',
            response,
        }, cookies);
        yield call(setServerCookieFromResponse, response);
        result.response = response;

        /**
         * HOT-FIX : Fallback to client side when server side api call failed
         */
        if (__SERVER__ && (response.status !== 200 && response.status !== 201 && response.status !== 204)) {
            result.isSuccess = false;
            return result;
        }

        switch (response.status) {
            case 200:
            case 201:
            case 204: {
                result.isSuccess = true;
                yield put({ type: Constants.CLEAR_SERVICE_ERROR });
                break;
            }
            case 401: {
                result.isSuccess = false;
                const errorInfo = Array.isArray(response.data) ? response.data[0] : response.data;
                if (errorInfo && errorInfo.errorCode === 'SRV_REFRESH_TOKEN_EXPIRED' && !action.refreshRetry) {
                    Utils.doPostSSRLogs(logger, { requestInfo: 'Refresh token expired' });
                    tokenInfo = yield call(doSoftLogout, isCheckout, logger, false, cookies);
                    if (!isEmpty(tokenInfo)) {
                        action.refreshRetry = true;
                        return yield call(FactorySaga, api, action);
                    }
                } else if (!action.refreshRetry) {
                    tokenInfo =
                        yield call(doUpdateAccount, tokenInfo[Constants.REFRESH_TOKEN], isCheckout, logger, cookies);
                    if (!isEmpty(tokenInfo)) {
                        action.refreshRetry = true;
                        if (__SERVER__) {
                            action.headers = action.headers ? action.headers : {};
                            action.headers.cookies = action.headers.cookies ? action.headers.cookies : {};
                            action.headers.cookies = Object.assign(action.headers.cookies, tokenInfo);
                        }
                        return yield call(FactorySaga, api, action);
                    }
                }

                break;
            }
            case 400: {
                result.isSuccess = false;
                const errorInfo = Array.isArray(response.data) ? response.data[0] : response.data;
                if (errorInfo && errorInfo.errorCode === Constants.SRV_ITEM_NOT_FOUND) {
                    Utils.doPostSSRLogs(logger, { requestInfo: 'Empty Cart' });
                    if (isCheckout) {
                        window.location.href = Constants.CART_PAGE_URL;
                    }
                    yield put({ type: Constants.CLEAR_SERVICE_ERROR });
                    return result;
                }
                break;
            }
            case 403: {
                result.isSuccess = false;
                const errorInfo = Array.isArray(response.data) ? response.data[0] : response.data;
                if ((errorInfo.errorCode === 'SRV_ACCOUNT_ID_MISMATCH' || errorInfo.errorCode === 'SRV_SESSION_INVALID')
                    && !action.sessionExpiredRetry) {
                    Utils.doPostSSRLogs(logger, { requestInfo: 'Session expired in order' });
                    tokenInfo = yield call(doSoftLogout, isCheckout, logger, false, cookies);
                    if (!isEmpty(tokenInfo)) {
                        action.sessionExpiredRetry = true;
                        if (__SERVER__) {
                            action.headers = action.headers ? action.headers : {};
                            action.headers.cookies = action.headers.cookies ? action.headers.cookies : {};
                            action.headers.cookies = Object.assign(action.headers.cookies, tokenInfo);
                        }
                        return yield call(FactorySaga, api, action);
                    }
                    return result;
                }
                break;
            }
            case 404: {
                result.isSuccess = false;
                const errorInfo = Array.isArray(response.data) ? response.data[0] : response.data;
                if (errorInfo && (errorInfo.errorCode === 'SRV_REFRESH_TOKEN_NOT_FOUND' || errorInfo.errorCode === 'SRV_ACCOUNT_NOTFOUND') && !action.retry) {
                    Utils.doPostSSRLogs(logger, { requestInfo: 'Refresh token not found' });
                    tokenInfo = yield call(doSoftLogout, isCheckout, logger, false, cookies);
                    if (!isEmpty(tokenInfo)) {
                        action.retry = true;
                        return yield call(FactorySaga, api, action);
                    }
                } else if (action.apiName === 'GET_CART_API' && !action.retry && errorInfo &&
                    errorInfo.errorCode === Constants.SRV_PRODUCT_NOTFOUND) {
                    const initiateCheckoutAction = {
                        payload: {
                            xCommand: 'initiate-checkout',
                            isVendorHeaderRequired: true,
                        },
                    };
                    initiateCheckoutAction.retry = true;
                    const initiateCheckoutResult =
                        yield call(FactorySaga, OrderApi.initiateCheckout, initiateCheckoutAction);
                    Utils.doPostSSRLogs(logger, {
                        requestInfo: 'initite checkout API',
                        response: initiateCheckoutResult.response,
                    });
                    if (initiateCheckoutResult.isSuccess) {
                        action.retry = true;
                        return yield call(FactorySaga, api, action);
                    }
                } else if (errorInfo && (errorInfo.errorCode === Constants.SRV_COMMERCE_ITEMNOTFOUND
                        || errorInfo.errorCode === Constants.SRV_PROMOTION_NOTFOUND)) {
                    action.showRefresh = true;
                }
                break;
            }
            case 412: {
                result.isSuccess = false;
                const errorInfo = Array.isArray(response.data) ? response.data[0] : response.data;
                // Defensive code to prevent making the session time out in a loop if the API
                // keeps sending 412 response on subsequent calls
                if (!action.initiateRetry && errorInfo.errorCode === Constants.INITIATE_CHECKOUT_AGAIN) {
                    const accountId = TokenProvider.get(Constants.ACCOUNT_ID);
                    TokenProvider.logout();
                    action.initiateRetry = true;
                    if (isCheckout) {
                        yield put(sessionActions.setSessionTimeOut(true));
                    } else {
                        tokenInfo = yield call(doCreateAccout, logger, cookies, accountId);
                        if (__SERVER__) {
                            action.headers = action.headers ? action.headers : {};
                            action.headers.cookies = action.headers.cookies ? action.headers.cookies : {};
                            action.headers.cookies = Object.assign(action.headers.cookies, tokenInfo);
                        }
                        return yield call(FactorySaga, api, action);
                    }
                }
                break;
            }
            default: {
                result.isSuccess = false;
            }
        }

        if (result.isSuccess === false) {
            let errorInfo = Array.isArray(result.response.data) ? result.response.data[0] : result.response.data;
            errorInfo = errorInfo || {};
            errorHandlerInfo.errorCode = isEmpty(errorInfo.errorCode) ?
                Constants.GENERIC_API_ERROR : errorInfo.errorCode;
            errorHandlerInfo.errorMessage = errorInfo.errorMessage;
            errorHandlerInfo.showRefresh = action.showRefresh;
            yield put({ type: Constants.SET_SERVICE_ERROR, errorHandlerInfo });
        }
        return result;
    } catch (error) {
        result.isSuccess = false;
        return result;
    }
}
