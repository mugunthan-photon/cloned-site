import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import filter from 'lodash/filter';
import _keyBy from 'lodash/keyBy';
import _merge from 'lodash/merge';
import _values from 'lodash/values';
import _get from 'lodash/get';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Loader from 'yoda-core-components/lib/components/Loader/Loader';
import List from 'yoda-core-components/lib/components/List/List';
import FeatureFlag from 'yoda-core-components/lib/components/FeatureFlag/FeatureFlag';
import classNames from 'classnames/bind';
import config from './Header.config';
import * as styles from './Header.css';
import ProductSearch from '../ProductSearch/ProductSearch';
import User from '../../helpers/User/User';
import SiteComponent from '../SiteComponent/SiteComponent';
import FetchRegion from '../FetchRegion/FetchRegion';
import * as actions from '../../actions/CartAction';
import * as analyticsActions from '../../actions/AnalyticsAction';
import * as orderAction from '../../actions/OrderAction';
import * as itemCountAction from '../../actions/ItemCountAction';
import * as accountAction from '../../actions/AccountAction';
import YodaTooltip from '../YodaTooltip/YodaTooltip';
import SecondaryNavigationPanel from './SecondaryNavigationPanel';
import PromotionalBanner from '../PromotionalBanner/PromotionalBanner';
import Hamburger from '../Hamburger/Hamburger';
import * as storeActions from '../../actions/SetMyDefaultStoreAction';
import * as storeNavigationActions from '../../actions/DepartmentVisualNavigationAction';

const cx = classNames.bind(styles);

export class YodaHeader extends SiteComponent {
    static defaultProps = {
        signedOut: false,
        cartCount: 0,
        headerType: '',
        deviceType: {},
        accounts: {
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: null,
                totalCerts: null,
            },
        },
        // savedItems: {
        //     savedItemsList: {

