import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

// Required Core Components
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';

// Required Site Components
import SiteComponent from '../../../SiteComponent/SiteComponent';
import MarketingOptInSection from '../../../MarketingOptInSection/MarketingOptInSection';
import * as actions from '../../../../actions/OrderAction';
import * as analyticsActions from '../../../../actions/AnalyticsAction';
// Css
import styles from './Subscription.css';

const cx = classNames.bind(styles);

export class Subscription extends SiteComponent {

    static defaultProps = {
        deviceType: {},
        expandedFooter: false,
        offerMessageData: {},
    };

    static propTypes = {
        deviceType: PropTypes.objectOf(PropTypes.object),
        expandedFooter: PropTypes.bool,
        offerMessageData: PropTypes.objectOf(PropTypes.object),
    };

    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            isModalOpenOfferMessage: false,
            shouldInitiateRender: false, // Do not render on server side
            showInputError: false,
            setInputTypePhone: false,
            setInputTypeEmail: false,
            formatPhoneVal: '',
            inputErrorText: '',
        };
        this.subscribeWithPhoneOrEmail = this.subscribeWithPhoneOrEmail.bind(this);
        this.onChangeInputType = this.onChangeInputType.bind(this);
        this.openModalOfferMessage = this.openModalOfferMessage.bind(this);
        this.closeModalOfferMessage = this.closeModalOfferMessage.bind(this);
    }

    unmount = null;
    /* istanbul ignore next */
    componentDidMount() {
        /* istanbul ignore next */
        this.unmount = browserHistory.listen(() => {
            this.setState({
                showInputError: false,
                inputErrorText: '',
            });
        });
    }

    componentWillUnmount() {
        this.unmount();
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
    onChangeInputType = (event) => {
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        const inputStr = event;
        const formattedPhone = inputStr.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        if (formattedPhone.match(phonePattern)) {
            this.setState({ setInputTypePhone: true });
            this.setState({ formatPhoneVal: formattedPhone });
        } else {
            this.setState({ setInputTypePhone: false });
            this.setState({ formatPhoneVal: '' });
        }
        if (inputStr.match(emailPattern)) {
            this.setState({ setInputTypeEmail: true });
        } else {
            this.setState({ setInputTypeEmail: false });
        }
    }

    subscribeWithPhoneOrEmail() {
        const pattern = /^(\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$)|\d{3}-\d{3}-\d{4}$/;
        const inputStr = this.phoneInput.value;
        const formattedPhoneNum = inputStr.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        const data = {
            type: this.state.setInputTypeEmail ? 'EMAIL' : 'MOBILE',
            value: this.phoneInput.value,
        };
        if (this.phoneInput.value.length === 0) {
            this.setState({
                showInputError: true,
                inputErrorText: 'Enter phone number or Email',
            });
            this.props.actions.triggerFormError([{
                errorDescription: 'enter phone number or email',
            }]);
        } else if (!pattern.test(formattedPhoneNum) || !pattern.test(this.phoneInput.value)) {
            this.setState({
                showInputError: true,
                inputErrorText: 'Please enter a valid phone number or Email',
            });
            this.props.actions.triggerFormError([{
                errorDescription: 'please enter a valid phone number or email',
            }]);
        } else {
            this.setState({
                showInputError: false,
                inputErrorText: '',
            });
            /* istanbul ignore next */
            this.props.actions.optin(data);
            this.openModalOfferMessage();
        }
    }

    clearInputVal = () => {
        this.setState({ setInputTypeEmail: false });
        this.setState({ setInputTypePhone: false });
        this.setState({ formatPhoneVal: '' });
    }

    subscribeBlock = () => {
        let inputPlaceholder;
        let inputType = 'text';
        if (this.props.deviceType.isMobile) {
            inputPlaceholder = 'Phone # or Email...';
        } else {
            inputPlaceholder = 'Phone Number or Email...';
        }
        if (this.state.setInputTypeEmail) {
            inputType = 'email';
        }
        if (this.state.setInputTypePhone) {
            inputType = 'tel';
        }
        return (this.props.expandedFooter ?
            <div className={styles.subscriptionWrapper}>
                <div className={styles.subscriptionWrap}>
                    <ul data-automation-id="footer-block-subscribe" className={styles.containerWidth}>
                        {/* <li className={styles.subscriptionRow}>
                            <div data-automation-id="signup-title" className={styles.subsTitle}>Sign up for text alerts, offers and promotions
                            </div>
                            <MarketingOptInSection automationId="signup-input" optDataId="deals-email-txt-box" btnDataId="deals-email-btn" type="email" placeholder="Email address" buttonType="dark" submitCallback={this.subscribeWithEmail} customInputClass={styles.subscribe} refCallback={(ref) => { this.emailInput = ref; }} >
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
                        </li> */}
                        <li className={styles.subscriptionRow}>
                            <div data-automation-id="promo-title" className={styles.subsTitle}>Signup for text* or email alerts, offers and promotions</div>
                            <MarketingOptInSection
                                data-automation-id="promo-input"
                                optDataId="deals-tel-txt-box"
                                btnDataId="deals-tel-btn"
                                type={'text'}
                                placeholder={inputPlaceholder}
                                customInputClass={styles.subscribe}
                                buttonClass={styles.signInButton}
                                buttonType="dark"
                                submitCallback={this.subscribeWithPhoneOrEmail}
                                handleClearInputVal={this.clearInputVal}
                                onChangeCallback={this.onChangeInputType}
                                refCallback={(ref) => { this.phoneInput = ref; }}
                                deviceType={this.props.deviceType}
                                showInputPhoneIcon={inputType === 'tel'}
                                showInputEmailIcon={inputType === 'email'}
                                buttonWrap={styles.buttonWrap}
                                formattedPhoneNum={this.state.formatPhoneVal}
                            >
                            Sign Up
                        </MarketingOptInSection>
                            {(this.state.showInputError) ? (
                                <div className={styles.errorBlock}>
                                    <span className={styles.iconBlock}>
                                        <Icon iconType="svg" classNames="icon" viewBox="0 0 24 24" width="24px" height="24px" automationId="footer-error-icon" name="error" pathClassName={styles.errorIconColor}/>
                                    </span>
                                    <span className={styles.errorTextBlock}>{this.state.inputErrorText}</span>
                                </div>)
                            : null }
                        </li>
                        <li className={styles.subscriptionTerms}>
                            <b>*Text Alerts: </b> Message and data rates may apply. By providing my mobile number, I agree to receive autodialed promotional text alerts from JCPenney to that number. I understand that consent is not required to purchase goods or services. Up to 8 msgs/month from 527365 (JCPenney). Text HELP to 527365 for help and STOP to 527365 to cancel. <button data-automation-id="terms-cond" id="termsAndConditionsLink" className={styles.anchor} onClick={() => this.openModal()}>Terms &amp; Conditions</button>.
                            <a data-automation-id="privacy-policy" className={styles.anchor} href="/jsp/customerservice/serviceContent.jsp?pageId=pg4003700012&isFooter=true&title=privacy%20policy">Privacy Policy</a>.
                        </li>
                    </ul>
                </div>
            </div> : ''
        );
    };

    render () {
        const { offerMessageData } = this.props;
        // Offer Message data
        const offerMessageTitle = (
            offerMessageData.OfferMessage && offerMessageData.OfferMessage.title) ?
            offerMessageData.OfferMessage.title : null;

        const offerMessageDescription = (
            offerMessageData.OfferMessage && offerMessageData.OfferMessage.Description) ?
            offerMessageData.OfferMessage.Description : null;

        return (
            <div>
                {this.subscribeBlock()}

                {/*  Terms and Conditions Popup */}
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
                          To opt out, reply <strong>STOP </strong> to any message or text <strong>STOP </strong>
                            to 527365 (JCP365). Please note that texting <strong>STOP </strong> to 527365 will always
                            result in an opt-out confirmation text to be sent to your phone.
                            You will not receive any messages from JCPenney promotional text alerts thereafter,
                            unless you explicitly text<strong> STOP</strong>,<strong> HELP</strong>,<strong> JOIN </strong>
                            or other advertised keywords connected to the program or fill out an
                            opt-in form online. For help, reply <strong> HELP</strong> to any message or text <strong> HELP</strong> to 527365 (JCP365) or call 
                            <a href="tel://1.800.322.1189"> 1.800.322.1189 </a> 
                            or email <a href="mailto:mobile@jcpenney.com" > mobile@jcpenney.com </a> View 
                            <a href="/jsp/customerservice/serviceContent.jsp?pageId=pg4003700012&isFooter=true&title=privacy%20policy"> privacy policy. </a>
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
                          West Central Wireless (WCC). </p>
                          <p className={styles.modalPara}>The carriers are not liable for delayed or undelivered messages.</p>
                        </div>
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
    deviceType: store.context ? store.context.deviceType : { isTablet: true },
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(analyticsActions, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
