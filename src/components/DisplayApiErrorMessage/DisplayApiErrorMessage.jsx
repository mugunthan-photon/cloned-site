import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Button from 'yoda-core-components/lib/components/Button/Button';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import classNames from 'classnames/bind';
import * as actions from '../../actions/ApiErrorAction';
import * as styles from './DisplayApiErrorMessage.css';

const cx = classNames.bind(styles);

export class DisplayApiErrorMessage extends Component {

    static propTypes = {
        apiErrorMsgs: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        errorId: PropTypes.string,
    }

    static defaultProps = {
        actions: {},
        apiErrorMsgs: [],
        errorId: null,
    }

    constructor() {
        super();
        console.warn(`
            <DisplayApiErrorMessage/> is deprecated and will be removed in future releases.
            Use <Messages level="popup" messages={[]}/> instead.
        `);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.state = {
            showModal: true,
        };
    }

    componentWillReceiveProps() {
        this.setState({ showModal: true });
    }

    handleCloseDialog() {
        this.setState({ showModal: false });
    }

    render() {
        const { apiErrorMsgs, errorId } = this.props;
        const showErrors = errorId ? apiErrorMsgs.filter(error => error.errorId === errorId) : apiErrorMsgs;
        const renderErrors = showErrors.map(error => (
            <ModalBox
                showModal={this.state.showModal}
                onClose={this.handleCloseDialog}
                defaultHeader
                automationId="api-error-dialog"
            >
                <div className={cx('errorWrapper')}>
                    <div>
                        <Icon
                            iconType="svg"
                            automationId="apply-coupon-dialog-icon"
                            width="52px"
                            height="52px"
                            viewBox="0 0 52 52"
                            name="icon-error"
                            pathClassName={styles.iconPath}
                        />
                    </div>
                    <div data-automation-id="apply-coupon-dialog-msg" className={cx('couponMessage')}>
                        {error.errorMessage}
                    </div>
                    <div className={cx('couponCheckoutCta')}>
                        <Button
                            type="button"
                            automationId="apply-coupon-dialog-ok"
                            buttonType="Primary"
                            size="Lg"
                            className="iconBtn"
                            onClick={this.handleCloseDialog}>
                            OK
                        </Button>
                    </div>
                </div>
            </ModalBox>
        ));
        return (<div>{renderErrors}</div>);
    }
}

const mapStateToProps = ({ apiErrorMsgs }) => ({
    apiErrorMsgs,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayApiErrorMessage);
