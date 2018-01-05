import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Rating from 'yoda-core-components/lib/components/Rating/Rating';

import config from '../../ProductCard.config';
import styles from './ReviewAndRating.css';

const cx = classNames.bind(styles);

const ReviewAndRating = (props) => {
    const { productUrl, onProductClick, rating, cardTheme } = props;

    let { reviewCount } = props;
    if (typeof reviewCount === 'string') {
        reviewCount = parseInt(reviewCount, 10);
    }

    const displayRatingCount = () => {
        if (reviewCount > 0) {
            return (<span
                className={cx('reviewCount')}
                data-automation-id="product-review-count">({reviewCount.toLocaleString()})</span>);
        }
        return null;
    };

    const displayReviewRating = () => {
        if (rating > 0) {
            return (<span className={cx('ratingContainer')}>
                <Rating
                    total={5}
                    rating={rating}
                    svgClassName={cx('rating')}
                    size={config.ratingSize[cardTheme]}
                    space={40}
                    shape={'star'}
                    color={'#a2000f'}
                    starSize={cx('prodCardStarRating')}
                    automationId="productCard-automation-rating" />
            </span>);
        }
        return null;
    };

    return productUrl ?
        <a href={productUrl} className={cx('ratingWrapper', cardTheme)} onClick={(e) => { onProductClick(e, 'reviews'); }}>
            {displayReviewRating()}
            {displayRatingCount()}
        </a> :
        <div className={cx('ratingWrapper', cardTheme)}>
            {displayReviewRating()}
            {displayRatingCount()}
        </div>;
};


ReviewAndRating.defaultProps = {
    productUrl: '',
    onProductClick: () => {},
    rating: 0,
    reviewCount: 0,
    cardTheme: '',
};

ReviewAndRating.propTypes = {
    reviewCount: PropTypes.number,
    rating: PropTypes.number,
    productUrl: PropTypes.string,
    onProductClick: PropTypes.oneOfType([PropTypes.func]),
    cardTheme: PropTypes.string,
};

export default ReviewAndRating;
