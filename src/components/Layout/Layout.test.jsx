import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ContextProvider from 'yoda-core-components/lib/components/FeatureFlag/ContextProvider';
import Layout from './Layout';


const { describe, it } = global;

describe(' Test Suite for <Layout/> ', () => {
    let wrapper;
    beforeEach(() => {
        global.URLSearchParams = () => ({ get: () => true });
        const mockStore = configureStore([]);
        const store = mockStore({
            session: { signedOut: false },
            stores: [],
            context: {
                featureFlags: {
                    enableRegionPricing: true,
                },
            },
            showOverlay: true,
        });
        wrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                <Provider store={store}>
                    <Layout ><div>Test</div></Layout>
                </Provider>
            </ContextProvider>,
        );
    });
    it('Layout component should exist ', () => {
        expect(wrapper).to.exist;
    });
});
describe(' Test Suite for <Layout/> ', () => {
    let wrapper;
    beforeEach(() => {
        global.URLSearchParams = () => ({ get: () => true });
        const mockStore = configureStore([]);
        const store = mockStore({
            session: { signedOut: false },
            stores: [],
            context: {
                deviceType: { isTablet: false, isMobile: false, isDesktop: true, isBot: false },
                messagesTexts: {
                    HamburgerZeroLevel: {},
                },
            },
            showOverlay: false,
        });
        wrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                <Provider store={store}>
                    <Layout ><div>Test</div></Layout>
                </Provider>
            </ContextProvider>,
        );
    });
    it('Layout component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('Layout should not contain footer', () => {
        expect(wrapper.find('YodaFooter')).to.have.length(1);
    });
});
describe(' Test Suite for <Layout/> ', () => {
    let wrapper;
    beforeEach(() => {
        global.URLSearchParams = () => ({ get: () => true });
        const mockStore = configureStore([]);
        const store = mockStore({
            session: { signedOut: false },
            stores: [],
            showOverlay: false,
        });
        wrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                <Provider store={store}>
                    <Layout ><div>Test</div></Layout>
                </Provider>
            </ContextProvider>,
        );
    });
    it('Layout component should exist ', () => {
        expect(wrapper).to.exist;
    });
});
describe(' Test Suite for <Layout/> ', () => {
    let wrapper;
    let desktopWrapper;
    beforeEach(() => {
        global.URLSearchParams = () => ({ get: () => true });
        const mockStore = configureStore([]);
        const store = mockStore({
            session: { signedOut: false },
            stores: [],
            subscriptionStatus: { subscribed: 'false' },
            orders: [],
            context: {
                deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false },
                messagesTexts: {
                    HamburgerZeroLevel: {},
                },
            },
        });
        wrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                <Provider store={store}>
                    <Layout ><div>Test</div></Layout>
                </Provider>
            </ContextProvider>,
        );
        desktopWrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                <Provider store={store}>
                    <Layout hideHeader hideFooter disableWhiteBG><div>Test</div></Layout>
                </Provider>
            </ContextProvider>,
        );
    });

    it('Layout component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('Layout to contain div as it is passed as children', () => {
        expect(wrapper.find('div')).to.exist;
    });

    it('Layout to contain Header as it is passed as children', () => {
        expect(wrapper.find('Header')).to.exist;
    });

    it('Layout to contain Footer as it is passed as children', () => {
        expect(wrapper.find('Footer')).to.exist;
    });
    it('Layout should not contain header', () => {
        expect(desktopWrapper.find('Header')).to.have.length(0);
    });
    it('Layout should not contain footer', () => {
        expect(desktopWrapper.find('Footer')).to.have.length(0);
    });
});

