import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TokenProvider from '../../helpers/TokenProvider/TokenProvider';
import config from './Header.config';
import HeaderConnected, { YodaHeader } from './Header';

const { describe, it } = global;

describe(' Test Suite for <YodaHeader/> ', () => {
    describe('Dumb component testing', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<YodaHeader />);  // eslint-disable-line no-undef
        });

        it('Non Connected Dumb, component', () => {
            expect(wrapper).to.exist;
        });

        it('set props', () => {
            wrapper.setProps({
                accounts: {
                    userProfile: {
                        firstName: 1,
                        accountId: null,
                        rewardsStatus: 1,
                        userState: 1,
                        totalCerts: 1,
                    },
                },
                isMobile: true,
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,

            });
        });
        it('set props', () => {
            wrapper.setProps({
                accounts: {
                },
                isMobile: true,
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,

            });
        });
        it('set props', () => {
            wrapper.setProps({
                accounts: {
                    userProfile: {
                        accountId: null,
                        rewardsStatus: 1,
                        totalCerts: 1,
                    },
                },
                isMobile: true,
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,

            });
        });
        it('send headerData to render account', () => {
            const renderAccount = sinon.spy(wrapper.instance(), 'renderAccount');
            const renderAccountData = sinon.spy(wrapper.instance(), 'renderAccountData');
            wrapper.setProps({
                accounts: {
                    userProfile: {
                        totalCerts: 7,
                        rewardsStatus: 7,
                    },
                },
                isMobile: true,
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,

            });
            const item = {
                leaf: 'Redeem',
                name: 'JCPenney Rewards',
                url: '/rewards',
            };
            wrapper.instance().renderAccount();
            expect(renderAccount).to.be.called;
            wrapper.instance().renderAccountTooltipData();
            const getUserStateDetails = sinon.spy(wrapper.instance(), 'getUserStateDetails');
            wrapper.instance().getUserStateDetails();
            expect(getUserStateDetails).to.be.called;
            wrapper.instance().renderMenuList(item);
            const item1 = {
                leaf: 'rewards',
                name: 'JCPenney Rewards',
                url: '/rewards',
            };
            wrapper.instance().renderMenuList(item1);
            const item2 = {
                leaf: 'savedItems',
                name: 'JCPenney Rewards',
                url: '/rewards',
            };
            wrapper.instance().renderMenuList(item2);
            const item3 = {
                leaf: 'signout',
                name: 'JCPenney Rewards',
                url: '/rewards',
            };
            wrapper.instance().renderMenuList(item3);

            wrapper.instance().renderAccountData({ icon: '', SignIn: 'Sign In', MyAccount: 'My Account' });
            expect(renderAccountData).to.be.called;

            const renderAccoundInformation = sinon.spy(wrapper.instance(), 'renderAccoundInformation');
            wrapper.setState({ isUserLoggedIn: 'COLD_STATE' });
            wrapper.instance().renderAccoundInformation();
            expect(renderAccoundInformation).to.be.called;
            wrapper.instance().renderAccountData('', 'My Account', 'My Account');
            expect(renderAccountData).to.be.called;

            wrapper.setProps({
                accounts: {
                    userProfile: {
                        firstName: 'penney',
                        accountId: null,
                        rewardsStatus: 1,
                        userState: null,
                    },
                },
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,
                isMobile: true,
            });
            wrapper.instance().getUserStateDetails();

            wrapper.setState({ isUserLoggedIn: 'WARM_STATE' });
            wrapper.instance().renderAccoundInformation();
            wrapper.instance().renderAccountTooltipData();
            expect(renderAccoundInformation).to.be.called;
            wrapper.instance().renderAccountData('icon', 'Sign In', 'My Account');
            expect(renderAccountData).to.be.called;
            wrapper.setProps({
                accounts: {
                    userProfile: {
                        firstName: null,
                        accountId: null,
                        rewardsStatus: 1,
                        userState: 1,
                        // totalCerts: 1,
                    },
                },
                isMobile: true,
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,
            });
            const nextProps = {
                accounts: {
                    userProfile: {
                        firstName: 'penney',
                        accountId: null,
                        rewardsStatus: 1,
                    },
                },
            };
            wrapper.instance().getUserStateDetails(nextProps);

            wrapper.setState({ isUserLoggedIn: 'HOT_STATE' });
            wrapper.instance().renderAccoundInformation();
            expect(renderAccoundInformation).to.be.called;
            wrapper.setProps({
                accounts: {
                    userProfile: {
                        firstName: 'penney',
                        accountId: null,
                        rewardsStatus: 1,
                        userState: 1,
                        totalCerts: 1,
                    },
                },
                isMobile: true,
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,
            });
            const nextProps2 = {
                accounts: {
                    userProfile: {
                        firstName: 'penney',
                        accountId: null,
                        rewardsStatus: 1,
                    },
                },
            };
            wrapper.instance().getUserStateDetails(nextProps2);

            wrapper.setState({ isUserLoggedIn: 'HOT_STATE' });
            wrapper.instance().renderAccoundInformation();
            expect(renderAccoundInformation).to.be.called;
            wrapper.instance().renderAccountData('icon', 'My Account', 'My Account');
            expect(renderAccountData).to.be.called;
            wrapper.setProps({
                accounts: {
                    userProfile: {
                        firstName: null,
                        accountId: null,
                        rewardsStatus: 1,
                        userState: 1,
                    },
                },
                isMobile: true,
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,
                logoLink: 'on',
                headerType: 'minimal-header',
            });
            const nextProps1 = {
                accounts: {
                    userProfile: {
                        firstName: 'penney',
                        accountId: null,
                        rewardsStatus: 1,
                    },
                },
            };
            expect(wrapper.find('#jcp-logo').props().href).to.be.equal('/');
            wrapper.instance().getUserStateDetails(nextProps1);

            wrapper.setState({ isUserLoggedIn: 'HOT_STATE' });
            wrapper.instance().renderAccoundInformation();
            expect(renderAccoundInformation).to.be.called;
            wrapper.instance().renderAccountData('icon', 'My Account', 'My Account');
            expect(renderAccountData).to.be.called;
            wrapper.instance().getUserStateDetails();
            wrapper.setProps({
                accounts: {
                },
                isMobile: true,
                logoLink: 'off',
                headerType: 'slim-header',
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,
            });
            expect(wrapper.find('#jcp-logo').props().href).to.be.equal(undefined);
            wrapper.setState({ isUserLoggedIn: 'nostate' });
            wrapper.instance().renderAccoundInformation();
            expect(renderAccoundInformation).to.be.called;
            wrapper.instance().renderAccountData('icon', 'My Account', 'My Account');
            expect(renderAccountData).to.be.called;
        });
        it('Check Rewards Link if Loggedin', () => {
            TokenProvider.set('DP_USER_STATE', 1);
            expect(wrapper.find('#headerRewards').props().href).to.be.equal('/rewards/rewards/dashboard');
            // TokenProvider.remove('DP_USER_STATE');
            TokenProvider.set('DP_USER_STATE', 0);
            const tokenProviderSpy1 = sinon.stub(TokenProvider, 'get', () => 0);
            wrapper.instance().getRewardsIcon();
            tokenProviderSpy1.restore();
            const tokenProviderSpy2 = sinon.stub(TokenProvider, 'get', () => 1);
            wrapper.instance().getRewardsIcon();
            tokenProviderSpy2.restore();
        });
    });

    describe('Connected component testing', () => {
        let wrapper;
        let store;

        beforeEach(() => {
            /* FUll DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            store = mockStore({
                session: { signedOut: false },
                accounts: {
                    userProfile: {
                    },
                },
                context: {
                    deviceType: {
                        isDesktop: true,
                        isMobile: false,
                        isTablet: false,
                    },
                    messagesTexts: {
                        HamburgerZeroLevel: {},
                    },
                    preferences: {
                        hamburger: config.hamburger,
                        desktop: config.desktop,
                    },
                    accountMenuList: config.hamburger,
                    desktopAccountMenuList: config.desktop.hamburger,
                },
                bagItemCount: 7,
            });

            wrapper = mount(
                <Provider store={store}>
                    <HeaderConnected />
                </Provider>);
            wrapper.setProps({
                accounts: {
                    userProfile: {
                        firstName: 1,
                        accountId: 1,
                        rewardsStatus: 1,
                        userState: 1,
                        totalCerts: 1,
                    },
                },
                isMobile: true,
                accountMenuList: config.hamburger,
                desktopAccountMenuList: config.desktop.hamburger,

            });
            store.clearActions();
        });

        it('check for isTablet', () => {
            const mockStore = configureStore([]);
            __SERVER__ = true;

            store = mockStore({
                session: { signedOut: false },
                accounts: {
                    userProfile: {
                    },
                },
                context: {
                    deviceType: {
                        isDesktop: false,
                        isMobile: true,
                        isTablet: false,
                    },
                    preferences: {
                        hamburger: config.hamburger,
                        desktop: config.desktop,
                    },
                    accountMenuList: config.hamburger.guest,
                    desktopAccountMenuList: config.desktop.hamburger,
                    messagesTexts: {
                        HamburgerZeroLevel: {},
                    },
                },
                bagItemCount: 7,
            });
            wrapper = mount(
                <Provider store={store}>
                    <HeaderConnected />
                </Provider>);
            YodaHeader.signinLink = 'https://m.jcpenney.com/signin';
            wrapper.find('.sigInButton').simulate('click');
            store.clearActions();
        });

        it('check for menu in Desktop', () => {
            const mockStore = configureStore([]);
            __SERVER__ = true;
            const store1 = mockStore({
                session: { signedOut: false },
                accounts: {
                    userProfile: {
                    },
                },
                context: {
                    deviceType: {
                        isDesktop: true,
                        isMobile: false,
                        isTablet: false,
                    },
                    preferences: {
                        hamburger: config.hamburger,
                        desktop: config.desktop,
                    },
                    accountMenuList: config.hamburger.guest,
                    desktopAccountMenuList: config.desktop.hamburger,
                    messagesTexts: {
                        HamburgerZeroLevel: {},
                    },
                },
                bagItemCount: 7,
            });
            wrapper = mount(
                <Provider store={store1}>
                    <HeaderConnected />
                </Provider>);
            expect(wrapper.find('.links').someWhere((n) => {
                const { href } = n.props();
                return href && href === '/dotcom/jsp/profile/secure/external/orderTrack.jsp';
            })).to.equal(true);
            store.clearActions();
        });
    });
});
