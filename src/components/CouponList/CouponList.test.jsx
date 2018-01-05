import React from 'react';
import { mount } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import configureStore from 'redux-mock-store';
import CouponList from './CouponList';
import mockData from './__stories/mock';

describe('<Coupon List />', () => {
    it('Connected Smart Components, with connect', () => {
        /* Full DOM Rendering component in before each to eliminate duplication */
        const mockStore = configureStore([]);
        const store = mockStore({
            coupons: [],
        });

        const wrapper = mount(
            <Provider store={store}>
                <CouponList automationId="CouponListTest"/>
            </Provider>,
        );

        store.clearActions();

        expect(wrapper).to.exist;
    });

    it('should display as per store data ,rendered', () => {
        const mockStore = configureStore([]);
        const spygetCouponsAction = sinon.spy();
        const spygetgetAdjustments = sinon.spy();
        __SERVER__ = true;

        const store = mockStore({
            coupons: { status: 200, groups: mockData },
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });

        const actions = {
            getCouponsAction: spygetCouponsAction,
            getAdjustments: spygetgetAdjustments,
        };

        mount(
            <Provider store={store}>
                <CouponList actions={actions}/>
            </Provider>,
        );

        expect(store.getState().coupons.groups).to.equal(mockData);
        store.clearActions();
    });

    it('should display as per store data , Making Sure the Actual Data is rendered', () => {
        const mockStore = configureStore([]);
        const spygetCouponsAction = sinon.spy();
        const spygetgetAdjustments = sinon.spy();
        __SERVER__ = true;

        const store = mockStore({
            coupons: { status: 200, groups: mockData, numCoupons: 12 },
            context: { deviceType: { isTablet: true, isMobile: false, isDesktop: false, isBot: false } },
        });

        const actions = {
            getCouponsAction: spygetCouponsAction,
            getAdjustments: spygetgetAdjustments,
        };

        mount(
            <Provider store={store}>
                <CouponList actions={actions} listType={'In Store'} />
            </Provider>,
        );

        expect(store.getState().coupons.groups).to.equal(mockData);
        store.clearActions();
    });


    it('should display one list coupon only', () => {
        const mockStore = configureStore([]);
        const spygetCouponsAction = sinon.spy();
        const spygetgetAdjustments = sinon.spy();
        __SERVER__ = false;
        Cookies.save('DPOrder', 'L14209630002', '', '');
        Cookies.save('OrderId', '1234', '', '');
        const store = mockStore({
            coupons: mockData,
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });

        const actions = {
            getCouponsAction: spygetCouponsAction,
            getAdjustments: spygetgetAdjustments,
        };

        mount(
            <Provider store={store}>
                <CouponList actions={actions} listType={'Online'}/>
            </Provider>,
        );

        expect(store.getState().coupons).to.equal(mockData);
        store.clearActions();
        Cookies.remove();
    });

    it('should display all', () => {
        const mockStore = configureStore([]);
        const spygetCouponsAction = sinon.spy();
        const spygetgetAdjustments = sinon.spy();
        __SERVER__ = false;
        Cookies.remove('DPOrder', '');
        Cookies.remove('OrderId', '');
        const store = mockStore({
            coupons: mockData,
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });

        const actions = {
            getCouponsAction: spygetCouponsAction,
            getAdjustments: spygetgetAdjustments,
        };

        mount(
            <Provider store={store}>
                <CouponList actions={actions} listType={'All'}/>
            </Provider>,
        );

        expect(store.getState().coupons).to.equal(mockData);
        store.clearActions();
    });

    it('should display one list coupon only', () => {
        const mockStore = configureStore([]);
        const spygetCouponsAction = sinon.spy();
        const spygetgetAdjustments = sinon.spy();
        __SERVER__ = false;
        Cookies.remove('DPOrder', '');
        Cookies.remove('OrderId', '');
        const store = mockStore({
            coupons: mockData,
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });

        const actions = {
            getCouponsAction: spygetCouponsAction,
            getAdjustments: spygetgetAdjustments,
        };

        mount(
            <Provider store={store}>
                <CouponList actions={actions} listType={'Online'}/>
            </Provider>,
        );

        expect(store.getState().coupons).to.equal(mockData);
        store.clearActions();
    });

    it('should display one list store only', () => {
        const mockStore = configureStore([]);
        const spygetCouponsAction = sinon.spy();
        const spygetgetAdjustments = sinon.spy();
        __SERVER__ = false;
        Cookies.remove('DPOrder', '');
        Cookies.remove('OrderId', '');
        const store = mockStore({
            coupons: mockData,
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });

        const actions = {
            getCouponsAction: spygetCouponsAction,
            getAdjustments: spygetgetAdjustments,
        };

        mount(
            <Provider store={store}>
                <CouponList actions={actions} listType={'In Store'}/>
            </Provider>,
        );

        expect(store.getState().coupons).to.equal(mockData);
        store.clearActions();
    });

    it('should display', () => {
        const mockStore = configureStore([]);
        const spygetCouponsAction = sinon.spy();
        const spygetgetAdjustments = sinon.spy();
        __SERVER__ = false;

        const store = mockStore({
            coupons: mockData,
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });

        const actions = {
            getCouponsAction: spygetCouponsAction,
            getAdjustments: spygetgetAdjustments,
        };

        mount(
            <Provider store={store}>
                <CouponList actions={actions} />
            </Provider>,
        );

        expect(store.getState().coupons).to.equal(mockData);
        store.clearActions();
    });

    it('Check for API Failure Case Handling', () => {
        const mockStore = configureStore([]);

        const store = mockStore({
            coupons: { status: 500 },
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });

        mount(
            <Provider store={store}>
                <CouponList />
            </Provider>,
        );
    });
});
