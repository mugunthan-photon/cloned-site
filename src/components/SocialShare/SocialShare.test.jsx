import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SocialShare from './SocialShare';

describe('<SocialShare />', () => {
    const mockStore = configureStore([]);
    let wrapper;

    it('SocialShare component should exist ', () => {
        const store = mockStore({});
        wrapper = mount(<Provider store={store}>
            <SocialShare
                message="Levi's 505 Regular Fit Jeans"
                dataAutomationId="pdp-socialshare"
            />
        </Provider>);
        /* eslint-disable no-unused-expressions */
        expect(wrapper).to.exist;
    });
    it('SocialShare component in desktop mode ', () => {
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: true,
                },
            },
        });
        wrapper = mount(<Provider store={store}>
            <SocialShare
                message="Levi's 505 Regular Fit Jeans"
                dataAutomationId="pdp-socialshare"
            />
        </Provider>);
        /* eslint-disable no-unused-expressions */
        expect(wrapper).to.exist;
    });
    it('SocialShare component in mobile mode ', () => {
        const store = mockStore({
            context: {
                deviceType: null,
            },
        });
        wrapper = mount(<Provider store={store}>
            <SocialShare
                message="Levi's 505 Regular Fit Jeans"
                dataAutomationId="pdp-socialshare"
            />
        </Provider>);
        /* eslint-disable no-unused-expressions */
        expect(wrapper).to.exist;
    });
});
