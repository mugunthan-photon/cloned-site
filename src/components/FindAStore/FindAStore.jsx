import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { bindActionCreators } from 'redux';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import List from 'yoda-core-components/lib/components/List/List';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import SiteComponent from '../SiteComponent/SiteComponent';
// Redux
import * as styles from './FindAStore.css';
import * as actions from '../../actions/OrderAction';
import * as analyticsActions from '../../actions/AnalyticsAction';
// Site Components
import Search from '../MarketingOptInSection/MarketingOptInSection';
import StoreCard from '../StoreCard/StoreCard';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import FilterStore from './FilterStore';
import Storage from '../../helpers/Storage/Storage';

const cx = classNames.bind(styles);
const getStores = (page, location, pinInput, choices) => {
    const position = {
        page,
        pageSize: 5,
        searchLimit: 25,
    };
    const isGeoStore = Cookies.load('isGeoStore');
    if (isGeoStore === 'true') {
        position.location = { lat: location.latitude, lng: location.longitude };
    } else {
        position.address = pinInput.value;
    }

    if (choices) {
        position.storeService = choices.toString();
        position.storeType = 'jcpServices';
    }

    return position;
};
/* istanbul ignore next */
class Facets extends React.Component {
    static defaultProps = {
        filters: new Set(),
        clearAll: () => {},
        cbChange: () => {},
        selectedStore: null,
        filtersMap: {},
    }

    static propTypes = {
        filters: PropTypes.objectOf,
        clearAll: PropTypes.func,
        cbChange: PropTypes.func,
        filtersMap: PropTypes.objectOf,
    }
    render() {
        const facets = [];
        const it = this.props.filters.values();
        const { filtersMap } = this.props;
        let val = null;

        /* eslint-disable */
        for (it; val = it.next().value;) {
            facets.push(<li className={styles.facetItem}>
                <span className={styles.facetText}>{filtersMap[val]}</span>
                <span onClick={this.props.cbChange.bind(this, {label: filtersMap[val], value: val})}>
                    <Icon iconType="svg" name="x" viewBox="0 0 8 8" width="8px" height="8px" />
                </span>
            </li>);
        }
        /* eslint-enable */

        return (<div>
            { (facets.length > 0) ? <div className={cx('clear', 'facetWrap')}>
                <div className={styles.facetFace}>
                    <Button
                        className={styles.clearBtn}
                        onClick={this.props.clearAll}
                        buttonType="Text"
                    >
                      Clear All
                  </Button>
                </div>
                <div className={styles.facetFacts}><ul>{facets}</ul></div>
            </div> : null}
        </div>);
    }
}
/* istanbul ignore next */
export class FindAStore extends SiteComponent {

    static defaultProps = {
        stores: [],
        showStores: true,
        showStoreStatus: false,
        storeStatus: false,
        actions: {},
        itemsPerRow: 2,
        location: { latitute: null, longitude: null },
        displayMap: false,
    };

    static propTypes = {
        stores: PropTypes.arrayOf(PropTypes.func).isRequired,
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        showStores: PropTypes.bool,
        showStoreStatus: PropTypes.bool,
        storeStatus: PropTypes.bool,
        location: PropTypes.objectOf,
        displayMap: PropTypes.bool,
    };