        //     },
        // },
        bagItemCount: {},
        actions: {},
        logoLink: 'on',
        shopDepartmentMenuInfo: [],
        primaryLinks: {
            cart: '',
        },
        accountMenuList: {},
        desktopAccountMenuList: {},
    }
    static propTypes = {
        headerType: PropTypes.string.isRequired,
        accounts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        deviceType: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        bagItemCount: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        // savedItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        actions: PropTypes.objectOf(PropTypes.func),
        logoLink: PropTypes.string,
        shopDepartmentMenuInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        accountMenuList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        desktopAccountMenuList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    };
    static signinLink = '/signin';


    constructor(props) {
        super(props);
        this.getHeaderTheme = this.getHeaderTheme.bind(this);
        this.renderMenuList = this.renderMenuList.bind(this);
        this.isLoggedIn = 1;
        this.state = {
            cartCount: this.props.bagItemCount,
            signedOutActive: false,
            resetMenu: false,
            isUserLoggedIn: null,
            showLoader: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ cartCount: Cookies.load('ItemCount') });
        this.setState({ cartCount: nextProps.bagItemCount });
        this.getUserStateDetails(nextProps);
        if (nextProps.accounts.userProfile) {
            this.setState({
                showLoader: false,
            });
        } else {
            this.setState({
                showLoader: true,
            });
        }
    }


    /* To get warm, hot and cold states for account section */
    getUserStateDetails(nextProps) {
        let accountState = null;
        const getProps = nextProps || this.props;
        if (getProps.accounts && getProps.accounts.userProfile) {
            const firstName = getProps.accounts.userProfile.firstName;
            const userState = (getProps.accounts.userProfile.userState !== '0' && getProps.accounts.userProfile.userState);
            if (firstName && userState) {
                accountState = 'HOT_STATE';
            } else if (!firstName && !userState) {
                accountState = 'COLD_STATE';
            } else if (firstName && !userState) {
                accountState = 'WARM_STATE';
            }
        }
        this.setState({
            isUserLoggedIn: accountState,
        });
    }

    // hpan start
    getHeaderTheme = () => {
        let theme = 'fullHeader';
        if (this.props.headerType === config.headerTypes.MINIMAL_HEADER) {
            theme = 'minimalHeader';
        } else if (this.props.headerType === config.headerTypes.SLIM_HEADER) {
            theme = 'slimHeader';
        }
        return theme;
    };

    // render rewards icon
    getRewardsIcon = () => {
        this.isLoggedIn = User.isUserLoggedIn();

        const rewardLink = (this.isLoggedIn === 0) ? { href: '/rewards' } : { href: '/rewards/rewards/dashboard' };
        return (
            <a
                id="headerRewards"
                title="my rewards"
                data-automation-id="rewardsLink" {...rewardLink}>
                <Icon
                    iconType="svg" className={cx('rewardsIcon')} width="80px" height="40px"
                    viewBox="-5 -5 110 48" name="rewards" />
            </a>
        );
    }

    // render logo
    getLogo = () => {
        // adding hyperlink only for TOF pages
        const logoLink = this.props.logoLink === 'on' ? { href: '/' } : '';
        return (
            <a
                data-automation-id="jcp-logo" className={cx('logoText')} title="JCPenney Home" id="jcp-logo"
                aria-label="Jcpenney logo navigate to home" {...logoLink}>JCPenney
            </a>
        );
    };

    /* Render Promotional Banner */
    getPromotionalBanner = () => (<FeatureFlag name="promoBanner">
        <PromotionalBanner deviceType={this.props.deviceType} />
    </FeatureFlag>);

    getCartLink = () => (this.props.primaryLinks.cart);

    hydrate() {
        if (!__SERVER__) {
            this.props.actions.getUserDetails();
            if (!this.props.preferences.storeCallNotNeededOnPageLoad) {
                this.props.actions.setMyDefaultStore();
            }
            this.setState({ showLoader: true });
            this.props.actions.updateItemCountAction();
        } else if (this.props.deviceType.isDesktop && this.props.featureFlags
            && !this.props.featureFlags.disableVisualNavSSR) {
            this.props.actions.getDesktopDepartmentVisualNavigationAction('home', this.props.deviceType);
        }
    }

    /* Account Section Account Icon */
    renderIcon = () => (
        <div className={cx('accountIconBlock')}>
            <Icon
                iconType="svg" className={cx('svg-icon')} viewBox="0 0 48 48" name="icon-account" pathClassName="accountFillColor" />
        </div>
    );

    /* Render account information like  user name and myaccount */
    renderAccountData = (icon = '', userName, accountState = config.accountInfo.signInLabel) => {
        userName = userName || config.accountInfo.myAccountLabel;
        const isMobile = (this.props.deviceType && this.props.deviceType.isMobile)
            ? this.props.deviceType.isMobile
            : false;

        return (
            <div id="toggleToolTip">{
                isMobile ? this.renderIcon() :
                <div>
                    {icon}
                    <div className={cx('accountInfoBlock')}>
                        <div className={cx('accountTitle')}>{userName}</div>
                        <div className={cx('accountInfo')}>{accountState}<span className={cx('accountDropDownIcon')} /></div>
                    </div>
                </div>}
            </div>
        );
    }

    /* Render account data based on warm, hot and cold states */
    renderAccoundInformation = () => {
        const accountState = this.state.isUserLoggedIn;
        // const accountState = 'WARM_STATE';
        const loggedInUsername = this.props.accounts
        && this.props.accounts.userProfile && this.props.accounts.userProfile.firstName
        && this.props.accounts.userProfile.firstName !== 'null' ?
            this.props.accounts.userProfile.firstName : '';
        const totalCerts = this.props.accounts
        && this.props.accounts.userProfile && this.props.accounts.userProfile.totalCerts ?
            this.props.accounts.userProfile.totalCerts : '';
        const userName = `Hi, ${loggedInUsername || ''}`;
        const spendTotalCerts = `Spend your $${totalCerts}!`;
        switch (accountState) {
            case 'WARM_STATE':
                return this.renderAccountData('', userName);
            case 'COLD_STATE':
                return this.renderAccountData();
            case 'HOT_STATE':
                if (totalCerts) {
                    return this.renderAccountData(this.renderIcon(), userName, spendTotalCerts);
                }
                return this.renderAccountData(this.renderIcon(), userName, config.accountInfo.myAccountLabel);
            default:
                return this.renderAccountData();
        }
    };

    renderTooltipData() {
        return this.state.showLoader ?
            <Loader automationId="test-automation-loader-1" /> : this.renderAccountTooltipData();
    }
    prepareMenuList(attribute = 'guest') {
        let accountMenuList = this.props.accountMenuList[attribute];
        if (this.props.deviceType.isDesktop) {
            const desktopAccountMenuList = this.props.desktopAccountMenuList[attribute] || [];
            const destMenu = _keyBy(accountMenuList, 'name');
            const srcMenu = _keyBy(desktopAccountMenuList, 'name');
            accountMenuList = _values(_merge({}, destMenu, srcMenu));
        }
        return filter(accountMenuList, item => (item.isDisplayRequiredInAccountMenu));
    }
    renderAccountTooltipData() {
        const userLoggedInState = this.state.isUserLoggedIn;
        const totalCerts = this.props.accounts
        && this.props.accounts.userProfile && this.props.accounts.userProfile.totalCerts
            ? this.props.accounts.userProfile.totalCerts : '';

        let source;
        let styleClass;
        let showButtonANdLink = false;
        const rewardsCount = (this.props.accounts &&
            this.props.accounts.userProfile &&
            this.props.accounts.userProfile.rewardsStatus) ?
            this.props.accounts.userProfile.totalCerts : 0;

        switch (userLoggedInState) {
            case 'HOT_STATE':
                source = this.prepareMenuList('signedin');
                styleClass = (totalCerts || totalCerts === 0) ? 'signedInWithCerts' : 'signedInUser';
                showButtonANdLink = false;
                break;
            case 'WARM_STATE':
            default:
                source = this.prepareMenuList('guest');
                styleClass = 'signedOutUser';
                showButtonANdLink = true;
        }
        return (<div>{
            (showButtonANdLink) ?
                <div>
                    <Button
                        type="button" automationId="test-automation-btn-0"
                        buttonType="Primary" size="Lg" className={cx('sigInButton')}
                        onClick={() => { NavigationHelper.navigate(YodaHeader.signinLink); }}> {'Sign In'}</Button>
                    <span className={cx('newCustomer')}>{'New Customer? '}</span><a className={cx('registerLink')} href="/createaccount" > {'Register Here'} </a> </div> : null
        }
            <List
                datasource={source} direction="Vertical" listBodyClass={cx('list-class')}
                listStyleClass={cx('list-ul-class')} itemStyleClass={cx('list-item-class', styleClass)}
                childRenderer={this.renderMenuList} spacing="None" automationId="at-error-helpfullinks-renderer" />
            {(totalCerts) ? <Button
                type="button" automationId="test-automation-btn-0"
                buttonType="Primary" size="Lg" className={cx('redeemText')}> <span className={cx('redeemCertsWrapper')}><span className={cx('dollerValue')}>{'$'}</span><span>{`${rewardsCount}`}</span></span>{'Redeem Your Rewards'}</Button> : null}
        </div>);
    }


    renderMenuList = (item) => {
        const rewardsCount = (this.props.accounts &&
            this.props.accounts.userProfile &&
            this.props.accounts.userProfile.rewardsStatus) ?
            this.props.accounts.userProfile.totalCerts : 0;
        /* const savedItemCount = this.props.account &&
                                this.pros.accounts.userProfile ?
                                this.props.accounts.userProfile.savedItemsCount : 0; */
        const totalCerts = this.props.accounts
        && this.props.accounts.userProfile && this.props.accounts.userProfile.totalCerts
            ? this.props.accounts.userProfile.totalCerts : '';
        const linksForLabels = item.link;
        return (<a className={cx('links')} href={linksForLabels}>
            {item.name}
            {(totalCerts && item.displayCount === 'rewards') && <span className={cx('rewardscount')}>{`(${rewardsCount})`}</span>}
        </a>);
        /* {(totalCerts && item.displayCount === 'savedItems') && <span className={cx('rewardscount')}>{`(${savedItemCount})`}</span>} */
    }

    renderAccount = () => {
        const styleTooltip = this.state.showLoader ? cx('tooltipMenuWrapper', 'tooltipWithLoader') : cx('tooltipMenuWrapper');
        return (<YodaTooltip
            tooltipContentClass={styleTooltip}
            tooltipBodyClassName={cx('headerTooltipWrapper')}
            renderTooltipContents={this.renderTooltipData()}
            triggerEventName={'click'}
            direction={'Bottomright'}
            tooltipPlacement={'Right'} >
            <div
                className={styles.accountMenu}
                ref={(node) => { this.wrapperRef = node; }} >
                {this.renderAccoundInformation()}
            </div>
        </YodaTooltip>
        );
    }

    // hpan Ends
    render() {
        const { deviceType } = this.props;
        return (
            <header
                data-automation-id="headerBlock"
                className={cx('headerBlock', this.getHeaderTheme(), this.state.slimState)}
            >
                <FetchRegion />
                {/* Header Primary */}
                {this.getPromotionalBanner()}
                {/* Header Primary Ends */}
                {/* Header Secondary */}
                <div className={cx('mainMenu')}>
                    <ul className={cx('headerBlockList', 'containerWidth')}>
                        <li className={cx('headerList', 'menuBlock')}>
                            <div className={styles.headerNavigation} >
                                {!this.props.deviceType.isDesktop ? <Hamburger /> : null}
                            </div>
                        </li>
                        <li className={cx('headerList', 'logoBlock')}>
                            {this.getLogo()}
                        </li>
                        <li className={cx('headerList', 'searchBlock')}>
                            <ProductSearch automationId="tablet-search-block" />
                        </li>
                        <li className={cx('headerList', 'ctaBlock', 'right')}>
                            <div className={cx('svg-icon', 'ctaList', 'rewardsBlock')}>
                                {this.getRewardsIcon()}
                            </div>
                            <div className={cx('accBlock', 'ctaList')}>
                                {this.renderAccount()}
                            </div>
                            <div className={cx('bagBlock', 'ctaList', 'cartBag')}>
                                <a
                                    data-automation-id="bagLink" href={this.getCartLink()} title="my cart"
                                    className={cx('headerIcon', 'bagIcon')} aria-label={`Bag ${this.state.cartCount} - items`}
                                    rel="noopener noreferrer"
                                >
                                    <div className={cx('svg-icon')}>
                                        <Icon
                                            iconType="svg" className={cx('svg-icon')} width="48px" height="48px"
                                            viewBox="-10 -10 48 48" name="cart" pathClassName={cx('cartFillColor')}
                                        />
                                    </div>
                                    {this.state.cartCount > 0 ?
                                        <span data-automation-id="item-bag-count" className={styles.cartCount}>{this.state.cartCount}</span>
                                        : null
                                    }
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* Header Secondary Ends */}
                {this.props.deviceType.isDesktop ? <SecondaryNavigationPanel deviceType={deviceType} /> : null}
            </header>
        );
    }
}

const mapStateToProps = (store) => {
    const context = store.context;
    const deviceType = context && context.deviceType ? context.deviceType : {};
    const preferences = context && context.preferences ? context.preferences : {};
    const primaryLinks = preferences && preferences.primaryLinks ? preferences.primaryLinks : {};
    const desktopAccountMenuList = _get(context, 'preferences.desktop.hamburger', {});
    const featureFlags = _get(context, 'featureFlags', {});
    return {
        signedOut: store.session.signedOut,
        deviceType,
        preferences,
        bagItemCount: store.bagItemCount,
        primaryLinks: deviceType.isDesktop ? primaryLinks.desktop : primaryLinks.device,
        accountMenuList: preferences.hamburger || {},
        desktopAccountMenuList,
        accounts: store.accounts || {
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: null,
                totalCerts: null,
            },
        },
        featureFlags,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(analyticsActions, actions, orderAction,
        accountAction, itemCountAction, storeActions, storeNavigationActions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(YodaHeader);
