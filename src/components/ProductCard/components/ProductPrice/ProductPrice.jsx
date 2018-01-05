import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import Pricing from '../../../Pricing/Pricing';
import PricingHelper from '../../../Pricing/PricingHelper';
import config from '../../ProductCard.config';

import styles from './ProductPrice.css';

const cx = classNames.bind(styles);

const ProductPrice = (props) => {
    const { price, cardTheme } = props;
    let renderPrice = null;
    if (price) {
        renderPrice = (<Pricing
            dynamicFont={cardTheme === config.cardTheme.CARTRIDGE}
            pricingDetails={PricingHelper(price)}
            priceWrapperClass={cx('priceWrapperClass')}
            customMarketingLabel={cx('customPriceMarketingLabel')}
            priceClass={cx('priceClass')}
            mapPriceClass={cx('mapPriceClass')}
            priceLabelClass={cx('cardPriceLabel')}
            priceSummaryClass={cx('cardSummaryLabel')} />);
    }
    return <div className={cx('pricingWrapper', cardTheme)} data-automation-id="product-price"> { renderPrice }</div>;
};

ProductPrice.defaultProps = {
    price: null,
    cardTheme: '',
};

ProductPrice.propTypes = {
    price: PropTypes.oneOfType([PropTypes.object]),
    cardTheme: PropTypes.string,
};

export default ProductPrice;
