import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import Input from 'yoda-core-components/lib/components/Input/Input';
import RenderIcon from '../PasswordRequirements/RenderIcon/RenderIcon';
import PasswordRequirements from '../PasswordRequirements/PasswordRequirements';
import PasswordStrengthMeter from '../PasswordStrengthMeter/PasswordStrengthMeter';
import calculatePasswordScore from '../../helpers/PasswordScoreCalculator/CalculatePasswordScore';
import PasswordValidater from '../../helpers/PasswordValidator/PasswordValidater';
import { createAccountErrorMessages } from '../../common/Constants';

import * as styles from './CreatePasswordInput.css';

const cx = classNames.bind(styles);

class CreatePasswordInput extends Component {
    static propTypes = {
        userEmail: PropTypes.string.isRequired,
        userFirstName: PropTypes.string.isRequired,
        userLastName: PropTypes.string.isRequired,
        isPasswordValidated: PropTypes.func,
        emptyInputError: PropTypes.bool,
        placeholder: PropTypes.string,
        autoComplete: PropTypes.string,
        reset: PropTypes.bool,
    };

    static defaultProps = {
        userEmail: '',
        userFirstName: '',
        userLastName: '',
        isPasswordValidated: null,
        emptyInputError: false,
        placeholder: null,
        autoComplete: 'on',
        reset: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            passwordValue: '',
            type: 'password',
            FieldOnFocus: false,
            validations: {},
            passwordScore: 0,
            errorMessage: '',
            minimumReqMet: false,
            invalidPassword: false,
            showInlineError: false,
            showRequirements: false,
        };
        this.onPasswordFocus = this.onPasswordFocus.bind(this);
        this.onPasswordBlur = this.onPasswordBlur.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.showHide = this.showHide.bind(this);
        this.clearValue = this.clearValue.bind(this);
    }

    // show error message when user taps on create account without entering a password
    componentWillReceiveProps(nextProps) {
        if (nextProps.emptyInputError && this.state.passwordValue === '') {
            this.setState({ errorMessage: createAccountErrorMessages.EMPTY_INPUT_ERROR });
        }
        if (!this.props.reset && nextProps.reset) {
            this.setState({
                passwordValue: '',
            });
        }
    }

    onPasswordFocus() {
        this.setState({
            showInlineError: true,
            showRequirements: true,
            FieldOnFocus: true,
        });
    }

    onPasswordBlur() {
        this.setState({
            showRequirements: false,
            showInlineError: true,
        });

        if (this.state.passwordValue === '') {
            this.setState({ errorMessage: createAccountErrorMessages.EMPTY_INPUT_ERROR });
        }
    }

    onPasswordChange(value) {
        let minimumReqMet = false;
        let invalidPassword = true;
        this.setState({
            passwordValue: value,
            showInlineError: false,
        });
        if (value === '' || value) {
            const result = this.validatePassword(
                value,
                this.props.userFirstName,
                this.props.userLastName,
                this.props.userEmail);
            minimumReqMet = result.minimumReqMet;
            invalidPassword = result.invalidPassword;
        }
        // check if user met all requirements and password is valid,
        // then send password to CreateAccountPostOrder for form submit
        if (minimumReqMet && !invalidPassword) {
            this.props.isPasswordValidated(true, value);
        } else {
            this.props.isPasswordValidated(false);
        }
    }

    validatePassword (password, userFirstName, userLastName, userEmail) {
        let errorMessage = '';
        let passwordScore = 0;
        let minimumReqMet = false;
        let invalidPassword = false;
        const validations = { ...this.state.validations };

        if (password === '') {
            errorMessage = createAccountErrorMessages.EMPTY_INPUT_ERROR;
            passwordScore = 0;
        }
        validations.hasReqLength = PasswordValidater.validate(password, 0);
        validations.hasUpperCase = PasswordValidater.validate(password, 1);
        validations.hasLowerCase = PasswordValidater.validate(password, 2);
        validations.hasNumber = PasswordValidater.validate(password, 3);
        validations.hasConsecutiveChars = PasswordValidater.validate(password, 4);
        validations.hasSpace = PasswordValidater.validate(password, 5);
        validations.hasJcpWord = PasswordValidater.validate(password, 6);
        validations.hasUserFirstName = PasswordValidater.validate(password, 7, userFirstName);
        validations.hasUserLastName = PasswordValidater.validate(password, 7, userLastName);
        validations.hasUserEmail = PasswordValidater.validate(password, 8, userEmail);
        validations.hasNotAllowedSpecials = PasswordValidater.validate(password, 9);

        if (!validations.hasReqLength || !validations.hasUpperCase ||
            !validations.hasLowerCase || !validations.hasNumber) {
            errorMessage = createAccountErrorMessages.MINIMUM_REQ_NOT_MET_ERROR;
        }
        if (validations.hasConsecutiveChars || validations.hasSpace || validations.hasJcpWord ||
            validations.hasUserFirstName || validations.hasUserLastName ||
            validations.hasUserEmail) {
            errorMessage = createAccountErrorMessages.MISC_CHARS_ERROR;
            invalidPassword = true;
        }

        if (validations.hasNotAllowedSpecials) {
            errorMessage = createAccountErrorMessages.NON_ALLOWED_SPECIALS_ERROR;
        }
        if (validations.hasReqLength && validations.hasUpperCase &&
            validations.hasLowerCase && validations.hasNumber) {
            passwordScore = calculatePasswordScore(password);
            minimumReqMet = true;
        }
        this.setState({ validations,
            passwordScore,
            errorMessage,
            minimumReqMet,
            invalidPassword });

        return { minimumReqMet, invalidPassword };
    }

    clearValue(e) {
        e.preventDefault();
        this.setState({
            passwordValue: '',
        });
    }

    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'password' ? 'text' : 'password',
            errorMessage: '',
        });
    }

    render() {
        const { validations,
            passwordScore,
            errorMessage,
            minimumReqMet,
            invalidPassword } = this.state;
        return (
            <div className={styles.createPassword}>
                <p data-automation-id="at-accPO-passwordLabel" htmlFor="password" className={cx('passwordLabel')}>
                    { this.props.placeholder ? this.props.placeholder : 'Create Password'}
                </p>
                {/* To show and hide strength meter based on score of password */}
                {(passwordScore && passwordScore > 0) ?
                    <div className={cx('passwordMeterWrap')}>
                        <PasswordStrengthMeter showMeter passwordScore={passwordScore} />
                    </div> : null
                }

                {this.state.FieldOnFocus ?
                    <a href="" tabIndex="-1" onClick={this.showHide}>
                        <span className={styles.showHideIcon}>
                            {
                                this.state.type === 'password' ?
                                    <RenderIcon iconName="icon-eye" /> :
                                    <RenderIcon iconName="icon-eye-crossed-out" />
                            }
                        </span>
                    </a> : null
                }

                <Input
                    id="password"
                    name="password"
                    type={this.state.type}
                    placeholder={this.props.placeholder ? this.props.placeholder : 'create password'}
                    data-automation-id="at-accPO-password-field"
                    value={this.state.passwordValue}
                    autoComplete={this.props.autoComplete}
                    theme={cx('passwordField', errorMessage ? 'errorPasswordField' : null)}
                    onFocus={this.onPasswordFocus}
                    onBlur={this.onPasswordBlur}
                    onChange={this.onPasswordChange}
                />

                {/* to clear out field on click of 'X' icon */}
                {(this.state.passwordValue !== '') ?
                [(minimumReqMet && !invalidPassword) ?
                    <span className={styles.passwordOK}>
                        <RenderIcon iconName="icon-green-check" />
                    </span> :
                    <a href="" onClick={this.clearValue}>
                        <span className={styles.clearValue}>
                            <RenderIcon iconName="icon-close" />
                        </span>
                    </a>,
                ] : null
                }
                {this.state.passwordValue !== '' || errorMessage ?
                    <PasswordRequirements
                        PasswordValiations={validations}
                        minimumReqMet={minimumReqMet}
                        showInlineErrorOnly={this.state.showInlineError}
                        errorMsg={errorMessage}
                        showRequirements={this.state.showRequirements}
                        emptyInputError={this.state.passwordValue ? false : this.props.emptyInputError}
                    /> : null
                }
            </div>
        );
    }
}

export default CreatePasswordInput;
