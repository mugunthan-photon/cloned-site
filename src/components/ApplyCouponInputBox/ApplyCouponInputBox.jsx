import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import each from 'lodash/each';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import Messages, { messagesActions } from '../Messages';
import { messagesLevels } from '../Messages/Messages.config';
import * as Constants from '../../common/Constants';
import * as Config from '../CouponCard/CouponConfig';
import CouponAppliedModal from '../CouponAppliedModal/CouponAppliedModal';
import SerialCodeInputModal from '../SerialCodeInputModal/SerialCodeInputModal';
import SiteComponent from '../SiteComponent/SiteComponent';
import * as adjustmentActions from '../../actions/AdjustmentAction';
import * as couponActions from '../../actions/CouponAction';
import * as analyticsActions from '../../actions/AnalyticsAction';
import * as styles from './ApplyCouponInputBox.css';

const cx = classNames.bind(styles);

const inputTypes = [
    'number',
    'text',
];

const couponNameList = [];

export const highlight = (name, query) => {
    const queryTrim = query.trim();
    const tempName = JSON.parse(JSON.stringify(name));
    if (queryTrim !== '') {
        const regex = new RegExp(`(${queryTrim})`, 'gi');
        const replace = '<strong>$1</strong>';
        return tempName.replace(regex, replace);
    }
    return tempName;
};

export class ApplyCouponInputBox extends SiteComponent {
    static defaultProps = {
        type: 'text',
        placeholder: Constants.couponErrorMessages.INPUT_BOX_PLACEHOLDER,
        buttonType: 'Default',
        children: 'Apply',
        customClass: '',
        customInputClass: '',
        btnDataId: '',
        automationId: 'manual-apply-coupon-section',
        buttonClass: '',
        actions: null,
        couponApplicationState: {},
        coupons: null,
        modalOnClose: null,
        closeCouponSlider: null,
        channel: 'TOF',
        autoFocus: false,
        couponInlineMessages: [],
        couponPopupMessages: [],
    };

