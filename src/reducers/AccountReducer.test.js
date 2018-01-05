import { expect } from 'chai';
import AccountReducer from './AccountReducer';
import * as types from '../actionTypes/AccountActionTypes';

describe('AccountReducer', () => {
    it('should return the initial default state', () => {
        const reducer = AccountReducer(undefined, {});
        expect(reducer).to.deep.equals({});
    });

    // it('should return GET_USER_PROFILE', () => {
    //     const reducer = AccountReducer({}, {
    //         type: types.GET_USER_PROFILE,
    //     });
    //     expect(reducer).to.deep.equal(undefined);
    // });

    it('should return GET_SITE_USER_PROFILE_SUCCESS', () => {
        const reducer = AccountReducer({}, {
            type: types.GET_SITE_USER_PROFILE_SUCCESS,
            userProfileInfo: { firstName: 'account' },
        });
        expect(reducer).to.deep.equal({ userProfile: { firstName: 'account' } });
    });

    it('should return GET_SITE_REWARDS_REQUEST_SUCCESS', () => {
        const reducer = AccountReducer({}, {
            type: types.GET_SITE_REWARDS_REQUEST_SUCCESS,
            rewardsDetails: { response: { data: 'account' } },
        });
        expect(reducer).to.deep.equal({ rewardsProfile: 'account' });
    });
});
