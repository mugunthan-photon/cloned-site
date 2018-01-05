import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import styles from './SelectStore.css';
import { findStoreThemes } from '../../../../common/Constants';

const cx = classNames.bind(styles);

export const SelectStore = (props) => {
    const { selectStoreAction, buttonClassName, storeInfo, storeDetails, isGeoStore, theme } = props;
    const isGalleryOrPDPLargeAppliances = (theme === findStoreThemes.gallery)
    || (theme === findStoreThemes.pdpMajorAppliances);
    const selectStoreButton = (<Button
        buttonType="Primary"
        type="submit"
        size="Md"
        onClick={() => selectStoreAction(storeInfo)}
        className={buttonClassName}
        data-automation-id="at-storedetailscard-selectbutton">
             Set My Store
    </Button>);

    const myStore = (
        <div className={cx('myStore-label')}>
            <Icon iconType="svg" automationId="test-automation-icon" width="20" height="20" viewBox="0 0 35 35" name="store" pathClassName={styles.iconPath} />
            <span>My Store</span>
        </div>
    );

    // Hiding select store button as we need to select multiple stores in Gallery
    if (isGalleryOrPDPLargeAppliances && (storeInfo.id !== storeDetails.id || isGeoStore)) {
        return null;
    }

    return ((storeInfo.id === storeDetails.id) && !isGeoStore) ? myStore : selectStoreButton;
};

SelectStore.propTypes = {
    selectStoreAction: PropTypes.func.isRequired,
    storeInfo: PropTypes.objectOf(PropTypes.object).isRequired,
    buttonClassName: PropTypes.string,
    theme: PropTypes.string,
};

SelectStore.defaultProps = {
    buttonClassName: '',
    storeDetails: {},
    storeInfo: {},
    theme: '',
};

const mapStateToProps = ({ selectedStore: { storeDetails, isGeoStore } }) => ({
    storeDetails: storeDetails || {},
    isGeoStore,
});

export default connect(mapStateToProps)(SelectStore);

