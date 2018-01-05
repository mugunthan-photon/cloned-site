import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import RenderIcon from './RenderIcon/RenderIcon';
import * as styles from './PasswordRequirements.css';

const cx = classNames.bind(styles);

class PasswordRequirements extends Component {
    static propTypes = {
        PasswordValiations: PropTypes.objectOf(PropTypes.bool).isRequired,
        showInlineErrorOnly: PropTypes.bool,
        errorMsg: PropTypes.string,
        showRequirements: PropTypes.bool,
        minimumReqMet: PropTypes.bool,
        emptyInputError: PropTypes.bool,
    };

    static defaultProps = {
        PasswordValiations: {},
        showInlineErrorOnly: false,
        errorMsg: '',
        showRequirements: false,
        minimumReqMet: false,
        emptyInputError: false,
    };

    render() {
        const {
            PasswordValiations,
            showRequirements,
            showInlineErrorOnly,
            errorMsg,
            minimumReqMet,
            emptyInputError,
        } = this.props;
        if ((showInlineErrorOnly || minimumReqMet || emptyInputError) && errorMsg) {
            return (
                <MessageBox type="error" level="inline" title={errorMsg} data-automation-id="at-accPO-InlineErrorMsg" />
            );
        }

        if ((!showRequirements || minimumReqMet) && !errorMsg) {
            return null;
        }

        return (
            <div
                data-automation-id="at-accPO-reqWrapper"
                className={cx('requirementsWrapper', 'sm12', 'md12', 'lg12')}
            >
                {errorMsg ?
                    <div className={styles.errorAlignment}>
                        <MessageBox type="error" level="inline" title={errorMsg} data-automation-id="at-accPO-InlineErrorMsg" />
                    </div> : null
                }
                <div className={styles.requirementsList}>
                    <p
                        data-automation-id="at-accPO-requirementsLabel"
                        className={styles.requirementLabel}
                    >
                        Requirements
                    </p>
                    <p data-automation-id="at-accPO-1stRequirement">
                        {PasswordValiations.hasReqLength ?
                            <RenderIcon
                                iconName="icon-green-check"
                            /> :
                            <RenderIcon
                                iconName="icon-error-2"
                            />
                        }
                        &nbsp; use 8-16 characters
                    </p>
                    <p data-automation-id="at-accPO-2ndRequirement">
                        {PasswordValiations.hasUpperCase ?
                            <RenderIcon
                                iconName="icon-green-check"
                            /> :
                            <RenderIcon
                                iconName="icon-error-2"
                            />
                        }
                        &nbsp; use at least one uppercase letter
                    </p>
                    <p data-automation-id="at-accPO-3rdRequirement">
                        {PasswordValiations.hasLowerCase ?
                            <RenderIcon
                                iconName="icon-green-check"
                            /> :
                            <RenderIcon
                                iconName="icon-error-2"
                            />
                        }
                        &nbsp; use at least one lowercase letter
                    </p>
                    <p data-automation-id="at-accPO-4thRequirement">
                        {PasswordValiations.hasNumber ?
                            <RenderIcon
                                iconName="icon-green-check"
                            /> :
                            <RenderIcon
                                iconName="icon-error-2"
                            />
                        }
                        &nbsp; use a number
                    </p>
                </div>
            </div>
        );
    }
}

export default PasswordRequirements;
