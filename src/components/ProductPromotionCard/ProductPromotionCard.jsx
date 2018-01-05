import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Card from 'yoda-core-components/lib/components/Card/Card';
import Image from 'yoda-core-components/lib/components/Image/Image';
import classNames from 'classnames/bind';
import * as styles from './ProductPromotionCard.css';
import preferences from './preferences';

const cx = classNames.bind(styles);

export const getOverlayStyle = (overlay) => {
    switch (overlay) {
        case 'o':
            return cx('splOffersSoldOut');
        case 'f':
            return cx('splOffersAlmostGone');
        default:
            return cx('splOffers');
    }
};

export const getOverlayLabel = (overlay) => {
    switch (overlay) {
        case 'o':
            return preferences.label.soldOut;
        case 'f':
            return preferences.label.almostGone;
        default:
            return preferences.label.default;
    }
};

export const getChannel = (deviceType) => {
    let channel = '';
    if (deviceType.isMobile) {
        channel = 'MW';
    } else if (deviceType.isTablet) {
        channel = 'TW';
    } else {
        channel = 'DT';
    }
    return channel;
};

class ProductPromotionCard extends Component {
    static propTypes = {
        imageSrc: PropTypes.string.isRequired,
        imageAlt: PropTypes.string,
        pageURL: PropTypes.string,
        isOverlay: PropTypes.bool,
        overlay: PropTypes.string,
        analyticsTag: PropTypes.string,
        deviceType: PropTypes.oneOfType([PropTypes.object]),
    };

    static defaultProps = {
        imageAlt: '',
        pageURL: '',
        isOverlay: false,
        overlay: '',
        analyticsTag: '',
        deviceType: {},
    };

    static paintOverlay(isOverlay, overlay) {
        let overlayJSX = null;
        if (isOverlay) {
            const overlayStyle = getOverlayStyle(overlay);
            const overlayLabel = getOverlayLabel(overlay);
            overlayJSX = (
                <div className={overlayStyle}>
                    <div data-automation-id="sold-out-overlay" className={styles.splOffersOverlay} />
                    <div data-automation-id="mkt-banner-status" className={styles.splOffersInfo}>{overlayLabel}</div>
                </div>
            );
        }
        return overlayJSX;
    }

    softOrHardRoute() {
        const { imageSrc, imageAlt, pageURL, isOverlay, overlay, analyticsTag, deviceType } = this.props;
        let retHtml = null;
        let promotionURL = pageURL;
        const matchForCmRe = /cm_re/.test(promotionURL.toLowerCase());
        if (!matchForCmRe && analyticsTag) {
            const match = /.+\?.*/.test(promotionURL);
            if (match) {
                promotionURL += `&${analyticsTag}_${getChannel(deviceType)}`;
            } else {
                promotionURL += `?${analyticsTag}_${getChannel(deviceType)}`;
            }
        }
        // promotionURL = (pageURL.indexOf('?') >= 0) ? `${pageURL}&` : `${pageURL}?`;
        const completeUrl = `${promotionURL}`;
        const cardNew = (
            <Card cardClass={cx('productPromotionCardBlock')}>
                <Image alt={imageAlt} src={imageSrc} />
                {ProductPromotionCard.paintOverlay(isOverlay, overlay)}
            </Card>
        );
        if (pageURL && pageURL.indexOf('X2H2') >= 0) {
            retHtml = (<Link to={completeUrl}>
                {cardNew}
            </Link>);
        } else {
            retHtml = (
                <a className={cx('prodPromotionCardLink')} href={completeUrl}>
                    {cardNew}
                </a>
            );
        }
        return retHtml;
    }

    render() {
        return (
            <div>
                {this.softOrHardRoute()}
            </div>
        );
    }
}

export default ProductPromotionCard;
