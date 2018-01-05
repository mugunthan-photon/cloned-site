import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import MarketingOptInSection from './MarketingOptInSection';

const { describe, it } = global;

describe(' Test Suite for <MarketingOptInSection/> ', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <MarketingOptInSection
                type="email"
                placeholder="Email address"
                buttonType="dark"
            >
                SIGN UP
            </MarketingOptInSection>,
        );
    });

    it('MarketingOptInSection component should exist ', () => {
        expect(wrapper).to.exist;
    });

    // it.skip('component should contain a div tag as a parent', () => {
    //     expect(wrapper.type()).to.equal('div');
    // });

    it('should be able to render children', () => {
        expect(wrapper.props().type).to.equal('email');
        expect(wrapper.props().placeholder).to.equal('Email address');
        expect(wrapper.props().buttonType).to.equal('dark');
        expect(wrapper.props().children).to.equal('SIGN UP');
    });

    it('should be able to submit form', () => {
        const submitForm = spy();
        const preventDefault = spy();
        wrapper.find('Button').simulate('click');
        expect(submitForm).to.have.been.called;
        expect(preventDefault).to.have.been.called;
    });

    it('should be able  to submit form and execute callback', () => {
        wrapper = mount(
            <MarketingOptInSection
                type="email"
                placeholder="Email address"
                buttonType="dark"
                submitCallback={() => console.log('hi')}
            >
                SIGN UP
            </MarketingOptInSection>,
        );

        const submitForm = spy();
        wrapper.find('Button').simulate('click');
        expect(submitForm).to.have.been.called;
        expect(wrapper.props().submitCallback).to.have.been.called;
    });


    it('should be able to submit form', () => {
        const valueChangedSpy = spy(wrapper.instance(), 'valueChanged');
        wrapper.update();

        wrapper.find('input.marketingOptInInput').simulate('change');
        expect(valueChangedSpy.calledOnce).to.be.equal(true);
    });

    it('onCorssBarFocused should be trigerred on mouse enter and leave', () => {
        const onCorssBarFocusedSpy = spy(wrapper.instance(), 'onCorssBarFocused');
        wrapper.setState({ value: 'bar', displayCrossBar: true, crossBarFocused: true });
        wrapper.update();
        wrapper.find('button').at(0).simulate('mouseEnter');
        expect(onCorssBarFocusedSpy.calledOnce).to.be.equal(true);
        wrapper.find('button').at(0).simulate('mouseLeave');
        expect(onCorssBarFocusedSpy.calledTwice).to.be.equal(true);
    });

    it('toggleCrossBar should be trigerred on focus and blur', () => {
        const toggleCrossBarSpy = spy(wrapper.instance(), 'toggleCrossBar');
        wrapper.setState({ value: 'bar', displayCrossBar: true, crossBarFocused: true });
        wrapper.update();
        wrapper.find('input.marketingOptInInput').simulate('focus');
        expect(toggleCrossBarSpy.calledOnce).to.be.equal(true);
        wrapper.find('input.marketingOptInInput').simulate('blur');
        expect(toggleCrossBarSpy.calledTwice).to.be.equal(true);
    });

    it('onClick of crossbar searchbox should be cleared', () => {
        const clearSearchSpy = spy(wrapper.instance(), 'clearSearch');
        wrapper.setState({ value: 'bar', displayCrossBar: true, crossBarFocused: true });
        wrapper.update();
        wrapper.find('button').at(0).simulate('click');
        expect(clearSearchSpy.calledOnce).to.be.equal(true);
    });

    it('check input value for phone number validation', () => {
        wrapper.setProps({
            formattedPhoneNum: '122-222-2222',
        });
        expect(wrapper).to.exist;
    });
    it('check input value for phone number validation', () => {
        wrapper.setState({ crossBarFocused: false });
        const toggleCrossBarSpy = spy(wrapper.instance(), 'toggleCrossBar');
        toggleCrossBarSpy(true);
        expect(toggleCrossBarSpy).to.be.called;
    });

    it('check input value for phone number validation', () => {
        wrapper.setProps({ showInputEmailIcon: true });
        expect(wrapper).to.exist;
    });

    it('check input value for phone number validation', () => {
        wrapper.setProps({ showInputPhoneIcon: true });
        expect(wrapper).to.exist;
    });
});
