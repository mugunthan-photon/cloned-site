import classNames from 'classnames/bind';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import Messages, { messagesActions } from '../Messages';
import Constants from '../../common/Constants';
import * as analyticsActions from '../../actions/AnalyticsAction';
import * as Config from '../CouponCard/CouponConfig';
import * as adjustActions from '../../actions/AdjustmentAction';
import * as styles from './SerialCodeInputModal.css';

const cx = classNames.bind(styles);

export class SerialCodeInputModal extends Component {
    static defaultProps = {
        serialCodeInputInlineErrorMessages: [],
        actions: null,
    }

    static propTypes = {
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        actions: PropTypes.objectOf(PropTypes.func),
        serialCodeInputInlineErrorMessages: PropTypes.oneOfType([PropTypes.array]),
    }


    /* istanbul ignore next */
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onReset = this.onReset.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.state = {
            value: '',
        };
    }

    onChange = (event) => {
        const value = event.target.value;
        this.setState({
            value: value.trim(),
            dialogBoxDisplay: false,
            showInlineErrorMessage: false,
        });
        this.clearAndResetMessage();
    }

    onKeyDown = (event) => {
        (event.keyCode === 13) ? this.handleSubmitForm(event) : null;
    }

    onReset = (event) => {
        event.preventDefault();
        this.setState({
            value: '',
        });
        this.clearAndResetMessage();
    }

    clearAndResetMessage = () => {
        this.props.actions.removeAllMessages({ section: Config.SERIAL_CODE_MESSAGES_ID });
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        if (this.state.value.length < 1) {
            this.props.actions.triggerFormError(
                [{ errorDescription: `${Config.TOF}|${Config.SERIAL_CODE_EMPTY_MSG}` }]);
            this.props.actions.addMessage({
                section: Config.SERIAL_CODE_MESSAGES_ID,
                message: {
                    id: Config.SERIAL_CODE_EMPTY_MSG,
                    title: Config.SERIAL_CODE_EMPTY_MSG,
                    type: 'error',
                },
            });
        } else if (this.state.value.length > 0) {
            this.props.onSubmit(this.state.value);
        }
    }

    renderSerialCouponType() {
        const { onClose,
            serialCodeInputInlineErrorMessages,
        } = this.props;
        return (
            <ModalBox
                showModal
                onClose={onClose}
                defaultHeader
                automationId="at-cpn-serial-modal"
                modalOverlayTheme={cx('modalOverlay')}
                modalTheme={cx('modalWrapper')}
            >
                <div className={cx('coupon', 'couponSerial', 'alignCenter')}>
                    <div className={cx('couponSerialStatus')} data-automation-id="at-serialnumber-req-title">
                        {Constants.couponErrorMessages.SERIAL_NUMBER_REQUIRED}
                    </div>
                    <div className={cx('serialNumberReq')} data-automation-id="at-serialnumber-req-label">
                        {Constants.couponErrorMessages.SERIAL_NUMBER_REQ_MESSAGE}
                    </div>
                    <div className={cx('serialWrapper')}>
                        <div className={cx('serialInputFieldWrapper')}>
                            <input
                                type="text"
                                autoFocus
                                autoComplete="off"
                                name="couponserial"
                                placeholder="Serial Number"
                                data-automationId="coupon-serial-number"
                                value={this.state.value}
                                onChange={this.onChange}
                                onKeyDown={this.onKeyDown}
                                className={cx('serialNumber')}
                            />
                            <button
                                id="TypeaheadInputRestBtn" className={styles.resetIconBlock} onClick={this.onReset}
                                type="button">
                                <Icon iconType="svg" width="25" height="25" viewBox="0 0 25 25" name="icon-close"/>
                            </button>
                        </div>
                        <Messages messages={serialCodeInputInlineErrorMessages}/>
                        <div>
                            <Button
                                type="button"
                                automationId="at-apply-number"
                                buttonType="Primary"
                                size="Xl"
                                className={cx('checkoutButton')}
                                onClick={this.handleSubmitForm}
                            >
                                {Constants.SERIAL_APPLY_LABEL}
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBox>
        );
    }

    render () {
        return (
            <div className={cx('couponBlock')}>
                {this.renderSerialCouponType()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    couponApplicationState: state.couponApplicationState,
    serialCodeInputInlineErrorMessages: state && state.messages && state.messages[Config.SERIAL_CODE_MESSAGES_ID],
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(adjustActions, analyticsActions,
        messagesActions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SerialCodeInputModal);
