import React, { PropTypes } from 'react';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import classNames from 'classnames/bind';
import GenerateBarcode from './GenerateBarcode';
import * as styles from './Barcode.css';
import cookieDetails from './constants';
import constants from '../../common/Constants';

const cx = classNames.bind(styles);

const barcodeVal = (marketingCookie, barcode) =>
`${barcode.toString().slice(0, -5)}${cookieDetails[marketingCookie]}${barcode.toString().slice(-3)}`;

function BarCode({ barCodeData, channelName, index }) {
    let marketingCookie = Cookies.load('marketing');
    marketingCookie = marketingCookie ? marketingCookie.split(' ').join('') : null;
    const barcode = marketingCookie ? barcodeVal(marketingCookie, barCodeData.barCode) : barCodeData.barCode;
    return (
        <div className={cx('barcodeDetails')} data-automation-id={`bar-code-${index}`}>
            <div className={cx('couponInfo', 'alignCenter')}>{channelName}</div>
            <div className={cx('couponOffInfo', 'alignCenter')}>{barCodeData.headLine}</div>
            <div className={cx('showCouponDesc', 'alignCenter')}>{constants.couponBodyCopy}</div>
            <div className={cx('barcodeWrapper')}>
                <div className={cx('couponNumber')}>
                    <GenerateBarcode id={barcode}/>
                </div>
            </div>
        </div>
    );
}

BarCode.propTypes = {
    barCodeData: PropTypes.objectOf(PropTypes.object).isRequired,
    channelName: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
};

export default BarCode;
