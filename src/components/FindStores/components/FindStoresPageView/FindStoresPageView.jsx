import React, { PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import className from 'classnames/bind';
import List from 'yoda-core-components/lib/components/List/List';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import Button from 'yoda-core-components/lib/components/Button/Button';
import config from 'yoda-core-components/lib/components/List/List.config';
import StoreDetailsCard from '../StoreDetailsCard/StoreDetailsCard';
import FilterStore from '../FilterStore/FilterStore';
import StoreLocatorPage from '../StoreLocatorPage/StoreLocatorPage';
import MultiSelectStore from '../MultiSelectStore/MultiSelectStore';
import FindAStoreLoader from '../FindAStoreLoader/FindAStoreLoader';
import * as styles from './FindStoresPageView.css';
import { findStoreThemes } from '../../../../common/Constants';
import messages from './errorMessage';

const cx = className.bind(styles);

/**
 * This component renders the stores in a list view with store details
 *
 * @param {any} { selectStoreAction, selectActionCallback, productDetails, zipCode, stores }
 */
function FindStoresPageView({
    selectStoreAction,
    selectActionCallback,
    productDetails,
    zipCode,
    stores,
    deviceType,
    theme,
    findMoreStores,
    nextPageLink,
    mapView,
    count,
    miles,
    invalidInput,
    userLatLong,
    storeSelectedServices,
    onFilterChange,
    from,
    showLoader,
    defaultStoreId,
    hideDirections }) {
    const isFindAStorePage = (theme === findStoreThemes.findAStorePage);
    const isGalleryStore = (theme === findStoreThemes.gallery);
    const storeViewRenderer = (store, index) => {
        const newStore = Object.assign({}, store);
        newStore.displayName = `${index + 1}. ${newStore.name}`;
        return (<StoreDetailsCard
            store={newStore}
            productDetails={productDetails}
            selectStoreAction={selectStoreAction}
            selectActionCallback={selectActionCallback}
            deviceType={deviceType}
            hideDirections={hideDirections}
            theme={theme}
            userLatLong={userLatLong}
            isDefaultStore={defaultStoreId === store.id}
            from={from}
        />);
    };

    /**
     * Renders the error message when no stores are having inventory or no stores are found for a zipcode
     */
    const renderMessage = (messageDetails) => {
        const { content } = messageDetails;
        return (
            <div className={cx('messageWrapper')} data-automation-id="at-no-sdpu-stores-msg">
                <MessageBox
                    {...messageDetails}
                >
                    {content || ''}
                </MessageBox>
            </div>
        );
    };

    const onShowMore = () => {
        const payload = {
            nextPageLink,
        };
        findMoreStores(payload);
    };

    const renderViewMoreButton = () => (
        // Show view more button only when there are stores left to display
        <section className={cx('loadMoreContainer', 'row')}>
            <Button
                buttonType="Primary"
                type="submit"
                size="Xl"
                className={cx('loadMoreButton')}
                automationId="at-store-list-view-more"
                onClick={onShowMore}>
                View more stores
            </Button>
        </section>
    );

    const getServices = isFindAStorePage ? (<FilterStore
        onFilterChange={onFilterChange}
        deviceType={deviceType}
        stores={stores}
        selectedFilters={storeSelectedServices}/>) : null;

    const renderMap = () => {
        const mapWithFilters = cx('mapWithFilters', {
            col6: !mapView,
        });
        const zoomLevel = (stores && stores.length) ? 10 : 3;
        return (
            <div className={mapWithFilters}>
                {getServices}
                <div className={styles.mapsWrapper}>
                    <StoreLocatorPage
                        plotPlaces={stores || []}
                        automationId="at-store-map-view"
                        zoom={zoomLevel}
                        userLatLong={userLatLong}
                        />
                </div>
            </div>
        );
    };

    const renderSelectStoreList = () => {
        const findAStoreLargeView = isFindAStorePage && !deviceType.isMobile;
        const displayTotalStores = (findAStoreLargeView) && miles && zipCode;
        const displayErrorMessage = !showLoader && zipCode && isEmpty(stores);
        const filtersForMobileList = deviceType.isMobile ? getServices : null;
        const errorContext = invalidInput ? messages.invalidInput : messages.noStores;
        const contentWrapper = cx('contentWrapper', {
            mobileView: deviceType.isMobile,
        }, theme);
        const listWrapper = cx('listWrapper', {
            col6: isFindAStorePage && !deviceType.isMobile,
        });
        const listBodyClass = cx({
            storeDetailsList: isFindAStorePage,
        });
        return (
            <div className={contentWrapper}>
                <FindAStoreLoader />
                { mapView ? renderMap() : filtersForMobileList }
                <div className={listWrapper}>
                    {
                        findAStoreLargeView ?
                            <div className={cx('storeMsgWrapper')} data-automation-id="at-store-msg">
                                <strong>{`${count} stores `}</strong>
                                {displayTotalStores ? <span>
                                    within
                                    <strong> {`${miles > 50 ? '50+' : miles}mi`} </strong>
                                    of
                                    <strong> {zipCode}</strong>
                                </span> : null}
                            </div> : null
                    }
                    <div className={styles.storesContent}>
                        {displayErrorMessage ? renderMessage(errorContext) : null}
                        {!displayErrorMessage && isEmpty(stores) ? renderMessage(messages.initialInfo) : null}
                        <List
                            direction={config.direction.VERTICAL}
                            spacing={config.spacing.NONE}
                            itemSpacing={config.spacing.NONE}
                            datasource={stores}
                            childRenderer={storeViewRenderer}
                            listBodyClass={listBodyClass}
                            automationId="at-change-stores-list"
                        />
                        {isEmpty(nextPageLink) ? null : renderViewMoreButton()}
                        {isGalleryStore && stores && stores.length ?
                            <MultiSelectStore selectStoreAction={selectStoreAction}/> : null}
                    </div>
                </div>
                { findAStoreLargeView ? renderMap() : null}
            </div>
        );
    };

    return renderSelectStoreList();
}

FindStoresPageView.propTypes = {
    stores: PropTypes.arrayOf(PropTypes.object).isRequired,
    zipCode: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    selectStoreAction: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func,
    selectActionCallback: PropTypes.func,
    deviceType: PropTypes.objectOf(PropTypes.object),
    hideDirections: PropTypes.bool,
    theme: PropTypes.string,
    mapView: PropTypes.bool,
    from: PropTypes.string.isRequired,
    defaultStoreId: PropTypes.string,
};

FindStoresPageView.defaultProps = {
    zipCode: null,
    selectActionCallback: null,
    deviceType: {},
    hideDirections: false,
    theme: '',
    mapView: false,
    defaultStoreId: null,
};

export default FindStoresPageView;
