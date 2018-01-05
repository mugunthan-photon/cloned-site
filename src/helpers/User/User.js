import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import TokenProvider from '../TokenProvider/TokenProvider';
import Constants from '../../common/Constants';

export default class User {
    /*
     *  This function will only return true or false based on user logged in status.
     *  It won't return a value of cookie 'DP_USER_STATE'
     *  USAGE : User.isUserLoggedIn()
     * */
    static isUserLoggedIn() {
        const userState = TokenProvider.get(Constants.DP_USER_STATE);
        return (userState && userState === '1') || false;
    }
    /*
     *  This function will return userId or empty string based on user logged in status.
     *  USAGE: User.getUserId()
     */
    static getUserId() {
        const userId = User.isUserLoggedIn() ? Cookies.load('DYN_USER_ID') : '';
        return userId;
    }
    /*
     *  This function will return the user's first name or empty string based on user logged in status.
     *  USAGE: User.getUserName()
     */
    static getUserName() {
        const userName = User.isUserLoggedIn() ? TokenProvider.get(Constants.DP_FIRST_NAME) : '';
        return userName;
    }
}
