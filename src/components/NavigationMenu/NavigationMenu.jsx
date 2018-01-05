import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownMenu from 'yoda-core-components/lib/components/DropdownMenu/DropdownMenu';
import Formatter from 'yoda-core-components/lib/helpers/Formatter/Formatter';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import { browserHistory } from 'react-router';
import * as NavigationMenuAction from '../../actions/NavigationMenuAction';
import * as AnalyticsAction from '../../actions/AnalyticsAction';
import * as DepartmentAction from '../../actions/DepartmentAction';
import SiteComponent from '../SiteComponent/SiteComponent';


const navigationMenuData = {
    title: 'Shop Departments',
    subTitle: null,
    menuList: [],
    menuListBefore: [],
};

const catIdList = [];
const checkCategoryLeaf = ({ leaf, links }) => {
    let externalLink = false;
    let catLeaf = leaf;
    if (links) {
        externalLink = links.find(link => link.rel === 'external');
    }
    if (externalLink) {
        catLeaf = externalLink;
    }
    return catLeaf;
};

export const prepareNavigationMenuList = (categories) => {
    let categoryGroups = [];
    if (Array.isArray(categories) && categories.length) {
        categoryGroups = categories;
    } else if (Array.isArray(categories.groups) && categories.groups.length && categories.groups[0].categories) {
        categoryGroups = categories.groups[0].categories;
    }
    navigationMenuData.menuList = categoryGroups.map((categoryGroup) => {
        const categoryLeaf = checkCategoryLeaf(categoryGroup);
        return {
            id: categoryGroup.id ? categoryGroup.id : null,
            name: categoryGroup.name ? categoryGroup.name : null,
            href: categoryGroup.href ? categoryGroup.href : null,
            links: categoryGroup.links ? categoryGroup.links : null,
            leaf: categoryLeaf,
            groups: categoryGroup.groups ? categoryGroup.groups : null,
            categories: categoryGroup.categories ? categoryGroup.categories : null,
        };
    });
    navigationMenuData.menuList.push({ name: 'Accessible View', href: 'http://assistive.jcpenney.com/', leaf: true, id: 'accessibilityView', navigate: true });
    return navigationMenuData;
};

export const getCategoryUrl = ({ links }) => {
    let hrefUrl = '';
    let linkUrl = '';

    if (Array.isArray(links)) {
        linkUrl = links.reduce((url, link) => {
            if (link.rel === 'external') {
                hrefUrl = link.href;
            } else if (link.rel === 'canonical') {
                hrefUrl = Formatter.format(link.href, Formatter.TYPE.AS_RELATIVE_URL);
            }
            return hrefUrl;
        }, hrefUrl);
    }
    return linkUrl;
};

const getNavigationHistoryStr = list => list.map(a => (a.currentCategory.name)).join(':');

export class NavigationMenu extends SiteComponent {

    static defaultProps = {
        actions: {},
        datasource: {},
        navigationMenuList: [],
        resetMenu: false,
        resetMenuToFalse: null,
    };

    static propTypes = {
        actions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        navigationMenuList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        resetMenu: PropTypes.bool,
        resetMenuToFalse: PropTypes.func,
    };

    hydrate() {
        navigationMenuData.subTitle = null;
        this.props.actions.getDepartmentsAction();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.resetMenu !== nextProps.resetMenu && nextProps.resetMenu) {
            navigationMenuData.subTitle = null;
            navigationMenuData.menuListBefore = [];
            this.props.resetMenuToFalse();
            this.props.actions.getDepartmentsAction();
        }
    }

    navigationMenuOnClick(category) {
        const isTablet = this.deviceType ? this.deviceType.isTablet : false; // Mobile by default
        let menuCategory = [];
        const linkToLoad = getCategoryUrl(category);
        let reload = false;
        /* istanbul ignore next */
        if (linkToLoad && linkToLoad.indexOf('/g/') >= 0 && linkToLoad.indexOf('pageType=X2H2') < 0) {
            reload = true;
        }

        /* istanbul ignore next */
        if (category.navigate) {
            window.location.href = category.href;
            return;
        }
        if (category.id) {
            catIdList.push(category.id);
        }
        if (category.leaf || (isTablet && category.id)) {
            const previousList = {
                currentCategory: category,
                previousGroups: this.navigationMenuList,
            };
            navigationMenuData.menuListBefore.push(previousList);
            navigationMenuData.subTitle = category.name;
            this.actions.triggerNavigationClick({
                linkName: getNavigationHistoryStr([...navigationMenuData.menuListBefore,
                { currentCategory: { name: category.name } }]),
                isReload: reload,
            });

            if (!category.id) {
                menuCategory = { ...category, groups: category.categories, leaf: category.leaf };
                this.actions.getActiveMenuOnClickAction(menuCategory);
            } else {
                this.actions.getActiveMenuAction(category.id);
            }

            LocalStorage.setData('fromYodaHBM', catIdList, true);

            if (category.leaf) {
                window.location.href = getCategoryUrl(category);
            } else {
                browserHistory.push(getCategoryUrl(category));
            }
        } else {
            menuCategory = category;
            const previousList = {
                currentCategory: category,
                previousGroups: this.navigationMenuList,
            };
            navigationMenuData.menuListBefore.push(previousList);
            navigationMenuData.subTitle = category.name;
            this.actions.triggerNavigationClick({
                linkName: getNavigationHistoryStr(navigationMenuData.menuListBefore),
                isReload: reload,
            });
            if (!category.id) {
                menuCategory = { ...category, groups: category.categories, leaf: category.leaf };
                this.actions.getActiveMenuOnClickAction(menuCategory);
            } else {
                this.actions.getActiveMenuAction(category.id);
            }
        }

        if (window) {
            window.scrollTo(0, 0);
        }
    }

    navigatebackClicked() {
        const beforeMenuList = navigationMenuData.menuListBefore.pop();
        const menuListLength = navigationMenuData.menuListBefore.length;
        /* istanbul ignore next */
        if (menuListLength) {
            const categoryClicked = navigationMenuData.menuListBefore[menuListLength - 1].currentCategory;
            navigationMenuData.subTitle = categoryClicked.name;
        } else {
            navigationMenuData.subTitle = null;
        }
        if (beforeMenuList && beforeMenuList.previousGroups) {
            this.actions.getPreviousMenuAction(beforeMenuList.previousGroups);
        }
    }

    render() {
        return (
            <DropdownMenu
                {...this.props}
                handleMenuClick={this.navigationMenuOnClick}
                handleSubTitleClick={this.navigatebackClicked}
                datasource={prepareNavigationMenuList(this.props.navigationMenuList)}
                automationId="navigation-dropdown"
            />
        );
    }
}

const mapStateToProps = store => ({
    navigationMenuList: store.navigationMenuList,
    deviceType: store.context ? store.context.deviceType : {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...NavigationMenuAction, ...AnalyticsAction, ...DepartmentAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);
