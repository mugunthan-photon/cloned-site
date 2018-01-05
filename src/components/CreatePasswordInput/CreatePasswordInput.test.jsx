import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import 'ignore-styles';

import CreatePasswordInput from './CreatePasswordInput';
import { createAccountErrorMessages } from '../../common/Constants';

const userFirstName = 'Jigar';
const userLastName = 'Patel';
const userEmail = 'jpatel002@meevo.com';

const mockCallBack = () => {};

describe('<CreatePasswordInput/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <CreatePasswordInput/>);
    });

    it('CreatePasswordInput component should exist', () => {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('RenderIcon')).to.have.length(0);
        expect(wrapper.find('PasswordRequirements')).to.have.length(0);
        expect(wrapper.find('Input')).to.have.length.of.at.least(1);
    });

    it('should have able to pass props', () => {
        wrapper.setProps({
            userEmail,
            userFirstName,
            userLastName,
            isPasswordValidated: mockCallBack,
            emptyInputError: false,
        });
        expect(wrapper.find('CreatePasswordInput').props().userEmail).to.equal(userEmail);
        expect(wrapper.find('CreatePasswordInput').props().userFirstName).to.equal(userFirstName);
        expect(wrapper.find('CreatePasswordInput').props().userLastName).to.equal(userLastName);
        expect(wrapper.find('CreatePasswordInput').props().emptyInputError).to.equal(false);
    });

    it('should have able to pass props on empty', () => {
        wrapper.setProps({
            userEmail,
            userFirstName,
            userLastName,
            isPasswordValidated: mockCallBack,
            emptyInputError: true,
        });
        expect(wrapper.find('CreatePasswordInput').props().userEmail).to.equal(userEmail);
        expect(wrapper.find('CreatePasswordInput').props().userFirstName).to.equal(userFirstName);
        expect(wrapper.find('CreatePasswordInput').props().userLastName).to.equal(userLastName);
        expect(wrapper.find('CreatePasswordInput').props().emptyInputError).to.equal(true);
    });

    it('component should execute onFocus callback and show eye icon', () => {
        const focusSpy = sinon.spy(wrapper.instance(), 'onPasswordFocus');
        wrapper.update();
        wrapper.find('input').at(0).simulate('focus');
        expect(focusSpy.calledOnce).to.equal(true);
        expect(wrapper.state().FieldOnFocus).to.equal(true);
        expect(wrapper.find('RenderIcon').find('Icon').html()).to.contains('icon-eye');
        wrapper.find('a').at(0).simulate('click');
        expect(wrapper.find('RenderIcon').find('Icon').html()).to.contains('icon-eye');
        expect(wrapper.state().type).to.equal('text');
        wrapper.find('a').at(0).simulate('click');
        expect(wrapper.find('RenderIcon').find('Icon').html()).to.contains('icon-eye');
        expect(wrapper.state().type).to.equal('password');
    });

    it('component should execute onBlur callback on blur of Input', () => {
        const blurSpy = sinon.spy(wrapper.instance(), 'onPasswordBlur');
        wrapper.update();
        wrapper.find('input').at(0).simulate('blur');
        expect(blurSpy.calledOnce).to.equal(true);
    });

    it('component should execute onBlur while Input is not empty', () => {
        wrapper.setProps({
            userEmail,
            userFirstName,
            userLastName,
            isPasswordValidated: mockCallBack,
            emptyInputError: false,
        });
        const blurSpy = sinon.spy(wrapper.instance(), 'onPasswordBlur');
        wrapper.find('input').at(0).simulate('change', { target: { value: 'Testing' } });
        wrapper.update();
        wrapper.find('input').at(0).simulate('blur');
        expect(blurSpy.calledOnce).to.equal(true);
    });

    it('component should have close Icon to clear password', () => {
        const wrapCreateAcc = mount(<CreatePasswordInput isPasswordValidated={mockCallBack} />);
        wrapCreateAcc.find('input').at(0).simulate('change', { target: { value: 'Testing' } });
        expect(wrapCreateAcc.find('RenderIcon').find('Icon').at(0).html()).to.contains('icon-close');
        wrapCreateAcc.find('a').simulate('click');
    });

    it('component should execute onChange callback on click of Input', () => {
        const wrapCreateAcc = mount(<CreatePasswordInput isPasswordValidated={mockCallBack} />);
        const changeSpy = sinon.spy(wrapCreateAcc.instance(), 'onPasswordChange');
        wrapCreateAcc.update();
        wrapCreateAcc.find('input').at(0).simulate('change', { target: { value: 'Testing123' } });
        expect(changeSpy.calledOnce).to.equal(true);
        expect(wrapCreateAcc.find('RenderIcon').find('Icon').html()).to.contains('icon-green-check');
        wrapCreateAcc.update();
        expect(wrapper.find('MessageBox').length).to.equal(0);
    });

    it('component should throw an error given password has name, email, spaces,' +
        'jcp or jcpenney, 3+ consecutive characters', () => {
        const wrapCreateAcc = mount(<CreatePasswordInput isPasswordValidated={mockCallBack} />);
        wrapCreateAcc.find('input').at(0).simulate('change', { target: { value: 'Test3433333' } });
        expect(
            wrapCreateAcc.find('MessageBox').at(0).html(),
        ).to.contains(createAccountErrorMessages.MISC_CHARS_ERROR);
    });

    it('component should throw an error given password has non allowed special characters', () => {
        const wrapCreateAcc = mount(<CreatePasswordInput isPasswordValidated={mockCallBack} />);
        wrapCreateAcc.find('input').at(0).simulate('change', { target: { value: 'Test™£¢rt56' } });
        expect(
            wrapCreateAcc.find('MessageBox').at(0).html(),
        ).to.contains(createAccountErrorMessages.NON_ALLOWED_SPECIALS_ERROR);
    });


    it('component should throw an error on empty password', () => {
        const wrapCreateAcc = mount(<CreatePasswordInput isPasswordValidated={mockCallBack} />);
        wrapCreateAcc.find('input').at(0).simulate('change', { target: { value: '' } });
        wrapper.update();
        expect(
            wrapCreateAcc.find('PasswordRequirements').prop('errorMsg'))
            .to.equal(createAccountErrorMessages.MINIMUM_REQ_NOT_MET_ERROR);
    });


    it('component should work for undefined values', () => {
        const wrapCreateAcc = mount(<CreatePasswordInput isPasswordValidated={mockCallBack} />);
        wrapCreateAcc.find('input').at(0).simulate('change', { target: { value: undefined } });
        expect(
            wrapCreateAcc.find('PasswordRequirements').prop('errorMsg'))
            .to.equal('');
    });

    it('component should reset input', () => {
        const wrapCreateAcc = mount(<CreatePasswordInput isPasswordValidated={mockCallBack} />);
        wrapCreateAcc.find('input').at(0).simulate('change', { target: { value: 'hi' } });
        wrapCreateAcc.update();
        wrapCreateAcc.setProps({ reset: true });
        wrapCreateAcc.update();
        expect(wrapCreateAcc.state().passwordValue).to.equal('');
    });
});
