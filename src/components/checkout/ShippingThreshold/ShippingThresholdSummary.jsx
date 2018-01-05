import React, { PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import ShippingThresholdBar from './ShippingThresholdBar';
import config from './ShippingThreshold.config';
import * as styles from './ShippingThreshold.css';

function renderShortShipping(orderTotal, shippingShortTotal, currency) {
    return (
        <div>
            <ShippingThresholdBar
                orderTotal={orderTotal}
                shippingShortTotal={shippingShortTotal}
                progressBarType={config.PRGRESS_BAR_TYPE.SUMMARY}
            />
            <div className={styles.shippingThresholdSummaryWrapper}>
                <div className={styles.shippingThresholdInfo}>
                    <span>
                        You&#39;re {currencyFormatter.format(shippingShortTotal, { code: currency, precision: 2 })}
                        &nbsp;away from <b>FREE SHIPPING </b>
                    </span>
                </div>
            </div>
        </div>
    );
}

function ShippingThresholdSummary({ orderTotal, shippingShortTotal, currency }) {
    const showThreshold = (shippingShortTotal && shippingShortTotal > 0);
    return (
        <div>
            {showThreshold ? renderShortShipping(orderTotal, shippingShortTotal, currency) : ''}
        </div>
    );
}

ShippingThresholdSummary.defaultProps = {
    currency: 'USD',
};

ShippingThresholdSummary.propTypes = {
    orderTotal: PropTypes.number.isRequired,
    shippingShortTotal: PropTypes.number.isRequired,
    currency: PropTypes.string,
};

export default ShippingThresholdSummary;
