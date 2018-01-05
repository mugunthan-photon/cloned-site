import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BreadCrumbs from 'yoda-core-components/lib/components/BreadCrumbs/BreadCrumbs';
import Crumbs from 'yoda-core-components/lib/components/BreadCrumbs/Crumbs';
import * as actions from '../../actions/BreadCrumbNavAction';
import SiteComponent from '../SiteComponent/SiteComponent';

// TODO :: Enhance this component as required
export class BreadCrumbNav extends SiteComponent {
    static propTypes = {
        /**
         * breadcrumbs array
         * @type {Array}
         */
        breadCrumbs: PropTypes.arrayOf(PropTypes.object),
        status: PropTypes.number,
        softRoute: PropTypes.bool,
    };

    static defaultProps = {
        breadCrumbs: [],
        status: 0,
        softRoute: false,
    };

    constructor() {
        super();
        this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        /* istanbul ignore next */
        if (this.props.nTypeId !== nextProps.nTypeId) {
            this.callAction(nextProps.nTypeId, nextProps.breadCrumbs);
        }
    }

    hydrate() {
        this.callAction();
    }

    callAction(ntype = null, breadCrumbInfo = null) {
        const nId = ntype || this.props.nTypeId;
        const breadcrumbObj = breadCrumbInfo || this.props.breadCrumbs;
        const payload = this.props.nTypeId
            ? { urlState: nId }
            : null;
        if (!breadcrumbObj.length) {
            this.props.actions.getBreadCrumbsAction(payload);
        }
    }

    shouldComponentUpdate(nextProps) {
        return (this.props.breadCrumbs !== nextProps.breadCrumbs);
    }

    renderCrumbs() {
        const { breadCrumbs, softRoute } = this.props;
        let newSoftRoute = false;
        return breadCrumbs.map((crumbs, index) => {
            let crumbsHtml;
            newSoftRoute = index === 0 ? false : softRoute;
            if ((index !== (breadCrumbs.length - 1)) && crumbs && crumbs.navigationState) {
                crumbsHtml = (
                    <Crumbs
                        key={index.toString()}
                        softRoute={newSoftRoute}
                        path={crumbs.navigationState}
                    >{crumbs.breadCrumbLabel}</Crumbs>
                );
            } else {
                crumbsHtml = (
                    <Crumbs
                        key={index.toString()}
                        softRoute={softRoute}
                        isActive>{crumbs.breadCrumbLabel}
                    </Crumbs>
                );
            }

            return crumbsHtml;
        });
    }

    renderBreadCrumbs() {
        const { status } = this.props;

        if (status === 200) {
            return (
                <BreadCrumbs separator="arrow">
                    {this.renderCrumbs()}
                </BreadCrumbs>
            );
        }

        // Degrade Gracefully incase of API not Responding
        if (status === 502 || status === 503 || status === 404) {
            /** TODO:: Logging Api Failures and any additional hooks , like retrying will be added in here returning null for now */
            return null;
        }
        return null;
    }

    render() {
        return this.renderBreadCrumbs();
    }
}

const mapStateToProps = (state) => {
    const breadCrumbs = (state && state.breadCrumbsData && state.breadCrumbsData.data)
        ? state.breadCrumbsData.data.breadcrumbs
        : state.breadCrumbsData;

    const status = (state && state.breadCrumbsData && state.breadCrumbsData.status)
        ? state.breadCrumbsData.status
        : 0;

    return {
        breadCrumbs,
        status,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbNav);
