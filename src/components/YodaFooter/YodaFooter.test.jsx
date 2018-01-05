import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import YodaFooterConnected, { YodaFooter } from './YodaFooter';
import DefaultTemplate from './YodaFooter.config';

// const { describe, it } = global;

describe('Connected component testing', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        /* FUll DOM Rendering component in before each to eliminate duplication */
        const mockStore = configureStore([]);
        store = mockStore({
            stores: [],
            subscriptionStatus: { subscribed: 'false' },
            orders: [],
            context: {
                deviceType: { isTablet: true, isMobile: false, isDesktop: false, isBot: false },
                preferences: {
                    footer: DefaultTemplate,
                },
                footerMenus: DefaultTemplate,
            },
        });
        wrapper = mount(<Provider store={store}>
            <YodaFooterConnected />
        </Provider>);

        store.clearActions();
        expect(wrapper).to.exist;
    });

    it('InnerConnectConnected, with connect', () => {
        wrapper.setState({ shouldInitiateRender: true });
        wrapper.update();
        expect(wrapper).to.exist;
    });

    it('check for isMobile', () => {
        const mockStore = configureStore([]);
        store = mockStore({
            stores: [],
            subscriptionStatus: { subscribed: 'false' },
            orders: [],
        });

        wrapper = mount(<Provider store={store}>
            <YodaFooterConnected />
        </Provider>);

        store.clearActions();
    });
});

describe('Dumb component testing', () => {
    const wrapper = shallow(<YodaFooter />);  // eslint-disable-line no-undef

    it('Non Connected Dumb, component', () => {
        wrapper.setState({ shouldInitiateRender: true });
        expect(wrapper).to.exist;
    });
    it('UltraCondensedFooter component should exist', () => {
        wrapper.setProps({
            deviceType: {
                isDesktop: true,
            },
            UltraCondensedFooter: true,
        });
        expect(wrapper).to.be.exist;
    });
});
