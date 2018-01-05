import { expect } from 'chai';
import * as AccountActionTypes from '../actionTypes/AccountActionTypes';
import * as actions from './AccountAction';

describe('Account Actions', () => {
    let action;
    describe('getUserDetails', () => {
        it('returns getUserDetails', () => {
            action = actions.getUserDetails();
            expect(action.type).to.equal(AccountActionTypes.GET_SITE_USER_PROFILE);
        });
    });
    describe('getRewardsProfile', () => {
        it('returns getRewardsProfile', () => {
            action = actions.getRewardsProfile();
            expect(action.type).to.equal(AccountActionTypes.GET_SITE_REWARDS_REQUEST);
        });
    });
    describe('logOut', () => {
        it('returns logout', () => {
            action = actions.logOut();
            expect(action.type).to.equal(AccountActionTypes.LOGOUT_REQUEST);
        });
    });
});
