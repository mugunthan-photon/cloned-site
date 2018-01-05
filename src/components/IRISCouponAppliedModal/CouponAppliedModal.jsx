import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import currencyFormatter from 'currency-formatter';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Button from 'yoda-core-components/lib/components/Button/Button';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import * as styles from './CouponAppliedModal.css';
import * as Constants from '../../common/Constants';
import * as Config from '../IRISCouponCard/CouponConfig';

const cx = classNames.bind(styles);

const handleContinueCheckout = () => {
    window.location.href = (Constants.CART_YODA_EXPERIENCE === 'OFF') ? Constants.CLASSIC_CART_PAGE_URL : Constants.CART_PAGE_URL;
};


function CouponAppliedModal({ title, savings, currency, message, onClose, channel, level, shopSalesLink }) {
    currency = currency || 'USD';
    const svgName = Config.svgNameArray[level];
    const showMsg = message === Config.COUPON_QUAL_ORIG_MSG ? Config.COUPON_QUAL_TRANS_MSG : message;
    return (
        <ModalBox
            showModal
            onClose={onClose}
            defaultHeader
            automationId="at-cpn-applied-modal"
            modalTheme={cx('appliedModalTheme')}
            modalContentTheme={cx('appliedModalContentTheme')}
        >
            <div className={cx('coupon', 'couponApplied', 'alignCenter')}>
                <div className={cx('couponStatusIcon')}>
                    <Icon
                        iconType="svg"
                        automationId="coupon-applied"
                        width="96px"
                        height="96px"
                        viewBox="0 0 96 96"
                        name={svgName}
                        pathClassName={styles.iconPath}
                    />
                </div>
                <div className={cx('couponStatus')}>{title}</div>
                {savings ? (
                    <div
                        data-automation-id="at-saved-amt-msg"
                        className={cx('savedPriceInfo')}>
                        You Saved {currencyFormatter.format(savings, { code: currency })}
                    </div>
                ) : '' }
                <div
                    data-automation-id="at-coupon-msg"
                    className={cx('couponMessage')}
                    dangerouslySetInnerHTML={{ __html: showMsg }} // eslint-disable-line react/no-danger
                />
                {channel === 'TOF' && savings ?
                    <div className={cx('couponCheckoutCta')}>
                        <Button
                            type="button"
                            automationId="coupon-checkout"
                            buttonType="Primary"
                            size="Lg"
                            onClick={handleContinueCheckout}
                            className="iconBtn">
                            <Icon
                                iconType="svg"
                                automationId="test-automation-icon"
                                width="32px"
                                height="32px"
                                viewBox="0 0 32 32"
                                name="lock-white"
                                className="btnIcon"
                            />{Constants.CHECKOUT_LABEL}
                        </Button>
                    </div> : null
                }
                <div className={cx('continueShoppingCta')}>
                    { channel === 'BOF' ?
                        (
                            <Button
                                type="button"
                                automationId="continue-shopping"
                                buttonType="Primary"
                                size="Lg"
                                onClick={onClose}>
                                {Constants.OK_LABEL}
                            </Button>
                        ) :
                        (
                            <div>{
                                shopSalesLink ?
                                    <Button
                                        type="button"
                                        automationId="continue-shopping"
                                        buttonType="Secondary"
                                        size="Lg"
                                        className={cx('continueShoppingBtn')}
                                        onClick={
                                            /* istanbul ignore next */
                                            () => { NavigationHelper.navigate(shopSalesLink); }
                                            }>
                                        {Constants.IRIS_CONTINUE_SHOPPING_LABEL}
                                    </Button> : ''
                                }
                                <Button
                                    type="button"
                                    automationId="continue-shopping"
                                    buttonType="Primary"
                                    size="Lg"
                                    className={cx('okBtn')}
                                    onClick={onClose}>
                                    {Constants.OK_LABEL}
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </ModalBox>
    );
}

CouponAppliedModal.defaultProps = {
    currency: 'USD',
    message: '',
    title: Constants.COUPONS_APPLIED_LABEL,
    channel: 'TOF',
    level: 0,
    shopSalesLink: '',
};

CouponAppliedModal.propTypes = {
    title: PropTypes.string,
    savings: PropTypes.number.isRequired,
    currency: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    channel: PropTypes.string,
    level: PropTypes.number,
    shopSalesLink: PropTypes.string,
};

export default CouponAppliedModal;
