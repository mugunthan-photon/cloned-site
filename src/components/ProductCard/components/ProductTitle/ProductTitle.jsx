import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductTitle.css';

const cx = classNames.bind(styles);

const ProductTitle = (props) => {
    const { title, productUrl, onProductClick, cardType, cardTheme } = props;
    const renderTitle = <h6 className={cx('title', cardType, cardTheme)} data-automation-id="product-title">{title}</h6>;

    return productUrl ? <a
        href={productUrl}
        onClick={(e) => { onProductClick(e, 'title'); }}>
        {renderTitle}
    </a> : renderTitle;
};

ProductTitle.defaultProps = {
    productUrl: '',
    title: '',
    onProductClick: () => {},
    cardType: '',
    cardTheme: '',
};

ProductTitle.propTypes = {
    productUrl: PropTypes.string,
    title: PropTypes.string,
    onProductClick: PropTypes.func,
    cardType: PropTypes.string,
    cardTheme: PropTypes.string,
};

export default ProductTitle;
