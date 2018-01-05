import { expect } from 'chai';
import {
    getAccessToken,
    getRefreshToken,
    setTokenInfo,
    clearTokenInfo,
    setServerCookies,
} from './AccessTokenProviderAction';
import * as AccessTokenProviderActionTypes from '../actionTypes/AccessTokenProviderActionTypes';

describe('AccessTokenProviderAction Actions', () => {
    let action;
    describe('getAccessToken', () => {
        beforeEach(() => {
            action = getAccessToken();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(AccessTokenProviderActionTypes.GET_ACCESS_TOKEN_REQUEST);
        });
        it('returns no payload', () => {
            expect(action.payload).to.be.an('undefined');
        });
    });
    describe('getRefreshToken', () => {
        beforeEach(() => {
            action = getRefreshToken();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(AccessTokenProviderActionTypes.GET_REFRESH_TOKEN_REQUEST);
        });
        it('returns no payload', () => {
            expect(action.payload).to.be.an('undefined');
        });
    });

    describe('setTokenInfo', () => {
        beforeEach(() => {
            action = setTokenInfo();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(AccessTokenProviderActionTypes.SET_TOKEN_INFO);
        });
    });

    describe('setServerCookies', () => {
        beforeEach(() => {
            action = setServerCookies();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(AccessTokenProviderActionTypes.SET_SERVER_COOKIES);
        });
    });

    describe('clearTokenInfo', () => {
        beforeEach(() => {
            action = clearTokenInfo();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(AccessTokenProviderActionTypes.CLEAR_TOKEN_INFO);
        });
    });

    describe('setServerCookies', () => {
        beforeEach(() => {
            action = setServerCookies();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(AccessTokenProviderActionTypes.SET_SERVER_COOKIES);
        });
    });
});
