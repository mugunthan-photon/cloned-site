import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import Button from 'yoda-core-components/lib/components/Button/Button';
import * as styles from './CouponCard.css';
import * as Constants from '../../common/Constants';

const cx = classNames.bind(styles);

class CouponFindStore extends Component {

    static propTypes = {
        couponData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        openLinkInNewTab: PropTypes.bool,
    };

    static defaultProps = {
        couponData: [],
        openLinkInNewTab: false,
    };

    renderButton() {
        const { openLinkInNewTab, couponData } = this.props;
        const { linkText, linkUrl } = couponData;

        // show findstore
        if (couponData && linkText && linkText.toLowerCase() === Constants.CouponFindStoreLabel) {
            return (<Button
                type="button"
                automationId="find-store"
                className={cx('couponShopBtn')}
                buttonType="Secondary"
                onClick={() => {
                    /* istanbul ignore else */
                    if (linkUrl) NavigationHelper.navigate(linkUrl, openLinkInNewTab);
                }}
                size="Xl">{linkText}</Button>);
        }

        return null;
    }

    render() {
        return this.renderButton();
    }
}

export default CouponFindStore;
