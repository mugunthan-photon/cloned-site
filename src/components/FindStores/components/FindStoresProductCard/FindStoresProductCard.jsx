import React, { PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import S7Image from 'yoda-core-components/lib/components/S7Image/S7Image';
import classNames from 'classnames/bind';
import Constants from '../../../../common/Constants';
import * as styles from './FindStoresProductCard.css';

const cx = classNames.bind(styles);

/**
 * This component renders product card that is displayed in the header of the find stores panel.
 * It is only rendered only when one product's inventory needs to be checked.
 *
 * @param {any} { product }
 */
export function FindStoresProductCard({ product }) {
    if (isEmpty(product)) {
        return null;
    }

    return (
        <div data-automation-id="fs-productcard-container" className={cx('container', 'col12')}>
            <div data-automation-id="fs-productcard-imagecontainer" className={cx('imageContainer', 'col2')} >
                <S7Image
                    automationId="fs-productcard-imagetag"
                    src={product.imageURL}
                    alt={product.name}
                />
            </div>
            <div data-automation-id="fs-productcard-infocontainer" className={cx('infoContainer', 'col9')}>
                <div data-automation-id="fs-productcard-title" className={cx('title')}>{product.name}</div>
                <div
                    data-automation-id="fs-productcard-subtitle"
                    className={cx('subTitle')}>
                    {Constants.findStores.orderMessage}
                </div>
            </div>
        </div>
    );
}

FindStoresProductCard.propTypes = {
    product: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FindStoresProductCard;
