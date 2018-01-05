import toLower from 'lodash/toLower';
import words from 'lodash/words';
import head from 'lodash/head';
import split from 'lodash/split';
import isUndefined from 'lodash/isUndefined';

const containsUpperCase = /[A-Z]/g;
const containsLowerCase = /[a-z]/g;
const containsNumber = /\d/g;
const containsMoreThanTwoConsecutiveChars = /(.)\1\1/i;
/* eslint no-control-regex: "error" */
const regexForInvalidSpecials = /[^A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g;


const validateLength = (value) => {
    let lengthCheck = false;
    if (value) {
        lengthCheck = (value.length >= 8 && value.length <= 16);
    }
    return lengthCheck;
};

const validateUpperCase = (value) => {
    let upperCaseCheck = false;
    if (value) {
        const matchValue = value.match(containsUpperCase);
        upperCaseCheck = matchValue ? matchValue.length > 0 : false;
    }
    return upperCaseCheck;
};

const validateLowerCase = (value) => {
    let lowerCaseCheck = false;
    if (value) {
        const matchValue = value.match(containsLowerCase);
        lowerCaseCheck = matchValue ? matchValue.length > 0 : false;
    }
    return lowerCaseCheck;
};

const validateNumber = (value) => {
    let numberCheck = false;
    if (value) {
        const matchValue = value.match(containsNumber);
        numberCheck = matchValue ? matchValue.length > 0 : false;
    }
    return numberCheck;
};

const validateConsecutiveChars = (value) => {
    let consecutiveCharCheck = false;
    if (value) {
        const lowerValue = toLower(value);
        consecutiveCharCheck = lowerValue ? containsMoreThanTwoConsecutiveChars.test(lowerValue) : false;
    }
    return consecutiveCharCheck;
};

const validateSpace = (value) => {
    let spaceCheck = false;
    if (value) {
        spaceCheck = value.indexOf(' ') > -1;
    }
    return spaceCheck;
};

const validateJcpWord = (value) => {
    let jcpWordCheck = false;
    if (value) {
        const formattedValue = toLower(value);
        jcpWordCheck = formattedValue ? formattedValue.indexOf('jcp') > -1 : false;
    }
    return jcpWordCheck;
};

const validateUserName = (value, valueToCompare) => {
    let userNameCheck = false;
    if (value && valueToCompare) {
        const formattedValue = toLower(value);
        const lowerComparedValue = toLower(valueToCompare);
        userNameCheck = formattedValue && lowerComparedValue ? formattedValue.indexOf(lowerComparedValue) > -1 : false;
    }
    return userNameCheck;
};

const validateEmail = (value, valueToCompare) => {
    let emailCheck = false;
    if (value && valueToCompare) {
        const formattedValue = toLower(value);
        const lowerComparedValue = toLower(head(split(valueToCompare, '@')));
        emailCheck = formattedValue && lowerComparedValue ? formattedValue.indexOf(lowerComparedValue) > -1 : false;
    }
    return emailCheck;
};

const validateSpecialChars = (value) => {
    let specialCharCheck = false;
    if (value) {
        const hasNonAllowedSpecials = words(value, regexForInvalidSpecials);
        if (!isUndefined(hasNonAllowedSpecials) && hasNonAllowedSpecials.length > 0) {
            specialCharCheck = true;
        }
    }
    return specialCharCheck;
};

class PasswordValidater {
    static TYPE = {
        LENGTHMET: 0,
        UPPERCASE: 1,
        LOWERCASE: 2,
        NUMBER: 3,
        CONSECUTIVECHARS: 4,
        SPACES: 5,
        JCPWORD: 6,
        USERNAME: 7,
        EMAIL: 8,
        SPECIALCHARS: 9,
    };

    static validate(value, type, valueToCompare) {
        switch (type) {
            case PasswordValidater.TYPE.LENGTHMET:
                return validateLength(value);
            case PasswordValidater.TYPE.UPPERCASE:
                return validateUpperCase(value);
            case PasswordValidater.TYPE.LOWERCASE:
                return validateLowerCase(value);
            case PasswordValidater.TYPE.NUMBER:
                return validateNumber(value);
            case PasswordValidater.TYPE.CONSECUTIVECHARS:
                return validateConsecutiveChars(value);
            case PasswordValidater.TYPE.SPACES:
                return validateSpace(value);
            case PasswordValidater.TYPE.JCPWORD:
                return validateJcpWord(value);
            case PasswordValidater.TYPE.USERNAME:
                return validateUserName(value, valueToCompare);
            case PasswordValidater.TYPE.EMAIL:
                return validateEmail(value, valueToCompare);
            case PasswordValidater.TYPE.SPECIALCHARS:
                return validateSpecialChars(value);
            default:
                return value;
        }
    }
}

export default PasswordValidater;
