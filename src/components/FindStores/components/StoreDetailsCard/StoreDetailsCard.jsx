import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import _map from 'lodash/map';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import List from 'yoda-core-components/lib/components/List/List';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import config from 'yoda-core-components/lib/components/List/List.config';
import FindStoresItemAvailability from '../FindStoresItemAvailability/FindStoresItemAvailability';
import SelectStore from '../SelectStore/SelectStore';
import SelectStoreCheckbox from '../SelectStoreCheckbox/SelectStoreCheckbox';
import { searchMaps, findStoreThemes, findStores } from '../../../../common/Constants';
import Utils from '../../../../helpers/Utils/Utils';
import styles from './StoreDetailsCard.css';

const cx = classNames.bind(styles);

/**
 * This component renders the store details with inventory information in a card format.
 * Select store action is invoked from this component on button click.
 * The inventory details are shown only if the products are passed else it just displays the list of stores
 *
 * @class StoreDetailsCard
 * @extends {Component}
 */
export class StoreDetailsCard extends Component {
    static propTypes = {
        deviceType: PropTypes.objectOf(PropTypes.object),
        store: PropTypes.objectOf(PropTypes.object).isRequired,
        productDetails: PropTypes.objectOf(PropTypes.object),
        isExpanded: PropTypes.bool,
        selectStoreAction: PropTypes.func.isRequired,
        selectActionCallback: PropTypes.func,
        hideDirections: PropTypes.bool,
        theme: PropTypes.string,
        from: PropTypes.string,
        isDefaultStore: PropTypes.bool,
        userLatLong: PropTypes.string,
    };

    static defaultProps = {
        deviceType: { isMobile: false, isDesktop: true },
        productDetails: null,
        selectActionCallback: null,
        isShowAvailability: false,
        isExpanded: false,
        hideDirections: false,
        theme: '',
        from: 'order',
        isDefaultStore: false,
        userLatLong: '',
    };

    constructor(props) {
        super(props);
        this.onSelectStore = this.onSelectStore.bind(this);
        this.onToggleDetailsSection = this.onToggleDetailsSection.bind(this);
        this.renderShowDetailsButton = this.renderShowDetailsButton.bind(this);
        this.storeServicesRenderer = this.storeServicesRenderer.bind(this);
        this.storeTimingsRenderer = this.storeTimingsRenderer.bind(this);
        this.isFindOrSelectAStore = (this.props.theme === findStoreThemes.selectAStore)
            || (this.props.theme === findStoreThemes.findAStorePage)
            || (this.props.theme === findStoreThemes.pdpMajorAppliances);
        this.isGalleryStore = this.props.theme === findStoreThemes.gallery;
        this.state = {
            showDetailsSection: false,
        };
    }

    onSelectStore = () => {
        const { store, selectStoreAction, selectActionCallback } = this.props;
        const params = {
            payload: { id: store.id },
            selectActionCallback,
        };
        selectStoreAction(params);
    };

    onToggleDetailsSection = () => {
        this.setState({ showDetailsSection: !this.state.showDetailsSection });
    }

    storeServicesRenderer = (item) => {
        if (item.storeService && item.redirectUrl) {
            return (
                <div className={cx('storeServiceListItems')}>
                    <span className={cx('storeServiceListItemsText')}>{item.storeService}</span>
                    <span><a href={item.redirectUrl} className={cx('scheduleAppoitment')}>Schedule Appointment</a></span>
                </div>
            );
        }
        return (<span className={cx('storeServiceListItems')}>{item.storeService}</span>);
    };

    storeTimingsRenderer = timing => (`${timing.days} : ${timing.time.replace(/:00/g, '')}`);

    findServiceAppointment = (store) => {
        const { services, appointments, id } = store;
        return _map(services, (storeService) => {
            const appointmentInfo = find(appointments, appointment => appointment.name === storeService);
            return {
                storeService,
                redirectUrl: (appointmentInfo && appointmentInfo.url) ?
                    `/signin?isMeevoRedirect=true&service=${storeService}&storeId=${id}` : '',
            };
        });
    };

