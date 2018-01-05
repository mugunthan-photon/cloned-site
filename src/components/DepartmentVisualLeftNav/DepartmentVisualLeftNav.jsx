import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import SiteComponent from '../SiteComponent/SiteComponent';
import * as analyticsAction from '../../actions/AnalyticsAction';
import * as departmentVisualNavigationAction from '../../actions/DepartmentVisualNavigationAction';
import * as styles from './DepartmentVisualLeftNav.css';

const cx = classNames.bind(styles);

export class DepartmentVisualLeftNav extends SiteComponent {

    // components prop types
    static propTypes = {
        // department response which has left navigation items
        departmentsVisualLeftNavigation: PropTypes.arrayOf(PropTypes.object).isRequired,
        itemsPerRow: PropTypes.number,
        forceRenderClient: PropTypes.bool,
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        direction: PropTypes.string.isRequired,
        departmentTheme: PropTypes.string,
        departmentTitle: PropTypes.string,
        nTypeID: PropTypes.string,
        deviceType: PropTypes.objectOf(PropTypes.object).isRequired,
         /**
         * It is a flag indicating to go for soft routing or hard routing
         * @type {String}
         */

        softRoute: PropTypes.bool,
        analyticsTag: PropTypes.string,

    }

    // default value for props type
    static defaultProps = {
        // default value for component datasource property
        departmentsVisualLeftNavigation: [],
        itemsPerRow: 3,
        actions: {},
        direction: '',
        departmentTheme: '',
        departmentTitle: '',
        nTypeID: '',
        forceRenderClient: false,
        deviceType: {},
        softRoute: false,
        analyticsTag: '',
    }

      /**
     * ntypeToCheck
     * @type array, there can be multiple ntype call happening and departmentsLeftVisualNavigation
     * alone cannot make sure we are hitting one api
     */
    static ntypeToCheck = [];

    hydrate() {
        if (isEmpty(this.props.departmentsVisualLeftNavigation)) {
            DepartmentVisualLeftNav.ntypeToCheck = [];
            this.componentWithAction();
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((isEmpty(nextProps.departmentsVisualLeftNavigation) ||
            DepartmentVisualLeftNav.ntypeToCheck.indexOf(nextProps.nTypeID) < 0)
            && (nextProps.nTypeID
                !== this.props.nTypeID)) {
            this.props.actions.getDepartmentVisualLeftNavigationAction(nextProps.nTypeID,
                this.props.deviceType);
        } else {
            this.componentWithAction(nextProps.nTypeID);
        }
    }

    componentDidMount() {
        if (isEmpty(this.props.departmentsVisualLeftNavigation)) {
            this.componentWithAction();
        }
    }

    componentWithAction(ntype = null) {
        const { nTypeID } = this.props;
        const newNtype = ntype || nTypeID;
        if (DepartmentVisualLeftNav.ntypeToCheck.indexOf(newNtype) < 0) {
            this.props.actions.getDepartmentVisualLeftNavigationAction(newNtype, this.props.deviceType);
            DepartmentVisualLeftNav.ntypeToCheck.push(newNtype);
        }
    }


    handleClick = (category, e) => {
        e.preventDefault();
        let softRouteURL = e.target.href ? e.target.href : '';
        const analyticsTrackCode = this.props.analyticsTag;
        const matchForCmRe = /cm_re/.test(softRouteURL.toLowerCase());
        if (!matchForCmRe && analyticsTrackCode) {
            if (this.props.softRoute && analyticsTrackCode !== '') {
                const match = /.+\?.*/.test(softRouteURL);
                match ? softRouteURL += `&${analyticsTrackCode}` : softRouteURL += `?${analyticsTrackCode}`;
            }
        }
        const eventConent = `left:${category}:${e.target.innerText}`;
        this.props.actions.triggerNavigationClick({ linkName: eventConent, isReload: false });
        window.location = softRouteURL;
    };

    // Rendering department left visual navigation menu items
    renderDepartmentHeader = (subHeader, subItems) => (
        <div className={cx('navSubHeaderBlock')}>
            <div className={cx('navSubHeader')}>{subHeader}</div>
            <ul className={cx('navSubHeaderItem')}>{this.renderSubHeaderItems(subItems, subHeader)}</ul>
        </div>
    );

    // rendering left visual navigation header items
    renderSubHeaderItems = (items, header) => (_map(items, (item) => {
        const { name, targetUrl, targetWindow } = item;
            // forming item link navigation url
        const subItemLink = `${targetUrl}`;
        return (
            <li>
                <a
                    data-type={targetWindow}
                    href={subItemLink}
                    data-automation-id="department-navigation-link"
                    className={cx('navSubHeaderItemLink')}
                    onClick={(event) => { this.handleClick(header, event); }} >
                    {name}
                </a>
            </li>
        );
    }));

    renderItemArray = (itemsArray) => {
        if (isEmpty(itemsArray)) return null;
        return (
            <div className={cx('departmentVisualLeftNav')}>
                {
                _map(itemsArray, (subItems, subHeader) =>
                    this.renderDepartmentHeader(subHeader, subItems))
            }
            </div>);
    };

    renderItemColMobile = (navMap, col) => (
        <div>{
            navMap.map((navMapCol) => {
                if (isEmpty(navMapCol)) return null;
                return (
                    <div className={(col === 2) ? cx('departmentVisualLeftNavMobile') : cx('departmentVisualLeftNavTablet')}>
                        {
                            _map(navMapCol, (subItems, subHeader) =>
                                this.renderDepartmentHeader(subHeader, subItems))
                        }
                    </div>
                );
            })}
        </div>
    );


    renderItemArrayMobile = (itemsArray, numberCol) => {
        if (isEmpty(itemsArray)) return null;
        const sortedArray = Object.keys(itemsArray).sort((a, b) => (itemsArray[a].length < itemsArray[b].length));
        const navMap = (numberCol === 2) ? [{}, {}] : [{}, {}, {}];
        for (let col = 0; col < numberCol; col += 1) {
            let count = col;
            while (count < sortedArray.length) {
                let category = sortedArray[count];
                navMap[col][category] = itemsArray[category];
                count += numberCol;
                if (count >= sortedArray.length) break;
                category = sortedArray[count];
                navMap[(numberCol - 1) - col][category] = itemsArray[category];
                count += numberCol;
            }
        }

        return this.renderItemColMobile(navMap, numberCol);
    };

    render() {
        const { departmentsVisualLeftNavigation, deviceType } = this.props;
        switch (deviceType) {
            case 'desktop':
            default:
                return this.renderItemArray(departmentsVisualLeftNavigation);
            case 'mobile':
                return this.renderItemArrayMobile(departmentsVisualLeftNavigation, 2);
            case 'tablet':
                return this.renderItemArrayMobile(departmentsVisualLeftNavigation, 3);
        }
    }
}
const mapStateToProps = ({ departmentsVisualLeftNavigation }) => ({
    departmentsVisualLeftNavigation,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...analyticsAction, ...departmentVisualNavigationAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentVisualLeftNav);
