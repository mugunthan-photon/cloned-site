import * as types from '../actionTypes/AccountActionTypes';


export default function AccountReducer(state = {}, action) {
    switch (action.type) {

        case types.GET_SITE_USER_PROFILE_SUCCESS: {
            const userProfile = action.userProfileInfo;
            return { ...state, userProfile };
        }

        case types.GET_SITE_REWARDS_REQUEST_SUCCESS: {
            const rewardsProfile = action.rewardsDetails.response.data;
            return { ...state, rewardsProfile };
        }

        default:
            return state;

    }
}
