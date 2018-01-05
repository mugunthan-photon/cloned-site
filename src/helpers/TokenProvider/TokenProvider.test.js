import { after, before, describe, it } from 'mocha';
import { expect } from 'chai';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import TokenProvider from './TokenProvider';

require('../../../test/util');

describe('TokenProvider', () => {
    describe('should be able to get and set string data for', function test() {
        this.timeout(0);
        const sampleData = 10;
        const tokenResponseBody = {
            data: {
                access_token: 'accesstoken',
                refresh_token: 'refreshtoken',
                accountId: 'accountid',
                firstName: 'firstname',
                isTemp: true,
            },
            headers: {
                Location: 'test/accountid',
                get (key) {
                    return this[key];
                },
            },
        };

        beforeEach(() => {
            TokenProvider.set('sampleData', sampleData);
            TokenProvider.storeTokens(tokenResponseBody, 'body');
            TokenProvider.storeTokens(tokenResponseBody, 'header');
            tokenResponseBody.headers.Location = null;
            TokenProvider.storeTokens(tokenResponseBody, 'header');
        });

        it('TokenProvider::GetData()', () => {
            expect(TokenProvider.get('sampleData')).to.an.undefined;
        });

        it('TokenProvider:: get access_token from response body', () => {
            expect(TokenProvider.get('access_token')).to.an.undefined;
        });
        it('TokenProvider::Logout()', () => {
            TokenProvider.logout();
            expect(TokenProvider.get('access_token')).to.an.undefined;
        });
    });

    describe('test woth passing first name in  header', function test() {
        this.timeout(0);
        const sampleData = 10;
        const tokenResponseBody = {
            data: {
                access_token: 'accesstoken',
                refresh_token: 'refreshtoken',
                accountId: 'accountid',
                firstName: 'firstname',
            },
            headers: {
                Location: 'test/accountid',
                DP_FIRST_NAME: 'firatName',
                DP_USER_STATE: '1',
                get (key) {
                    return this[key];
                },
            },
        };

        beforeEach(() => {
            TokenProvider.set('sampleData', sampleData);
            TokenProvider.storeTokens(tokenResponseBody, 'body');
            TokenProvider.storeTokens(tokenResponseBody, 'header');
            tokenResponseBody.headers.Location = null;
            TokenProvider.storeTokens(tokenResponseBody, 'header');
            TokenProvider.storeTokenFromServer(tokenResponseBody);
            const serverTokenInfo = {
                access_token: 'abc',
                cookieList: [{ cookie: 'abc' }],
            };
            TokenProvider.storeTokenFromServer(serverTokenInfo);
        });

        it('TokenProvider::GetData()', () => {
            expect(TokenProvider.get('sampleData')).to.an.undefined;
        });

        it('TokenProvider:: get access_token from response body', () => {
            expect(TokenProvider.get('access_token')).to.an.undefined;
        });
        it('TokenProvider::Logout()', () => {
            TokenProvider.logout();
            expect(TokenProvider.get('access_token')).to.an.undefined;
        });
    });

    describe('should fail when TokenProvider is not available', () => {
        const tokenProviderRef = global.window.localStorage;
        const sampleData = 10;

        before(() => {
            global.window.localStorage = undefined;
            global.localStorage = undefined;
        });

        after(() => {
            global.window.localStorage = tokenProviderRef;
            global.localStorage = tokenProviderRef;
        });

        it('TokenProvider::SetData()', () => {
            expect(() => {
                TokenProvider.set('sampleData', sampleData);
            });
        });

        it('TokenProvider::GetData()', () => {
            expect(() => {
                TokenProvider.get('sampleData', sampleData);
            });
        });
        it('TokenProvider::Logout()', () => {
            expect(() => {
                TokenProvider.logout();
            });
        });
    });

    describe('setAccessToken and account id if it is not set in cookie', () => {
        it('flag check', () => {
            TokenProvider.setAccessToken(false);
            expect(TokenProvider.get('ACCESS_TOKEN')).to.an.undefined;
        });

        it('set access token if it is not set', () => {
            TokenProvider.setAccessToken(true);
            expect(Cookies.load('ACCESS_TOKEN')).to.an.undefined;
        });
    });
});
