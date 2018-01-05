import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';

// Required Core components
import { Accordion, AccordionSection } from 'yoda-core-components/lib/components/Accordion';
import SocialShare from 'yoda-core-components/lib/components/SocialShare/SocialShare';
import List from 'yoda-core-components/lib/components/List/List';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';

// Required Site Components
import SiteComponent from '../SiteComponent/SiteComponent';
import HelpSection from '../HelpSection/HelpSection';
import MarketingOptInSection from '../MarketingOptInSection/MarketingOptInSection';
import GetTheApp from '../GetTheApp/GetTheApp';
import * as actions from '../../actions/OrderAction';
import * as analyticsActions from '../../actions/AnalyticsAction';

// Configs
import footerTheme from './FooterAccordionTheme';
import config from './Footer.config';

// Css
import styles from './Footer.css';

// CX Class
const cx = classNames.bind(styles);
export class Footer extends SiteComponent {

    static defaultProps = {
        orders: [],
        actions,
        subscriptionStatus: {},
        offerMessageData: {},
    }

    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        offerMessageData: PropTypes.objectOf(PropTypes.object),
    }

    constructor() {
        super();
        this.state = {
            currYear: (new Date()).getFullYear(),
            isModalOpen: false,
            shouldInitiateRender: false, // Do not render on server side
            showEmailError: false,
            showPhoneError: false,
            isModalOpenOfferMessage: false,
        };
        this.subscribeWithEmail = this.subscribeWithEmail.bind(this);
        this.subscribeWithPhoneNum = this.subscribeWithPhoneNum.bind(this);
        this.openModalOfferMessage = this.openModalOfferMessage.bind(this);
        this.closeModalOfferMessage = this.closeModalOfferMessage.bind(this);
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    openModalOfferMessage() {
        this.setState({ isModalOpenOfferMessage: true });
    }

    closeModalOfferMessage() {
        this.setState({ isModalOpenOfferMessage: false });
    }

    subscribeWithEmail() {
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const data = {
            type: 'EMAIL',
            value: this.emailInput.value,
        };
        if (this.emailInput.value.length === 0) {
            this.setState({
                showEmailError: true,
                emailErrorText: 'Enter email address',
            });
            this.props.actions.triggerFormError([{
                errorDescription: 'Enter email address',
            }]);
        } else if (!pattern.test(this.emailInput.value)) {
            this.setState({
                showEmailError: true,
                emailErrorText: 'Please enter a valid email address',
            });
            this.props.actions.triggerFormError([{
                errorDescription: 'Please enter a valid email address',
            }]);
        } else {
            this.setState({
                showEmailError: false,
            });
            this.props.actions.optin(data);
            this.openModalOfferMessage();
        }
    }

    subscribeWithPhoneNum() {
        const pattern = /^\d{10}$/;
        const data = {
            type: 'MOBILE',
            value: this.phoneInput.value,
        };
        if (this.phoneInput.value.length === 0) {
            this.setState({
                showPhoneError: true,
                phoneErrorText: 'Enter phone number',
            });
            this.props.actions.triggerFormError([{
                errorDescription: 'Enter phone number',
            }]);
        } else if (!pattern.test(this.phoneInput.value)) {
            this.setState({
                showPhoneError: true,
                phoneErrorText: 'Please enter a valid phone number',
            });
            this.props.actions.triggerFormError([{
                errorDescription: 'Please enter a valid phone number',
            }]);
        } else {
            this.setState({
                showPhoneError: false,
            });
            this.props.actions.optin(data);
            this.openModalOfferMessage();
        }
    }

    accordionRefCallback = (ref) => {
        this.footerAccordion = ref;
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

        const { offerMessageData } = this.props;
        // Offer Message data
        const offerMessageTitle = (
            offerMessageData.OfferMessage && offerMessageData.OfferMessage.title) ?
            offerMessageData.OfferMessage.title : null;

        const offerMessageDescription = (
            offerMessageData.OfferMessage && offerMessageData.OfferMessage.Description) ?
            offerMessageData.OfferMessage.Description : null;

        const isTablet = this.props.deviceType ? this.props.deviceType.isTablet : false; // Mobile by default
        const isAutoCollapsible = true;
        const anchorRenderer = dataItem => (
            <a href={dataItem.linkPath} className={styles['anchor-nostyle']} aria-label={dataItem.text} data-automation-id="footer-link">
                <span className={styles.helpDescription} key={dataItem.id}>{dataItem.text}</span>
            </a>
        );

        // subscribe Block
        const subscribeBlock = (<div className={styles.subscriptionWrap}>
            <ul data-automation-id="footer-block-subscribe">
                <li className={styles.subscriptionRow}>
                    <div data-automation-id="signup-title" className={styles.subsTitle}>Sign up for alerts, offers and promotions
                    </div>
                    <MarketingOptInSection oldFooterData automationId="signup-input" optDataId="deals-email-txt-box" btnDataId="deals-email-btn" type="email" placeholder="Email address" buttonType="dark" submitCallback={this.subscribeWithEmail} customInputClass={styles.subscribe} refCallback={(ref) => { this.emailInput = ref; }} >
                    SIGN UP
                    </MarketingOptInSection>
                    {(this.state.showEmailError) ? (
                        <div className={styles.errorBlock}>
                            <span className={styles.iconBlock}>
                                <Icon iconType="svg" classNames="icon" viewBox="0 0 16 16" width="16px" height="16px" automationId="footer-get-icon" name="errorline" pathClassName={styles.errorIconColor}/>
                            </span>
                            <span className={styles.errorTextBlock}>{this.state.emailErrorText}</span>
                        </div>)
                    : null }
                </li>
                <li className={styles.subscriptionRow}>
                    <div data-automation-id="promo-title" className={styles.subsTitle}>Mobile Offers and Promotions</div>
                    <MarketingOptInSection oldFooterData data-automation-id="promo-input" optDataId="deals-tel-txt-box" btnDataId="deals-tel-btn" type="tel" placeholder="Phone number" customInputClass={styles.subscribe} buttonType="dark" submitCallback={this.subscribeWithPhoneNum} refCallback={(ref) => { this.phoneInput = ref; }}>
                    SIGN UP
                   </MarketingOptInSection>
                    {(this.state.showPhoneError) ? (
                        <div className={styles.errorBlock}>
                            <span className={styles.iconBlock}>
                                <Icon iconType="svg" classNames="icon" viewBox="0 0 16 16" width="16px" height="16px" automationId="footer-get-icon" name="errorline" pathClassName={styles.errorIconColor}/>
                            </span>
                            <span className={styles.errorTextBlock}>{this.state.phoneErrorText}</span>
                        </div>)
                    : null }
                </li>
                <li className={styles.subscriptionTerms}>
                    <sup>*</sup>
                    Message and data rates may apply. By providing my mobile number, I agree to receive autodialed promotional text alerts from JCPenney to that number. I understand that consent is not required to purchase goods or services. Up to 8 msgs/month from 527365 (JCPenney). Text <strong>HELP</strong> to 527365 for help and <strong>STOP</strong> to 527365 to cancel.<button data-automation-id="terms-cond" id="termsAndConditionsLink" className={styles.anchor} onClick={() => this.openModal()}>Terms &amp; Conditions</button>.
                    <a data-automation-id="privacy-policy" className={styles.anchor} href="/serviceContent?pageId=pg40027900018">Privacy Policy</a>.
                </li>
            </ul>
        </div>);

        // More MoreWaysToShop
        const MoreWaysToShop = (<List
            datasource={config.MoreWaysToShop} listDataId="rewards" childRenderer={anchorRenderer}
            itemStyleClass={styles.footerListItem} direction="Vertical"
            automationId="footer-moreways"
        />);

        // jcpRewards
        const jcpRewards = (<List
            datasource={config.JCPenneyRewardsAndCredits} listDataId="rewards" childRenderer={anchorRenderer}
            itemStyleClass={styles.footerListItem} direction="Vertical"
            automationId="footer-jcp-rewards"
        />);

        // jcpPrivacy
        const jcpLegal = (<List
            datasource={config.TermsLegal} listDataId="rewards" childRenderer={anchorRenderer}
            itemStyleClass={styles.footerJCPTermsListItem} direction="Vertical" spacing="None"
            automationId="footer-jcp-privacy"
        />);

         // jcpPrivacy
        const jcpPrivacy = (<List
            datasource={config.Privacy} listDataId="rewards" childRenderer={anchorRenderer}
            itemStyleClass={styles.footerJCPPrivacyListItem} direction="Vertical" spacing="None"
            automationId="footer-jcp-privacy-two"
        />);

        // SocialShare
        const socialShare = (<div className={styles.socialWrap}>
            <SocialShare automationId="footer-social-share" iconClass="class1 class2" socialShareIcons={['FACEBOOK', 'TWITTER', 'PINTEREST', 'GOOGLEPLUS', 'YOUTUBE', 'BLOG']} />
        </div>);

        // For Mobile
        const mobFooterRenderer = () => {
            if (this.props.subscriptionStatus.subscribed === true) {
                this.footerAccordion.onAccordionSectionSelect();
                this.emailInput.value = null;
                this.phoneInput.value = null;
                this.props.subscriptionStatus.subscribed = false;
            }
            return (<div className={cx('footerMobileBlock', 'containerWidth')}>
                {socialShare}
                <Accordion isAutoCollapsible={isAutoCollapsible} themeConfig={footerTheme} automationId="footer-accordian-tab" ref={this.accordionRefCallback}>
                    <AccordionSection title="Send Me the Latest Deals" index={0} automationId="accordian-sec-0">
                        {subscribeBlock}
                    </AccordionSection>

                    <AccordionSection title="More Ways To Shop" index={1} automationId="accordian-sec-1">
                        {MoreWaysToShop}
                    </AccordionSection>

                    <AccordionSection title="JCPenney Rewards & Credit" index={2} automationId="accordian-sec-2">
                        {jcpRewards}
                    </AccordionSection>
                </Accordion>

                <div className={styles.copyWrap}>
                    <div className={styles.privacyLegalLinks} data-automation-id="footer-privacy">
                        {jcpLegal}
                        {jcpPrivacy}
                    </div>
                    <ul>
                        <li data-automation-id="footer-copy" className={styles.inline}>&copy; JCP Media, Inc. {this.state.currYear}</li>
                        <li data-automation-id="footer-copy-two" className={styles.inline}> . All rights Reserved</li>
                    </ul>
                </div>
            </div>);
        };

        const tabFooterRenderer = () => (<div className={cx('containerWidth')}>
            <div className={styles.subscribeBlock}>
                <h5 data-automation-id="deals-heading" className={styles.dealsTitle}> Send Me the Latest Deals </h5>
                {subscribeBlock}
            </div>
            <div className={styles.socialShareBlock}>
                {socialShare}
            </div>
            <article className={styles.footerLinksBlock}>
                <section className={styles.footerMainLinks}>
                    <div className={styles.footerLinks}>
                        <h5 data-automation-id="footer-more-title"> More Ways To Shop </h5>
                        {MoreWaysToShop}
                    </div>
                    <div className={styles.footerLinks}>
                        <h5 data-automation-id="footer-more-rewards"> JCPenney Rewards & Credit </h5>
                        {jcpRewards}
                    </div>
                    <div className={styles.footerLinks}>
                        <h5 data-automation-id="footer-more-privacy"> Terms,Privacy & Legal. </h5>
                        {jcpLegal}
                        {jcpPrivacy}
                    </div>
                </section>
            </article>
            <div className={styles.copyWrap}>
                <ul>
                    <li data-automation-id="footer-copy-media" className={styles.inline}>&copy; JCP Media, Inc. {this.state.currYear}</li>
                    <li data-automation-id="footer-copy-media-two" className={styles.inline}> . All rights Reserved</li>
                </ul>
            </div>
        </div>);

        const footerRenderer = isTablet ? tabFooterRenderer : mobFooterRenderer;
        return (
            <div>
                <footer className={styles.footerWrap} data-automation-id="jcp-footer">
                    <GetTheApp />
                    <div className={styles.helpWrap}>
                        <HelpSection automationId="footer-help" />
                    </div>
                    <div className={styles.footerListBlock}>{footerRenderer()}</div>
                </footer>
                <ModalBox
                    showModal={this.state.isModalOpen}
                    onClose={() => this.closeModal()}
                    defaultHeader
                    modalTheme={styles.customModalWrapper}
                    automationId="footer-popup"
                >
                    <div className={styles.customModalContent}> { /* eslint-disable */ }
                        <h3 data-automation-id="footer-terms-title" className={styles.modalTitle}>Terms &amp; Conditions</h3>
                        <hr className={styles.single} />
                        <div data-automation-id="footer-terms-body">
                            <p className={styles.modalPara}> <strong>By signing up, I agree to receive autodialed
                          promotional text alerts from JCPenney at the mobile number I provided, including coupons,
                          advertisements, events, polls, giveaways,and contests, downloads, photos and information
                          alerts from JCPenney.
                          I understand that I am not required to provide my consent as a condition of purchasing any
                          goods or services.</strong>
                            </p>
                            <p className={styles.modalPara}>Message and data rates may apply from my mobile provider.
                          I understand I will receive a confirmation text message that I must reply to with the
                          requested keyword to complete registration.
                            </p>
                            <p className={styles.modalPara}>By entering and submitting enrollment information above,
                          I agree to receive autodialed promotional text alerts from JCPenney including up to 8
                          autodialed SMS messages per month.
                          Prices mentioned in the promotional text alerts may vary in Alaska and Puerto Rico.
                          I also affirm that I am authorized to agree to receive autodialed promotional text alerts on
                          this phone number and that I am responsible for any mobile message or data rates incurred.
                          To opt out, reply <strong>STOP</strong>                                to any message or text <strong>STOP</strong>
                                to 527365 (JCP365). Please note that texting <strong>STOP</strong>                                to 527365 will always
                                result in an opt-out confirmation text to be sent to your phone.
                                You will not receive any messages from JCPenney promotional text alerts thereafter,
                                unless you explicitly text <strong>STOP</strong>                                , <strong>HELP</strong>                                ,
                                <strong>JOIN</strong>                                or other advertised keywords connected to the program or fill out an
                                opt-in form online. For help, reply HELP to any message or text HELP to 527365 (JCP365) or
                                call <a href="tel://1.800.322.1189">1.800.322.1189</a>                                or
                                email <a href="mailto:mobile@jcpenney.com" >mobile@jcpenney.com</a>                                .
                                View privacy policy.
                            </p>
                            <p className={styles.modalPara}>List of supported carriers as of March 2015. Carriers
                          subject to change. AT&amp;T, Verizon-Alltel, T-Mobile®, Sprint, U.S. Cellular, Boost,
                          MetroPCS, Virgin Mobile, Cricket, nTelos, Cellcom, C Spire Wireless (Cellsouth),
                          Cincinnati Bell, Carolina West Wireless, Appalachian Wireless, Chariton Valley Cellular,
                          Coral Wireless, Cross (dba Sprocket), DTC Wireless, Duet IP, EpicTouch, Leaco, Mosaic,
                          Nemont/Sagebrush, Peoples Wireless, Pine Cellular, Pioneer, Revol Wireless, STRATA Networks,
                          NNTC Wireless, Snake River PCS, Breakaway Wireless, All West Communications, Syringa
                          Wireless, South Central Communications, CTC Wireless, Silver Star, United Wireless,
                          Aio Wireless, ACS Wireless, Bluegrass Cellular, Cablevision, Cellone Nation,
                          Cellular One of East Central Illinois, Chat Mobility, Copper Valley, Flat Wireless LLC,
                          GCI Communications, Golden Star Cellular, Illinois Valley Cellular, Immix/Keystone Wireless,
                          Inland Cellular, iWireless, Northwest Missouri Cellular, Panhandle Telecommunications,
                          Plateau Wireless, SouthernLINC Wireless - SouthernLINC Communications,
                          SRT Wireless - SRT Communications, Thumb Cellular, Union Cellular, Viaero Wireless,
                          West Central Wireless (WCC).The carriers are not liable for delayed or undelivered messages.
                          Silver_Test!!!</p>
                        </div> {/* eslint-enable */}
                    </div>
                </ModalBox>
                {/*  Offer message Popup */}
                <ModalBox
                    showModal={this.state.isModalOpenOfferMessage}
                    onClose={() => this.closeModalOfferMessage()}
                    defaultHeader
                    modalTheme={styles.customModalWrapper}
                    automationId="footer-offer-message-popup">
                    <div
                        className={cx(styles.customModalContent,
                        styles.customModalOfferMessage)}
                    >
                        <h3 data-automation-id="footer-message-title" className={styles.modalTitle}>{offerMessageTitle}</h3>
                        <div data-automation-id="footer-message-body">
                            <p className={styles.modalPara}>{offerMessageDescription}</p>
                        </div>
                        <button id="closeModalButton" className={styles.offerMessageButton} onClick={this.closeModalOfferMessage}>Done</button>
                    </div>
                </ModalBox>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    orders: store.stores[0],
    subscriptionStatus: store.subscriptionStatus,
    deviceType: store.context ? store.context.deviceType : {},
    offerMessageData: store.context && store.context.preferences ? store.context.preferences.footer : config,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(analyticsActions, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
