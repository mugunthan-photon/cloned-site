import { expect } from 'chai';
import PasswordValidater from './PasswordValidater';

const validPassword = 'Testing@123!';

describe('PasswordValidater Test Cases', () => {
    it('For given valid password should meet the length validations', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.LENGTHMET)).to.equal(true);
    });
    it('For given password lenght less than 8 should fail the length validations', () => {
        expect(PasswordValidater.validate('test', PasswordValidater.TYPE.LENGTHMET)).to.equal(false);
    });

    it('For given valid password should meet the uppercase validations', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.UPPERCASE)).to.equal(true);
    });
    it('For given password with only uppercase letters should fail password validations', () => {
        expect(PasswordValidater.validate('TEST', PasswordValidater.TYPE.LOWERCASE)).to.equal(false);
        expect(PasswordValidater.validate('TEST', PasswordValidater.TYPE.NUMBER)).to.equal(false);
    });

    it('For given valid password should meet the lowercase validations', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.LOWERCASE)).to.equal(true);
    });
    it('For given password with only lowercase letters should fail password validations', () => {
        expect(PasswordValidater.validate('test', PasswordValidater.TYPE.UPPERCASE)).to.equal(false);
        expect(PasswordValidater.validate('test', PasswordValidater.TYPE.NUMBER)).to.equal(false);
    });

    it('For given valid password should meet the number validations', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.NUMBER)).to.equal(true);
    });
    it('For given password with only numbers should fail password validations', () => {
        expect(PasswordValidater.validate('123', PasswordValidater.TYPE.UPPERCASE)).to.equal(false);
        expect(PasswordValidater.validate('123', PasswordValidater.TYPE.LOWERCASE)).to.equal(false);
    });

    it('Give password should not have consecutive characters', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.CONSECUTIVECHARS)).to.equal(false);
    });
    it('For given password with consecutive letters should fail password validations', () => {
        expect(PasswordValidater.validate('tttttteeee', PasswordValidater.TYPE.CONSECUTIVECHARS)).to.equal(true);
    });

    it('Given password should not have spaces', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.SPACES)).to.equal(false);
    });
    it('Given password with spaces should fail password validations', () => {
        expect(PasswordValidater.validate('test er', PasswordValidater.TYPE.SPACES)).to.equal(true);
    });

    it('Given password should not have Jcp word', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.JCPWORD)).to.equal(false);
    });
    it('Given password with JCP word should fail password validations', () => {
        expect(PasswordValidater.validate('testJCP', PasswordValidater.TYPE.JCPWORD)).to.equal(true);
    });

    it('Given password should not contain user name', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.USERNAME, 'tester')).to.equal(false);
    });
    it('Given password contains user name should fail password validations', () => {
        expect(PasswordValidater.validate('testertes', PasswordValidater.TYPE.USERNAME, 'tester')).to.equal(true);
    });

    it('Given password should not contain user email id ', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.EMAIL, 'tester@dd.com')).to.equal(false);
    });
    it('Given password contains user email id should not fail password validations', () => {
        expect(PasswordValidater.validate('tester@dd.com', PasswordValidater.TYPE.EMAIL, 'tester@dd.com')).to.equal(true);
    });

    it('Given password should not contain not allowed special characters', () => {
        expect(PasswordValidater.validate(validPassword, PasswordValidater.TYPE.SPECIALCHARS)).to.equal(false);
    });
    it('Given password contain not allowed special characters should fail password validations', () => {
        expect(PasswordValidater.validate('ytfd¢¶', PasswordValidater.TYPE.SPECIALCHARS)).to.equal(true);
    });

    it('Given valid password to validate with no validation type should return the same password', () => {
        expect(PasswordValidater.validate(validPassword, 10)).to.equal(validPassword);
    });

    it('For given empty password validations should not break', () => {
        const password = '';
        expect(PasswordValidater.validate(password, 0)).to.equal(false);
        expect(PasswordValidater.validate(password, 1)).to.equal(false);
        expect(PasswordValidater.validate(password, 2)).to.equal(false);
        expect(PasswordValidater.validate(password, 3)).to.equal(false);
        expect(PasswordValidater.validate(password, 4)).to.equal(false);
        expect(PasswordValidater.validate(password, 5)).to.equal(false);
        expect(PasswordValidater.validate(password, 6)).to.equal(false);
        expect(PasswordValidater.validate(password, 7, 'tester')).to.equal(false);
        expect(PasswordValidater.validate(password, 8, 'tester@dd.com')).to.equal(false);
        expect(PasswordValidater.validate(password, 9)).to.equal(false);
    });
});
