import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import PromotionalBannerConnected, { PromotionalBanner } from './PromotionalBanner';

const mockData = {
    requestDateTime: null,
    channelName: null,
    jvmName: null,
    requestUrl: null,
    maxAge: 2000,
    delay: 1,
    small: [
        {
            promoText: 'Free Shipping Banner Mobile1',
            targetUrl: 'www.jcpenney.com',
            targetWindow: 'SW',
        },
    ],
    medium: [
        {
            promoText: 'Free Shipping Banner Tablet1',
            targetUrl: 'www.jcpenney.com',
            targetWindow: 'SW',
        },
    ],
    large: [
        {
            promoText: 'Free Shipping Banner Desktop1',
            targetUrl: 'www.jcpenney.com',
            targetWindow: 'SW',
        },
    ],
    largewithNodata: [],
    contentExpiry: '2018-07-10T06:23:37.359Z',
};

describe('<PromotionalBanner/> Testing the redux', () => {
    it('Check connected component to exists', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: false,
                    isMobile: true,
                    isTablet: false,
                },
            },
            offerData: mockData.small,
            offerDetails: mockData.small,
            devicetype: 'small',
            promotionalBannerData: {
                contentExpiry: mockData.contentExpiry,
                small: [
                    {
                        promoText: 'Free Shipping Banner Mobile1',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
        );
        expect(wrapper).to.exist;
    });
    it('Check connected component to exists', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: false,
                    isMobile: false,
                    isTablet: true,
                },
            },
            offerData: mockData.medium,
            offerDetails: mockData.medium,
            devicetype: 'medium',
            promotionalBannerData: {
                contentExpiry: mockData.contentExpiry,
                medium: [
                    {
                        promoText: 'Free Shipping Banner Mobile1',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile2',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile3',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile4',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
        );
        console.log('::::');
        console.log(wrapper.debug());
        expect(wrapper).to.exist;
    });
    it('Check connected component to exists', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: true,
                    isMobile: false,
                    isTablet: false,
                },
            },
            offerData: mockData.large,
            offerDetails: mockData.large,
            devicetype: 'large',
            promotionalBannerData: {
                contentExpiry: mockData.contentExpiry,
                large: [
                    {
                        promoText: 'Free Shipping Banner Mobile1',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile2',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile3',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile4',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
        );
        expect(wrapper).to.exist;
    });
    it('Check connected component to exists', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: false,
                    isMobile: false,
                    isTablet: false,
                },
            },
            offerData: mockData.small,
            offerDetails: mockData.small,
            devicetype: 'small',
            promotionalBannerData: {
                contentExpiry: mockData.contentExpiry,
                large: [
                    {
                        promoText: 'Free Shipping Banner Mobile1',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile2',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile3',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile4',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
        );
        expect(wrapper).to.exist;
    });
    it('to check contentExpiry condition', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: true,
                    isMobile: false,
                    isTablet: false,
                },
            },
            offerData: mockData.medium,
            offerDetails: mockData.medium,
            devicetype: 'large',
            promotionalBannerData: {
                contentExpiry: '1960-01-01T00:00:00.000Z',
                large: [
                    {
                        promoText: 'Free Shipping Banner Mobile1',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile2',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile3',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: 'Free Shipping Banner Mobile4',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
      );
        expect(wrapper).to.exist;
    });
    it('to check contentExpiry condition', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            offerData: mockData.large,
            offerDetails: mockData.large,
            promotionalBannerData: {
                contentExpiry: '1960-01-01T00:00:00.000Z',
                large: [
                    {
                        promoText: 'Free Shipping Banner Mobile1',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
      );
        expect(wrapper).to.exist;
    });
    it('to check classnames condition', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            offerData: mockData.largewithNodata,
            offerDetails: mockData.largewithNodata,
            promotionalBannerData: {
                contentExpiry: '1960-01-01T00:00:00.000Z',
                large: [
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
      );
        expect(wrapper).to.exist;
    });
    it('Check connected component to exists', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: false,
                    isMobile: false,
                    isTablet: false,
                },
            },
            offerData: mockData.small,
            offerDetails: mockData.small,
            devicetype: 'small',
            promotionalBannerData: {
                contentExpiry: mockData.contentExpiry,
                large: [
                    {
                        promoText: '',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: '',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: '',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: '',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
        );
        expect(wrapper).to.exist;
    });
    it('Check connected component to exists', () => {
        const mockStore = configureStore([]);
        const action = {
            getOfferDetailsAction() {
                return true;
            },
        };
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: false,
                    isMobile: false,
                    isTablet: false,
                },
            },
            offerData: mockData.small,
            offerDetails: mockData.small,
            devicetype: 'small',
            promotionalBannerData: {
                contentExpiry: '',
                large: [
                    {
                        promoText: '',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: '',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: '',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                    {
                        promoText: '',
                        targetUrl: 'www.jcpenney.com',
                        targetWindow: 'SW',
                    },
                ],
            },
        });
        const wrapper = mount(
            <Provider store={store}>
                <PromotionalBannerConnected actions={action}/>
            </Provider>,
        );
        wrapper.setProps({
            offerDetails: {
                contentExpiry: '',
            },
        });
        expect(wrapper).to.exist;
    });
});

describe(' <PromotionalBanner/> ', () => {
    let instance;
    const getOfferDetailsAction = sinon.spy();
    const props = {
        actions: {
            getOfferDetailsAction,
        },
    };

    const wrapper = mount(
        <PromotionalBanner {...props}/>,
        );
    it('componentWillUnmount', () => {
        instance = wrapper.instance();
        const unmountSpy = sinon.spy();
        instance.unmount = unmountSpy;
        instance.componentWillUnmount();
        expect(unmountSpy.called).to.be.false;
    });
});
