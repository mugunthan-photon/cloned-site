import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Card from 'yoda-core-components/lib/components/Card/Card';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import CouponInfo from './CouponInfo';
import CouponApply from './CouponApply';
import CouponFindStore from './CouponFindStore';
import CouponUrgencyMessage from './CouponUrgencyMessage';
import CouponDetails from './CouponDetails';
import * as styles from './CouponCard.css';
import * as Constants from '../../common/Constants';

const cx = classNames.bind(styles);

class CouponCard extends Component {
    static propTypes = {
        couponData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        couponVariant: PropTypes.oneOf(['Small', 'Default']),
        redeemingChannel: PropTypes.string,
        openLinkInNewTab: PropTypes.string,
    };

    static defaultProps = {
        couponData: [],
        couponVariant: 'Default',
        onApplyCoupon: null,
        skipOfferMerge: false,
        redeemingChannel: 'TOF',
        openLinkInNewTab: '',
    };

    render() {
        const { couponData, couponVariant, openLinkInNewTab } = this.props;
        const { linkText, linkUrl } = couponData; // Aundy Change
        const { disclaimer } = this.props.couponData;
        const couponClass = '';
        const redeemingChannel = couponData.redeemingChannel.toLowerCase();
        const showFindStore = (redeemingChannel === Constants.CouponRedeemingChannel.IN_STORE ||
                                    redeemingChannel === Constants.CouponRedeemingChannel.ALL)
            ? <CouponFindStore {...this.props} />
            : '';
        let shopButton = '';
        const print = (linkText && (Constants.couponPrintCheck.find(x => x === linkText.toLowerCase())));
        const findAStore = (linkText && linkText.toLowerCase() === Constants.CouponFindStoreLabel);
        const timerProps = {
            expiryDate: new Date(couponData.offerEndDate),
            liveTextColor: '',
            timerTextColor: '',
            timerZone: 'CST',
        };

        /**
         * linkUrl: need not to be null
         * barcodeUrl: need to null or empty
         * findStore: need to false
        */
        if (linkUrl && !findAStore) {
            shopButton = (
                <div> {
                    print ?
                        <Button
                            type="button"
                            automationId="at-coupon-shop-link"
                            buttonType="Secondary"
                            rel="noopener noreferrer"
                            onClick={
                                 /* istanbul ignore next */
                                () => { NavigationHelper.navigate(linkUrl, openLinkInNewTab); }}
                            className={cx('couponShopBtn')}
                            ellipsis
                            size="Xl">
                            <Icon
                                href={linkUrl} iconType="svg"
                                className={cx('showIcon')}
                                width="35px"
                                height="35px"
                                viewBox="0 0 35 35" name="barcode"
                            />{`${Constants.IRISCouponPrintLabel}`}
                        </Button> : ''}
                </div>
            );
        }

        let couponApplyParentClass = cx('couponCodeWrapper');

        if (couponVariant === 'Small') {
            couponApplyParentClass = cx('couponCodeWrapper', 'fullWidth');
        }

        return (
            <Card className={cx('couponBlock')} cardClass={styles.couponCardWrapper}>
                <div className={cx('rowBlock', 'couponList', (`${couponClass}`))}>
                    <CouponUrgencyMessage {...timerProps}/>
                    <div className={cx('couponInfoLayout')}>
                        <CouponInfo {...this.props} openLinkInNewTab={this.props.redeemingChannel === 'BOF'} redeemingChannel={this.props.redeemingChannel}/>
                    </div>
                    <div className={cx('couponInfoCTABlock')}>
                        <div className={cx('couponApplyLayout')}>
                            <div className={couponApplyParentClass}>
                                <CouponApply {...this.props} />
                                {showFindStore}
                                {shopButton}
                            </div>
                        </div>
                        <div className={cx('couponcardLinkBlock')}>
                            <div className={cx('goShopLinkBlock')}><a href={linkUrl} className={cx('goShopLink')}>{linkText}</a></div>
                            <CouponDetails disclaimer={disclaimer} offerDetails={couponData.offers}/>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default CouponCard;