    static propTypes = {
        type: PropTypes.oneOf(inputTypes),
        placeholder: PropTypes.string,
        buttonType: PropTypes.string,
        children: PropTypes.string,
        customClass: PropTypes.string,
        customInputClass: PropTypes.string,
        btnDataId: PropTypes.string,
        buttonClass: PropTypes.string,
        automationId: PropTypes.string,
        actions: PropTypes.objectOf(PropTypes.func),
        couponApplicationState: PropTypes.objectOf(PropTypes.node),
        coupons: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
        modalOnClose: PropTypes.func,
        closeCouponSlider: PropTypes.func,
        channel: PropTypes.string,
        autoFocus: PropTypes.bool,
        couponInlineMessages: PropTypes.oneOfType([PropTypes.array]),
        couponPopupMessages: PropTypes.oneOfType([PropTypes.array]),
    };

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.submitSerialCodeForm = this.submitSerialCodeForm.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.constructPayload = this.constructPayload.bind(this);
        this.renderSuggestionBox = this.renderSuggestionBox.bind(this);
        this.renderSuggestionItem = this.renderSuggestionItem.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);

        this.state = {
            value: '',
            showModal: '',
            showSerialModal: false,
            modalState: props.couponApplicationState ? props.couponApplicationState : [],
            datasource: [],
            couponNameList,
        };

        this.constructCouponNameList(props);
    }

    componentWillReceiveProps(nextProps) {
        this.constructCouponNameList(nextProps);
        if (!isEmpty(nextProps.couponApplicationState) &&
            !isEqual(this.state.modalState, nextProps.couponApplicationState)) {
            this.state.modalState = nextProps.couponApplicationState;
            const status = this.state.modalState.response.status;
            const statusText = this.state.modalState.response.statusText;
            if (this.state.modalState.isSuccess === true) {
                this.setState({ showModal: Constants.COUPONS_APPLIED_LABEL });
            } else if ((status === 400) && (statusText === Config.SERIAL_CODE_NEED)) {
                this.setState({ showSerialModal: true });
            }
            this.setState({ value: '' });
        }
        return true;
    }

    onValueChange = (event) => {
        let couponResponse = [];
        const datasource = [];
        const value = event.target.value;

        /* istanbul ignore else */
        if (value.length > (Constants.COUPON_TYPEAHEAD_TRIGGER_LENGTH - 1)) {
            /* istanbul ignore else */
            if (!isEmpty(this.state.couponNameList)) {
                // Filter out IN_STORE_ONLY coupons.
                // removing null values if any
                couponResponse = this.state.couponNameList.filter(e => e);

                /* istanbul ignore else */
                if (couponResponse.length > 0) {
                    each(couponResponse, (item) => {
                        // Match coupons meeting the input value and
                        // populate internal state datasource to power typeahead box.
                        (item.startsWith(value.toUpperCase())) ?
                            datasource.push(
                                <span
                                    data-currentitem={item}
                                    dangerouslySetInnerHTML={{ __html: highlight(item, value) }} // eslint-disable-line react/no-danger
                                    />,
                            ) : null;
                    });
                }
            }
        }

        this.setState({
            value: value.toUpperCase(),
            datasource,
        });
        this.clearAndResetMessage();
    }

    clearAndResetMessage = () => {
        this.props.actions.removeAllMessages({ section: Config.COUPON_INLINE_MESSAGES_ID });
    }

    submitForm = (event) => {
        event.preventDefault();
        const hideKeyboard = () => {
            document.activeElement.blur();
            this.textInput && this.textInput.blur();
        };

        let value = (this.state.value).trim();
        if (value.length < 1) {
            this.props.actions.triggerFormError([{ errorDescription: `${Config.TOF}|${Config.errors.EMPTY_COUPON}` }]);
            this.props.actions.addMessage({
                section: Config.COUPON_INLINE_MESSAGES_ID,
                message: {
                    id: Config.errors.EMPTY_COUPON,
                    title: Config.errors.EMPTY_COUPON,
                    type: 'error',
                },
            });
        } else if (!(Cookies.load('DPOrder') || Cookies.load('OrderId'))) {
            this.setState({ showModal: Constants.COUPON_EMPTYCART_LABEL });
            this.props.actions.triggerFormError([
                    { errorDescription: Constants.couponErrorMessages.COUPON_NO_CART_ITEMS }]);
        } else {
            /* istanbul ignore else */
            if (event.target.children.TypeaheadSuggestBox) {
                const suggestionBox = event.target.children.TypeaheadSuggestBox;
                /* istanbul ignore else */
                if (suggestionBox) {
                    value = suggestionBox.firstElementChild.firstElementChild.innerText;
                }
            }
            /* istanbul ignore else */
            if (this.props.closeCouponSlider) {
                this.props.closeCouponSlider();
            }
            const payload = this.constructPayload(value, null);
            payload.method = Constants.CouponAppledMethod.INPUT_COUPON;
            this.props.actions.applyAdjustment(payload);
            this.setState({ datasource: [] });

            hideKeyboard();
        }
        return true;
    }

    submitSerialCodeForm = (serialCode) => {
        this.setState({ showSerialModal: false });
        const payload = this.constructPayload(this.state.modalState.payload.code, serialCode);
        this.props.actions.applyAdjustment(payload);
    }

    constructPayload = (code, serialNumber) => ({
        code,
        serialNumber,
    })

    constructCouponNameList = (props) => {
        let couponResponse = [];

        if (props.coupons && props.coupons.data) {
            // Filter out IN_STORE_ONLY coupons.
            couponResponse = filter(props.coupons.data, groupItem =>
                    groupItem.redeemingChannel !== Constants.CouponRedeemingChannel.IN_STORE);

            /* istanbul ignore else */
            if (couponResponse.length > 0) {
                each(couponResponse, (couponItem) => {
                    /* istanbul ignore else */
                    if (couponItem && couponNameList.indexOf(couponItem.promoCode) === -1) {
                        couponNameList.push(couponItem.promoCode);
                    }
                });
            }
        }
    }

    handleCloseModal = () => {
        document.body.style.overflow = 'scroll';
        document.body.style.position = 'static';
        this.setState(
            {
                showModal: '',
                showSerialModal: false,
                value: '',
            });
        /* istanbul ignore next */
        if (this.props.modalOnClose) {
            this.props.modalOnClose();
        }
    }

    handleOnSelect = (event) => {
        const element = event.currentTarget.children[0];
        const newValue = element.innerText;

        this.setState({
            value: newValue,
            datasource: [],
        });
    };

    renderSuggestionItem = () => {
        const suggestionItems = [];
        each(this.state.datasource, (item, index) => {
            suggestionItems.push(
                <li className={cx('typeaheadSuggestionItem')} key={index}>
                    <button
                        id="SuggestionItemsBtn"
                        key={index}
                        data-automation-id={`coupon-typeahead-suggestion-item-${index}`}
                        onClick={this.handleOnSelect}
                        type="button"
                        className={(this.props.channel === 'TOF') ?
                                cx('typeaheadLink') : ''}
                        >
                        {item}
                    </button>
                </li>,
            );
        });
        return suggestionItems;
    }

    renderSuggestionBox = () => {
        if (this.state.datasource && this.state.datasource.length > 0) {
            return (
                <div id="TypeaheadSuggestBox" className={cx('typeaheadSuggestionBox')}>
                    <ul>
                        {this.renderSuggestionItem()}
                    </ul>
                </div>
            );
        }
        return null;
    }

    renderAppliedModal = () => {
        if (this.state.showModal === Constants.COUPONS_APPLIED_LABEL) {
            const response = this.props.couponApplicationState.response;
            const savings = response.data && response.data.amount;
            const message = response.data && response.data.message;
            const level = savings ? 0 : 1;
            let title;
            switch (this.props.couponApplicationState.response.data.code) {
                case Constants.adjustmentType.COUPON:
                default:
                    title = Constants.COUPONS_APPLIED_LABEL;
                      /* istanbul ignore else */
                    if (savings) {
                        const couponAppledNum = Cookies.load('COUPON_STATE');
                        /* istanbul ignore else */
                        if (!isEmpty(couponAppledNum)) {
                            title = Constants.COUPONS_UPDATE_LABEL;
                        }
                        Cookies.save('COUPON_STATE', this.props.couponApplicationState.response.data.value);
                    }
                    break;
                /* istanbul ignore next */
                case Constants.adjustmentType.REWARD:
                    title = Constants.REWARDS_APPLIED_LABEL;
                    break;
            }

            return (
                <CouponAppliedModal
                    title={title}
                    savings={savings}
                    message={message}
                    onClose={this.handleCloseModal}
                    channel={this.props.channel}
                    level={level}
                    />
            );
        } else if (this.state.showModal === Constants.COUPON_EMPTYCART_LABEL) {
            return (
                <CouponAppliedModal
                    title={Constants.COUPON_EMPTYCART_LABEL}
                    message={Constants.couponErrorMessages.COUPON_NO_CART_ITEMS}
                    onClose={this.handleCloseModal}
                    channel={this.props.channel}
                    level={2}
                    />
            );
        }
        return false;
    }

    renderSerialModal = () => {
        if (this.state.showSerialModal) {
            return (
                <SerialCodeInputModal
                    onClose={this.handleCloseModal}
                    onSubmit={this.submitSerialCodeForm}
                    />
            );
        }
        return false;
    }

    /**
     * Renders the basic outer skeleton required to render the applyCouponInputSection
     * @return {ReactComponent}
     */
    render() {
        const {
            type,
            btnDataId,
            buttonType,
            buttonClass,
            customClass,
            customInputClass,
            children,
            automationId,
            autoFocus,
            couponInlineMessages,
            couponPopupMessages,
        } = this.props;

        return (
            <div className={styles.suggestWrapper}>
                <form id="applyCouponForm" onSubmit={this.submitForm}>
                    <div className={cx('applyCouponInputSection', customClass)} data-automation-id={automationId}>
                        <div className={cx('inputWrapper')}>
                            <input
                                className={cx('applyCouponInputInput', customInputClass)}
                                data-automationId="manual-apply-coupon-input"
                                type={type}
                                placeholder={this.props.placeholder}
                                value={this.state.value}
                                ref={(input) => { this.textInput = input; }}
                                onChange={this.onValueChange}
                                autoFocus={autoFocus}
                                onBlur={this.clearAndResetMessage}
                                />
                        </div>
                        <div className={cx('buttonWrapper')}>
                            <Button
                                btnDataId={btnDataId}
                                type="button"
                                buttonType={buttonType}
                                automationId="manual-apply-coupon-button"
                                className={cx('applyCouponInputBtn', buttonClass)}
                                onClick={this.submitForm}
                                >{children}</Button>
                        </div>
                    </div>
                    {this.renderSuggestionBox()}
                    <Messages messages={couponInlineMessages}/>
                </form>
                <Messages level={messagesLevels.popup} messages={couponPopupMessages}/>
                {this.renderAppliedModal()}
                {this.renderSerialModal()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    couponApplicationState: state.couponApplicationState,
    coupons: state.coupons,
    couponInlineMessages: state && state.messages && state.messages[Config.COUPON_INLINE_MESSAGES_ID],
    couponPopupMessages: state && state.messages && state.messages[Config.COUPON_POPUP_MESSAGES_ID],
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(adjustmentActions, couponActions, analyticsActions,
        messagesActions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyCouponInputBox);
