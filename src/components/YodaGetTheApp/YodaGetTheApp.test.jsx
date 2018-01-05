import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import YodaGetTheAppConnected, { YodaGetTheApp } from './YodaGetTheApp';

const { describe, it } = global;
// sinon.stub(Device, 'findDeviceType', () => Device.TYPE.iOS);

describe('Connected Component Testing for Mobile', () => {
    let wrapper;
    let store;
    before(() => {
        const mockStore = configureStore([]);
        store = mockStore({
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });
        wrapper = mount(<Provider store={store}>
            <YodaGetTheAppConnected />
        </Provider>);
    });
    after(() => {
        wrapper.unmount();
    });

    it('test', () => {
        expect(wrapper).to.exist;
    });
    it('show component', () => {
        wrapper.update();
        // expect(wrapper.find('button')).to.have.length(1);
    });
});

describe('Connected Component Testing for Tablet', () => {
    let wrapper;
    let store;
    before(() => {
        const mockStore = configureStore([]);

        store = mockStore({
            context: { deviceType: { isTablet: true, isMobile: false, isDesktop: false, isBot: false } },
        });
        wrapper = mount(<Provider store={store}>
            <YodaGetTheAppConnected />
        </Provider>);
    });
    after(() => {
        wrapper.unmount();
    });

    it('exist', () => {
        expect(wrapper).to.exist;
    });
    it('show component', () => {
        wrapper.update();
        // expect(wrapper.find('button')).to.have.length(1);
    });
});

describe('Connected Component Testing for no deviceType default mobile', () => {
    let wrapper;
    let store;
    before(() => {
        const mockStore = configureStore([]);
        store = mockStore({
            context: { deviceType: {} },
        });
        wrapper = mount(<Provider store={store}>
            <YodaGetTheAppConnected />
        </Provider>);
    });
    after(() => {
        wrapper.unmount();
    });

    it('exist', () => {
        expect(wrapper).to.exist;
    });
    it('show component', () => {
        wrapper.update();
        // expect(wrapper.find('button')).to.have.length(1);
    });
});
describe('Connected Component Testing for desktop', () => {
    let wrapper;
    let store;
    before(() => {
        const mockStore = configureStore([]);
        store = mockStore({
            context: { deviceType: { isTablet: false, isMobile: false, isDesktop: true, isBot: false } },
        });
        wrapper = mount(<Provider store={store}>
            <YodaGetTheAppConnected />
        </Provider>);
    });
    after(() => {
        wrapper.unmount();
    });

    it('exist', () => {
        expect(wrapper).to.exist;
    });
    it('show component', () => {
        wrapper.update();
        expect(wrapper.find('button')).to.have.length(0);
    });
});

describe('Non connected Component Testing', () => {
    it('Non Connected Dumb, component', () => {
        const wrapper = shallow(<YodaGetTheApp />);
        wrapper.setState({ showComponent: true });

        expect(wrapper).to.exist;
    });
});

