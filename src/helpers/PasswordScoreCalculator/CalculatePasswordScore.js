import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import words from 'lodash/words';

export default function calculatePasswordScore(password) {
    let score = 0;
    const containsUpperCase = /[A-Z]/g;
    const containsLowerCase = /[a-z]/g;
    const containsNumber = /\d/g;
    const upperCaseMatch = password.match(containsUpperCase);
    const lowerCaseMatch = password.match(containsLowerCase);
    const numberMatch = password.match(containsNumber);
    /* eslint no-control-regex: "error" */
    const specialCharsMatch = words(password, /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g);
    if (!isEmpty(upperCaseMatch) && upperCaseMatch.length > 0) {
        score += 5 * upperCaseMatch.length;
    }

    if (!isEmpty(lowerCaseMatch) && lowerCaseMatch.length > 0) {
        score += 1 * lowerCaseMatch.length;
    }
    if (!isEmpty(numberMatch) && numberMatch.length > 0) {
        score += 5 * numberMatch.length;
    }
    if (!isEmpty(specialCharsMatch) && !isNull(specialCharsMatch) && specialCharsMatch.length > 0) {
        score += 5 * specialCharsMatch.length;
    }
    if (password.length === 8) {
        score += 1;
    }
    if (password.length > 8 && password.length <= 12) {
        score += 5;
    }
    if (password.length >= 13) {
        score += 10;
    }
    if (password.length === 0) {
        score += 0;
    }
    return score;
}
