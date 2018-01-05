import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _forEach from 'lodash/forEach';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import List from 'yoda-core-components/lib/components/List/List';
import Button from 'yoda-core-components/lib/components/Button/Button';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import SiteComponent from '../SiteComponent/SiteComponent';
import YodaTooltip from '../YodaTooltip/YodaTooltip';
import * as accountAction from '../../actions/AccountAction';
import * as AnalyticsAction from '../../actions/AnalyticsAction';
import * as storeNavigationActions from '../../actions/DepartmentVisualNavigationAction';
import * as OverlayAction from '../../actions/OverlayAction';
import * as styles from './SecondaryNavigationPanel.css';
import config from './Header.config';
import SelectaStore from '../Hamburger/SelectaStore';

const cx = classNames.bind(styles);

export class SecondaryNavigationPanel extends SiteComponent {
    static propTypes = {
        accounts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        selectedStore: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        actions: PropTypes.objectOf(PropTypes.func),
        shopDepartmentMenuInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        secondaryNavigationMenu: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        deviceType: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    };

    static defaultProps = {
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
        actions: {},
        shopDepartmentMenuInfo: [],
        secondaryNavigationMenu: {},
        deviceType: {},
    }
    /* istanbul ignore next */
    static clearSliderLockOnPageLoad() {
        if (!__SERVER__) {
            /* istanbul ignore next */
            if (document.body.classList.contains(styles.scrollLock)) {
                /* istanbul ignore next */
                document.body.classList.remove(styles.scrollLock);
            }
        }
    }

