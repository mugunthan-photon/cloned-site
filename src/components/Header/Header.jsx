import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropdownMenu from 'yoda-core-components/lib/components/DropdownMenu/DropdownMenu';
import List from 'yoda-core-components/lib/components/List/List';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';

import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';

import classNames from 'classnames/bind';
import Slider from '../Slider/Slider';
import Hamburger from '../Hamburger/Hamburger';
import Tooltip from '../Tooltip/Tooltip';
import config from './Header.config';
import * as styles from './Header.css';
import ProductSearch from '../ProductSearch/ProductSearch';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import SiteComponent from '../SiteComponent/SiteComponent';
import FindAStore from '../FindAStore/FindAStore';
import FetchRegion from '../FetchRegion/FetchRegion';
import * as sessionActions from '../../actions/SessionAction';
import * as actions from '../../actions/CartAction';
import * as analyticsActions from '../../actions/AnalyticsAction';
import * as listActions from '../../actions/ListsAction';
import * as orderAction from '../../actions/OrderAction';
import * as itemCountAction from '../../actions/ItemCountAction';
import Storage from '../../helpers/Storage/Storage';

const cx = classNames.bind(styles);
const classx = cx('wrapper', 'headerDropDown');
const showNavTitle = false;

/* istanbul ignore next */
const getSavedItemsCount = (savedItems) => {
    if (savedItems) {
        return savedItems.length;
    }

    return 0;
};

/* istanbul ignore next */
const getSavedItemsMenuSuffix = (savedItems) => {
    const count = getSavedItemsCount(savedItems);
    if (count === 1) {
        return `(${count} item)`;
    } else if (count > 1) {
        return `(${count} items)`;
    }

    return '';
};

export class Header extends SiteComponent {
    static defaultProps = {
        signedOut: false,
        cartCount: 0,
        selectedStore: null,
    }

    constructor(props) {
        super(props);

        this.openStoresModal = this.openStoresModal.bind(this);
        this.closeStoresModal = this.closeStoresModal.bind(this);
        this.handleTooltipClose = this.handleTooltipClose.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.openStores = this.openStores.bind(this);
        this.closeStores = this.closeStores.bind(this);
        this.recordCouponClick = this.recordCouponClick.bind(this);
        this.closeMenuClick = this.closeMenuClick.bind(this);
        this.handleStoreTooltipClose = this.handleStoreTooltipClose.bind(this);
        this.toggleStoreTooltip = this.toggleStoreTooltip.bind(this);
        this.openStoreTablet = this.openStoreTablet.bind(this);
        this.resetMenuToFalse = this.resetMenuToFalse.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.fromHydrate = false;
        this.state = {
            isStoresModalOpen: false,
            isTabletStoresModalOpen: false,
            tooltipStoreVisible: false,
            tooltipVisible: false,
            closeSlider: false,
            cartCount: this.props.bagItemCount,
            signedOutActive: false,
            resetMenu: false,
            activeStore: null,
        };
    }

