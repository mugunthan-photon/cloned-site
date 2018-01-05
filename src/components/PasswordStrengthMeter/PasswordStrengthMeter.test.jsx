import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';

import PasswordStrengthMeter from './PasswordStrengthMeter';

describe('<PasswordStrengthMeter/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<PasswordStrengthMeter passwordScore={46} showMeter/>);
    });

    it('PasswordStrengthMeter component must exist', () => {
        expect(wrapper).to.exist;
    });

    it('PasswordStrengthMeter component has passwordScore defined', () => {
        expect(wrapper.props().passwordScore).to.be.defined;
    });

    it('PasswordStrengthMeter component must have showMeter flag to be defined', () => {
        expect(wrapper.props().showMeter).to.be.defined;
    });


    it('PasswordStrengthMeter component should have class strongPwd when password score is' +
        'more than 27 and less than 56', () => {
        expect(wrapper.find('.passwordMeter').hasClass('strongPwd')).to.equal(true);
    });

    it('PasswordStrengthMeter component should have class goodPwd when password score is less than 27', () => {
        wrapper.setProps({
            passwordScore: 20,
        });
        expect(wrapper.find('.passwordMeter').hasClass('goodPwd')).to.equal(true);
    });

    it('PasswordStrengthMeter component should have class veryStrongPwd when password score is more than 56', () => {
        wrapper.setProps({
            passwordScore: 60,
        });
        expect(wrapper.find('.passwordMeter').hasClass('veryStrongPwd')).to.equal(true);
    });

    it('PasswordStrengthMeter should be hide for passing false for showMeter prop', () => {
        wrapper.setProps({
            showMeter: false,
        });
        expect(wrapper.props().showMeter).to.equal(false);
        expect(wrapper.text()).to.equal('');
    });
});
