import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './PasswordStrengthMeter.css';

/**
 * Strength Meter for create password form
 * @type number
 * expects score and shows the password meter bars with colors
 */

const cx = classNames.bind(styles);

const getActiveClass = (passwordScore) => {
    let activeClass = '';

    if (passwordScore > 0 && passwordScore <= 27) {
        activeClass = 'goodPwd';
    } else if (passwordScore > 27 && passwordScore <= 56) {
        activeClass = 'strongPwd';
    } else if (passwordScore > 56) {
        activeClass = 'veryStrongPwd';
    }

    return activeClass;
};

const PasswordStrengthMeter = ({ passwordScore, showMeter }) => (
    <div>
        {
            showMeter ? (
                <div className={cx('passwordMeter', getActiveClass(passwordScore))}>
                    <span data-automation-id="at-passwordStrengthLabel" className={styles.strengthLabel}>Strength</span>
                    <div data-automation-id="at-passwordStrength-1stBar" className={cx('passwordBar', 'firstBar')}/>
                    <div data-automation-id="at-passwordStrength-2ndBar" className={cx('passwordBar', 'secondBar')}/>
                    <div data-automation-id="at-passwordStrength-3rdBar" className={cx('passwordBar', 'thirdBar')}/>
                    <br/>
                </div>
            ) : ''
        }
    </div>
);


PasswordStrengthMeter.propTypes = {
    passwordScore: PropTypes.number.isRequired,
    showMeter: PropTypes.bool,
};

PasswordStrengthMeter.defaultProps = {
    passwordScore: 0,
    showMeter: true,
};

export default PasswordStrengthMeter;
