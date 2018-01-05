import { expect } from 'chai';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import User from './User';

describe('User: Test suite for isUserLoggedIn()', () => {
    let UserLoggedIn;

    it('isUserLoggedIn returns false if DP_USER_STATE is undefined', () => {
        Cookies.save('DP_USER_STATE', '0', 1, '');
        UserLoggedIn = User.isUserLoggedIn();
        expect(UserLoggedIn).to.be.false;
    });

    it('isUserLoggedIn returns true if  DP_USER_STATE is 1', () => {
        Cookies.save('DP_USER_STATE', '1', 1, '');
        UserLoggedIn = User.isUserLoggedIn();
        expect(UserLoggedIn).to.be.true;
        Cookies.remove('DP_USER_STATE', '');
    });
});

describe('User: Test suite for getUserId()', () => {
    let UserId;

    it('getCustomerId returns empty string for a guest user', () => {
        Cookies.remove('DP_USER_STATE', '');
        Cookies.remove('DYN_USER_ID', '');
        UserId = User.getUserId();
        expect(UserId).to.equal('');
    });

    it('getCustomerId returns customerId for a logged-in user', () => {
        Cookies.save('DP_USER_STATE', '1', 1, '');
        Cookies.save('DYN_USER_ID', 'ASzt-8I9EdqiC5W5RNgI', 1, '');
        UserId = User.getUserId();
        expect(UserId).to.equal('ASzt-8I9EdqiC5W5RNgI');
        Cookies.remove('DP_USER_STATE', '');
        Cookies.remove('DYN_USER_ID', '');
    });
});

describe('User: Test suite for getUserName()', () => {
    let UserName;

    it('getUserName returns empty string for a guest user', () => {
        Cookies.save('DP_USER_STATE', '0', 1, '');
        Cookies.remove('DP_FIRST_NAME', '', 1, '');
        UserName = User.getUserName();
        expect(UserName).to.equal('');
        Cookies.remove('DP_USER_STATE', '');
        Cookies.remove('DP_FIRST_NAME', '');
    });

    it('getUserName returns name for a logged-in user', () => {
        Cookies.save('DP_USER_STATE', '1', 1, '');
        Cookies.save('DP_FIRST_NAME', 'John', 1, '');
        UserName = User.getUserName();
        expect(UserName).to.equal('John');
        Cookies.remove('DP_USER_STATE', '');
        Cookies.remove('DP_FIRST_NAME', '');
    });
});
