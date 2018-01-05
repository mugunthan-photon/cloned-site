import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Required Site Components
import SiteComponent from '../SiteComponent/SiteComponent';
import YodaGetTheApp from '../YodaGetTheApp/YodaGetTheApp';
import Subscription from './components/Subscription/Subscription';
import HelpSection from './components/YodaHelpSection/YodaHelpSection';
import FooterLinks from './components/FooterLinks/FooterLinks';
import * as actions from '../../actions/OrderAction';
import * as analyticsActions from '../../actions/AnalyticsAction';

// Css
import styles from './YodaFooter.css';
import DefaultTemplate from './YodaFooter.config';

export class YodaFooter extends SiteComponent {
    static defaultProps = {
        orders: [],
        actions,
        subscriptionStatus: {},
        deviceType: {},
        expandedFooter: false,
        condensedFooter: false,
        AlternatecondensedFooter: false,
        UltraCondensedFooter: false,
        footerMenus: {},
    }

    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        deviceType: PropTypes.objectOf(PropTypes.object),
        expandedFooter: PropTypes.bool,
        condensedFooter: PropTypes.bool,
        AlternatecondensedFooter: PropTypes.bool,
        UltraCondensedFooter: PropTypes.bool,
        footerMenus: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    }

    constructor() {
        super();
        this.state = {
            shouldInitiateRender: false,
        };
    }

    hydrate() {
        this.setState({
            shouldInitiateRender: true, // Initiate only on client
        });
    }

    render() {
        if (!this.state.shouldInitiateRender) {
            return null;
        }

        return (
            <div>
                <footer className={styles.footerWrap} data-automation-id="jcp-footer">
                    <YodaGetTheApp
                        deviceType={this.props.deviceType}
                    />
                    <Subscription
                        expandedFooter={this.props.expandedFooter}
                        deviceType={this.props.deviceType}
                        offerMessageData={this.props.footerMenus}
                    />
                    {!this.props.UltraCondensedFooter ? <div className={styles.helpWrap}>
                        <HelpSection automationId="footer-help" footerHelpSection={this.props.footerMenus.HelpSection} />
                    </div> : ''}
                    <FooterLinks
                        expandedFooter={this.props.expandedFooter}
                        deviceType={this.props.deviceType}
                        footerMenus={this.props.footerMenus}/>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    orders: store.stores[0],
    subscriptionStatus: store.subscriptionStatus,
    deviceType: store.context ? store.context.deviceType : { },
    footerMenus: store.context && store.context.preferences ? store.context.preferences.footer : DefaultTemplate,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(analyticsActions, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(YodaFooter);