    displayHoursOrOverrideMessage(isItemAvailable) {
        let hourSection = null;
        if (this.props.store.timingsOverrideMessage && this.props.store.timingsOverrideMessage.length) {
            hourSection = (<div className={cx('storeHoursAndSelectButtonContainer')}>
                { /* eslint-disable react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: this.props.store.timingsOverrideMessage }}/>
            </div>);
        } else {
            hourSection = this.renderStoreHours(isItemAvailable);
        }
        return hourSection;
    }
    /**
     * Renders the phone number. In mobile view it is rendered as a link so that it opens in the phone app
     * In Find A Store Page we need to display phone number as a link so adding it based on theme.
     */
    renderPhoneNumber = () => {
        const { deviceType: { isMobile, isTablet } } = this.props;
        return (
            <span className={cx('phoneNumber')}>
                {isMobile || (this.isFindOrSelectAStore && isTablet) ?
                    <a
                        href={`tel:+1${this.props.store.phone}`}
                        className={cx('urlStyle')}
                        data-automation-id="at-storedetailscard-phone"
                    >
                        {this.props.store.phone}
                    </a> : this.props.store.phone
                }
            </span>
        );
    }

    /**
     * Renders the direction url based on OS type to open them in the native apps.
     */
    renderDirectionUrl = () => {
        const { store, deviceType } = this.props;
        let directionUrl = `${store.street}+${store.city}+${store.state}+${store.zip}`;
        const linkConfig = (deviceType.isDesktop) ? { target: '_blank', rel: 'noopener noreferrer' } : {};

        /* istanbul ignore next */
        directionUrl = (Utils.findMobileOS() === 'iOS') ?
            `${searchMaps.APPLE_MAPS_URL}${directionUrl}` :
            `${searchMaps.GOOGLE_MAPS_URL}${directionUrl}`;

        return (
            <span>
                <a
                    href={directionUrl}
                    className={cx('urlStyle')}
                    data-automation-id="at-storedetailscard-getdirection"
                    {...linkConfig}
                >Get Directions</a>
                <span className={cx('separator')}>|</span>
            </span>
        );
    };

    renderStoreSelectionButton = (isItemAvailable) => {
        const { theme, selectStoreAction, store, isDefaultStore } = this.props;
        const selectStore = (<SelectStore
            selectStoreAction={selectStoreAction}
            storeInfo={store}
            theme={theme}
            buttonClassName={cx('redButton')} />);

        switch (theme) {
            case findStoreThemes.findAStorePage:
                return selectStore;
            case findStoreThemes.selectAStore:
                return selectStore;
            case findStoreThemes.gallery:
                return selectStore;
            case findStoreThemes.pdpMajorAppliances:
                return selectStore;
            default:
                return isItemAvailable && !isDefaultStore ?
                    <Button
                        buttonType="Primary"
                        type="submit"
                        size="Md"
                        onClick={this.onSelectStore}
                        className={cx('redButton')}
                        data-automation-id="at-storedetailscard-selectbutton">
                        {findStores[this.props.from].detailsButton}
                    </Button> : null;
        }
    }

    /**
     * Renders the store hours and select button. The select button is not rendered if the product details
     * are passed and inventory is not available.
     */
    renderStoreHours = isItemAvailable => (
        <div className={cx('storeHoursAndSelectButtonContainer')}>
            <div className={cx('storeHoursContainer')} data-automation-id="at-storedetailscard-storelist">
                <List
                    direction={config.direction.VERTICAL}
                    spacing={config.spacing.NONE}
                    itemSpacing={config.spacing.NONE}
                    datasource={this.props.store.timings}
                    childRenderer={this.storeTimingsRenderer}
                    listBodyClass={cx('storeTime')}
                />
            </div>
            <div className={cx('selectContainer')}>
                {this.renderStoreSelectionButton(isItemAvailable)}
                {this.props.isDefaultStore &&
                    <Icon
                        iconType="svg"
                        width="100px"
                        height="50px"
                        viewBox="0 0 22 22"
                        name="store"
                    />
                }
                {this.props.productDetails && isItemAvailable ?
                    <span className={cx('pickupText')} data-automation-id="at-storedetailscard-pickuptext">
                        <span className={cx('pickupTextFree')}>FREE</span>
                        <span> Pickup</span>
                        <span className={cx('pickupTextToday')}>Today</span>
                    </span> : null}
            </div>
        </div>
    );

    /**
     * Renders the show details button when isExpanded props is passed as false
     */
    renderShowDetailsButton = () => (
        <div className={cx('showDetailsContainer')}>
            <Button
                buttonType="Text"
                size="Sm"
                onClick={this.onToggleDetailsSection}
                className={cx('showDetails')}
                automationId="at-storedetailscard-showdetails">
                Show Details
                    <Icon
                        iconType="svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 22 22"
                        pathClassName={styles.closeBtn}
                        name="icon-triangle-down"
                />
            </Button>
        </div>
    );

    /**
     * Renders the services in the stores. This will be shown or hidden under show details link based on
     * isExpanded props passed. isExpanded is passed as false from list view and as true from map view.
     */
    renderStoreServicesSection = () => {
        const { store, isExpanded, hideDirections } = this.props;
        const storeServices = this.findServiceAppointment(store);
        const directionDetails = hideDirections ? (
            <div className={cx('directionDetails')}>
                {this.renderDirectionUrl()}
                {this.renderPhoneNumber()}
            </div>
        ) : null;
        // isExpanded is passed from map view where it has to show all the details by default
        // isExpanded is false in list view where showDetailsSection flag will be used to show/hide the services
        return (!isEmpty(store.services) && (isExpanded || this.state.showDetailsSection)) ?
            <div className={cx('servicesContainer')} data-automation-id="at-storedetailscard-storedetails">
                <div className={cx('servicesTitle')}>Store Services</div>
                {directionDetails}
                <List
                    direction={config.direction.VERTICAL}
                    spacing={config.spacing.NONE}
                    itemSpacing={config.spacing.NONE}
                    datasource={storeServices}
                    childRenderer={this.storeServicesRenderer}
                    listBodyClass={cx('servicesContent')}
                />
                {isExpanded ?
                    null :
                    <Button
                        buttonType="Text"
                        size="Sm"
                        onClick={this.onToggleDetailsSection}
                        className={cx('showDetails')}
                        automationId="at-storedetailscard-hidedetails">
                        Hide Details
                        <Icon
                            iconType="svg"
                            width="24px"
                            height="24px"
                            viewBox="0 0 22 22"
                            pathClassName={styles.closeBtn}
                            name="icon-triangle-up"
                        />
                    </Button>
                }
            </div> : null;
    }

    render() {
        const { store,
            productDetails,
            isExpanded,
            hideDirections,
            theme,
            userLatLong,
            deviceType: { isDesktop },
        } = this.props;
        const isItemAvailable = (productDetails) ? find(store.items, { inventory: { pickUpStatus: 'AVAILABLE' } }) : true;
        const directionDetails = hideDirections ? null : (
            <div className={cx('directionDetails')}>
                {this.renderDirectionUrl()}
                {this.renderPhoneNumber()}
            </div>
        );
        const displayDistance = this.isFindOrSelectAStore ||
            (theme === findStoreThemes.gallery && userLatLong && store.distance);
        const storeTitle = this.isFindOrSelectAStore ? store.displayName : store.name;
        return (
            <div
                className={cx('SelectStoreContainer', theme, { borderBottom: !isExpanded, desktopSelectStore: isDesktop })}
                data-automation-id="at-storedetailscard-container">
                {this.isGalleryStore ? <div className={cx('checkboxWrapper')}>
                    <SelectStoreCheckbox labelContainerClass={cx('labelContainerClass')} storeInfo={store} />
                </div> : null}
                <div className={cx('storeDetailsWrapper')}>
                    <span className={cx('title')} data-automation-id="at-storedetailscard-title">{storeTitle}</span>
                    {displayDistance ?
                        <span className={cx('distance')} data-automation-id="at-storedetailscard-distance">({store.distance}mi)</span>
                        : null}
                    <div className={cx('address')} data-automation-id="at-storedetailscard-address">{store.street}</div>
                    {directionDetails}
                    {
                        productDetails && !isItemAvailable ?
                            <div
                                className={cx('selectUnavailable')}
                                data-automation-id="at-storedetailscard-unavailable"
                            >
                                Unavailable
                            </div> : null
                    }
                    {this.displayHoursOrOverrideMessage(isItemAvailable)}
                    {/* Do not render 'Show Details' if stores doesnt have service */}
                    {!isExpanded && !this.state.showDetailsSection && !isEmpty(store.services) ?
                        this.renderShowDetailsButton() : null}
                    <div className={cx('storeServiceWrapper')}>
                        {this.renderStoreServicesSection()}
                    </div>
                </div>
                {productDetails && productDetails.length > 1 ?
                    <FindStoresItemAvailability itemDetails={this.props.store.items} /> : null}
            </div>
        );
    }
}

export default StoreDetailsCard;
