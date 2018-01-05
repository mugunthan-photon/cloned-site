import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Device from 'yoda-core-components/lib/helpers/Device/Device';
import * as styles from './GetTheApp.css';
import config from './GetPlaystoreLinks';
import * as actions from '../../actions/OrderAction';

export class GetTheApp extends Component {

    static defaultProps = {
        deviceType: {
            isTable: false,
            isMobile: false,
            isDesktop: false,
        },
    }

    static propTypes = {
        deviceType: PropTypes.oneOfType([PropTypes.object]),
    }

    constructor(props) {
        super(props);
        /* istanbul ignore next */
        this.state = {};
    }

    componentDidMount = () => {
        /* istanbul ignore next */
        const deviceType = Device.findDeviceType();
        let appStoreUrl = null;
        let displayAppLink = true;
        /* istanbul ignore next */
        // Mobile by default
        if (this.props.deviceType.isDesktop) {
            this.setState({
                showComponent: false,
            });
            return;
        }

        /* istanbul ignore next */
        switch (deviceType) {
            case Device.TYPE.ANDROID:
                appStoreUrl = config.PlayStoreUrls.androidLink;
                break;
            case Device.TYPE.iOS:
                appStoreUrl = config.PlayStoreUrls.iOSLink;
                break;
            default:
                displayAppLink = false;
                break;
        }

        this.setState({
            showComponent: displayAppLink,
            appStoreUrl,
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.showComponent !== this.showComponent);
    }

    render() {
        return (
            <div>
                { this.state.showComponent === true ?
                    <div className={styles.getApp}>
                        <button className={styles.link} data-automation-id="footer-get-button">
                            <a href={this.state.appStoreUrl} data-automation-id="footer-get-link" className={styles['anchor-nostyle']} target="_blank" rel="noopener noreferrer" >
                                <span className={styles.iconMobile}>
                                    <Icon iconType="svg" classNames="icon" viewBox="0 0 24 24" width="24px" height="24px" automationId="footer-get-icon" name="mobile-fill"/>
                                </span>
                                GET THE JCPENNEY APP
                            </a>
                        </button>
                    </div>
                    : null }
            </div>
        );
    }
}

const mapStateToProps = store => ({
    deviceType: store.context ? store.context.deviceType : {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetTheApp);
