import classNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import _filter from 'lodash/filter';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Button from 'yoda-core-components/lib/components/Button/Button';
import currencyFormatter from 'currency-formatter';
import * as styles from './CouponCard.css';
import CouponDetails from './CouponDetails';
import ShowBarCode from '../ShowBarCode/ShowBarCode';
import * as Constants from '../../common/Constants';

const cx = classNames.bind(styles);

const getChannelName = (channelName) => {
    switch (channelName.toLowerCase()) {
        case Constants.CouponRedeemingChannel.ALL:
            return Constants.CouponCategory.all;
        case Constants.CouponRedeemingChannel.IN_STORE:
            return Constants.CouponCategory.inStore;
        default:
            return Constants.CouponCategory.onlineOnly;
    }
};

const getCouponInfoHtml = (data, channel, couponVariation, openLinkInNewTab = true, printConfig) => {
    const couponInfoHtml = [];
    let quickLinksHtml = [];
    let key = 0;
    let printCTA = '';
    const listClassName = (couponVariation === 'Small') ? cx('shopBtn') : cx('shopBtnList');
    const { linkText, barCodeUrl } = data;
    const barcodoLength = _filter(data.offers, a => (!a.barCode)).length;
    const showPrintButtonGlobal = (barcodoLength > 1);

    data.offers.forEach((offerItem, index) => {
        const { bodyCopy, headLine } = offerItem;

        /** {Pushing Coupon Info HTml in Here} */
        couponInfoHtml.push(
            <div data-automation-id={`at-coupon-count-${key}`} key={key += 1}>
                <h4 data-automation-id={'at-coupon-name'} className={cx('couponCode')}>{headLine}</h4>
                <p data-automation-id={'at-coupon-description'} className={cx('couponCodeDetails')}>{bodyCopy}</p>
            </div>,
        );

        printCTA = { label: linkText, href: barCodeUrl }; // to get the print button

        couponInfoHtml.push(
            <ul
                key={key += 1}
                className={cx('shopBtnBlock')}>
                {quickLinksHtml}
                {
                    <li className={listClassName}>
                        <ShowBarCode
                            automationId="code-remove"
                            className={cx('couponShopBtn')}
                            offerDetails={offerItem}
                            index={index + 1}
                            modalAutoId="barCodeModal"
                            channelName={getChannelName(channel)}
                            printOption={printCTA}
                            printConfig={printConfig}
                            showPrintButtonGlobal={showPrintButtonGlobal}
                        />
                    </li>
                }

            </ul>,
        );

        quickLinksHtml = [];
        /** Adding the Separator Here */
        couponInfoHtml.push(
            <div
                key={key += 1}
                className={cx('moreCouponSeperator')}>
                <span className={cx('couponSeperatorText')}>OR</span>
            </div>,
        );
    });

    couponInfoHtml.pop(); // Popping of the additional HTML
    if (showPrintButtonGlobal && barCodeUrl && data.offers.length !== 1) {
        couponInfoHtml.push(
            <div className={cx('coupon', 'couponBarcode')}>
                <Button
                    type="button"
                    automationId="at-coupon-shop-link"
                    buttonType="Secondary"
                    rel="noopener noreferrer"
                    onClick={() => { NavigationHelper.navigate(barCodeUrl, true); }}
                    className={cx('couponShopBtn')}
                    ellipsis
                    size="Xl">
                    <Icon
                        iconType="svg"
                        automationId="at-coupon-print-icon"
                        width="32px"
                        height="32px"
                        viewBox="0 0 32 32"
                        name="print"
                        pathClassName={styles.lockBtnIcon}
                        className="btnIcon" /> {Constants.CouponPrintLabel}
                </Button>
            </div>,
        );
    }

    return couponInfoHtml;
};

export class CouponInfo extends Component {
    static propTypes = {
        couponData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        couponVariant: PropTypes.oneOf(['Small', 'Default']),
        openLinkInNewTab: PropTypes.bool,
        redeemingChannel: PropTypes.string,
        printConfig: PropTypes.bool,
    };

    static defaultProps = {
        couponData: [],
        couponVariant: 'Default',
        openLinkInNewTab: false,
        redeemingChannel: 'TOF',
        printConfig: false,
    };

    renderInfo() {
        const { couponData, couponVariant, openLinkInNewTab, printConfig } = this.props;
        const channelName = couponData.redeemingChannel; // getting channelname
        let couponHeader;
        let saveHtml = '';

        /* istanbul ignore next */
        if (couponData.totalDiscount > 0) {
            if (couponData.offers && couponData.offers.length > 1) {
                saveHtml = (
                    <h5 className={cx('saveAmount')}>
                        Save {currencyFormatter.format(
                            couponData.totalDiscount,
                            { code: Constants.DEFAULT_CURRENCY, precision: 2 },
                        )} or more
                    </h5>
                );
            } else {
                saveHtml = (
                    <h5 className={cx('saveAmount')}>
                        Save {currencyFormatter.format(
                            couponData.totalDiscount,
                            { code: Constants.DEFAULT_CURRENCY, precision: 2 },
                        )}
                    </h5>
                );
            }
        }

        /* istanbul ignore next */
        if (couponData.bestCoupon) {
            couponHeader = (
                <div className={cx('greatSavingsBlock')} data-automation-id="at-great-savings-block">
                    <div className={cx('pennyIcon')}>
                        <Icon
                            iconType="svg"
                            automationId="penny-icon"
                            width="48px" height="48px"
                            viewBox="0 0 48 48"
                            name="penny"
                            pathClassName={styles.pennySvg}
                        />
                    </div>
                    <div className={cx('greatSavingDesc')}>
                        <h4 className={cx('greatSavingTitle')} data-automation-id="at-best-coupons-savings-label">
                            Greatest Savings
                        </h4>
                        {saveHtml}
                    </div>
                </div>
            );
        } else {
            couponHeader = saveHtml;
        }

        /* There is no discount, saving comes in current IRIS API */
        /* istanbul ignore next */
        if (couponData.couponApplied && couponData.savings > 0 && (this.props.redeemingChannel !== 'TOF')) {
            couponHeader = (
                <h5 className={cx('saveAmount', 'savedAmount')}>
                    <Icon
                        iconType="svg"
                        automationId="amount-saved"
                        width="35px" height="35px"
                        viewBox="0 0 35 35"
                        name="success"
                        pathClassName={styles.pennySvg}
                    />You Saved {currencyFormatter.format(
                        couponData.savings,
                        { code: Constants.DEFAULT_CURRENCY, precision: 2 },
                    )}
                </h5>
            );
        }

        return (
            <div className={cx('couponInfoBlock')} data-automation-id="at-coupon-info-block">
                {couponHeader}
                <h4 className={cx('couponStatus')} data-automation-id="at-coupon-info-block-title">{getChannelName(channelName)}</h4>
                {getCouponInfoHtml(couponData, channelName, couponVariant, openLinkInNewTab, printConfig)}
            </div>
        );
    }

    render() {
        const couponsInfoHtml = this.renderInfo();
        const { disclaimer } = this.props.couponData;

        return (
            <div>
                {couponsInfoHtml}
                {/* See Details Block Code will be added here */}
                <CouponDetails disclaimer={disclaimer} />
            </div>
        );
    }
}

export default CouponInfo;
