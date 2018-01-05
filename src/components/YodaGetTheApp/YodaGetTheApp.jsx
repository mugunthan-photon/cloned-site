import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Device from 'yoda-core-components/lib/helpers/Device/Device';
import * as styles from './YodaGetTheApp.css';
import config from './GetPlaystoreLinks';
import * as actions from '../../actions/OrderAction';

export class YodaGetTheApp extends Component {

    static defaultProps = {
        deviceType: {},
    }

    static propTypes = {
        deviceType: PropTypes.objectOf(PropTypes.object),
    }

    constructor(props) {
        super(props);
        /* istanbul ignore next */
        this.state = {
            showComponent: false,
        };
    }

    componentDidMount = () => {
        /* istanbul ignore next */
        const nativeDeviceType = Device.findDeviceType();
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
        switch (nativeDeviceType) {
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

    iconView =() => {
        /* istanbul ignore next */
        const deviceHardware = this.props.deviceType;
        let showIcon;
     /* istanbul ignore next */
        if (deviceHardware.isTablet) {
            showIcon = (
                <span className={styles.iconMobile}>
                    <Icon iconType="svg" classNames="icon" viewBox="0 0 24 24" width="24px" height="24px" automationId="mobile-fill-icon" name="mobile-fill"/>
                </span>
            );
     /* istanbul ignore next */
        } else if (deviceHardware.isMobile) {
            showIcon = (
                <span className={styles.iconMobile}>
                    <Icon iconType="svg" classNames="icon" viewBox="0 0 32 32" width="32px" height="32px" automationId="gift-registry-icon" name="gift-registry"/>
                </span>
            );
        }

     /* istanbul ignore next */
        return showIcon;
    }

    render() {
        return (
            <div>
                { this.state.showComponent === true ?
                    <div className={styles.getAppBlock}>
                        <div className={styles.getApp}>
                            <button className={styles.link} data-automation-id="footer-get-button">
                                <a href={this.state.appStoreUrl} data-automation-id="footer-get-link" className={styles['anchor-nostyle']} target="_blank" rel="noopener noreferrer" >
                                    {this.iconView()}
                                    Download JCPenney App
                                </a>
                            </button>
                        </div>
                    </div>
                : null }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(YodaGetTheApp);
