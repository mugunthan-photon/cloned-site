import { expect } from 'chai';
import calculatePasswordScore from './CalculatePasswordScore';

describe('calculatePasswordScore Test Cases', () => {
    it('Check password score for all small letters of length 8 ', () => {
        expect(calculatePasswordScore('testinga')).to.equal(9);
    });
    it('Check password score for all capital letters of length 8 ', () => {
        expect(calculatePasswordScore('TESTINGA')).to.equal(41);
    });
    it('Check password score for all numbers of length 8 ', () => {
        expect(calculatePasswordScore('12345678')).to.equal(41);
    });
    it('Check password score for all special characters of length 8 ', () => {
        expect(calculatePasswordScore('!@#$%^&*')).to.equal(41);
    });
    it('Check password score for all combinations of length less than 12  ', () => {
        expect(calculatePasswordScore('Testing@1')).to.equal(26);
    });
    it('Check password score for all combinations of length grater than 13  ', () => {
        expect(calculatePasswordScore('Testing@1djknkjcds')).to.equal(40);
    });
    it('Check password score for empty string', () => {
        expect(calculatePasswordScore('')).to.equal(0);
    });
});
