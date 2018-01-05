import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { describe, it } from 'mocha';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import CouponApplyConnected, { CouponApply } from './CouponApply';
import mockData from './__stories/Mock1.json';

describe('<CouponCard />', () => {
    let applyCouponWrapper;
    let removeCouponWrapper;
    let applyStore;
    let removeStore;
    let props;

    beforeEach(() => {
        const mockStore = configureStore([]);
        applyStore = mockStore({
            couponApplicationState: {
                status: 204,
                statusText: 'Internal Server Error',
                data: [],
            },
            couponData: mockData[1],
            modalOnClose: () => {},
            onApplyCoupon: () => {},
            onRemoveCoupon: () => {},
        });

        removeStore = mockStore({
            couponApplicationState: {
                status: 201,
                statusText: 'Internal Server Error',
                data: [],
            },
            couponData: mockData[2],
            modalOnClose: () => {},
            onApplyCoupon: () => {},
            onRemoveCoupon: () => {},
        });

        props = {
            onClosePanel: () => {},
            removeCouponId: 12345,
        };

        applyCouponWrapper = mount(<Provider store={applyStore}>
            <CouponApplyConnected couponData={mockData[2]} {...props} />
        </Provider>);
        removeCouponWrapper = mount(<Provider store={removeStore}>
            <CouponApplyConnected couponData={mockData[1]} {...props} />
        </Provider>);
    });

    it('Apply Coupon Render', () => {
        expect(removeCouponWrapper).to.exist;
        removeCouponWrapper.find('button').simulate('click');
    });

    it('Remove Coupon Render data', () => {
        expect(applyCouponWrapper).to.exist;
        applyCouponWrapper.find('button').simulate('click');
    });

    it('Receving Response from API on APPly Coupon', () => {
        const wrapper = shallow(<CouponApplyConnected store={applyStore}/>);
        wrapper.setProps({ couponApplicationState: { status: 201, statusText: 'Created' } });
        wrapper.update();
    });

    it('Receving Response from API RemoveCoupon', () => {
        const wrapper = shallow(<CouponApplyConnected store={removeStore}/>);
        wrapper.setProps({ couponApplicationState: { status: 204, statusText: 'Created' } });
        wrapper.update();
    });

    it('Order id is available and Apply coupon is clicked', () => {
        Cookies.save('DPOrder', 5, '', '');
        Cookies.save('OrderId', 12345, '', '');
        const mockStore = configureStore([]);
        applyStore = mockStore({
            couponApplicationState: {
                data: [],
            },
            couponData: mockData[1],
            modalOnClose: () => {},
            onApplyCoupon: () => {},
            onRemoveCoupon: () => {},
        });

        applyCouponWrapper = mount(<Provider store={applyStore}>
            <CouponApplyConnected couponData={mockData[5]} {...props} />
        </Provider>);

        expect(applyCouponWrapper).to.exist;
        applyCouponWrapper.find('button').simulate('click');
    });
});


describe('Dumb Component testing', () => {
    it('Test for checking handle Close Modal is called', () => {
        const test = shallow(<CouponApply />);
        test.instance().handleCloseModal();
        expect(test).to.exist;
    });

    it('Test for checking handle Close Modal is called', () => {
        const actions = {
            applyAdjustment: () => {},
        };
        Cookies.save('DPOrder', '', '', '');
        Cookies.save('OrderId', 12345, '', '');
        const test = shallow(<CouponApply actions={actions} />);
        test.instance().onApplyCoupon();
        Cookies.save('OrderId', '', '', '');
        test.instance().onApplyCoupon();
        expect(test).to.exist;
    });
});
