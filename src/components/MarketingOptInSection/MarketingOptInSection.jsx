import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import * as styles from './MarketingOptInSection.css';

const cx = classNames.bind(styles);

const inputTypes = [
    'email',
    'tel',
    'number',
    'text',
];

export default class MarketingOptInSection extends Component {
    /**
     * Supported React properties
     * @type {Object}
     * buttonType can be anyone of BUTTON_TYPES from <Button> Component
     */
    static defaultProps = {
        type: '',
        placeholder: '',
        buttonType: '',
        children: '',
        customClass: '',
        customInputClass: '',
        submitCallback: null,
        onChangeCallback: null,
        refCallback: null,
        defaultValue: '',
        btnDataId: '',
        automationId: '',
        buttonClass: '',
        showInputPhoneIcon: false,
        showInputEmailIcon: false,
        formattedPhoneNum: '',
        buttonWrap: '',
        handleClearInputVal: null,
        oldFooterData: false,
    };

    static propTypes = {
        type: PropTypes.oneOf(inputTypes),
        placeholder: PropTypes.string,
        buttonType: PropTypes.string,
        children: PropTypes.string,
        customClass: PropTypes.string,
        customInputClass: PropTypes.string,
        btnDataId: PropTypes.string,
        submitCallback: PropTypes.func,
        handleClearInputVal: PropTypes.func,
        onChangeCallback: PropTypes.func,
        refCallback: PropTypes.func,
        defaultValue: PropTypes.string,
        buttonClass: PropTypes.string,
        formattedPhoneNum: PropTypes.string,
        buttonWrap: PropTypes.string,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        automationId: PropTypes.string,
        showInputPhoneIcon: PropTypes.bool,
        showInputEmailIcon: PropTypes.bool,
        oldFooterData: PropTypes.bool,
    };

    constructor() {
        super();
        this.submitForm = this.submitForm.bind(this);
        this.valueChanged = this.valueChanged.bind(this);

        this.state = {
            value: '',
            displayCrossBar: false,
            crossBarFocused: false,
            setFormattedNum: '',
        };
    }

    /* istanbul ignore next */
    componentWillMount() {
        /* istanbul ignore next */
        if (this.props.defaultValue) {
            this.setState({ value: this.props.defaultValue });
        }
    }
    /* istanbul ignore next */
    componentDidMount() {
        /* istanbul ignore next */
        this.unmount = browserHistory.listen(() => {
            if (this.state.value) {
                this.setState({ value: '' });
                this.setState({ setFormattedNum: '' });
            }
        });
    }
    /* istanbul ignore next */
    componentWillReceiveProps(nextProps) {
        /* istanbul ignore next */
        if (!this.props.defaultValue && nextProps.defaultValue) {
            this.setState({ value: nextProps.defaultValue });
        }
    }

    componentWillUnmount() {
        this.unmount();
    }

    onCorssBarFocused = (currentState) => {
        this.setState({ crossBarFocused: currentState });
    }
    unmount = null;
    toggleCrossBar = (currentState) => {
        const { crossBarFocused } = this.state;
        if (!crossBarFocused) {
            this.setState({ displayCrossBar: currentState });
        }
    }

    clearSearch = () => {
        this.setState({ value: '' });
        if (this.props.handleClearInputVal) {
            this.props.handleClearInputVal();
        }
    }

    valueChanged(event) {
        this.setState({ value: event.target.value });
        this.setState({ setFormattedNum: this.props.formattedPhoneNum });
        if (this.props.onChangeCallback) {
            this.props.onChangeCallback(event.target.value);
        }
    }

    submitForm(event) {
        const { showInputPhoneIcon, showInputEmailIcon, oldFooterData } = this.props;
        if (this.props.submitCallback) {
            this.props.submitCallback();
            if (showInputPhoneIcon || showInputEmailIcon || oldFooterData) {
                this.clearSearch();
            }
        }

        event.preventDefault();
    }
    /**
     * Renders the basic outer skeleton required to render the MarketingOptInSection
     * @return {ReactComponent}
     */

    renderInputIcon = () => {
        let inputIcon;
        const {
            showInputEmailIcon,
            showInputPhoneIcon } = this.props;

        if (showInputPhoneIcon || showInputEmailIcon) {
            const iconName = (showInputEmailIcon ? 'mail-fill' : 'phone');
            inputIcon = (
                <span className={styles.iconBlock}>
                    <Icon iconType="svg" classNames="icon" viewBox="0 0 26 26" width="26px" height="26px" automationId="input-icon" name={iconName} pathClassName={styles.errorIconColor}/>
                </span>
            );
        } else { inputIcon = null; }

        return (
            <span>{ inputIcon }</span>
        );
    }

    render() {
        const {
            btnDataId,
            buttonType,
            buttonClass,
            customClass,
            children,
            automationId,
            buttonWrap,
            type,
            placeholder,
            customInputClass,
            refCallback,
        } = this.props;

        const { value, displayCrossBar, crossBarFocused } = this.state;

        return (
            <form onSubmit={this.submitForm}>
                <div className={cx('marketingOptInSection', customClass)} data-automation-id={automationId}>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputwithIcon}>
                            <input
                                className={cx('marketingOptInInput', customInputClass)}
                                data-automation-id="marketing-input"
                                type={type}
                                ref={refCallback}
                                placeholder={placeholder}
                                aria-required="true"
                                value={(this.props.formattedPhoneNum ? this.props.formattedPhoneNum : this.state.value)}
                                onFocus={() => this.toggleCrossBar(true)}
                                onBlur={() => this.toggleCrossBar(false)}
                                onChange={this.valueChanged}
                            />
                            {this.renderInputIcon()}
                        </div>
                        {value.length && (displayCrossBar || crossBarFocused) ?
                            <button
                                className={styles.crossBar}
                                onClick={this.clearSearch}
                                type="button"
                                onMouseEnter={() => this.onCorssBarFocused(true)}
                                onMouseLeave={() => this.onCorssBarFocused(false)}
                            >
                                <Icon
                                    iconType="svg" className={'arrow-icon'} width="10px" height="10px"
                                    viewBox="0 0 20 20"
                                    name="cross"
                                    pathClassName={styles.closeIcon}
                                />
                            </button> : ''
                      }

                    </div>

                    <div className={cx(styles.buttonWrapper, buttonWrap)}>
                        <Button
                            btnDataId={btnDataId}
                            type="button"
                            buttonType={buttonType}
                            automationId="marketing-button"
                            className={cx('marketingOptInBtn', buttonClass)}
                            onClick={this.submitForm}
                        >{children}</Button>
                    </div>
                </div>
            </form>
        );
    }
}
