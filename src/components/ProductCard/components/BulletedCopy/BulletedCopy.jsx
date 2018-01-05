import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import FeatureFlag from 'yoda-core-components/lib/components/FeatureFlag/FeatureFlag';

import ProductAvailability from '../ProductAvailability/ProductAvailability';
import config from '../../ProductCard.config';
import styles from './BulletedCopy.css';

const cx = classNames.bind(styles);

const BulletedCopy = (props) => {
    const { bulletedCopyAttrs,
            productUrl,
            cardType,
            deviceType: { isDesktop },
            onProductClick } = props;

    if (isDesktop && bulletedCopyAttrs && bulletedCopyAttrs.length > 0) {
        const bulletedCopyArray = [];
        let learnMore = null;
        const finalBulletedCopyAttrs = [...bulletedCopyAttrs].splice(0, 5);
        learnMore = productUrl && (
            <a className={cx('learnMore')} href={productUrl} onClick={(e) => { onProductClick(e, 'features'); }}>
                Learn More
            </a>
        );

        for (let i = 0; i < finalBulletedCopyAttrs.length; i += 1) {
            /* eslint-disable react/no-danger */
            const bulletedcopy = (
                <li key={`bulletedCopy${i}`} dangerouslySetInnerHTML={{ __html: finalBulletedCopyAttrs[i] }}/>
            );
            bulletedCopyArray.push(bulletedcopy);
        }

        return (
            <div className={cx('bulletedCopyBlock', cardType)}>
                <span className={cx('productFeaturesTitle')}>Product Features</span>
                <ul className={cx('bulletedCopyMain')}>
                    {bulletedCopyArray}
                    {learnMore}
                </ul>
                { cardType === config.cardTypes.LIST &&
                    (
                        <FeatureFlag name="enableProductAvailability">
                            <ProductAvailability {...props} />
                        </FeatureFlag>
                    )
                }
            </div>
        );
    }
    return null;
};

BulletedCopy.propTypes = {
    productUrl: PropTypes.string,
    deviceType: PropTypes.oneOfType([PropTypes.object]),
    onProductClick: PropTypes.oneOfType([PropTypes.func]),
    bulletedCopyAttrs: PropTypes.oneOfType([PropTypes.array]),
    cardType: PropTypes.oneOf([
        config.cardTypes.LIST,
        config.cardTypes.GRID,
    ]),
};

BulletedCopy.defaultProps = {
    productUrl: '',
    deviceType: {},
    onProductClick: () => {},
    bulletedCopyAttrs: [],
    cardType: config.cardTypes.GRID,
};

export default BulletedCopy;
