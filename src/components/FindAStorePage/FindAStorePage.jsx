import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { bindActionCreators } from 'redux';
import FindStoresTabContainer from '../FindStores/components/FindStoresTabContainer/FindStoresTabContainer';
import findAStorePageActions from '../../actions/FindAStorePageAction';
import storeAction from '../../actions/StoreAction';
import * as analyticsAction from '../../actions/AnalyticsAction';
import styles from './FindAStorePage.css';
import { findStores, findStoreThemes } from '../../common/Constants';
import Utils from '../../helpers/Utils/Utils';

const cx = className.bind(styles);

export class FindAStorePage extends PureComponent {
    static propTypes = {
        /**
         * Store which defines default state of FindAStorePage component
        */
        storeInfo: PropTypes.objectOf(PropTypes.object).isRequired,
        /**
         * List of actions invoked by FindAStorePage component
         * prePopulateStores : Action to populate results on load. Header store is the key to fetch data.
         * findMoreStoresPage : Action to be trigerred to fetch more stores.
         * findStoresPage : Action to be trigerred to fetch data based on the search value.
         * storeSearchData : Action to be trigerred to make storeSearch Analytics action.
         * setMyStore : Action to be trigerred to set a store
        */
        actions: PropTypes.objectOf(PropTypes.object).isRequired,
        /**
         * To get User agent information.
        */
        deviceType: PropTypes.objectOf(PropTypes.object).isRequired,
         /**
         * Header store information can be accessed using this property.
        */
        selectedStore: PropTypes.objectOf(PropTypes.object).isRequired,
         /**
         * Custom action which gets trigerred on selectStore. By default it invokes setMyStore.
        */
        selectStoreAction: PropTypes.func,
        /**
         * Based on the theme the FindAStorePage renders components.
         * Supported Themes
         * findAStorePage - Used for find a store page.
         * selectAStore - Used for 'Change My Store' and 'Select a Store'
         * gallery - used for selecting stores in Gallery page(Multiselect) - User can select multiple stores which this theme.
        */
        theme: PropTypes.string,
        /**
         * Title for FindAStorePage component
        */
        title: PropTypes.string,
        /**
         * Consists of list of stores selected by user to filter products on Gallery
        */
        selectedStoresToFilter: PropTypes.objectOf(PropTypes.object).isRequired,
    };

    static defaultProps = {
        theme: 'findAStorePage',
        selectStoreAction: null,
        title: findStores.findAStorePageTitle,
    };

    constructor(props) {
        super(props);
        const { theme } = this.props;
        this.selectAStore = theme === findStoreThemes.selectAStore;
        this.findAStorePage = theme === findStoreThemes.findAStorePage;
        this.gallerySelectAStore = theme === findStoreThemes.gallery;
        this.isFindOrSelectAStore = this.selectAStore || this.findAStorePage;
        /* istanbul ignore next */
        if (!__SERVER__) {
            this.unloadEvent = (Utils.findMobileOS() === 'iOS') ? 'pagehide' : 'beforeunload';
        }
    }

    componentWillMount() {
        /* istanbul ignore next */
        if (!__SERVER__) {
            this.fetchStoresOnLoad(this.props);
            window.addEventListener(this.unloadEvent, this.setMyStore);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.fetchStoresOnLoad(nextProps);
    }

    componentWillUnmount() {
        /* istanbul ignore next */
        if (!__SERVER__) {
            this.setMyStore();
            window.removeEventListener(this.unloadEvent, this.setMyStore);
        }
    }

    setMyStore = () => {
        const { selectedStore: { isGeoStore, storeDetails },
                storeInfo: { stores },
                actions: { setMyStore },
                selectedStoresToFilter,
                selectStoreAction,
        } = this.props;
        const invokeMystore = !storeDetails || isGeoStore;
        if (stores && stores.length && invokeMystore) {
            const actionToSelectAStore = selectStoreAction || setMyStore;
            /* istanbul ignore next */
            if (this.gallerySelectAStore) {
                // For Gallery - Trigger setMyStore only if user doesn't select any store
                /* istanbul ignore next */
                if (!selectedStoresToFilter.length) {
                    actionToSelectAStore(stores[0]);
                }
            } else {
                actionToSelectAStore(stores[0]);
            }
        }
    }

    fetchStoresOnLoad(props) {
        /* istanbul ignore next */
        if (!__SERVER__) {
            const {
                storeInfo: { invokeStoresOnLoad },
                selectedStore: { storeDetails, isGeoStore },
                actions: { prePopulateStores },
            } = props;
            if (this.isFindOrSelectAStore && !isGeoStore && storeDetails && !invokeStoresOnLoad) {
                prePopulateStores();
            }
        }
    }

    render() {
        const { actions: { findMoreStoresPage, findStoresPage, setMyStore, storeSearchData, bopisChangeZip },
        storeInfo,
        deviceType,
        title,
        selectStoreAction,
        theme } = this.props;

        const onFilterChange = (event, value) => {
            const { initialPageLink } = storeInfo;
            if (initialPageLink) {
                const payload = {
                    initialPageLink,
                    filterByService: true,
                    filterValue: value,
                };
                findMoreStoresPage(payload);
            }
        };
        /* istanbul ignore next */
        const findStoresPageData = (payload) => {
            findStoresPage(payload);
            if (theme === findStoreThemes.gallery) {
                bopisChangeZip({});
            } else {
                storeSearchData({ address: payload.zipCode });
            }
        };

        const wrapperClass = cx('wrapper', theme, {
            row: theme === findStoreThemes.findAStorePage,
            desktopWrapper: deviceType.isDesktop,
        });

        const pageHeader = cx('pageHeader', theme, {
            col12: theme === findStoreThemes.findAStorePage,
        });

        return (
            <div className={wrapperClass}>
                <h2 className={pageHeader}> {title} </h2>
                <FindStoresTabContainer
                    findStoresDetails={storeInfo}
                    selectStoreAction={selectStoreAction || setMyStore}
                    findStoresAction={findStoresPageData}
                    deviceType={deviceType}
                    hideDirections={false}
                    restrictMiles={false}
                    theme={theme}
                    findMoreStores={findMoreStoresPage}
                    onFilterChange={onFilterChange}
                    productDetails={null}
                />
            </div>
        );
    }

}

const mapStateToProps = ({ findAStorePageInfo, context, selectedStore, galleryStoreReducer }) => ({
    storeInfo: findAStorePageInfo,
    deviceType: context ? context.deviceType : {},
    selectedStore,
    selectedStoresToFilter: galleryStoreReducer && galleryStoreReducer.selectedStores,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...findAStorePageActions, ...storeAction, ...analyticsAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindAStorePage);