    constructor(props) {
        super(props);
        this.renderMenu = this.renderMenu.bind(this);
        this.FindaStoreSelector = this.FindaStoreSelector.bind(this);
        this.selectStoreInfo = this.selectStoreInfo.bind(this);
        this.renderFindAStoreDetails = this.renderFindAStoreDetails.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.navigateurl = this.navigateurl.bind(this);
        this.saveAnalyticsData = this.saveAnalyticsData.bind(this);
        this.goFindaStore = this.goFindaStore.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            displayvericalSlider: false,
            openSlider: false,
            showShopDepartment: false,
            firstLevelHover: false,
            hoverDepartmentData: '',
            hoverCategoryData: '',
            lastBindedDept: '',
            hoverDept: '',
            hoverCategory: '',
            mousePosition: 1,
        };
    }

    hydrate() {
        if (!__SERVER__) {
            const { shopDepartmentMenuInfo, deviceType } = this.props;
            /* istanbul ignore next */
            if (deviceType.isDesktop) {
                if (shopDepartmentMenuInfo && shopDepartmentMenuInfo.length > 0) {
                    this.props.actions.getDesktopCategoriesVisualNavigationAction(shopDepartmentMenuInfo);
                } else {
                    // If server side fail to render the first level shop dept, need to trigger from client side
                    this.props.actions.getDesktopDepartmentVisualNavigationAction('home', this.props.deviceType);
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const { shopDepartmentMenuInfo } = this.props;
        const { shopDepartmentMenuInfo: nextPropsShopDepartment } = nextProps;
        if (shopDepartmentMenuInfo && shopDepartmentMenuInfo.length === 0 && nextPropsShopDepartment.length > 0) {
            // If server side fail to render the first level shop dept, need to trigger from client side
            // then we need to initiate the all sub-dept menus
            this.props.actions.getDesktopCategoriesVisualNavigationAction(nextPropsShopDepartment);
        }
    }

    componentDidMount() {
        SecondaryNavigationPanel.clearSliderLockOnPageLoad();
    }

    displayDropDown = true;

    closeMenu() {
        this.selectStoreInfo(false);
        this.setState({ displayvericalSlider: false });
        this.setState({ openSlider: false });
    }

    toggleMenu(eventName) {
        this.selectStoreInfo(!this.state.openSlider, eventName);
    }

    goFindaStore(isDropDownClick) {
        if (isDropDownClick === true) {
            this.saveAnalyticsData('top:select store:findastore', true);
        } else {
            this.saveAnalyticsData('top:findastore', true);
        }
        window.location = '/findastore';
    }

    selectStoreInfo(menuOpenStatus, eventName) {
        if (menuOpenStatus) {
            document.body.classList.add(styles.scrollLock);
        } else {
            document.body.classList.remove(styles.scrollLock);
        }
        this.setState({ openSlider: true });
        this.setState({ displayvericalSlider: true });
        if (eventName) {
            this.saveAnalyticsData(`top:select store:${eventName}`, true);
        }
    }

    FindaStoreSelector() {
        let title = '';
        if (this.props.selectedStore.isGeoStore &&
            this.props.selectedStore.storeDetails && this.props.selectedStore.storeDetails.name) {
            title = 'Select My Store';
        } else if (this.props.selectedStore.storeDetails && this.props.selectedStore.storeDetails.name) {
            title = 'Change My Store';
        }
        const eventName = title.toLowerCase();
        return (
            <div className={cx('store-tooltip')}>
                <Button
                    onClick={() => this.toggleMenu(eventName)} type="button" automationId="test-automation-btn-0"
                    buttonType="Primary" size="Lg" className={cx('store-btn', 'toggleStore')}> {title} </Button>
                <Button
                    type="button" automationId="test-automation-btn-0"
                    buttonType="Primary" size="Lg" onClick={() => this.goFindaStore(true)} className={cx('store-btn', 'findStore')}> {'Find a Store'}</Button>
            </div>
        );
    }

    // /* istanbul ignore next */
    saveAnalyticsData(title, isInternalUrl) {
        /* istanbul ignore next */
        this.props.actions.triggerNavigationClick({
            linkName: title,
            isReload: !isInternalUrl,
        });
    }

    /* istanbul ignore next */
    navigateurl(title, link, event, isInternalUrl = true, analyticData) {
        event.preventDefault();
        const eventName = (analyticData) ? analyticData.join(':') : title;
        const eventData = `top:${eventName}`;
        this.saveAnalyticsData(eventData, isInternalUrl);
        /* istanbul ignore next */
        link ? NavigationHelper.navigate(link) : null;
    }

    onLevel3MouseEnter = () => {
        this.setState({
            mousePosition: 3,
            hoverCategory: '',
        });
    }

    onLevel3MouseLeave = () => {
        this.setState({
            mousePosition: 2,
            hoverCategory: '',
        });
    }

    displaySubCategory = (department, analyticData, menuName) => {
        if (department.key === menuName) {
            const subCategoryList = [];
            _forEach(department.categories, (category) => {
                const eventData = [analyticData, department.key, category.name];
                subCategoryList.push(
                    <li>
                        <button
                            className={cx('subMenuLevelLink')}
                            data-automation-id="sub-menu-level2"
                            /* istanbul ignore next */
                            onClick={
                                /* istanbul ignore next */
                                (event) => {
                                    /* istanbul ignore next */
                                    this.navigateurl(category.name, category.targetUrl, event, true, eventData);
                                }} >{category.name}</button>
                    </li>,
                );
            });

            const finalData = (
                <div
                    className={cx('subMenuInnerLevel2')}
                    onMouseEnter={this.onLevel3MouseEnter}
                    onMouseLeave={this.onLevel3MouseLeave}>
                    <div
                        className={cx('subMenuLevel2ListBlock')}>
                        <h3 className={cx('subMenuItemTitle')}>{department.key}</h3>
                        <ul className={cx('subMenuLevel1List', 'subMenuLevel2List')}>
                            {/* " level2Block " Class for the hover Functionality for BG White for 2nd SubLevel Menu
                            Eg: Shop Dept => Men => Shop Clothing => Block */}
                            {subCategoryList}
                        </ul>
                    </div>
                </div>
            );

            return finalData;
        }

        return null;
    }

    onLevel2MouseEnter = () => {
        this.setState({
            mousePosition: 2,
        });
    }

    onLevel2MouseLeave = () => {
        this.setState({
            mousePosition: 1,
            hoverDept: '',
            lastBindedDept: '',
        });
    }

    onLevel2MouseOver = (event) => {
        const currentElemetOrPrevElement = event.target;
        const menuName = currentElemetOrPrevElement.textContent;
        const { lastBindedDept, hoverCategory } = this.state;

        if (!hoverCategory) {
            this.displayCategory(lastBindedDept, menuName);
        }

        this.setState({
            hoverCategory: menuName,
        });
    }

    onLevel2HeadingMouseOver = () => {
        this.setState({
            hoverCategory: '',
        });
    }

    onLevel2MouseOut = () => {
        /* istanbul ignore next */
        setTimeout(() => {
            const { lastBindedDept, hoverCategory } = this.state;

            if (hoverCategory && this.state.mousePosition === 2) {
                this.displayCategory(lastBindedDept, hoverCategory);
            }
        }, config.desktop.mouseOverDelay);
    }

    displayCategory = (hoverDept, menuName) => {
        this.setState({
            lastBindedDept: hoverDept,
        });
        const { shopDepartmentMenuInfo } = this.props;
        const item = _find(shopDepartmentMenuInfo, d => d.title === hoverDept);
        if (item) {
            const { title, links } = item;
            const { mousePosition } = this.state;

            const data = _map(item.departments, (department) => {
                const thirdLevelStyle = mousePosition === 2 && department.key === menuName ?
                    cx('subMenuLevelList', 'subMenuLevel1ListSelected') : cx('subMenuLevelList');
                return (
                    <li className={thirdLevelStyle}>
                        {/* subMenuLevel1ListSelected for the selected Class and Bold
                        Eg: Shop Dept => Men => Shop Clothing */}
                        <a
                            href="javascript:void(0)"
                            onMouseOver={this.onLevel2MouseOver}
                            onMouseOut={this.onLevel2MouseOut}
                            data-automation-id="sub-menu-level1"
                            className={cx('subMenuLevelLink', 'subMenuLevel1Link')}>{department.key}</a>
                        {this.displaySubCategory(department, title, menuName)}
                    </li>
                );
            });

            const thirdLevelStyleBackground = mousePosition === 2 ? cx('subMenuLevel1List', 'level2Block') : cx('subMenuLevel1List');
            const secondLevelWidth = mousePosition === 2 ? cx('subMenuInnerLevel', 'level2Width') : cx('subMenuInnerLevel');

            const finalData = (
                <div
                    className={secondLevelWidth}
                    onMouseEnter={this.onLevel2MouseEnter}
                    onMouseLeave={this.onLevel2MouseLeave}>
                    <div className={cx('subMenuLevel1ListBlock')}>
                        <button
                            className={cx('subMenuItemTitle')}
                            data-automation-id="menu-item-heading"
                            onMouseOver={this.onLevel2HeadingMouseOver}
                            /* istanbul ignore next */
                            onClick={
                                /* istanbul ignore next */
                                (e) => {
                                    /* istanbul ignore next */
                                    this.navigateurl(title, links, e);
                                }} >{title}</button>
                        <ul className={thirdLevelStyleBackground}>
                            {data}
                        </ul>
                    </div>
                </div>);

            this.setState({
                hoverDepartmentData: finalData,
                firstLevelHover: true,
            });
        }
    }

    onLevel1MouseOver = (event) => {
        this.props.actions.showOverlay();
        const currentElemetOrPrevElement = event.target;
        const menuName = currentElemetOrPrevElement.textContent;
        const { hoverDept } = this.state;
        if (!hoverDept) {
            this.displayCategory(menuName);
        }
        this.setState({
            hoverDept: menuName,
            hoverCategory: '',
            mousePosition: 1,
        });
    }

    onLevel1MouseOut = () => {
        /* istanbul ignore next */
        setTimeout(() => {
            const { hoverDept } = this.state;
            this.state.mousePosition === 1 ? this.displayCategory(hoverDept) : '';
        }, config.desktop.mouseOverDelay);
    }

    // Displaying shop department ham burger menu
    displayShopDepartmentMenu = () => {
        const { shopDepartmentMenuInfo } = this.props;
        const { firstLevelHover, lastBindedDept, hoverDept, hoverCategory } = this.state;

        if (shopDepartmentMenuInfo) {
            const secondLevelStyleBackground = firstLevelHover && hoverDept ? cx('subMenuList', 'level1Block') : cx('subMenuList');

            const firstLevelStyleBackground = firstLevelHover && hoverDept ? cx('largeSubMenu', 'level1Width') : cx('largeSubMenu');

            const { mousePosition } = this.state;

            const firstLevelStyleBackground1 = ((mousePosition === 2 && hoverCategory) || mousePosition === 3) ? cx('level2Width') : '';

            return (<div className={cx(firstLevelStyleBackground, firstLevelStyleBackground1)}>
                <div className={secondLevelStyleBackground}>
                    {/* " level1Block " Class for the hover Functionality for BG White once the mouse
                    pointer enteres onto the UL Block  Eg: Shop Dept => Men => Block */}
                    <ul className={cx('subMenuListBlock')}>
                        {
                            _map(shopDepartmentMenuInfo, (item) => {
                                const styleName = item.title !== 'clearance' ? cx('menuItemLink') : cx('menuItemLink', 'clearanceMenuLink');
                                const secondLevelStyle = item.title === lastBindedDept ? cx('menuItem', 'menuSelected') : cx('menuItem');
                                const { title, links, isInternalUrl } = item;
                                return (<li
                                    className={secondLevelStyle}>
                                    {/* " menuSelected " Class for the hover bold and BG white
                                    Functionality while the mouse pointer hover the level1 List item
                                    Eg: Shop Dept => Men */}
                                    <button
                                        className={styleName}
                                        data-automation-id="menu-item"
                                        onMouseOver={this.onLevel1MouseOver}
                                        onMouseOut={this.onLevel1MouseOut}
                                        onClick={(event) => {
                                            this.navigateurl(title, links, event, isInternalUrl);
                                        }} >{title}</button>
                                    {this.state.hoverDepartmentData}
                                </li>);
                            })
                        }
                    </ul>
                </div>
            </div>);
        }
        return null;
    };

    resetMenu = () => {
        this.props.actions.removeOverlay();
        this.setState({
            showShopDepartment: false,
            hoverDept: '',
            hoverCategory: '',
            hoverDepartmentData: '',
            lastBindedDept: '',
            mousePosition: 1,
        });
    }

    displayItem = (event) => {
        const currentElemetOrPrevElement = event.target;
        const menuName = currentElemetOrPrevElement.textContent;
        this.resetMenu();
        if (menuName && menuName.toLowerCase() === 'shop departments') {
            this.props.actions.showOverlay();
            this.setState({
                showShopDepartment: true,
            });
        } else {
            this.props.actions.removeOverlay();
            this.setState({
                showShopDepartment: false,
            });
        }
    }

    renderStoreDataWithGeo() {
        return (<YodaTooltip
            tooltipBodyClassName={cx('storeTooltipWrapper')}
            renderTooltipContents={this.renderStoreData()}
            tooltipContentClass={cx('storeTooltipText')}
            triggerEventName={'click'}
            direction={'Bottomright'}
            tooltipPlacement={'Right'} >{this.renderFindAStoreDetails()}
        </YodaTooltip>);
    }

    renderFindAStoreDetails() {
        return (<div className={cx('findStoreWrapper')}>
            <div className={cx('store-iconWrapper')}>{
                this.title === 'My Store' ?
                    <Icon
                        iconType="svg" className={cx('selected-store-icon')} viewBox="0 0 48 48" name="icon-selected-store" pathClassName="accountFillColor" /> :
                    <Icon
                        iconType="svg" className={cx('store-icon')} viewBox="0 0 48 48" name="location-fill" pathClassName="accountFillColor" />
            }
            </div>
            <div className={cx('store-Text')}>
                <div className={cx('findTitle')}>{this.title}</div>
                <div className={cx('findText')} title="Change or update your local store">{this.storeText}<span className={cx('storeDropDownIcon')} /></div>
            </div>
        </div>);
    }

    renderFindStoreButton() {
        return (<Button
            type="button" onClick={this.goFindaStore} automationId="test-automation-btn-0"
            buttonType="Text" className={cx('findStoreWrapper')}>
            <div className={cx('store-iconWrapper')}>
                <Icon
                    iconType="svg" className={cx('store-icon')} viewBox="0 0 48 48" name="location-fill" pathClassName="accountFillColor" />
            </div>
            <div className={cx('store-Text')}>
                <div className={cx('findTitle')}>{this.title}</div>
                <div className={cx('findText')} title="Change or update your local store">{this.storeText}<span className={cx('storeDropDownIcon')} /></div>
            </div>
        </Button>);
    }

    renderStoreInfo() {
        if (this.props.selectedStore.isGeoStore &&
            this.props.selectedStore.storeDetails && this.props.selectedStore.storeDetails.name) {
            this.title = 'Store Nearest You';
            this.storeText = this.props.selectedStore.storeDetails.name;
            this.displayDropDown = true;
        } else if (this.props.selectedStore.storeDetails && this.props.selectedStore.storeDetails.name) {
            this.title = 'My Store';
            this.storeText = this.props.selectedStore.storeDetails.name;
            this.displayDropDown = true;
        } else {
            this.title = 'Near You';
            this.storeText = 'Find a Store';
            this.displayDropDown = false;
        }
    }

    renderStoreData() {
        return this.FindaStoreSelector(this.props.accounts.userProfile,
            this.props.selectedStore);
    }

    renderMenu = item => (<button
        className={cx('links')}
        onClick={(event) => {
            this.navigateurl(item.name, item.link, event);
        }} >{item.name}</button>)

    mainDivMouseLeave = () => {
        this.resetMenu();
    }

    renderFindAStore() {
        const source = this.props.secondaryNavigationMenu.menuList;
        const { showShopDepartment } = this.state;
        const mainStyle = showShopDepartment ? cx('shopDepartmentsBlock', 'mainNavSelected') : cx('shopDepartmentsBlock');
        const overlay = showShopDepartment ? cx('overlay', 'active') : cx('overlay');
        return (
            <div>
                <div className={cx('LeftNavigationWrapper')}>
                    <div className={mainStyle} onMouseLeave={this.mainDivMouseLeave}>
                        {/* mainNavSelected for the selected Class  Eg: Shop Dept => Block  */}
                        <div className={overlay} onMouseOver={this.overlayMouseOver}/>
                        <button
                            onMouseOver={this.displayItem}
                            className={cx('shopdepartments')}
                            onClick={(event) => {
                                this.navigateurl('shopDepartments', '', event);
                            }} >{'SHOP DEPARTMENTS'}</button>
                        {this.displayShopDepartmentMenu()}
                    </div>
                    <div className={cx('config-links')}>
                        <List
                            datasource={source} direction="Horizontal" listBodyClass={cx('listBody')}
                            listStyleClass={cx('listBlock')} itemStyleClass={cx('listItem')}
                            childRenderer={this.renderMenu} automationId="at-error-helpfullinks-renderer" />
                    </div>
                </div>
                {this.displayDropDown ? this.renderStoreDataWithGeo() : this.renderFindStoreButton()}
            </div>
        );
    }

    render() {
        this.renderStoreInfo();
        const { openSlider, displayvericalSlider } = this.state;
        const verticalSlideClassName = openSlider ? cx('verticalslide', 'displayVerticalSlide') : cx('verticalslide');
        const changeStoreWrapperClassName = displayvericalSlider ? cx('changeStoreWrapper') : cx('hideStoreWrapper');

        return (<div className={cx('secondaryMenu')}>
            <div className={cx('containerWidth')}>
                {this.renderFindAStore()}
                <div className={cx('verticalmenu-wrapper')}>
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                    <div className={changeStoreWrapperClassName} onClick={this.closeMenu} />
                    <div className={verticalSlideClassName}>
                        <div className={cx('sliderHeader')}>
                            <Button
                                type="button" onClick={this.closeMenu} automationId="test-automation-btn-0"
                                buttonType="Text" className={cx('leftArrowWrapper')}>
                                <Icon className={cx('left-arrow')} iconType="svg" width="22px" height="22px" viewBox="0 0 30 20" name="hamb-arrow-left" />
                                {'Back'}</Button>
                        </div>
                        <div className={cx('slider-data')}>
                            {this.state.openSlider ? SelectaStore(this.props.selectedStore) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...AnalyticsAction,
        ...accountAction,
        ...storeNavigationActions,
        ...OverlayAction }, dispatch),
});

const mapStateToProps = ({ accounts, selectedStore, context, desktopDepartmentVisualNav }) => ({
    accounts: accounts || {
        userProfile: {
            firstName: null,
            accountId: null,
            rewardsStatus: null,
            userState: '0',
            totalCerts: null,
        },
    },
    shopDepartmentMenuInfo: desktopDepartmentVisualNav,
    selectedStore: selectedStore || {
        isGeoStore: false,
        storeDetails: {
            name: '',
        },
    },
    secondaryNavigationMenu: context && context.preferences ? context.preferences.secondaryNavigationMenu
        : config.secondaryNavigationMenu, // need to remove else part once config chages are done in AWS
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryNavigationPanel);
