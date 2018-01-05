import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VisualNav from 'yoda-core-components/lib/components/VisualNav/VisualNav';
import * as actions from '../../actions/DepartmentVisualNavigationAction';
import SiteComponent from '../SiteComponent/SiteComponent';

export class DepartmentVisualNav extends SiteComponent {
    static defaultProps = {
        departmentsVisualNavigation: [],
        actions: {},
        direction: '',
        departmentTheme: '',
        departmentTitle: '',
        pageName: 'home',
        nTypeID: '',
        forceRenderClient: false,
        deviceType: {},
    };

    static propTypes = {
        departmentsVisualNavigation: PropTypes.arrayOf(PropTypes.object).isRequired,
        itemsPerRow: PropTypes.number.isRequired,
        forceRenderClient: PropTypes.bool,
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        direction: PropTypes.string.isRequired,
        departmentTheme: PropTypes.string,
        departmentTitle: PropTypes.string,
        pageName: PropTypes.string,
        /**
         * @type string , it is not required for home page but for
         * department page consicutive call this is required. it is getting captured from url params
         */
        nTypeID: PropTypes.string,
        deviceType: PropTypes.objectOf(PropTypes.object),
    };

    /**
     * ntypeToCheck
     * @type array, there can be multiple ntype call happening and departmentsVisualNavigation
     * alone cannot make sure we are hitting one api
     */
    static ntypeToCheck = [];

    hydrate() {
        if (!this.props.departmentsVisualNavigation || !this.props.departmentsVisualNavigation.length) {
            DepartmentVisualNav.ntypeToCheck = [];
            this.componentWithAction();
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.departmentsVisualNavigation.length < 1 ||
            DepartmentVisualNav.ntypeToCheck.indexOf(nextProps.nTypeID) < 0)
            && (nextProps.nTypeID
                !== this.props.nTypeID
                || nextProps.pageName
                !== this.props.pageName)) {
            this.props.actions.getDepartmentVisualNavigationAction(nextProps.pageName, nextProps.nTypeID,
                this.props.deviceType);
        } else {
            this.componentWithAction(nextProps.nTypeID);
        }
    }

    componentWithAction(ntype = null) {
        const { pageName, nTypeID } = this.props;
        const newNtype = ntype || nTypeID;
        if (DepartmentVisualNav.ntypeToCheck.indexOf(newNtype) < 0) {
            this.props.actions.getDepartmentVisualNavigationAction(pageName, newNtype, this.props.deviceType);
            DepartmentVisualNav.ntypeToCheck.push(newNtype);
        }
    }

    componentDidMount() {
        if (!this.props.departmentsVisualNavigation || !this.props.departmentsVisualNavigation.length) {
            this.componentWithAction();
        }
    }

    render() {
        const { departmentTheme, departmentTitle } = this.props;
        return (
            <VisualNav
                datasource={this.props.departmentsVisualNavigation}
                itemsPerRow={this.props.itemsPerRow}
                direction={this.props.direction}
                automationId="jcp-department-list"
                navTitle={departmentTitle}
                departmentTheme={departmentTheme}
            />
        );
    }
}

const mapStateToProps = ({ departmentsVisualNavigation, context }) => ({
    departmentsVisualNavigation,
    deviceType: context ? context.deviceType : {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentVisualNav);
