import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import PasswordRequirements from './PasswordRequirements';
import PasswordValidater from '../../helpers/PasswordValidator/PasswordValidater';

let errorMessage = '';
const password = 'Tes4%2477';
const userFirstName = 'Jigar';
const userLastName = 'patel';
const userEmail = 'jpatel002@meevo.com';

describe('<PasswordRequirements/>', () => {
    let wrapper;
    const validations = {
        hasReqLength: PasswordValidater.validate(password, 0),
        hasUpperCase: PasswordValidater.validate(password, 1),
        hasLowerCase: PasswordValidater.validate(password, 2),
        hasNumber: PasswordValidater.validate(password, 3),
        hasConsecutiveChars: PasswordValidater.validate(password, 4),
        hasSpace: PasswordValidater.validate(password, 5),
        hasJcpWord: PasswordValidater.validate(password, 6),
        hasUserFirstName: PasswordValidater.validate(password, 7, userFirstName),
        hasUserLastName: PasswordValidater.validate(password, 7, userLastName),
        hasUserEmail: PasswordValidater.validate(password, 8, userEmail),
        hasNotAllowedSpecials: PasswordValidater.validate(password, 9),
    };

    beforeEach(() => {
        wrapper = mount(
            <PasswordRequirements
                PasswordValiations={validations}
                minimumReqMet
                showInlineErrorOnly={false}
                errorMsg={errorMessage}
                showRequirements={false}
                emptyInputError={false}
            />);
    });

    it('PasswordRequirements component should not exist for provided valid password', () => {
        expect(wrapper.find('div')).to.have.length(0);
    });

    it('PasswordRequirements component should exist with inline error which has no uppercase', () => {
        validations.hasUpperCase = false;
        validations.hasLowerCase = true;
        validations.hasNumber = true;
        validations.hasReqLength = true;
        errorMessage = 'password does not meet requirements';
        wrapper.setProps({
            PasswordValiations: validations,
            minimumReqMet: false,
            errorMsg: errorMessage,
            showInlineErrorOnly: false,
        });
        expect(wrapper.find('.requirementsWrapper')).to.have.length(1);
        expect(wrapper.find('MessageBox')).to.have.length.of.at.least(1);
        expect(wrapper.find('MessageBox').text()).to.contains(errorMessage);
        expect(wrapper.find({ 'data-automation-id': 'at-accPO-2ndRequirement' }).find('Icon').html()).to.contains('icon-error-2');
        expect(wrapper.find({ 'data-automation-id': 'at-accPO-1stRequirement' }).find('Icon').html()).to.contains('icon-green-check');
        expect(wrapper.find({ 'data-automation-id': 'at-accPO-3rdRequirement' }).find('Icon').html()).to.contains('icon-green-check');
        expect(wrapper.find({ 'data-automation-id': 'at-accPO-4thRequirement' }).find('Icon').html()).to.contains('icon-green-check');
    });

    it('PasswordRequirements component should exist with inline error which has no lowercase, no number and not met required length', () => {
        validations.hasUpperCase = true;
        validations.hasLowerCase = false;
        validations.hasNumber = false;
        validations.hasReqLength = false;
        errorMessage = 'password does not meet requirements';
        wrapper.setProps({
            PasswordValiations: validations,
            minimumReqMet: false,
            errorMsg: errorMessage,
            showInlineErrorOnly: false,
        });
        expect(wrapper.find('.requirementsWrapper')).to.have.length(1);
        expect(wrapper.find('MessageBox')).to.have.length.of.at.least(1);
        expect(wrapper.find('MessageBox').text()).to.contains(errorMessage);
        expect(wrapper.find({ 'data-automation-id': 'at-accPO-2ndRequirement' }).find('Icon').html()).to.contains('icon-green-check');
        expect(wrapper.find({ 'data-automation-id': 'at-accPO-1stRequirement' }).find('Icon').html()).to.contains('icon-error-2');
        expect(wrapper.find({ 'data-automation-id': 'at-accPO-3rdRequirement' }).find('Icon').html()).to.contains('icon-error-2');
        expect(wrapper.find({ 'data-automation-id': 'at-accPO-4thRequirement' }).find('Icon').html()).to.contains('icon-error-2');
    });

    it('component ', () => {
        wrapper.setProps({
            showInlineErrorOnly: true,
            errorMsg: errorMessage,
        });
        expect(wrapper.find('MessageBox')).to.have.length(1);
        expect(wrapper.find('.requirementsWrapper')).to.have.length(0);
    });
});
