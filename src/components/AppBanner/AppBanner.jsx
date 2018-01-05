import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { bindActionCreators } from 'redux';
import ScriptLoader from 'yoda-core-components/lib/helpers/ScriptLoader/ScriptLoader';
import * as actions from '../../actions/ProductCartridgeAction';
import SiteComponent from '../SiteComponent/SiteComponent';
import { branchio } from '../../common/Constants';

export class AppBanner extends SiteComponent {
    constructor() {
        super();
        this.branchIoLoaded = this.branchIoLoaded.bind(this);
    }
    static defaultProps = {
        enable: true,
        deviceType: {},
    };

    static propTypes = {
        enable: PropTypes.bool,
        deviceType: PropTypes.objectOf(PropTypes.object),
    };

    componentDidMount() {
        /* istanbul ignore next */
        if (!__SERVER__ && (this.props.deviceType.isMobile || this.props.deviceType.isTablet) && this.props.enable) {
            this.loadAppBanner();
        }
    }
    loadAppBanner() {
        const resonanceUrl = '//m.jcpenney.com/b/assets/js/branch.io.js';
        const branchIoProps = {
            src: resonanceUrl,
            onSuccess: this.branchIoLoaded,
        };
        ScriptLoader.load(branchIoProps);
    }
    branchIoLoaded() {
        if (!__SERVER__ && window.branch) {
            const deeplinkPath = window.location.pathname + window.location.search + window.location.hash;
            window.branch.init(this.props.branchIOKey, { no_journeys: true });
            window.branch.setBranchViewData({
                tags: 'Yoda Mobile Web',
                open_app: true,
                data: {
                    $deeplink_path: deeplinkPath,
                },
            });
            if (window.branch.track) {
                window.branch.track('pageview');
            }
        }
    }
    renderAppBanner() {
        if ((this.props.deviceType.isMobile || this.props.deviceType.isTablet) && this.props.enable) {
            return (<div className="branch-journeys-top"/>);
        }
        return null;
    }
    render() {
        return this.renderAppBanner();
    }
}
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});
/* istanbul ignore next */
const mapStateToProps = ({ context }) => ({
    deviceType: context ? context.deviceType : {},
    branchIOKey: _get(context, 'preferences.branchIOKey', branchio.BRANCHIO_LIVE_KEY),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBanner);
