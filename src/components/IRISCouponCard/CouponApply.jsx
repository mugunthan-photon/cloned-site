import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import CouponAppliedModal from '../IRISCouponAppliedModal/CouponAppliedModal';
import * as Constants from '../../common/Constants';
import * as actions from '../../actions/AdjustmentAction';
import * as styles from './CouponCard.css';

const cx = classNames.bind(styles);

// TODO :: This component will be upgraded by Checkout Team
export class CouponApply extends Component {
    static propTypes = {
        couponData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        actions: PropTypes.objectOf(PropTypes.func),
        couponApplicationState: PropTypes.oneOfType([PropTypes.object,
            PropTypes.array, PropTypes.number, PropTypes.string]),
        funnel: PropTypes.string,
        onApplyCouponCallBack: PropTypes.func,
        onRemoveCouponCallBack: PropTypes.func,
        removeCouponId: PropTypes.number,
        couponVariant: PropTypes.oneOf(['Small', 'Default']),
        onClosePanel: PropTypes.func,
    };

    static defaultProps = {
        couponData: [],
        actions: {},
        couponApplicationState: {},
        funnel: '',
        onApplyCouponCallBack: function onApplyCouponCallBack() { return null; },
        onRemoveCouponCallBack: function onRemoveCouponBack() { return null; },
        removeCouponId: 0,
        couponVariant: 'Default',
        onClosePanel: null,
        onApplyCoupon: null,
    };

    constructor() {
        super();
        this.state = {
            removeCouponId: 0,
            showInfoMsg: false,
            isLoading: false,
        };
        this.onRemoveCoupon = this.onRemoveCoupon.bind(this);
        this.onApplyCoupon = this.onApplyCoupon.bind(this);
        this.showApplyRemoveSucess = this.showApplyRemoveSucess.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    onApplyCoupon = () => {
        const orderId = Cookies.load('DPOrder') || Cookies.load('OrderId');
        if (orderId) {
            /* istanbul ignore else */
            if (this.props.onClosePanel) {
                this.props.onClosePanel();
            }

            this.props.actions.applyAdjustment({
                code: this.props.couponData.promoCode,
                serialNumber: null,
                method: Constants.CouponAppledMethod.SELECT_COUPON });
        } else {
            this.setState({
                showInfoMsg: true,
            });
        }
    }

    onRemoveCoupon = () => {
        /* istanbul ignore else */
        if (this.props.onClosePanel) {
            this.props.onClosePanel();
        }
        /* istanbul ignore else */
        if (this.props.removeCouponId !== 0) this.state.removeCouponId = this.props.removeCouponId;
        this.props.actions.removeAdjustmentById(this.props.couponData.id);

        const couponAppledNum = Cookies.load('COUPON_STATE');
        if (couponAppledNum === this.props.couponData.promoCode) Cookies.remove('COUPON_STATE');
    }

    showApplyRemoveSucess = (couponApplicationState) => {
        if (couponApplicationState.status && couponApplicationState.status === 204) {
            this.props.onApplyCouponCallBack(couponApplicationState);
            this.state.removeCouponId = couponApplicationState.id;
            //  Returns callbackfunction containg name of the applied coupon object {}
        }

        if (couponApplicationState.status && couponApplicationState.status === 201) {
            this.props.onRemoveCouponCallBack(this.props.couponData.promoCode);
            //  Returns callbackfunction containg name of the applied coupon name
        }
    }

    handleCloseModal() {
        document.body.style.overflow = 'scroll';
        document.body.style.position = 'static';
        this.setState({
            showInfoMsg: false,
        });
    }

    renderInfoMsg() {
        return this.state.showInfoMsg
                ? <CouponAppliedModal
                    title={Constants.IRIS_COUPON_EMPTYCART_LABEL}
                    message={Constants.couponErrorMessages.IRIS_COUPON_NO_CART_ITEMS}
                    onClose={this.handleCloseModal}
                    channel="TOF"
                    level={2}
                    shopSalesLink={this.props.couponData.linkUrl} />
                : null;
    }

    render() {
        const { couponData, funnel, couponVariant } = this.props;
        const { offerEndDate, promoCode, id } = couponData;
        this.showApplyRemoveSucess(this.props.couponApplicationState);

        // Defining Html Variables so as to support based on the Configuration in XM.
        let applyHtml = '';
        const date = offerEndDate ? new Date(offerEndDate) : '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };

        const couponCodeHtml = (promoCode
            ? (<h4 className={cx('codeNumber', funnel)}> Code: <strong data-automation-id="at-coupon-code">{couponData.promoCode}</strong> </h4>)
            : (<strong data-automation-id="at-coupon-code">{Constants.COUPONS_NO_CODE_REQUIRED}</strong>));
        const couponValidThroughHtml = (date)
            ? (<h5 className={cx('codeValidTime')} data-automation-id="at-coupon-validity">Valid Through {date.toLocaleDateString('en-US', options)} </h5>)
            : '';

        // Dynamically adding classes depending on Props
        let couponAppliedClass = '';
        const couponApplyClass = (couponVariant === 'Small') ? cx('couponApplyBlockInherit') : cx('couponApplyBlock');

       // coupon code exists and not applied
        if (promoCode && (!id)) {
            applyHtml = (<div className={cx('codeApplyBtn')}>
                <Button
                    type="button"
                    automationId="code-apply"
                    buttonType="Primary"
                    className={cx('couponShopBtn', 'removeBtn')}
                    size="Xl"
                    onClick={this.onApplyCoupon}>Apply</Button>
            </div>);
        }

        // coupon is Applied showing Remove button
        if (id) {
            applyHtml = (<div className={cx('codeRemoveBtn')}>
                <Button
                    type="button"
                    automationId="code-remove"
                    buttonType="Secondary"
                    className={cx('couponShopBtn')}
                    size="Xl"
                    onClick={this.onRemoveCoupon}>Remove</Button>
            </div>);
            couponAppliedClass = 'couponApplied';
        }

        return (
            <div className={couponApplyClass}>
                {this.renderInfoMsg()}
                <div className={cx('couponCodeBlock', (`${couponAppliedClass}`))} data-automation-id="at-apply-remove-coupon-wrapper">
                    {couponCodeHtml}
                    {couponValidThroughHtml}
                </div>
                {applyHtml}
            </div>
        );
    }
}

const mapStateToProps = ({ couponApplicationState }) => ({
    couponApplicationState,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponApply);
