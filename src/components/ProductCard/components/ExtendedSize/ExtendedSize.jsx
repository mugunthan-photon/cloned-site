import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import config from '../../ProductCard.config';
import styles from './ExtendedSize.css';

const cx = classNames.bind(styles);

const ExtendedSize = (props) => {
    const { bottomBadge,
        deviceType: { isMobile },
        cardType,
        inDescription,
        cardTheme,
    } = props;

    const cardState = isMobile && cardType === config.cardTypes.LIST;
    let returnExtendedSize = !cardState;

    if (inDescription) {
        returnExtendedSize = cardState;
    }

    if (returnExtendedSize && bottomBadge && bottomBadge.text) {
        return (
            <div className={cx('extendedSize', cardTheme, cardType)} data-automation-id="product-extended-size">
                {bottomBadge.text}
            </div>
        );
    }
    return null;
};

ExtendedSize.propTypes = {
    bottomBadge: PropTypes.oneOfType([PropTypes.object]),
    cardType: PropTypes.oneOf([
        config.cardTypes.LIST,
        config.cardTypes.GRID,
    ]),
    deviceType: PropTypes.oneOfType([PropTypes.object]),
    inDescription: PropTypes.bool,
    cardTheme: PropTypes.string,
};

ExtendedSize.defaultProps = {
    bottomBadge: {},
    deviceType: {},
    cardType: config.cardTypes.GRID,
    inDescription: false,
    cardTheme: '',
};


export default ExtendedSize;
