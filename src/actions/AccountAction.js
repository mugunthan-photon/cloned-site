import * as AccountActionTypes from '../actionTypes/AccountActionTypes';

const getUserDetails = () => ({
    type: AccountActionTypes.GET_SITE_USER_PROFILE,
});

const getRewardsProfile = () => ({
    type: AccountActionTypes.GET_SITE_REWARDS_REQUEST,
});

const logOut = () => ({
    type: AccountActionTypes.LOGOUT_REQUEST,
});


export default {
    getUserDetails,
    getRewardsProfile,
    logOut,
};
