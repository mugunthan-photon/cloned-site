import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Loader from 'yoda-core-components/lib/components/Loader/Loader';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import HamburgerAction from '../../actions/HamburgerAction';
import * as AnalyticsAction from '../../actions/AnalyticsAction';
import * as styles from './Hamburger.css';
import DropdownDefault from './DropdownDefault';
import DefaultTemplate from './config/MenuLevelZero';
import RootCategoryTemplate from './RootCategoryTemplate';
import AccordianTemplate from './AccordianLayout';
import FindaStoreSelector from './FindaStoreSelector';
import SelectaStore from './SelectaStore';
import * as accountAction from '../../actions/AccountAction';

export class Hamburger extends Component {
    static propTypes = {

        /**
         * Element to be used for the Navigation icon
         */
        customIcon: PropTypes.node,

        actions: PropTypes.objectOf(PropTypes.func),

        hambergurMenu: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

        deviceType: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

        accounts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

        selectedStore: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

        hamburgerZeroLevel: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        automationId: PropTypes.string,
    };

    static defaultProps = {
        actions: {},
        hambergurMenu: {},
        deviceType: {},
        hamburgerZeroLevel: {},
        customIcon: '',
        toggleSlider: false,
        automationId: '',
        accounts: {
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: '0',
                totalCerts: null,
            },
        },
        selectedStore: {
            isGeoStore: false,
            storeDetails: {
                name: '',
            },
        },
    };

    state = {
        slideOpen: false,
        title: 'MENU',
        currentMenuItems: null,
        loader: false,
        fullLoader: false,
    };

    /** *
     * yodaHmenuOpen - to decide menu should be in open/close state when navigating
     * yodaHmenuAllnids - stores all nids, exceptions if the link is XGN
     * yodaHmenuAllItemids - stores all itemids, exceptions if the link is XGN. Not requred for all nids
     * yodaHmenuType - if user clicks the XGN links then current Nid stores with yodaHmenuType
     */

    /* eslint-disable react/sort-comp */

    storage = {
        yodaHmenuOpen: 'yodaHmenuOpen',
        yodaHmenuAllnids: 'yodaHmenuAllnids',
        yodaHmenuAllItemids: 'yodaHmenuAllItemids',
        yodaHmenuType: 'yodaHmenuType',
        yodaHmenuTitle: 'yodaHmenuTitle',

    }

    /**
     * Parent Nid for back button scenario. Gets from Hover API
     * It will fetch it from urlprams initially
     */
    allNids = [];

    /**
     * Track all nids on traversal from navigation pannel and put it to nid.
     * It will fetch it from urlprams initially
     */
    currentNid = '';

    /** *
     * Track individual item id which user visited
     */
    allItemIds = [];

    /** *
     * On Hover api response take departmentid and store it to currentItemId
     * It will fetch it from currentitem id
     */
    currentItemId = '';

    /** *
     * It will helps to find the current template
     * level 0:  default
     * level 1: card layout
     * level 2: accordian layout
     */
    templateSelection = 0;

    /** *
     * it will be false initially and will be set to true after the first api calls happen
     */
    firstTimeLoadCompleted = false;

    /**
     * Complete Title for HAMB MENU
     */
    allTitles = [];

    /** *
     *
     */
    currentTitle = 'MENU';

    previousTitle = '';

    unmount = null;

    signoutUrl = '/sessiontimeout';

    callExpire = null;

    /* istanbul ignore next */
    static clearSliderLockOnPageLoad() {
        if (!__SERVER__) {
            if (document.body.classList.contains(styles.scrollLock)) {
                document.body.classList.remove(styles.scrollLock);
            }
        }
    }

    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.menuClick = this.menuClick.bind(this);
        this.urlChanged = this.urlChanged.bind(this);
        this.analyticsForDefault = this.analyticsForDefault.bind(this);
        this.signOut = this.signOut.bind(this);
        this.catSelectedPushToNid = this.catSelectedPushToNid.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goToPageViewAll = this.goToPageViewAll.bind(this);
        this.resetOnTimer = this.resetOnTimer.bind(this);
    }

    componentDidMount() {
        /**
         * If your page is not falls under /g patern then reset the menu
         */
        // TODO: remove the commented code and delete the belo code after v5 api is ready
        /* istanbul ignore next */
        if (location && !this.findNidFromUrl(location.href)) {
            this.resetMenu();
        }
        Hamburger.clearSliderLockOnPageLoad();
        this.urlChanged();
        /* istanbul ignore next */
        this.unmount = browserHistory.listen(() => {
            this.urlChanged();
        });
    }

    componentWillUnmount() {
        this.unmount();
    }

    urlChanged() {
        this.currentNid = '';
        this.currentTitle = 'MENU';
        this.currentItemId = '';
        this.allNids = [];
        this.allTitles = [];
        this.allItemIds = [];
        this.findNidsWithItemIds();
        this.findCurrentNidandItemId();
        this.callHoverorRootApi(); // this will move to onclick from zerothh level
        this.hambOpenorClose(); // for tablet
        this.removeCommonStorageState();
    }

    /**
     * For tablet. Will help to decide the satte of Menu (close/ Open)
     */
    hambOpenorClose() {
        if (LocalStorage.getData(this.storage.yodaHmenuOpen, true) && !this.state.slideOpen) {
            this.toggleMenu();
            LocalStorage.removeData(this.storage.yodaHmenuOpen, true);
        }
    }

    /** *
     * Function will check thhe localstorage is available if yes then pull the data
     * from localstorage or else take it from url params
     */
    findNidsWithItemIds() {
        const localNids = JSON.parse(LocalStorage.getData(this.storage.yodaHmenuAllnids, true));
        const localItemIds = JSON.parse(LocalStorage.getData(this.storage.yodaHmenuAllItemids, true));
        const localTitle = JSON.parse(LocalStorage.getData(this.storage.yodaHmenuTitle, true));
        let isNid = false;
        /* istanbul ignore next */
        if (localNids) {
            this.allNids = localNids || [];
            this.allItemIds = localItemIds || [];
            this.allTitles = localTitle || [];
            isNid = true;
        } else {
            isNid = false;
        }

        return isNid;
    }


    /**
     * this logic will be irrelevent for mobile only scenario but ignoring it to keep consistancy between
     * tablet and mobile
     */
    findCurrentNidandItemId() {
        this.currentNid = this.allNids.pop() || '';
        this.currentItemId = this.allItemIds.pop();
        this.currentTitle = this.allTitles.pop() || 'MENU';
        this.previousMenuTitle();
    }

    /** *
     * if we have nid present then load hover api or else load category api
     */
    callHoverorRootApi() {
        this.setState({ currentMenuItems: null });
        if (this.currentNid && this.currentNid !== 'base'
            && this.currentNid !== 'root'
            && this.currentNid !== 'findastore' && this.currentNid !== 'selectstore') {
            this.templateSelection = 2;
            this.props.actions.getHoverPanel(this.currentNid);
            clearTimeout(this.callExpire);
            this.setState({ loader: true });
            this.timerOnandReset();
        } else if (this.currentNid && this.currentNid === 'root') {
            this.templateSelection = 1;
            this.props.actions.getCategories();
            clearTimeout(this.callExpire);
            this.setState({ loader: true });
            this.timerOnandReset();
            this.removeCommonStorageState();
        } else if (this.currentNid && this.currentNid === 'findastore') {
            this.templateSelection = 3;
            this.removeCommonStorageState();
        } else if (this.currentNid && this.currentNid === 'selectstore') {
            this.templateSelection = 4;
            this.removeCommonStorageState();
        } else {
            this.templateSelection = 0;
            // this.setState({ currentMenuItems: DefaultTemplate });
            this.setState({ currentMenuItems: this.props.hamburgerZeroLevel });
        }
    }

    /**
     * It will close the loader and reset the menu to zero level
     * if any api failed or any issue in the hamburger respose.
     */

    timerOnandReset() {
        /* istanbul ignore next */
        this.callExpire = setTimeout(this.resetOnTimer, 10000, this);
    }

    resetOnTimer() {
        if (this.state.loader) {
            console.warn('Hamburger:: something wrong! check api response. Defaulting the menu level to zero');
            this.goBack();
            this.setState({ loader: false });
        }
    }

    /**
     * close the loader and set the props as state so that it will
     * rerender and having control
     */

    componentWillReceiveProps(nextPropsDefault) {
        const nextProps = nextPropsDefault.hambergurMenu.menu
            ? nextPropsDefault.hambergurMenu.menu
            : nextPropsDefault.hambergurMenu;
        this.setState({ loader: false });
        this.setState({ currentMenuItems: nextProps });
    }

    signOut() {
        this.analyticsForDefault('signout');
        location.href = this.signoutUrl;
    }

    /**
     * It will helps to select the layout based on the layout settings done before API calls happen
     */
    pickLayout(currentItem) {
        let layoutSelected = null;
        if (currentItem && this.templateSelection === 0) {
            layoutSelected = DropdownDefault(this.props.hamburgerZeroLevel,
                this.catSelectedPushToNid,
                this.props.accounts.userProfile,
                this.props.selectedStore,
                this.signOut,
                this.analyticsForDefault);
        } else if (currentItem && this.templateSelection === 1) {
            LocalStorage.removeData(this.storage.yodaHmenuType, true);
            layoutSelected = RootCategoryTemplate(currentItem,
                this.catSelectedPushToNid,
                this.props.deviceType,
                this.state.loader);
        } else if (currentItem && this.templateSelection === 2) {
            layoutSelected = AccordianTemplate(currentItem,
                this.catSelectedPushToNid,
                this.props.hambergurMenu.meta,
                this.goToPageViewAll,
                this.props.deviceType,
                this.findNidFromUrl,
                this.currentTitle,
                this.state.loader);
        } else if (this.templateSelection === 3) {
            layoutSelected = FindaStoreSelector(this.props.accounts.userProfile,
                this.props.selectedStore,
                this.catSelectedPushToNid,
                this.analyticsForDefault);
        } else if (this.templateSelection === 4) {
            layoutSelected = SelectaStore(this.props.selectedStore);
        }
        return layoutSelected;
    }

    goToPageViewAll(e) {
        this.allNids.push(this.currentNid);
        this.allItemIds.push(this.currentItemId);
        this.allTitles.push(this.currentTitle);
        LocalStorage.setData(this.storage.yodaHmenuOpen, true, true);
        console.log('location', e.target.dataset.url);
        LocalStorage.setData(this.storage.yodaHmenuType, this.currentNid, true);
        this.navigationalDefaultValues();
        LocalStorage.removeData(this.storage.yodaHmenuOpen, true);
        location.href = e.target.dataset.url;
    }

    /**
     * menu show and hide
     */
    toggleMenu() {
        this.toggleSlideState(!this.state.slideOpen);
    }

    /**
     * changing the state of menu to close. copied from old yoda Hamburger
     */
    closeMenu() {
        this.toggleSlideState(false);
        LocalStorage.removeData(this.storage.yodaHmenuOpen, true);
    }

    /** *
     * Slider-scrollLock, copied from old yoda Hamburger menu to make menu fit in the layout
     */
    toggleSlideState(menuOpenStatus) {
        if (menuOpenStatus) {
            document.body.classList.add(styles.scrollLock);
        } else {
            document.body.classList.remove(styles.scrollLock);
        }
        this.setState({
            slideOpen: menuOpenStatus,
        });
    }

    analytics(currentTitle, itemCLicked) {
        let localTitle = '';
        // as per the discussion, now ensighten team will handle isrealod property and we need to set it false always
        // const reload = !!((linkToLoad && linkToLoad.indexOf('/g/') >= 0 && linkToLoad.indexOf('pageType=X2H2') < 0));
        const reload = false;
        if (this.allTitles.length) {
            this.allTitles.forEach((oneTitle) => {
                if (oneTitle && oneTitle.trim() !== 'MENU') {
                    localTitle = localTitle ? `${localTitle}:${oneTitle}` : oneTitle;
                }
            });
            if (currentTitle && currentTitle.trim() !== 'MENU') {
                localTitle = localTitle ? `${localTitle}:${currentTitle}` : currentTitle;
            } else if (itemCLicked && itemCLicked.trim() !== 'MENU') {
                localTitle = localTitle ? `${localTitle}:${itemCLicked}` : itemCLicked;
            }
        }
        const eventLinkName = `top:${localTitle}`;
        this.props.actions.triggerNavigationClick({
            linkName: eventLinkName,
            isReload: reload,
        });
    }

    analyticsForDefault(localTitle) {
        this.props.actions.triggerNavigationClick({
            linkName: localTitle,
            isReload: false,
        });
    }

    findNidFromUrl(url) {
        let selectedNid;
        if (url && url.indexOf('/g/') >= 0) {
            const urlItems = url.split('?')[0].split('/');
            selectedNid = urlItems.filter(item => item.indexOf('N-') >= 0)[0];
        }
        return selectedNid;
    }

    resetMenu() {
        this.currentNid = '';
        this.currentTitle = 'MENU';
        this.currentItemId = '';
        this.allNids = [];
        this.allTitles = [];
        this.allItemIds = [];
        this.resetMenuMobile();
    }

    resetMenuMobile() {
        this.removeCommonStorageState();
    }

    /** *
     * nids and item ids will be appended once user click on an item.
     */
    catSelectedPushToNid(ev) {
        const e = ev.target && ev.target.closest ? ev.target.closest('button').dataset : ev;
        const newNid = e.pagetype !== 'base' && e.targetdurl ? this.findNidFromUrl(e.targetdurl) : e.nid;
        /* istanbul ignore next */
        if (e.nid === 'findastore' && (!this.props.selectedStore.storeDetails || (this.props.selectedStore.storeDetails && !this.props.selectedStore.storeDetails.name))) {
            /* istanbul ignore next */
            this.analyticsForDefault('top:findastore');
            window.location = '/findastore';
        } else if (newNid) {
            if (this.currentNid && !(this.currentNid === newNid && this.currentItemId === e.itemid)) {
                this.allNids.push(this.currentNid);
                this.allItemIds.push(this.currentItemId);
                this.allTitles.push(this.currentTitle);
            } else if (this.templateSelection === 0) {
                this.allNids.push('base');
                this.allItemIds.push('base');
                this.allTitles.push(this.currentTitle);
            }
            this.currentNid = newNid;
            this.currentItemId = e.itemid;
            this.currentTitle = e.name;
            this.previousMenuTitle();
            this.analytics(this.currentTitle, e.name, e.targetedurl);
            this.goToPage(e);
        } else {
            /**
             * If the url does not contain /g then it is not been handled. remove all the cookie and go to that page
             * This will happen if url has direct pdp page links or external links
             */
            this.resetMenu();
            this.analytics(this.currentTitle, e.name, e.targetedurl);
            window.location = e.targetdurl;
        }
    }

    navigationalDefaultValues() {
        LocalStorage.setData(this.storage.yodaHmenuAllnids, this.allNids, true);
        LocalStorage.setData(this.storage.yodaHmenuAllItemids, this.allItemIds, true);
        LocalStorage.setData(this.storage.yodaHmenuOpen, true, true);
        LocalStorage.setData(this.storage.yodaHmenuTitle, this.allTitles, true);
    }

    /**
     * Mobile : set the current nid and item id and call the service if Nid is not diffrent
     * Tablet:  construct localstorage/ url.
     */
    goToPage(e = { pagetype: 'root' }) {
        if (this.props.deviceType.isMobile) {
            this.resetMenuMobile();
            const needToFech = this.isNidChanged();
            /**
             * It is also checking the length because it is a requirement that we dont levels beyond 4.
             */
            if ((e.pagetype && e.pagetype === 'XGN') || this.allNids.length === 4) {
                LocalStorage.setData(this.storage.yodaHmenuType, this.currentNid, true);
                this.navigationalDefaultValues();
                LocalStorage.removeData(this.storage.yodaHmenuOpen, true); // this is to override hamb open if you are in gallery page
                window.location = e.targetdurl;
            } else if (needToFech) {
                this.callHoverorRootApi();
            }
        } else {
            if (e.pagetype && e.pagetype !== 'XGN' && this.allNids.length < 4) {
                this.allNids.push(this.currentNid);
                this.allItemIds.push(this.currentItemId);
                this.allTitles.push(this.currentTitle);
                this.navigationalDefaultValues();
            } else {
                LocalStorage.setData(this.storage.yodaHmenuType, this.currentNid, true);
                this.navigationalDefaultValues();
                LocalStorage.removeData(this.storage.yodaHmenuOpen, true); // this is to override hamb open if you are in gallery page
            }

            /**
             * below condition is for first level. Only for first level there should not be any page refresh
             */
            /* istanbul ignore next */
            if (e.targetdurl) {
                if (e.pagetype && (e.pagetype === 'X2H2' ||
                    e.pagetype === 'root') &&
                    (location.pathname === '/' || location.href.indexOf('pageType=X2H2') >= 0)) {
                    browserHistory.push(e.targetdurl);
                } else {
                    if ((location.pathname !== '/' && location.href.indexOf('pageType=X2H2') < 0)) {
                        LocalStorage.removeData(this.storage.yodaHmenuOpen, true);
                    }
                    this.setState({ fullLoader: true });
                    window.location = e.targetdurl;
                }
            } else {
                this.findNidsWithItemIds();
                this.findCurrentNidandItemId();
                this.callHoverorRootApi();
                LocalStorage.removeData(this.storage.yodaHmenuOpen, true);
            }
        }
    }

    /**
     * this is to check for any NID change. If no change thhen no need to call the api
     * call only after push or pop operation has done.
     */
    isNidChanged() {
        let needFetch = false;
        if (this.currentNid && this.allNids.length <= 1) {
            needFetch = true;
        } else if (this.currentNid &&
            this.allNids.length > 1 &&
            this.currentNid !== this.allNids[this.allNids.length - 2]) {
            needFetch = true;
        }

        return needFetch;
    }

    previousMenuTitle() {
        this.previousTitle = this.allTitles.length ? this.allTitles[this.allTitles.length - 1] : 'MENU';
    }

    /** *
     * Back button Implementation.
     */
    goBack() {
        // TODO: need to remove device type const and take it from props

        if (this.currentNid && this.currentNid !== 'root' && this.currentNid !== 'base') {
            LocalStorage.setData(this.storage.yodaHmenuType, this.currentNid, true);
        }

        this.currentNid = this.allNids.pop();
        this.currentItemId = this.allItemIds.pop();
        this.currentTitle = this.allTitles.pop();
        this.previousMenuTitle();

        if (this.props.deviceType.isMobile) {
            // LocalStorage.removeData(this.storage.yodaHmenuType);
            this.removeCommonStorageState();
        }
        this.goToPage();
    }

    removeCommonStorageState() {
        LocalStorage.removeData(this.storage.yodaHmenuAllnids, true);
        LocalStorage.removeData(this.storage.yodaHmenuAllItemids, true);
        LocalStorage.removeData(this.storage.yodaHmenuOpen, true);
        LocalStorage.removeData(this.storage.yodaHmenuTitle, true);
    }


    /**
     * Menu Open, copied from old yoda Hamburger
     */
    menuClick(ev) {
        this.menuOpen = true;
        ev.stopPropagation();
    }

    loadIconandLoader(type) {
        let ico = '';
        if (this.state.loader) {
            ico = <div className={styles.loadingCircle} />;
        } else if (type === 1) {
            ico = <Icon iconType="svg" width="22px" height="22px" viewBox="0 0 30 20" name="hamb-arrow-left" />;
        } else if (type === 2) {
            ico = <Icon iconType="svg" width="22px" height="22px" viewBox="0 0 30 20" name="hamb-close" />;
        } else {
            ico = '';
        }
        return ico;
    }

    /** *
     * It will help to decide which icon to show up (Close/ back button)
     */
    closeorBackButton() {
        if (this.allNids.length) {
            return (<div className={styles.menuWrapperClose}><button
                onClick={this.goBack}
                data-automation-id="slider-button-close"
            >
                <i data-automation-id="hamburger-menu-close-icon" className={styles.backIcon}>
                    {this.loadIconandLoader(1)}
                </i>
            </button><span data-automation-id="hamburger-menu-title" className={styles.title}>{this.previousTitle}</span></div>);
        }
        return (<div className={styles.menuWrapperClose}><button
            onClick={this.closeMenu}
            data-automation-id="slider-button-close"
        >
            <span data-automation-id="hamburger-menu-title" className={styles.title} >{this.currentTitle}</span>
            <i data-automation-id="hamburger-menu-close-icon" className={styles.menuCloseIcon}>
                {this.loadIconandLoader(2)}
            </i>
        </button></div>);
    }

    render() {
        const { customIcon, automationId } = this.props;

        let slideToggle = styles.verticalSlide;
        const wrapperClass = styles.menuWrapper;
        const toggleMenu = (this.props.customIcon) ? (<button onClick={this.toggleMenu}>{customIcon}</button>)
            : (<button data-automation-id="jcp-menu" className={styles.menuLink} onClick={this.toggleMenu} />);

        if (this.state.slideOpen) {
            slideToggle = `${styles.verticalSlide} ${styles.visible}`;
        }

        if (this.state.fullLoader) {
            return <Loader keepOverlay automationId="test-automation-loader-1" />;
        }

        return (
            <div className={styles.sliderWrapper} data-automation-id={automationId}>
                <div className={styles.iconWrapper} data-automation-id="button-menu">
                    {toggleMenu}
                </div>
                <a tabIndex="-1" className={slideToggle} onClick={this.closeMenu}>
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <div tabIndex="-1" className={wrapperClass} onClick={this.menuClick}>
                        {this.closeorBackButton()}
                        <div className={styles.slideChildWrapper} data-automation-id="slider-data">
                            {/* Dropdown manu section */}
                            {this.pickLayout(this.state.currentMenuItems)}
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...HamburgerAction, ...AnalyticsAction, ...accountAction }, dispatch),
});

const mapStateToProps = ({ context, hambergurMenu, accounts, selectedStore }) => ({
    deviceType: context ? context.deviceType : { isMobile: false },
    hamburgerZeroLevel: context && context.preferences ? context.preferences.hamburger : DefaultTemplate,
    hambergurMenu,
    accounts: accounts || {
        userProfile: {
            firstName: null,
            accountId: null,
            rewardsStatus: null,
            userState: '0',
            totalCerts: null,
        },
    },
    selectedStore: selectedStore || {
        isGeoStore: false,
        storeDetails: {
            name: '',
        },
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);
