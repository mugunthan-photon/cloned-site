import React, { PropTypes } from 'react';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import classNames from 'classnames/bind';
import config from './ShippingThreshold.config';
import * as styles from './ShippingThreshold.css';

const cx = classNames.bind(styles);

function ShippingThresholdBar({ orderTotal, shippingShortTotal, progressBarType }) {
    const progressWrapperClass = cx({
        [styles.headerShippingThresholdProgressBar]: (progressBarType === config.PRGRESS_BAR_TYPE.HEADER),
        [styles.summaryShippingThresholdProgressBar]: (progressBarType === config.PRGRESS_BAR_TYPE.SUMMARY),
    });

    const percent = (orderTotal / (orderTotal + shippingShortTotal)) * 100;
    const barStyle = {};
    const iconStyle = {};

    barStyle.background = `linear-gradient(to right, #f6b333 ${percent}%,  #ccc ${percent}%)`;
    iconStyle.left = `calc(${percent}% - 15px)`;

    return (
        <div className={cx('thresholdProgressBar', progressWrapperClass)} style={barStyle}>
            <div className={styles.thresholdProgressIcon} style={iconStyle}>
                <Icon
                    iconType="svg"
                    className={cx('svg-icon')}
                    width={progressBarType.ICON.width}
                    height={progressBarType.ICON.height}
                    viewBox="0 0 20 20"
                    name="truck"
                />
            </div>
        </div>
    );
}

ShippingThresholdBar.propTypes = {
    orderTotal: PropTypes.number.isRequired,
    shippingShortTotal: PropTypes.number.isRequired,
    progressBarType: PropTypes.oneOf([config.PRGRESS_BAR_TYPE.HEADER, config.PRGRESS_BAR_TYPE.SUMMARY]).isRequired,
};

export default ShippingThresholdBar;
