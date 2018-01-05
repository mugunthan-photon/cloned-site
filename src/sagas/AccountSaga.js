import { takeLatest, put, call } from 'redux-saga/effects';
import RewardsApi from 'yoda-interfaces/lib/Rewards/RewardsApi';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import TokenProvider from '../helpers/TokenProvider/TokenProvider';
import * as AccountActionTypes from '../actionTypes/AccountActionTypes';
import FactorySaga from './FactorySaga';
import Constants from '../common/Constants';

export function* getUserDetails() {
    const userProfileInfo = {};
    userProfileInfo.firstName = TokenProvider.get(Constants.DP_USER_NAME);
    userProfileInfo.accountId = TokenProvider.get(Constants.ACCOUNT_ID);
    userProfileInfo.rewardsStatus = TokenProvider.get(Constants.DP_REWARDS_STATUS);
    userProfileInfo.userState = TokenProvider.get(Constants.DP_USER_STATE);
    userProfileInfo.totalCerts = TokenProvider.get(Constants.DP_REWARDS_CERTS);
    userProfileInfo.savedItemsCount = TokenProvider.get(Constants.DP_SAVED_ITEMS_COUNT);

    if (!userProfileInfo.savedItemsCount && userProfileInfo.savedItemsCount !== '0') {
        userProfileInfo.savedItemsCount = 0;
        TokenProvider.set(Constants.DP_SAVED_ITEMS_COUNT, (userProfileInfo.savedItemsCount).toString());
    }

    yield [
        put({ type: AccountActionTypes.GET_SITE_USER_PROFILE_SUCCESS, userProfileInfo }),
    ];
}

export function* logout() {
    TokenProvider.logout();
    const userProfileInfo = {};
    userProfileInfo.firstName = LocalStorage.getData('DP_USER_NAME');
    userProfileInfo.accountId = LocalStorage.getData('ACCOUNT_ID');
    userProfileInfo.rewardsStatus = LocalStorage.getData('DP_REWARDS_STATUS');
    userProfileInfo.userState = LocalStorage.getData('DP_USER_STATE');
    yield [
        put({ type: AccountActionTypes.GET_SITE_USER_PROFILE_SUCCESS, userProfileInfo }),
    ];
}

export function* getRewardsDetails(action) {
    try {
        const rewardsDetails = yield call(FactorySaga, RewardsApi.getRewards, action);
        yield [
            put({ type: AccountActionTypes.GET_SITE_REWARDS_REQUEST_SUCCESS, rewardsDetails }),
        ];
    } catch (error) {
        yield put({
            type: AccountActionTypes.GET_SITE_REWARDS_REQUEST_ERROR,
            error,
        });
    }
}

export default function* watchAccountSaga() {
    yield takeLatest(AccountActionTypes.GET_SITE_USER_PROFILE, getUserDetails);
    yield takeLatest(AccountActionTypes.GET_SITE_REWARDS_REQUEST, getRewardsDetails);
    yield takeLatest(AccountActionTypes.LOGOUT_REQUEST, logout);
}
