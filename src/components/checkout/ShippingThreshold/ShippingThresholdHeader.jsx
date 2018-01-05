import React, { PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import ShippingThresholdBar from './ShippingThresholdBar';
import config from './ShippingThreshold.config';
import * as styles from './ShippingThreshold.css';

function renderFreeShipping() {
    return (
        <div className={styles.shippingThresholdFreeInfo}>
            <span>You&#39;ve earned <b>FREE SHIPPING </b></span>
        </div>
    );
}

function renderShortShipping(orderTotal, shippingShortTotal, currency) {
    return (
        <div>
            <div className={styles.shippingThresholdHeaderInfo}>Spend&nbsp;
                <b>{currencyFormatter.format(shippingShortTotal, { code: currency, precision: 2 })} </b>
                more to earn <b>FREE SHIPPING</b>
            </div>
            <ShippingThresholdBar
                orderTotal={orderTotal}
                shippingShortTotal={shippingShortTotal}
                progressBarType={config.PRGRESS_BAR_TYPE.HEADER}
            />
        </div>
    );
}

function ShippingThresholdHeader({ orderTotal, shippingShortTotal, currency }) {
    const showThreshold = (shippingShortTotal && shippingShortTotal > 0);
    return (
        <div className={styles.shippingThresholdHeaderWrapper}>
            { showThreshold ?
                renderShortShipping(orderTotal, shippingShortTotal, currency) :
                renderFreeShipping()
            }
        </div>
    );
}

ShippingThresholdHeader.defaultProps = {
    currency: 'USD',
};

ShippingThresholdHeader.propTypes = {
    orderTotal: PropTypes.number.isRequired,
    shippingShortTotal: PropTypes.number.isRequired,
    currency: PropTypes.string,
};

export default ShippingThresholdHeader;