    /* istanbul ignore next */
    componentWillReceiveProps(nextProps) {
        const { signedOut, listActions: { loadLists } } = nextProps;
        const { signedOutActive } = this.state;
        this.setState({ cartCount: Cookies.load('ItemCount') });
        if (!__SERVER__ && nextProps.selectedStore && this.fromHydrate) {
            let storageZip = Storage.load('userStore', true);
            storageZip = storageZip ? storageZip.replace(/"/g, '') : null;
            Storage.save('userStore', parseInt(storageZip, 10), true);
            LocalStorage.setData('defaultStore', nextProps.selectedStore, true);
        }
        if (signedOut && signedOutActive) {
            Cookies.remove('userStoreInfo');
            Cookies.remove('DP_USER_NAME');
            Cookies.remove('DP_USER_STATE');
            Cookies.remove('DP_USER_FAVCOUNT');
            Cookies.remove('DP_SFL_ID');
            Cookies.remove('DP_SFL_PPIDS');
            Cookies.remove('USER_ACCT_ID');
            Storage.remove('userStore');

            LocalStorage.removeData('defaultStore', true);
            LocalStorage.removeData('Access_Token', false);
            LocalStorage.removeData('Refresh_Token', false);
            LocalStorage.removeData('ACCOUNT_ID', false);
            LocalStorage.removeData('DP_REWARDS_STATUS', false);
            LocalStorage.removeData('DP_FIRST_NAME', false);
            LocalStorage.removeData('DP_USER_NAME', false);
            LocalStorage.setData('DP_USER_STATE', '0', false);
            loadLists(listActions.ListTypes.SAVED_ITEMS);
            this.setState({
                signedOutActive: false,
                cartCount: 0,
            });
            window.location.href = '/';
        }
    }

    componentDidMount() {
        if (this.props.deviceType.isMobile) {
            this.openStore();
        }
    }

    /**
     * TODO:
     * Following Piece of code needs to be modified once the
     * DropdownMenu component is modified to take anchor tag
     */
    /* istanbul ignore next */
    openStoresModal(eve) {
        if (eve.url.indexOf('find-store') !== -1) {
            this.setState({
                isStoresModalOpen: true,
            });
            // Negating the state of slider on click of find my store
            this.setState({
                closeSlider: !this.state.closeSlider,
            });
            this.props.actions.triggerNavigationClick({ linkName: 'find a store', isReload: false });
        } else if (eve.url.indexOf('mycreditcard') !== -1) {
            window.location.href = eve.url;
        } else if (eve.url.indexOf('signout') !== -1) {
            // Negating the state of slider on click of find my store
            this.setState({
                closeSlider: !this.state.closeSlider,
                signedOutActive: true,
            }, () => {
                this.props.sessionActions.deleteSession();
            });
        } else {
            window.location.href = `/${eve.url}`;
        }
    }

    toggleStoreTooltip() {
        const tooltipStoreVisible = this.state.tooltipStoreVisible;
        this.setState({
            tooltipStoreVisible: !tooltipStoreVisible,
        });
    }

    /* istanbul ignore next */
    handleStoreTooltipClose(event) {
        if ((this.wrapperStoreRef && !this.wrapperStoreRef.contains(event.target))
            || this.storeCloseIcon.contains(event.target)) {
            this.setState({
                tooltipStoreVisible: false,
            });
        }
    }

    toggleTooltip() {
        const tooltipStatus = this.state.tooltipVisible;
        this.setState({
            tooltipVisible: !tooltipStatus,
        });
    }

    handleTooltipClose(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                tooltipVisible: false,
            });
        }
    }

    closeStoresModal() {
        this.setState({
            isStoresModalOpen: false,
        });
    }

    closeStores() {
        this.setState({
            isTabletStoresModalOpen: false,
        });
    }

    /* istanbul ignore next */

    openStore() {
        let storeConfigData = null;
        const storeFromRequest = this.fromHydrate ? this.props.selectedStore : null;
        const localStore = LocalStorage.getData('defaultStore', true);
        const storeFromLocal = localStore ? JSON.parse(localStore) : null;
        storeConfigData = storeFromRequest || storeFromLocal;
        this.setState({ activeStore: storeConfigData });
        this.fromHydrate = false;
        return storeConfigData;
    }


    openStoreTablet() {
        const storeConfigData = this.openStore();
        if (storeConfigData) {
            this.toggleStoreTooltip();
        } else {
            this.openStores();
        }
    }

    /* istanbul ignore next */
    openStores() {
        this.props.actions.triggerNavigationClick({ linkName: 'find a store', isReload: false });
        this.setState({
            isTabletStoresModalOpen: true,
        });
    }

    recordCouponClick() {
        this.props.actions.triggerNavigationClick({ linkName: 'coupons', isReload: true });
    }

    closeMenuClick() {
        this.setState({ resetMenu: true });
    }

    resetMenuToFalse() {
        this.setState({ resetMenu: false });
    }

    /* istanbul ignore next */
    closeModal() {
        const newState = {};
        const { isTabletStoresModalOpen } = this.state;
        const localStore = LocalStorage.getData('defaultStore', true);
        const storeFromLocal = localStore ? JSON.parse(localStore) : null;
        this.setState({ activeStore: storeFromLocal });
        if (isTabletStoresModalOpen) {
            newState.isTabletStoresModalOpen = false;
        } else {
            newState.isStoresModalOpen = false;
        }
        this.setState(newState);
    }

    hydrate = () => {
        if (!__SERVER__) {
            // Client only action goes here
            this.props.listActions.loadLists(listActions.ListTypes.SAVED_ITEMS);
            this.props.itemCountAction.updateItemCountAction();
            let storeId = Storage.load('userStore', true);
            if (storeId) {
                if (!this.props.selectedStore) {
                    this.fromHydrate = true;
                    storeId = storeId.replace(/"/g, '');
                    this.props.actions.getStoreByStoreId({ storeId });
                }
            } else {
                LocalStorage.removeData('defaultStore', true);
                Storage.remove('userStore');
            }
        }
    }

    /* istanbul ignore next */
    render() {
        /* eslint-disable */
        const leftMenuItems = () => (
            <NavigationMenu
                showTitle={showNavTitle}
                resetMenu={this.state.resetMenu}
                resetMenuToFalse={this.resetMenuToFalse}
            />
        );

        /* istanbul ignore next */
        const rightMenuItems = () => {
            if (__SERVER__) {
                return null; // DO NOTHING
            }
            let source = config.rightMenuData;
            const dpUserCookieState = parseInt(Cookies.load('DP_USER_STATE'), 10);
            const isUserLoggedIn = dpUserCookieState && dpUserCookieState === 1;

            if (isUserLoggedIn) {
                source = config.rightMenuDataSignedIn;
            }

            const isMobile = (this.props.deviceType && this.props.deviceType.isMobile)
                ? this.props.deviceType.isMobile
                : false; // Mobile by default

            const savedItemMenu = source.menuList.filter(elem => elem.url === 'savedItems').pop();
            savedItemMenu.suffix = {
                name: getSavedItemsMenuSuffix(this.props.savedItems),
            };

            if (!isMobile) {
                const result = source.menuList.filter(elem => elem.url !== 'find-store');
                source.menuList = [...result];
            }
            if (isMobile) {
                const keyRegex = /find-store$/;
                const storeName = (this.state.activeStore && this.state.activeStore.name)
                    ? this.state.activeStore.name : null;
                let findStore = source.menuList.filter(item => keyRegex.test(item.url));
                findStore = findStore.pop();
                if (findStore) {
                    findStore.suffix = {
                        name: (storeName) ? `(${storeName})` : '',
                        style: 'LINK',
                    };
                }
            }

            return (
                <DropdownMenu
                    datasource={source}
                    customClass={classx}
                    menuListItemCustomClass={cx('menuListItem')}
                    handleMenuClick={this.openStoresModal}
                />
            );
        };

        // Fetching from the local storage about store config information
        const myStore = (storeConfig) => {
            if (!storeConfig) {
                return null;
            }

            const gMapUrl = 'http://maps.google.com/?saddr=Current%20Location&daddr=';
            const storeServicesItemRenderer = dataItem => <p> {dataItem} </p>;

            const mystoreTiming = timings => (
                <div>
                    {timings.map(timing => (
                        <div className={cx('mystore-timing')}>{timing.days} {timing.time}</div>
                    ))}
                </div>
            );

            const mystoreServices = services => (<List
                datasource={services} itemStyleClass={styles.storeServicesListItem}
                listStyleClass={styles.storeServicesList} childRenderer={storeServicesItemRenderer} direction="Vertical"
            />);
            const mystoreServicesTitle = (services) => {
                if (services.length > 0) {
                    return <h4 className={cx('mystore-subheading')}>Store Services</h4>;
                }
                return null;
            };

            return (<div className={cx('mystore-wrapper')}>
                <div className={cx('mystore-info')}>
                    <div className={cx('mystore-header')}>
                        My Store
                    </div>
                    <div className={cx('mystore-name')}>
                        {storeConfig.name}
                    </div>
                    <div className={cx('mystore-address')}>
                        {storeConfig.street}
                    </div>
                    <div className={cx('mystore-country')}>
                        {storeConfig.city}, {storeConfig.state}
                    </div>
                    <div className={cx('mystore-phone')}>
                        {storeConfig.phone}
                    </div>
                </div>
                <div className={cx('mystore-directions')}>
                    <a
                        className={cx('store-direction-link')} rel="noopener noreferrer"
                        href={`${gMapUrl}${storeConfig.street}+${storeConfig.zip}`} target="_blank"
                    >Directions</a>
                </div>
                <div className={cx('mystore-information')}>
                    <h4 className={cx('mystore-subheading')}>Store Hours</h4>
                    {mystoreTiming(storeConfig.timings)}
                </div>
                <div className={cx('mystore-services')}>
                    {mystoreServicesTitle(storeConfig.services)}
                    <div>{mystoreServices(storeConfig.services)}</div>
                </div>
                <div className={cx('change-store')}>
                    <button className={cx('change-store-link')} onClick={this.openStores}>Change Store</button>
                </div>
                <button
                    ref={(node) => { this.storeCloseIcon = node; }}
                    className={styles.closeButton}
                    onClick={this.handleStoreTooltipClose}
                >
                    <Icon automationId="change-store-close" iconType="svg" name="x" viewBox="0 0 20 20" width="20px" height="20px" />
                </button>
            </div>);
        };
        let myStoreInfo;
        if (!__SERVER__) {
            myStoreInfo = this.state.activeStore ? myStore(this.state.activeStore) : null;
        }
        const showMap = true;

        const accountIcon = () => (
            <div>
                <Icon
                    iconType="svg" automationId="profile-icon" className={cx('svg-icon')} width="28px" height="22px" viewBox="0 0 20 20"
                    name="profile"
                />
                <div
                    className={cx('header-icon')} tabIndex="0"
                    aria-label="Link icon Account - shows more content"
                >
                    Account
                </div>
            </div>
        );

        return (
            <header
                data-automation-id="headerBlock"
                className={cx('header-block', 'col12')}
            >
                <FetchRegion />
                <div className={cx('containerWidth')}>
                    <ul className={cx('header-block-list')}>
                        <li className={cx('header-list', 'menu-block')}>
                            <div className={styles.headerNavigation}>
                                <Hamburger/>
                            </div>
                        </li>
                        <li className={cx('header-list', 'logo-block')}>
                            <a
                                data-automation-id="jcp-logo" className={cx('logo-text')} id="jcp-logo"
                                aria-label="Jcpenney logo navigate to home"
                                href="/"
                            >JCPenney
                            </a>
                        </li>
                        <li className={cx('header-list', 'search-block')}>
                            <div className={cx('svg-icon')}>
                                <ProductSearch automationId="tablet-search-block" />
                            </div>
                        </li>
                        <li className={cx('header-list', 'coupons-block')}>
                            <a
                                data-automation-id="coupons-link" href="/m/jcpenney-coupons/N-mpi6e5"
                                className={cx('header-icon')} aria-label="icon - coupons"
                                rel="noopener noreferrer" onClick={this.recordCouponClick}
                            >
                                <div
                                    className={cx('svg-icon')}
                                >
                                    <Icon
                                        iconType="svg" automationId="coupon-icon" className={cx('svg-icon')} width="28px" height="22px"
                                        viewBox="0 0 20 20" name="icon-coupon"
                                    />
                                </div>
                                <div className={cx('header-icon')}>Coupons</div>
                            </a>
                        </li>
                        <li data-automation-id="store-link" className={cx('header-list', 'store-block')}>
                            <div ref={(node) => { this.wrapperStoreRef = node; }} className={styles.storeIconWrapper}>
                                <button onClick={this.openStoreTablet} aria-label="icon - Store" data-automation-id="store-icon">
                                    <div className={cx('svg-icon')}>
                                        <Icon
                                            iconType="svg" automationId="location-icon" className={cx('svg-icon')} width="28px" height="22px"
                                            viewBox="0 0 20 20" name="location"
                                        />
                                    </div>

                                    <div className={cx('header-icon')}>Store</div>
                                    {this.state.activeStore ? <div className={cx('store-arrow-icon')}>
                                        <Icon
                                            iconType="svg" width="16px" height="16px"
                                            viewBox="0 0 16 16" name="icon-chevron-down"
                                        />
                                    </div> : null}
                                </button>

                                {this.state.activeStore ? <Tooltip
                                    className={cx('tooltipWrapper', 'storeToolTip')}
                                    isVisible={this.state.tooltipStoreVisible}
                                    handleTooltipClose={this.handleStoreTooltipClose}
                                >
                                    {myStoreInfo}
                                </Tooltip> : null}
                            </div>
                        </li>
                        <li className={cx('header-list', 'acc-block')}>

                            <div role="button" aria-label="Icon - Accounts">
                                <div className={cx('svg-icon')}>
                                    <div data-automation-id="account-icon" className={styles.accountIcon}>
                                        <div className={styles.accountMenuForMobile}>
                                            <Slider
                                                title="Account" direction="RIGHT" customIcon={accountIcon()}
                                                toggleSlider={this.state.closeSlider}
                                                closeMenuClick={this.closeMenuClick}
                                            >
                                                {rightMenuItems()}
                                            </Slider>
                                        </div>
                                        <div
                                            className={styles.accountMenuForTablet}
                                            ref={(node) => { this.wrapperRef = node; }}
                                        >
                                            <button id="toggleToolTip" data-automation-id="profile-icon" onClick={this.toggleTooltip}>
                                                <Icon
                                                    iconType="svg" automationId="profile-icon" className={cx('svg-icon')} width="28px" height="22px"
                                                    viewBox="0 0 20 20" name="profile"
                                                />
                                                <div className={styles.accountArrowIcon}>
                                                    <Icon
                                                        iconType="svg" className={cx('svg-icon')} width="16px" height="16px"
                                                        viewBox="0 0 16 16" name="icon-chevron-down"
                                                    />
                                                </div>
                                                <div
                                                    className={cx('header-icon')} tabIndex="0"
                                                    aria-label="Link icon Account - shows more content"
                                                >Account
                                                </div>
                                            </button>
                                            <Tooltip
                                                className={styles.tooltipWrapper}
                                                isVisible={this.state.tooltipVisible}
                                                handleTooltipClose={this.handleTooltipClose}
                                            >
                                                {rightMenuItems()}
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className={cx('header-list', 'bag-block')}>
                            <a
                                data-automation-id="bag-link" href="/c/index.html#/"
                                className={cx('header-icon', 'bag-icon')} aria-label={`Bag ${this.state.cartCount} - items`}
                                rel="noopener"
                            >
                                <div className={cx('svg-icon')}>
                                    <Icon
                                        iconType="svg" automationId="bag-icon" className={cx('svg-icon')} width="28px" height="22px"
                                        viewBox="0 0 20 20" name="bag"
                                    />
                                </div>
                                <div className={cx('header-icon')}>
                                    Bag
                                    {this.state.cartCount > 0 ?
                                        <span data-automation-id="item-bag-count" className={styles.cartCount}>{this.state.cartCount}</span>
                                        : null
                                    }
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <ModalBox
                    showModal={this.state.isStoresModalOpen}
                    onClose={() => this.closeStoresModal()}
                    customModalWrapperClass={styles.storesWrapper}
                    defaultCloseBtn={false}
                    modalOverlayTheme={styles.modalOverlayTheme}
                    modalContentTheme={styles.modalContentTheme}
                    modalBlockTheme={styles.modalBlockTheme}
                    modalTheme={styles.storesTablet}
                    displayMap={showMap}
                >

                    <header className={cx('left', 'storeWrapper')} tabIndex="0">
                        <h5 className={cx('left', 'storeWrapperTitle')}>
                            {this.state.activeStore && this.state.activeStore.id ? 'Change Your Local Store' : 'Select Your Local Store'}
                        </h5>
                        <div className={cx('right', 'pointer')}>
                            <button className={styles.crossBar} onClick={this.closeModal}>
                                <Icon
                                    type="button" automationId="store-close-icon" iconType="svg" width="35px" height="35px" viewBox="0 0 35 35"
                                    name="icon-close"
                                />
                            </button>
                        </div>
                    </header>
                    <FindAStore />
                </ModalBox>

                <ModalBox
                    showModal={this.state.isTabletStoresModalOpen}
                    onClose={() => this.closeStores()}
                    modalTheme={styles.storesTablet}
                    defaultCloseBtn={false}
                    modalContentTheme={styles.modalContentTheme}
                    modalOverlayTheme={styles.modalOverlayTheme}
                    modalBlockTheme={styles.modalBlockTheme}
                >

                    <header className={cx('storeWrapper')}>
                        <h5 className={cx('left', 'storeWrapperTitle')}>
                            {this.state.activeStore && this.state.activeStore.id ? 'Change Your Local Store' : 'Select Your Local Store'}
                        </h5>
                        <div className={cx('right', 'pointer')}>
                            <button className={styles.crossBar} onClick={this.closeModal}>
                                <Icon
                                    type="button" automationId="store-modal-close" iconType="svg" width="35px" height="35px" viewBox="0 0 35 35"
                                    name="icon-close"
                                />
                            </button>
                        </div>
                    </header>
                    <FindAStore displayMap={showMap} />
                </ModalBox>

            </header>
        );
    }
}


const mapStateToProps = store => ({
    signedOut: store.session.signedOut,
    deviceType: store.context ? store.context.deviceType : {},
    savedItems: store.list ? store.list.savedItems : undefined,
    selectedStore: store.selectedStore,
    bagItemCount: store.bagItemCount,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(analyticsActions, actions, orderAction), dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch),
    listActions: bindActionCreators(listActions.default, dispatch),
    itemCountAction: bindActionCreators(itemCountAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
