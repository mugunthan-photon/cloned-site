import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { describe, it } from 'mocha';
import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import mockData from './__stories/Mock1.json';
import CouponCard from './CouponCard';
import CouponDetails from './CouponDetails';
import CouponFindStore from './CouponFindStore';
import { CouponInfo } from './CouponInfo';
import { CouponApply } from './CouponApply';

describe('<CouponCard />', () => {
    let store;
    let storeTwo;
    beforeEach(() => {
        const mockStore = configureStore([]);
        store = mockStore({
            couponApplicationState: {
                status: 204,
                statusText: 'Internal Server Error',
                data: [],
            },
            couponData: mockData[1],
            modalOnClose: () => { },
            onApplyCoupon: () => { },
            onRemoveCoupon: () => { },
        });

        storeTwo = mockStore({
            couponApplicationState: {
                status: 201,
                statusText: 'Internal Server Error',
                data: [],
            },
            couponData: mockData[5],
            modalOnClose: () => { },
            onApplyCoupon: () => { },
            onRemoveCoupon: () => { },
        });
    });

    it('CouponCard Test', () => {
        const wrapper = mount(<Provider store={store}>
            <CouponCard couponData={mockData[5]} />
        </Provider>);

        const wrapper1 = mount(<Provider store={store}>
            <CouponCard couponData={mockData[0]} />
        </Provider>);

        const wrapper2 = mount(<Provider store={storeTwo}>
            <CouponCard couponData={mockData[1]} />
        </Provider>);

        const wrapper3 = mount(<Provider store={store}>
            <CouponCard couponData={mockData[2]} />
        </Provider>);

        const wrapper4 = mount(<Provider store={store}>
            <CouponCard couponData={mockData[2]} couponVariant="Small" />
        </Provider>);

        expect(wrapper).to.exist;
        expect(wrapper1).to.exist;
        expect(wrapper2).to.exist;
        expect(wrapper3).to.exist;
        expect(wrapper4).to.exist;
    });

    it('CouponCard Test Apply', () => {
        const onApplyCoupon = sinon.spy();
        const wrapper = mount(<Provider store={store}>
            <CouponCard couponData={mockData[5]} onApplyCoupon={onApplyCoupon} />
        </Provider>);
        Cookies.save('DPOrder', 5, '', '');
        Cookies.save('OrderId', 12345, '', '');

        const couponAppled = wrapper.find('CouponApply');
        couponAppled.find('button').simulate('click');
        // expect(onApplyCoupon.called).to.be.true;
    });

    it('CouponCard Test Apply - Shop Sale', () => {
        const wrapper = mount(<Provider store={store}>
            <CouponCard couponData={mockData[5]} openLinkInNewTab="true" />
        </Provider>);
        Cookies.save('DPOrder', 5, '', '');
        Cookies.save('OrderId', 12345, '', '');
        const stub = sinon.stub(NavigationHelper, 'navigate');
        NavigationHelper.navigate('https://www.jcpenney.com', true);
        const couponAppled = wrapper.find('CouponApply');
        couponAppled.find('button.couponShopBtn').simulate('click');
        couponAppled.find('button.couponShopBtn').simulate('click');
        stub.calledWith('https://www.jcpenney.com', '_blank');
        stub.restore();
        expect(stub.called).to.be.true;
    });

    it('CouponCard Test Not Apply', () => {
        const wrapper = mount(<Provider store={store}>
            <CouponCard couponData={mockData[5]} />
        </Provider>);
        Cookies.save('DPOrder', 5, '', '');
        Cookies.save('OrderId', 12345, '', '');

        const couponAppled = wrapper.find('CouponApply');
        couponAppled.find('button').simulate('click');
    });

    it('CouponCard Test - 2', () => {
        const wrapper = mount(<Provider store={store}>
            <CouponCard couponData={mockData[6]} />
        </Provider>);

        const wrapper1 = mount(<Provider store={store}>
            <CouponCard couponData={mockData[7]} />
        </Provider>);

        expect(wrapper).to.exist;
        expect(wrapper1).to.exist;
    });

    describe('<CouponDetails />', () => {
        let wrapper;
        describe('showDetails for large screens', () => {
            beforeEach(() => {
                wrapper = mount(<CouponDetails couponVariant="Small" />);
                wrapper.setState({ showDetails: false });
            });
            it('showCouponDetails for all screens', () => {
                const showCouponDetails = sinon.spy(wrapper.instance(), 'showCouponDetails');

                wrapper.find('button').simulate('click');
                expect(showCouponDetails).to.have.been.called;
                expect(wrapper.state().showDetails).to.equal(true);

                wrapper.find('button').at(1).simulate('click');
                expect(showCouponDetails).to.have.been.called;
                expect(wrapper.state().showDetails).to.equal(false);
            });
        });
    });

    describe('<CouponInfo />', () => {
        let wrapper;
        // const url = 'https://www.google.com';
        beforeEach(() => {
            wrapper = shallow(<CouponInfo couponData={mockData[1]} />);
        });

        it('CouponInfo condition', () => {
            expect(wrapper).to.exist;
        });
    });

    describe('<CouponInfo />', () => {
        let wrapper;
        // const url = 'https://www.google.com';
        beforeEach(() => {
            wrapper = shallow(<CouponInfo couponData={mockData[14]} />);
        });

        it('CouponInfo condition', () => {
            expect(wrapper).to.exist;
        });

        it('Button click simualate', () => {
            wrapper.find('Button').props().onClick();
            expect(wrapper).to.exist;
        });
    });

    describe('<CouponApply />', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<CouponApply couponData={mockData[1]} />);
        });

        it('CouponInfo condition', () => {
            expect(wrapper).to.exist;
        });
    });

    describe('<CouponFindStore />', () => {
        let couponFindStore;

        beforeEach(() => {
            couponFindStore = shallow(<CouponFindStore couponData={mockData[1]} />);
        });

        it('Find Store component renders properly', () => {
            expect(couponFindStore).to.exist;
        });

        it('Simulate Click on Find a Store with Link Data', () => {
            couponFindStore.find('Button.couponShopBtn').simulate('click');
            const stub = sinon.stub(NavigationHelper, 'navigate');
            NavigationHelper.navigate('https://www.jcpenney.com', true);
            stub.calledWith('https://www.jcpenney.com', '_blank');
            stub.restore();
            expect(stub.called).to.be.true;
            expect(couponFindStore).to.exist;
        });
    });
});

describe('Dumb Component testing', () => {
    it('Test for checking handle Close Modal is called', () => {
        const couponData = {
            offers: [{}, {}],
            redeemingChannel: 'all',
            linkUrl: 'https://localhost:3000/?redirectTerm=men',
        };
        const test = shallow(<CouponCard couponData={couponData} />);
        const instance = test.instance();
        expect(instance).to.exist;
    });

    it('Test for checking handle Close Modal is called', () => {
        const actions = {
            applyAdjustment: () => { },
        };
        const couponData = {
            offers: [{}, {}],
            redeemingChannel: 'all',
            linkUrl: 'https://localhost:3000/?redirectTerm=men',
        };
        Cookies.save('DPOrder', '', '', '');
        Cookies.save('OrderId', 12345, '', '');
        const test = shallow(<CouponCard actions={actions} couponData={couponData} />);
        // test.find('Button').at(0).props().onClick();
        Cookies.save('DPOrder', 5, '', '');
        Cookies.save('OrderId', 12345, '', '');
        expect(test).to.exist;
    });
});
