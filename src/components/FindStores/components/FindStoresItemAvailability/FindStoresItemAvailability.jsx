import React, { PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import classNames from 'classnames/bind';
import S7Image from 'yoda-core-components/lib/components/S7Image/S7Image';
import List from 'yoda-core-components/lib/components/List/List';
import config from 'yoda-core-components/lib/components/List/List.config';
import styles from './FindStoresItemAvailability.css';

const cx = classNames.bind(styles);

/**
 * This component renders the images of the available products in the StoreDetailsCard component.
 * It uses S7Image component to render the image
 *
 * @param {any} { itemDetails }
 */
function FindStoresItemAvailability({ itemDetails }) {
    if (isEmpty(itemDetails)) {
        return null;
    }

    const imagesItemRenderer = (item) => {
        if (item.inventory.pickUpStatus === 'AVAILABLE') {
            return (
                <div className={cx('imageContainer')}>
                    <S7Image
                        src={item.inventory.imageURL}
                        alt={item.inventory.imageURL}
                        automationId={`item-availability-images-${item}`}
                    />
                </div>
            );
        }
        return null;
    };

    const availableItems = filter(itemDetails, item => (item.inventory.pickUpStatus === 'AVAILABLE'));

    return availableItems.length ? (
        <div className={cx('container')} data-automation-id="fs-item-availability-container">
            <div
                className={cx('title')}
                data-automation-id="fs-item-availabilty-title"
            >
                {`${availableItems.length} out of ${itemDetails.length} items available`}
            </div>
            <List
                direction={config.direction.FLUID}
                datasource={itemDetails}
                childRenderer={imagesItemRenderer}
                listBodyClass={styles.itemAvailBody}
                listStyleClass={styles.listStyleWrapper}
                itemStyleClass={styles.itemAvailList}
            />
        </div>
    ) : null;
}

FindStoresItemAvailability.propTypes = {
    itemDetails: PropTypes.oneOf(PropTypes.array, PropTypes.object).isRequired,
};

export default FindStoresItemAvailability;
