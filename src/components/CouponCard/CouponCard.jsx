import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Card from 'yoda-core-components/lib/components/Card/Card';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import CouponInfo from './CouponInfo';
import CouponApply from './CouponApply';
import CouponFindStore from './CouponFindStore';
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
        const couponClass = '';
        const redeemingChannel = couponData.redeemingChannel.toLowerCase();
        const showFindStore = (redeemingChannel === Constants.CouponRedeemingChannel.IN_STORE ||
                                    redeemingChannel === Constants.CouponRedeemingChannel.ALL)
            ? <CouponFindStore {...this.props} />
            : '';
        let shopButton = '';
        const print = (linkText && (Constants.couponPrintCheck.find(x => x === linkText.toLowerCase())));
        const findAStore = (linkText && linkText.toLowerCase() === Constants.CouponFindStoreLabel);

        /**
         * linkUrl: need not to be null
         * barcodeUrl: need to null or empty
         * findStore: need to false
        */
        if (linkUrl && !findAStore) {
            shopButton = (
                <div>
                    <Button
                        type="button"
                        automationId="at-coupon-shop-link"
                        buttonType="Secondary"
                        rel="noopener noreferrer"
                        onClick={() => { NavigationHelper.navigate(linkUrl, openLinkInNewTab); }}
                        className={cx('couponShopBtn')}
                        ellipsis
                        size="Xl">
                        {
                            print ? (
                                <Icon
                                    href={linkUrl} iconType="svg"
                                    className={cx('showIcon')}
                                    width="35px"
                                    height="35px"
                                    viewBox="0 0 35 35" name="print"
                                />
                            ) : <link href={linkUrl} />
                        }{`${linkText}`}
                    </Button>
                </div>
            );
        }

        let couponInfoLayoutClass = cx('sm12', 'md7', 'lg8', 'xl8');
        let couponApplyLayoutClass = cx('sm12', 'md5', 'lg4', 'xl4');
        let couponApplyParentClass = cx('right', 'couponCodeWrapper');

        if (couponVariant === 'Small') {
            couponInfoLayoutClass = cx('sm12', 'md12', 'lg12', 'xl12');
            couponApplyLayoutClass = cx('sm12', 'md12', 'lg12', 'xl12');
            couponApplyParentClass = cx('right', 'couponCodeWrapper', 'fullWidth');
        }

        return (
            <Card className={cx('couponBlock')} cardClass={styles.couponCardWrapper}>
                <div className={cx('rowBlock', 'couponList', (`${couponClass}`))}>
                    <div>
                        <div className={couponInfoLayoutClass}>
                            <CouponInfo {...this.props} openLinkInNewTab={this.props.redeemingChannel === 'BOF'} redeemingChannel={this.props.redeemingChannel}/>
                        </div>
                        <div className={couponApplyLayoutClass}>
                            <div className={couponApplyParentClass}>
                                <CouponApply {...this.props} />
                                {showFindStore}
                                {shopButton}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default CouponCard;
