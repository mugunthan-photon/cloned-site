import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import BundleBadge from '../../../ProductBadges/BundleBadge';
import config from '../../ProductCard.config';
import styles from './ProductBadge.css';

const cx = classNames.bind(styles);

const ProductBadge = (props) => {
    const { badge, upperBadge, cardType, playVideo } = props;
    const activeBadge = (badge || upperBadge);
    if (!playVideo && activeBadge && activeBadge.text) {
        if (activeBadge.type === 'bundle') {
            return <BundleBadge text={activeBadge.text} cardType={cardType} />;
        }
        return (
            <div className={cx('badge', activeBadge.theme)}>
                <span className={cx('badgechild')} />
                {activeBadge.text}
            </div>
        );
    }
    return null;
};

ProductBadge.propTypes = {
    cardType: PropTypes.oneOf([
        config.cardTypes.LIST,
        config.cardTypes.GRID,
    ]),
    badge: PropTypes.oneOfType([PropTypes.object]),
    upperBadge: PropTypes.oneOfType([PropTypes.object]),
    playVideo: PropTypes.bool,
};

ProductBadge.defaultProps = {
    cardType: config.cardTypes.GRID,
    badge: null,
    upperBadge: {},
    playVideo: false,
};

export default ProductBadge;

