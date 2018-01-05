import { expect } from 'chai';
import AccessTokenProviderReducer from './AccessTokenProviderReducer';
import * as types from '../actionTypes/AccessTokenProviderActionTypes';

describe('AccessTokenProviderReducer', () => {
    it('should return the initial default state', () => {
        const reducer = AccessTokenProviderReducer(undefined, {});
        expect(reducer).to.deep.equals({});
    });

    it('should return SET_TOKEN_INFO', () => {
        const reducer = AccessTokenProviderReducer({}, {
            type: types.SET_TOKEN_INFO,
            payload: { Access_Token: 'abc' },
        });
        expect(reducer).to.deep.equal({ Access_Token: 'abc' });
    });

    it('should return SET_TOKEN_INFO', () => {
        const reducer = AccessTokenProviderReducer({}, {
            type: types.SET_SERVER_COOKIES,
            payload: { cookie: 'abc' },
        });
        expect(reducer).to.deep.equal({ cookieList: [{ cookie: 'abc' }] });
    });

    it('should return CLEAR_TOKEN_INFO', () => {
        const reducer = AccessTokenProviderReducer({}, {
            type: types.CLEAR_TOKEN_INFO,
        });
        expect(reducer).to.deep.equal({});
    });
});
