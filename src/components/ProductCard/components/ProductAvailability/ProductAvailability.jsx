import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import Icon from 'yoda-core-components/lib/components/Icon/Icon';

import config from '../../ProductCard.config';
import styles from './ProductAvailability.css';

const cx = classNames.bind(styles);


export const ProductAvailability = (props) => {
    const { deviceType: { isDesktop },
            cardType,
            featureFlags: { enableProductAvailability },
            availabilityStatus } = props;

    const displayProductAvailability = enableProductAvailability // Feature flag for Product Availability
                                        && cardType === config.cardTypes.GRID // Display Product Availability only in GRID view
                                        && isDesktop
                                        && availabilityStatus
                                        && availabilityStatus.length; // Availability status info

    if (displayProductAvailability) {
        const availability = [];
        let availabilityContent = '';
        const getAvailabilityIcon = (iconName) => {
            switch (iconName) {
                case 'mouse':
                    return 'mouse';
                case 'cross':
                    return 'close';
                case 'warning':
                    return 'warning';
                default:
                    return 'check';
            }
        };
        for (let i = 0; i < availabilityStatus.length; i += 1) {
            let storeName = availabilityStatus[i].storeName;
            if (storeName) {
                if (storeName.length > 19) {
                    storeName = `${storeName.slice(0, 19)}...`;
                }
            }
            const content = (
                <li className={cx('availabilityMessageWrapper')}>
                    <div className={cx('availabilityMessageEach')}>
                        <Icon iconType="svg" automationId="check-automation-swatch" width="24px" height="24px" viewBox="0 0 24 24" name={getAvailabilityIcon(availabilityStatus[i].icon)} key="availabilityIcon"/>
                    </div>
                    <div className={cx('availabilityMessageEach')}>
                        { /* eslint-disable react/no-danger */}
                        <div className={cx('message')} dangerouslySetInnerHTML={{ __html: availabilityStatus[i].message }}/>
                        {storeName && <div className={cx('storeLoc')}>{storeName}</div>}
                    </div>
                </li>
            );
            availability.push(content);
        }

        availabilityContent = (
            <div className={cx('availabilityWrapper')}>
                <ul className={cx(`${cardType}view`)}>
                    {availability}
                </ul>
            </div>
        );

        return availabilityContent;
    }

    return null;
};

/* istanbul ignore next */
const mapStateToProps = ({ context }) => ({
    featureFlags: context ? context.featureFlags : {},
});

export default connect(mapStateToProps)(ProductAvailability);
