import React from 'react';
import classNames from 'classnames/bind';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Button from 'yoda-core-components/lib/components/Button/Button';
import * as styles from './DefaultTemplate.css';

const cx = classNames.bind(styles);

let singleAnalytics = null;

/* istanbul ignore next */
const menuClicked = (e) => {
    const clickedItem = e ? e.target.closest('button').dataset : {};
    /* istanbul ignore next */
    if (clickedItem && clickedItem.targetdurl) {
        singleAnalytics(clickedItem.name);
        location.href = clickedItem.targetdurl;
    }
};


const oneRow = (item, logOutAction) => (
    <li key={`hamb-base-${item.name}`} className={cx({ hr: item.seperator, siginDecor: item.styleClass === 'signout' })}><button className={styles.menuListItemLink} onClick={item.styleClass === 'signout' ? logOutAction : menuClicked} data-targetdurl={item.link} data-name={item.name} data-automation-id="dropdown-item-button">
        <span
            className={cx(styles.menuListItemName, item.styleClass)}
            aria-label={item.name}
        >
            {item.name}
        </span>
    </button>
    </li>
);

const renderMidSection = (items, userProfileInfo, logOutAction) => {
    const fullDom = [];
    const optedItems = userProfileInfo.userState && userProfileInfo.userState === '1' ? items.signedin : items.guest;
    optedItems.forEach((item) => {
        fullDom.push(oneRow(item, logOutAction));
    });
    return fullDom;
};

/* istanbul ignore next */
const signInClicked = () => {
    singleAnalytics('siginin');
    location.href = '/signin';
};

const Signin = (userProfileInfo) => {
    const signedInJsx = (!userProfileInfo.userState || userProfileInfo.userState === '0') ? (
        <ul className={styles.hr}>
            <li className={styles.siginParent}><Button data-itemid="root" data-title="MENU" data-name="shop department" data-pagetype="base" data-nid="root" buttonType="Primary" size="Lg" className={styles.sigininButton} onClick={signInClicked}>
                Sign In
    </Button>
            </li>
            <li> <span className={styles.singinTextBottom}> New Customer? <button className={styles.registerHere} data-name="register" onClick={menuClicked} data-targetdurl="/createaccount">
                Register Here </button></span> </li>
        </ul>) : null;
    return signedInJsx;
};

const shopDepartmentsRoot = shopDepartmentAction => (
    <li className={styles.hr}><button onClick={shopDepartmentAction} data-itemid="root" data-title="MENU" data-name="shop department" data-pagetype="base" data-nid="root" className={styles.shopDepartments} >
        SHOP DEPARTMENTS
        <i className={styles.rightArrow}>
            <Icon iconType="svg" className={cx('svg-icon')} width="14px" height="14px" viewBox="0 0 18 18" name="arrow-right" />
        </i>
    </button>
    </li>
);

const needHelpSection = () => (
    <li><button className={styles.needHelp} onClick={menuClicked} data-name="needhelp" data-targetdurl="/customerService" >
        <Icon iconType="svg" className={cx('svg-icon')} width="24px" height="24px" viewBox="0 0 18 18" name="help" /> Need Help
    </button>
    </li>
);

const accessabilityView = () => (
    <li><button
        className={styles.accessibleView}
        onClick={menuClicked} data-name="accessbality"
        data-targetdurl="http://assistive.jcpenney.com/h5/access/index" >
        Accessible View
    </button>
    </li>
);

const findAStore = (userProfileInfo, selectedStore, shopDepartmentAction) => {
    let title = '';
    let storeText = '';

    if (selectedStore.isGeoStore && selectedStore.storeDetails && selectedStore.storeDetails.name) {
        title = <span className={styles.findTitle}> Store Nearest You </span>;
        storeText = <span className={styles.findText}> {selectedStore.storeDetails.name} </span>;
    } else if (selectedStore.storeDetails && selectedStore.storeDetails.name) {
        title = <span className={styles.findTitle}> My Store </span>;
        storeText = <span className={styles.findText}> {selectedStore.storeDetails.name} </span>;
    } else {
        title = <span className={styles.findTitle}> Near You </span>;
        storeText = <span className={styles.findText}> Find a Store </span>;
    }

    return (<button onClick={shopDepartmentAction} data-itemid="root" data-title="MENU" data-name="Select Store" data-pagetype="findastore" data-nid="findastore" className={styles.findAStore}>
        <span className={styles.findIcon}><Icon
            iconType="svg" automationId="location" className={cx('iconLocation')} width="28px" height="22px"
            viewBox="0 0 20 20" name="location-fill"
        /></span>
        {title}
        {storeText}
    </button>);
};

const DropdownDefault = (data, shopDepartmentAction, userProfileInfo = {
    firstName: null,
    accountId: null,
    rewardsStatus: null,
    userState: '0',
    totalCerts: null,
},
    selectedStore = {
        isGeoStore: false,
        storeDetails: {
            name: '',
        },
    },
    logOutAction, analyticsForDefault) => {
    singleAnalytics = analyticsForDefault;
    return (
        <div className={styles.dropdownMenu}>
            <ul className={styles.defaultContainer}>
                {Signin(userProfileInfo)}
                {shopDepartmentsRoot(shopDepartmentAction)}
                {findAStore(userProfileInfo, selectedStore, shopDepartmentAction)}
                {renderMidSection(data, userProfileInfo, logOutAction)}
                {needHelpSection()}
                {accessabilityView()}
            </ul>
        </div>
    );
};

export default DropdownDefault;
