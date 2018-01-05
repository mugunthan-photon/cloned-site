import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import Constants from '../../common/Constants';

export const setValue = (key, value, setToCookie) => {
    if (typeof value === 'undefined') {
        return;
    }
    const storage = LocalStorage.setData(key, value);
    /* istanbul ignore next */
    if (!storage || setToCookie) {
        Cookies.save(key, value);
    }
};

class TokenProvider {

    static get(key) {
        const localStorageValue = LocalStorage.getData(key);
        /* istanbul ignore next */
        if (!isEmpty(localStorageValue)) {
            return localStorageValue;
        }
        return Cookies.load(key);
    }

    // TODO: remove following function once setValue method called from all places.
    static set(key, value) {
        setValue(key, value);
    }

    static logout(clearFavourites) {
        LocalStorage.removeData(Constants.ACCESS_TOKEN);
        LocalStorage.removeData(Constants.REFRESH_TOKEN);
        LocalStorage.removeData(Constants.DP_FIRST_NAME);
        LocalStorage.removeData(Constants.DP_USER_NAME);
        LocalStorage.removeData(Constants.DP_REWARDS_STATUS);
        LocalStorage.removeData(Constants.ACCOUNT_ID);
        LocalStorage.removeData(Constants.DP_VISITOR_ID);
        LocalStorage.removeData(Constants.DP_SFL_ID);
        LocalStorage.removeData(Constants.DP_REWARDS_CERTS);
        LocalStorage.removeData(Constants.DP_USER_DEFAULT_STORE);
        LocalStorage.removeData(Constants.DP_USER_TOKEN);
        Cookies.remove(Constants.DP_SFL_ID);
        Cookies.remove(Constants.DP_USER_NAME);
        Cookies.remove(Constants.ITEM_COUNT);
        Cookies.remove(Constants.REFRESH_TOKEN);
        Cookies.remove(Constants.ACCOUNT_ID);
        Cookies.remove(Constants.ACCESS_TOKEN);
        Cookies.remove(Constants.ACCESS_TOKEN, 'www.jcpenney.com');
        Cookies.remove(Constants.REFRESH_TOKEN, 'www.jcpenney.com');
        Cookies.remove(Constants.ACCOUNT_ID, 'www.jcpenney.com');
        setValue(Constants.DP_USER_STATE, '0');
        setValue(Constants.DP_USER_STATE, '0', true);

        if (clearFavourites) {
            LocalStorage.removeData(Constants.DP_SAVED_ITEMS_PAYLOAD);
            LocalStorage.removeData(Constants.DP_SAVED_ITEMS_COUNT);
            LocalStorage.removeData(Constants.DP_SAVED_ITEMS);
            LocalStorage.removeData(Constants.DP_CHECKOUT_SAVED_ITEMS);
            LocalStorage.removeData(Constants.DP_CHECKOUT_SAVED_ITEMS_PAYLOAD);
        }
    }

    static storeTokens(response, source, enableServerSideRendering) {
        let accessToken = '';
        let refreshToken = '';
        let accountId = '';
        let guestUser = false;
        let userName = response.headers.get('DP_FIRST_NAME');
        const sflId = response.headers.get('DP_SFL_ID');
        // Added this condition if response header is not returning first name then ui can retrive from response.data so that desktop esi header wont break
        if (!userName) {
            userName = response.data.firstName;
        }
        const userRewardStatus = response.headers.get('DP_REWARDS_STATUS');
        let userState = response.headers.get('DP_USER_STATE') ? response.headers.get('DP_USER_STATE') : response.userState;
        const vistorId = response.headers.get('DP_VISITOR_ID');
        const savedItemsCount = response.headers.get('DP_USER_FAVCOUNT');
        const userToken = response.headers.get('DP_USER_TOKEN');
        if (source === 'body') {
            accessToken = response.data.access_token;
            refreshToken = response.data.refresh_token;
            accountId = response.data.account_id;
            guestUser = response.isGuestUser;
            setValue(Constants.TOKEN_API_STATUS, response.data.isTemp);
            if (response.data.isTemp) {
                userState = '0';
            }
        } else {
            accessToken = response.headers.get(Constants.ACCESS_TOKEN);
            refreshToken = response.headers.get(Constants.REFRESH_TOKEN);
            const location = response.headers.get('Location');
            accountId = location ? location.split('/').pop() : '';
        }
        setValue(Constants.ACCESS_TOKEN, accessToken, enableServerSideRendering);
        setValue(Constants.REFRESH_TOKEN, refreshToken);
        setValue(Constants.ACCOUNT_ID, accountId, enableServerSideRendering);
        setValue(Constants.DP_USER_STATE, userState, enableServerSideRendering);
        setValue(Constants.DP_FIRST_NAME, userName);
        setValue(Constants.DP_USER_NAME, userName);
        setValue(Constants.DP_REWARDS_STATUS, userRewardStatus);
        setValue(Constants.DP_VISITOR_ID, vistorId);
        setValue(Constants.DP_SFL_ID, sflId);
        setValue(Constants.DP_SAVED_ITEMS_COUNT, savedItemsCount);
        setValue(Constants.GUEST_USER, guestUser);
        setValue(Constants.DP_USER_TOKEN, userToken);
        Cookies.save(Constants.DP_SFL_ID, sflId);
    }

    static storeTokenFromServer(data, enableServerSideRendering) {
        setValue(Constants.ACCESS_TOKEN, data[Constants.ACCESS_TOKEN], enableServerSideRendering);
        setValue(Constants.REFRESH_TOKEN, data[Constants.REFRESH_TOKEN]);
        setValue(Constants.ACCOUNT_ID, data[Constants.ACCOUNT_ID], enableServerSideRendering);
        const cookieList = data.cookieList || [];
        forEach(cookieList, (cookieItem) => {
            const cookieItems = cookieItem.cookie.split('~');
            forEach(cookieItems, (cookie) => {
                document.cookie = cookie;
            });
        });
    }

    /**
     * Set access token and account id to cookie if it is not set
     * @param enableServerSideRendering
     */
    static setAccessToken(enableServerSideRendering) {
        if (__SERVER__ || !enableServerSideRendering) {
            return;
        }
        const accessTokenLS = LocalStorage.getData(Constants.ACCESS_TOKEN);
        const accountIdLS = LocalStorage.getData(Constants.ACCOUNT_ID);
        /* istanbul ignore next */
        !isEmpty(accessTokenLS) && Cookies.save(Constants.ACCESS_TOKEN, accessTokenLS);
        /* istanbul ignore next */
        !isEmpty(accountIdLS) && Cookies.save(Constants.ACCOUNT_ID, accountIdLS);
    }
}

export default TokenProvider;
