import React, { PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames/bind';
import get from 'lodash/get';
import GoogleMapReact from 'google-map-react';
import { Tabs, TabPanel } from 'yoda-core-components/lib/components/Tabs/Tabs';
import Content from 'yoda-core-components/lib/components/Tabs/Content';
import Title from 'yoda-core-components/lib/components/Tabs/Title';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import FindStoresListView from '../FindStoresListView/FindStoresListView';
import FindStoresPageView from '../FindStoresPageView/FindStoresPageView';
import * as styles from './FindStoresTabContainer.css';
import FindStoresLocationForm from '../FindStoresLocationForm/FindStoresLocationForm';
import FindStoresMapView from '../FindStoresMapView/FindStoresMapView';
import Constants from '../../../../common/Constants';

const cx = classNames.bind(styles);

const myTheme = {
    tabMainClass: styles.tabMain,
    tabContainerClass: styles.tab,
    tabPanelContentClass: styles.tabPanelContent,
    tabListItemClass: styles.tabListItem,
    tabButtonClass: styles.tabButton,
    tabPanelTitleClass: styles.tabPanelTitle,
    tabActiveClass: styles.active,
};

/**
 * This component renders the tabs (List and Map virw) in the find stores slide panel.
 * It also includes the LocationFinder component for getting the zipcode from user.
 *
 * @param {any} {
 *     findStoresDetails,
 *     productDetails,
 *     findStoresAction,
 *     selectStoreAction,
 *     selectActionCallback,
 *     actions }
 */
export default function FindStoresTabContainer({
    findStoresDetails,
    productDetails,
    findStoresAction,
    selectStoreAction,
    selectActionCallback,
    deviceType,
    hideDirections,
    restrictMiles,
    findMoreStores,
    theme,
    from,
    defaultStoreId,
    onFilterChange,
    setAvailableFilter }) {
    const isShowAvailablity = !isEmpty(productDetails);
    const containerClass = cx('container', theme, {
        desktopContainer: deviceType.isDesktop,
    });

    const onShowMore = () => {
        const payload = {
            nextPageLink: findStoresDetails.nextPageLink,
        };
        findMoreStores(payload);
    };

    const renderViewMoreButton = () => (
        // Show view more button only when there are stores left to display
        <section className={cx('loadMoreContainer')}>
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

    const renderSameDayPickUpMessage = () => (
        (productDetails) ?
            <div
                className={cx('sameDayPickUpBlock')}
                data-automation-id="at-sdpu-store-time-msg"
            >
                {Constants.findStores.orderMessage}
            </div> : null
    );

    const renderAppliancesMessageBox = () => (
        <div className={cx('informationMsgWrapper')}>
            <MessageBox
                type="information"
                level="section"
                title={Constants.APPLIANCE_MESSAGE_TITLE}
                hasClose={false}
            />
        </div>
    );

    const renderListTitle = () => (
        <div>
            <Icon
                automationId="at-list-inactive-icon"
                iconType="svg"
                width="40px"
                height="40px"
                viewBox="0 0 48 48"
                className={styles.activeIcon}
                name="icon-list-fill"
            />
            <Icon
                automationId="at-list-active-icon"
                iconType="svg"
                width="40px"
                height="40px"
                viewBox="0 0 48 48"
                className={styles.inActiveListIcon}
                name="icon-list-line"
            />
            <span data-automation-id="at-list-view-title-active" className={styles.activeText}>List View</span>
            <span data-automation-id="at-list-view-title-inactive" className={styles.inActiveText}>List View</span>
        </div>
    );
    /* istanbul ignore next */
    const renderLocationForm = () => (
        <FindStoresLocationForm
            key="storeLocationForm"
            findStoresDetails={findStoresDetails}
            findStoresAction={findStoresAction}
            isShowAvailableFilter={isShowAvailablity}
            setAvailableFilterAction={setAvailableFilter}
            restrictMiles={restrictMiles}
            deviceType={deviceType}
            productSku={get(productDetails, '[0].skus', '')}
            theme={theme}
            from={from}
            defaultStoreId={defaultStoreId}
        />
    );

    const renderListContent = () => {
        const isSingleProduct = (productDetails && productDetails.length === 1);
        return (
            <div className={cx('scrollableContainer', 'listView', isSingleProduct ? 'scrollableExtraMargin' : null)}>
                {renderLocationForm()}
                {!isSingleProduct ? renderSameDayPickUpMessage() : null}
                <FindStoresListView
                    stores={findStoresDetails.stores}
                    zipCode={findStoresDetails.zipCode}
                    selectStoreAction={selectStoreAction}
                    selectActionCallback={selectActionCallback}
                    productDetails={productDetails}
                    deviceType={deviceType}
                    hideDirections={hideDirections}
                    defaultStoreId={defaultStoreId}
                    from={from}
                />
                {isEmpty(findStoresDetails.nextPageLink) ? '' : renderViewMoreButton()}
            </div>
        );
    };

    const renderPageContent = mapView => (
        <div className={cx('scrollableContainer', 'listView')}>
            {renderLocationForm()}
            {theme === Constants.findStoreThemes.pdpMajorAppliances ?
              renderAppliancesMessageBox() : null}
            <FindStoresPageView
                {...findStoresDetails}
                selectStoreAction={selectStoreAction}
                selectActionCallback={selectActionCallback}
                productDetails={productDetails}
                deviceType={deviceType}
                hideDirections={hideDirections}
                theme={theme}
                mapView={mapView}
                findMoreStores={findMoreStores}
                onFilterChange={onFilterChange}
                defaultStoreId={defaultStoreId}
                from={from}
            />
        </div>
    );

    const renderMapTitle = () => (
        <div>
            <Icon
                automationId="at-map-inactive-icon"
                iconType="svg"
                width="40px"
                height="40px"
                viewBox="0 0 48 48"
                className={styles.activeIcon}
                name="icon-location-pin"
            />
            <Icon
                automationId="at-map-inactive-icon"
                iconType="svg"
                width="40px"
                height="40px"
                viewBox="0 0 48 48"
                className={styles.inActiveMapIcon}
                name="location-pin-unfilled"
            />
            <span data-automation-id="at-map-view-title-active" className={styles.activeText}>Map View</span>
            <span data-automation-id="at-map-view-title-active" className={styles.inActiveText}>Map View</span>
        </div>
    );

    const renderMapContent = () => {
        let mapContent = null;
        const center = { lat: 40.647, lng: -104.326 };
        const { findStores } = Constants;
        const isSingleProduct = (productDetails && productDetails.length === 1);
        const isInvalidInput = findStoresDetails.zipCode === findStores.INVALID_INPUT;
        const errMessage = isEmpty(productDetails) ? findStores.noStoresMessage : findStores.noSDPUStoresMessage;
        if (isEmpty(findStoresDetails.stores)) {
            const errorMessage = findStoresDetails.zipCode ? (
                <div className={cx('errorMsgWrapper')}>
                    <MessageBox
                        type="error"
                        level="section"
                        title={isInvalidInput ? findStores.invalidInputMsg : errMessage}
                        hasClose={false}
                    />
                </div>
            ) : '';
            mapContent = (
                <div>
                    {errorMessage}
                    <div className={cx('mapWrapper')}>
                        <GoogleMapReact
                            defaultCenter={center}
                            defaultZoom={4}
                        />
                    </div>
                </div>
            );
        } else {
            mapContent = (
                <FindStoresMapView
                    stores={findStoresDetails.stores}
                    center={findStoresDetails.stores[0]}
                    deviceType={deviceType}
                    zipCode={findStoresDetails.zip}
                    selectStoreAction={selectStoreAction}
                    selectActionCallback={selectActionCallback}
                    productDetails={productDetails}
                    hideDirections={hideDirections}
                    theme={theme}
                />
            );
        }

        return (
            <div className={cx('scrollableContainer', 'mapView', isSingleProduct ? 'scrollableExtraMargin' : null)}>
                {renderLocationForm()}
                {isShowAvailablity && !isSingleProduct ? renderSameDayPickUpMessage() : null}
                {mapContent}
            </div>
        );
    };

    const renderTabsAndContent = () => {
        const isFindAStorePage = (theme === Constants.findStoreThemes.findAStorePage);
        const isSelectAStore = theme === Constants.findStoreThemes.selectAStore;
        const isGalleryStore = theme === Constants.findStoreThemes.gallery;
        const isPDPMajorAppliances = theme === Constants.findStoreThemes.pdpMajorAppliances;
        const isFindOrSelectStore = (isFindAStorePage || isSelectAStore || isGalleryStore || isPDPMajorAppliances);

        if (isFindAStorePage && !deviceType.isMobile) {
            return (<div>
                {renderPageContent()}
            </div>
            );
        }
        return (
            <Tabs themeConfig={myTheme} activeTabPanelIndex={0} data-automation-id="storeview-tabs">
                <TabPanel title="ListView" index={0}>
                    <Title>{renderListTitle()}</Title>
                    <Content>{isFindOrSelectStore ? renderPageContent() : renderListContent()}</Content>
                </TabPanel>
                <TabPanel title="MapView" index={1}>
                    <Title>{renderMapTitle()}</Title>
                    <Content>{isFindOrSelectStore ? renderPageContent(true) : renderMapContent()}</Content>
                </TabPanel>
            </Tabs>
        );
    };

    return (
        <div className={containerClass} data-automation-id="storeview-container">
            {renderTabsAndContent()}
        </div>

    );
}

FindStoresTabContainer.propTypes = {
    findStoresDetails: PropTypes.objectOf(PropTypes.object),
    productDetails: PropTypes.objectOf(PropTypes.object),
    findStoresAction: PropTypes.func.isRequired,
    selectStoreAction: PropTypes.func.isRequired,
    findMoreStores: PropTypes.func.isRequired,
    setAvailableFilter: PropTypes.func,
    selectActionCallback: PropTypes.func,
    deviceType: PropTypes.objectOf(PropTypes.object),
    hideDirections: PropTypes.bool,
    restrictMiles: PropTypes.bool,
    theme: PropTypes.string,
    onFilterChange: PropTypes.func,
    from: PropTypes.string.isRequired,
    defaultStoreId: PropTypes.string,
};

FindStoresTabContainer.defaultProps = {
    findStoresDetails: {},
    deviceType: {},
    productDetails: {},
    selectActionCallback: null,
    hideDirections: false,
    restrictMiles: false,
    theme: '',
    setAvailableFilter: () => {},
    onFilterChange: null,
    defaultStoreId: null,
};