    constructor() {
        super();
        this.submitPin = this.submitPin.bind(this);
        this.getMoreStores = this.getMoreStores.bind(this);
        this.openFiltersModal = this.openFiltersModal.bind(this);
        this.closeFiltersModal = this.closeFiltersModal.bind(this);
        this.setStoreIndex = this.setStoreIndex.bind(this);
        this.filtersChanged = this.filtersChanged.bind(this);
        this.filtersAndDone = this.filtersAndDone.bind(this);
        this.hideMap = this.hideMap.bind(this);
        this.showMap = this.showMap.bind(this);
        this.getLatLong = this.getLatLong.bind(this);
        this.fetchStoresWithLocation = this.fetchStoresWithLocation.bind(this);
        this.locationBtnTheme = null;
        this.clearFacets = this.clearFacets.bind(this);
        this.location = {};
        this.choices = '';
        this.filtersLabelValueMap = {};

        this.state = {
            page: 1,
            pageSize: 5,
            searchLimit: 25,
            isFiltersModalOpen: false,
            activeIndex: -1,
            showMap: false,
            myStoreId: null,
            activeStoreZip: null,
            initialiseComponent: false,
            pinErrorState: false,
            filters: new Set(),
        };
    }
    /* istanbul ignore next */
    hydrate() {
        if (this.props.displayMap) {
            this.showMap();
        }
        let storeId;

        const storeConfigData = JSON.parse(LocalStorage.getData('defaultStore', true));
        storeId = storeConfigData ? storeConfigData.id : null;

        if (!storeId) {
            storeId = Storage.load('userStore', true);
        }

        if (storeId) {
            this.props.actions.getStoreByStoreId({ storeId });
            this.setState({ myStoreId: storeId });
        }
    }
    /* istanbul ignore next */
    getLatLong() {
        this.locationBtnTheme = 'activeLocationBtn';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.fetchStoresWithLocation);
        }
    }
    /* istanbul ignore next */
    fetchStoresWithLocation(position) {
        if (position) {
            this.clearFacets();
            this.setState({
                pinErrorState: false,
                activeStoreZip: '',
            });
            this.pinInput.value = '';
            this.props.actions.getStoresAction(
                {
                    location: { lat: position.coords.latitude, lng: position.coords.longitude },
                    page: 1,
                    pageSize: 5,
                    searchLimit: 25,
                },
            );
            Cookies.save('isGeoStore', 'true');
            this.location = position.coords;
        }
        this.locationBtnTheme = null;
    }
    /* istanbul ignore next */
    componentWillUnmount() {
        this.props.actions.clearStore();
    }
    /* istanbul ignore next */
    getMoreStores(event) {
        const page = this.state.page + 1;
        const position = getStores(page, this.location, this.pinInput, this.choices);
        position.patchPayload = true;
        this.props.actions.getStoresAction(position);
        this.setState({ page });
        event.preventDefault();
    }
    /* istanbul ignore next */
    setStoreIndex(index, id) {
        this.setState({
            activeIndex: index,
        });

        this.setState({
            myStoreId: id,
        });
        this.props.actions.getStoreByStoreId({ storeId: id });
        this.props.actions.selectStoreData();
    }
    /* istanbul ignore next */
    filtersChanged(selectedOption) {
        const { value, label } = selectedOption;
        this.filtersLabelValueMap[value] = label;

        if (value) {
            if (this.state.filters.has(value)) {
                this.state.filters.delete(value);
            } else {
                this.state.filters.add(value);
            }

            this.choices = [...this.state.filters];
        } else {
            this.choices = '';
        }

        console.log(this.state.filters);
        const position = getStores(1, this.location, this.pinInput, this.choices);
        this.props.actions.getStoresAction(position);
    }
    /* istanbul ignore next */
    clearFacets() {
        this.state.filters.clear();
        this.setState({ filters: new Set() });
        const page = 1;
        const position = getStores(page, this.location, this.pinInput);
        this.props.actions.getStoresAction(position);
        this.setState({ page });
    }
    /* istanbul ignore next */
    submitPin() {
        if (this.pinInput.value.length === 0) {
            this.setState({
                pinErrorState: true,
            });
            this.props.actions.clearStore();
        } else {
            this.clearFacets();
            this.setState({
                pinErrorState: false,
                activeStoreZip: this.pinInput.value,
            });
            this.props.actions.getStoresAction({ address: this.pinInput.value, page: 1, pageSize: 5, searchLimit: 25 });
            Cookies.save('isGeoStore', 'false');
        }
    }
    /* istanbul ignore next */
    openFiltersModal(eve) {
        this.setState({ isFiltersModalOpen: true });
        eve.preventDefault();
    }
    /* istanbul ignore next */
    closeFiltersModal() {
        this.setState({ isFiltersModalOpen: false });
    }
    /* istanbul ignore next */
    filtersAndDone() {
        this.setState({ isFiltersModalOpen: false });
    }
    /* istanbul ignore next */
    hideMap() {
        this.setState({ showMap: false });
    }
    /* istanbul ignore next */
    showMap() {
        this.setState({ showMap: true });
    }
    /* istanbul ignore next */
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedStore && !this.state.activeStoreZip) {
            this.setState({ myStoreId: nextProps.selectedStore.id, activeStoreZip: nextProps.selectedStore.zip });
            if (nextProps.selectedStore.latitude && nextProps.selectedStore.longitude) {
                this.props.actions.getStoresAction(
                    {
                        address: nextProps.selectedStore.zip,
                        page: 1,
                        pageSize: 5,
                        searchLimit: 25,
                    },
                );
            }
        }
    }
    /* istanbul ignore next */
    render() {
        const { deviceType: { isMobile } } = this.props;
        const mapsWrapperClass = isMobile ? 'mapsWrapperMobile' : 'mapsWrapper';
        // const storesWrapClass = isMobile ? 'storesWrapMobile' : 'storesWrap';

        const StoresListHeader = ({ config }) => <section>
            <div className={styles.storesHeader}>
                <div className={cx('storeTabs', 'clear')}>
                    <div className={cx('details', { detailsMobile: isMobile })}>
                        <div className={styles.numbers}>
                            <div>
                                <strong
                                    className={styles.needSpace}
                                    data-automation-id="total-stores"
                                >{config.stores.length}</strong>
                                Stores near
                                <strong
                                    data-autommation-id="store-zip-code"
                                    className={styles.needSpace}
                                >{this.state.activeStoreZip}</strong>
                            </div>
                            <div>
                                <Button
                                    automationId="store-filter-service"
                                    buttonType="Text"
                                    className={styles.anchorStyle}
                                    onClick={this.openFiltersModal}
                                >Filter by Store Services</Button>
                            </div>

                        </div>
                    </div>
                    <div className={cx('tabOption', { tabOptionLarge: !isMobile })}>
                        <Button automationId="store-show-map" buttonType="Text" onClick={this.showMap}>
                            <Icon
                                iconType="svg"
                                classNames="icon"
                                viewBox="0 0 20 20"
                                width="26px"
                                height="26px"
                                automationId="tab-map-icon"
                                name="location-fill"
                                pathClassName={cx('mapIcon', this.state.showMap ? 'active' : null)}
                            />
                            <div className={cx('iconTitle', this.state.showMap ? 'active' : null)}>Map</div>
                        </Button>
                    </div>
                    <div className={cx('tabOption', { tabOptionLarge: !isMobile })}>
                        <Button automationId="store-show-list" buttonType="Text" onClick={this.hideMap}>
                            <Icon
                                iconType="svg"
                                classNames="icon"
                                viewBox="0 0 20 20"
                                width="26px"
                                height="26px"
                                automationId="tab-list-icon"
                                name="list"
                                pathClassName={cx('listIcon', this.state.showMap ? null : 'active')}
                            />
                            <div className={cx('iconTitle', this.state.showMap ? null : 'active')}>List</div>
                        </Button>
                    </div>
                    <Facets
                        filters={this.state.filters}
                        cbChange={this.filtersChanged}
                        clearAll={this.clearFacets}
                        filtersMap={this.filtersLabelValueMap} />
                </div>
            </div>
        </section>;

        StoresListHeader.propTypes = {
            config: PropTypes.objectOf.isRequired,
        };

        const storeCardRenderer = (storeDetail, ind) => (
            <StoreCard
                index={ind + 1}
                dataConfig={storeDetail}
                key={storeDetail.id}
                setStoreCallback={this.setStoreIndex}
                activeStore={this.state.myStoreId}
                activeIndex={this.state.activeIndex}
                automationId="find-store-card"
            />
        );

        //  Preparing the map to point to Dallas to JCP HeadQuarters.
        const center = {
            lat: parseFloat(33.082081),
            lng: parseFloat(-96.832876),
        };

        const maps = () => (
            this.props.stores ? (
                <GoogleMaps
                    plotPlaces={this.props.stores}
                    center={center}
                />
            ) : null
        );

        return (
            <section className={cx('storesWrap', { storesWrapMobile: isMobile })}>
                <div data-automation-id="find-store-main" className={cx('storesContainer')}>
                    <div className={styles.inputContainer}>
                        <Button
                            size="xs"
                            buttonType="danger"
                            className={cx('locationBtn', this.locationBtnTheme)}
                            automationId="use-my-location"
                            onClick={this.getLatLong}
                        >
                            <Icon
                                iconType="svg"
                                className={cx('svgIcon')}
                                width="14px"
                                height="14px"
                                viewBox="0 0 14 14"
                                name="compass"
                            />
                            USE MY LOCATION
                        </Button>
                        <div className={styles.separator}>— or —</div>
                        <div className={styles.searchWrap}>
                            <div className={styles.title}>Search By</div>
                            <span className={styles.subTitle}>city, state or zip <sup>*</sup></span>
                            <Search
                                automationId="search-by-input"
                                buttonClass={cx('pinBtn')}
                                defaultValue={this.state.activeStoreZip}
                                type="text"
                                buttonType="dark"
                                customClass={cx('storeSearchBtn')}
                                submitCallback={this.submitPin}
                                refCallback={(ref) => {
                                    this.pinInput = ref;
                                }}
                            >GO</Search>
                        </div>
                    </div>
                    { this.state.pinErrorState ? (
                        <div className={styles.errorBlockWrapper}>
                            <div className={styles.errorBlock}>
                                <span className={styles.errorLinkIcon}>
                                    <Icon
                                        iconType="svg"
                                        classNames="icon"
                                        viewBox="0 0 16 16"
                                        width="16px"
                                        height="16px"
                                        automationId="footer-get-icon"
                                        name="errorline"
                                        pathClassName={styles.errorIconColor}
                                    />
                                </span>
                                Please enter city, state or ZIP code
                            </div>
                        </div>
                    ) : null }

                    { this.props.showStores ? (
                        <section className={styles.storeListMainBlock}>
                            {(this.props.stores.length > 0) ? (<StoresListHeader config={this.props}/>) : null}
                            {(this.state.showMap && isMobile) ? (
                                <div className={cx(mapsWrapperClass)}>
                                    {maps()}
                                </div>
                            ) : null}

                            <List
                                datasource={this.props.stores} childRenderer={storeCardRenderer}
                                itemStyleClass={styles.storesList} direction="Vertical"
                                automationId="store-show-store-list"
                                />

                            { this.props.stores.length ? (
                                <div className={styles.getMoreWrap}>
                                    <a
                                        id="btnGetMore"
                                        className={styles.btnGetMore}
                                        href={this.btnGetMore}
                                        onClick={this.getMoreStores}
                                        data-automation-id="more-store-link"
                                        >
                                        View more stores
                                    </a>
                                </div>
                            ) : null }
                        </section>
                    ) : null }

                    { this.props.showStoreStatus ? (
                        <div
                            data-automation-id="no-store-found"
                            className={styles.noStoresWrap}
                        ><span className={styles.errorLinkIcon}><Icon iconType="svg" classNames="icon" viewBox="0 0 20 20" width="20px" height="20px" automationId="footer-get-icon" name="errorline" pathClassName={styles.errorIconColor}/></span>{this.props.storeStatus}</div>
                    ) : null }
                </div>
                {(this.state.showMap && !isMobile) ? (
                    <div className={cx(mapsWrapperClass)}>
                        {maps()}
                    </div>
                ) : null}
                <ModalBox
                    showModal={this.state.isFiltersModalOpen}
                    onClose={() => this.closeFiltersModal()}
                    modalTheme={styles.filterWrapper}
                    defaultCloseBtn={false}
                    modalOverlayTheme={styles.modalOverlayTheme}
                    modalContentTheme={styles.modalContentTheme}
                    modalBlockTheme={styles.modalBlockTheme}
                    automationId="find-store-modal"
                >
                    <section className={styles.filterModal}>
                        <div>
                            <FilterStore
                                onFilterChange={this.filtersChanged}
                                onDoneCallback={this.filtersAndDone}
                                automationId="find-store-filter-store"
                                selectedFacets={this.state.filters}
                                clearFacets={this.clearFacets}
                            />
                        </div>
                    </section>
                </ModalBox>
            </section>

        );
    }
}
/* istanbul ignore next */
const mapStateToProps = (reducer) => {
    let stores = null;
    let showStores = false;
    let showStoreStatus = false;
    let storeStatus = null;
    let selectedStore = null;
    const location = {};

    if (reducer.stores.length > 0) {
        stores = reducer.stores;
        showStores = true;
    } else if (reducer.stores.status) {
        stores = [];
        showStoreStatus = true;
        showStores = false;
        storeStatus = reducer.stores.status;
    } else {
        showStores = true;
        stores = reducer.stores;
    }

    location.latitude = reducer.latLong.lat;
    location.longitude = reducer.latLong.lng;
    if (reducer.selectedStore) {
        selectedStore = reducer.selectedStore;
    }

    return {
        stores,
        showStores,
        showStoreStatus,
        storeStatus,
        location,
        selectedStore,
        deviceType: reducer.context ? reducer.context.deviceType : {},
    };
};
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...analyticsActions, ...actions }, dispatch),
});
/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(FindAStore);
