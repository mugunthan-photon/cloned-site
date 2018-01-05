import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import CouponAppliedModal from './CouponAppliedModal';
import { termsText } from '../../../test/mockData/CouponsData';
import * as Config from '../CouponCard/CouponConfig';

describe('Component:CouponAppliedModal - 1', () => {
    const wrapper = mount(
        <CouponAppliedModal
            savings="10"
            currency="USD"
            message={termsText}
            onClose={() => false}
        />,
    );

    it('CouponAppliedModal component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('CouponAppliedModal component should have CTA buttons', () => {
        // Expect 3 as close button is also present
        expect(wrapper.find(ModalBox).find('button')).to.exist;
    });

    it('Continue Checkout button is clicked', () => {
        const windowBkp = global.window;
        global.window = {
            location: {
                href: 'http://m.jcpenney.com/',
            },
        };
        wrapper.find('[data-automation-id="coupon-checkout"]').simulate('click');
        expect(window.location.href).to.not.deep.equal('http://m.jcpenney.com/');
        // reset window object else other test cases breaking
        global.window = windowBkp;
    });
});

describe('Component:CouponAppliedModal - 2', () => {
    const wrapper = mount(
        <CouponAppliedModal
            title=""
            savings=""
            currency=""
            message={termsText}
            onClose={() => false}
            channel="BOF"
        />,
    );

    it('CouponAppliedModal component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('CouponAppliedModal component should have 2 CTA buttons', () => {
        expect(wrapper.find(ModalBox).find('button')).to.have.length(2);
    });
});

describe('Component:CouponAppliedModal - 3', () => {
    const wrapper = mount(
        <CouponAppliedModal
            savings="10"
            currency="USD"
            message={termsText}
            onClose={() => false}
            channel="BOF"
        />,
    );

    it('CouponAppliedModal component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('CouponAppliedModal component should have CTA buttons', () => {
        expect(wrapper.find(ModalBox).find('button')).to.exist;
    });
});

describe('Component:CouponAppliedModal - 1', () => {
    const wrapper = mount(
        <CouponAppliedModal
            savings="10"
            currency="USD"
            message={Config.COUPON_QUAL_ORIG_MSG}
            onClose={() => false}
        />,
    );

    it('CouponAppliedModal component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('CouponAppliedModal component should have CTA buttons', () => {
        // Expect 3 as close button is also present
        expect(wrapper.find(ModalBox).find('button')).to.exist;
    });

    it('Continue Checkout button is clicked', () => {
        const windowBkp = global.window;
        global.window = {
            location: {
                href: 'http://m.jcpenney.com/',
            },
        };
        wrapper.find('[data-automation-id="coupon-checkout"]').simulate('click');
        expect(window.location.href).to.not.deep.equal('http://m.jcpenney.com/');
        // reset window object else other test cases breaking
        global.window = windowBkp;
    });
});
