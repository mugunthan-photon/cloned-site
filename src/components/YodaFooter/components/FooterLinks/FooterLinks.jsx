import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

// Required Core components
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import List from 'yoda-core-components/lib/components/List/List';
import SocialShare from 'yoda-core-components/lib/components/SocialShare/SocialShare';
import { Accordion, AccordionSection } from 'yoda-core-components/lib/components/Accordion';

// Required Site Components
import SiteComponent from '../../../SiteComponent/SiteComponent';
import jcpMasterCardImage from './images/jcpMasterCardImage';
import adChoiceImage from './images/adChoiceImage';

// Configs
import footerTheme from '../../FooterAccordionTheme';

// Css
import styles from './FooterLinks.css';

// CX Class
const cx = classNames.bind(styles);

export class FooterLinks extends SiteComponent {
    constructor() {
        super();
        this.state = {
            currentYear: (new Date()).getFullYear(),
        };
    }
    static defaultProps = {
        deviceType: {},
        expandedFooter: false,
        condensedFooter: false,
        footerMenus: {},
    }

    static propTypes = {
        deviceType: PropTypes.objectOf(PropTypes.object),
        expandedFooter: PropTypes.bool,
        condensedFooter: PropTypes.bool,
        footerMenus: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    }

    render() {
        const { deviceType, expandedFooter, condensedFooter } = this.props;
        const isDesktop = deviceType.isDesktop ? deviceType.isDesktop : false; // Mobile by default
        const isAutoCollapsible = true;

        // footer links list
        const anchorRenderer = (dataItem) => {
            const str = dataItem.linkPath;
            let linkData;
            if (str.startsWith('/')) {
                linkData = (<a
                    href={deviceType.isDesktop ? dataItem.linkPath : dataItem.linkPathMobile} className={styles['anchor-nostyle']} aria-label={dataItem.text} data-automation-id="footer-link">
                    <span className={styles.helpDescription} key={dataItem.id}>{dataItem.text}</span>
                </a>);
            } else {
                linkData = (<a
                    href={deviceType.isDesktop ? dataItem.linkPath : dataItem.linkPathMobile} className={styles['anchor-nostyle']} aria-label={dataItem.text} data-automation-id="footer-link"
                    target="_blank" rel="noopener noreferrer">
                    <span className={styles.helpDescription} key={dataItem.id}>{dataItem.text}</span>
                </a>);
            }

            if (dataItem.text && dataItem.text === 'AdChoices') {
                linkData = (<a
                    href={deviceType.isDesktop ? dataItem.linkPath : dataItem.linkPathMobile} className={styles['anchor-nostyle']} aria-label={dataItem.text} data-automation-id="footer-link"
                    target="_blank" rel="noopener noreferrer">
                    <span className={styles.helpDescription} key={dataItem.id}>{dataItem.text}</span>
                    <img
                        className={cx('adChoiceImg')}
                        src={adChoiceImage}
                        alt=""
                    />
                </a>);
            }
            return linkData;
        };

        // connect with us links list
        const anchorWithIconRenderer = dataItem => (
            <a
                href={deviceType.isDesktop ? dataItem.linkPath : dataItem.linkPathMobile} className={cx('anchor-nostyle', 'socialIcon')} aria-label={dataItem.text}
                data-automation-id="footer-link" target="_blank" rel="noopener noreferrer">
                <Icon
                    iconType="svg" classNames="icon" viewBox="0 0 23 23" width="22px" height="22px"
                    automationId="footer-get-icon"
                    name={dataItem.iconName}
                    pathClassName={styles.errorIconColor}/>
                <span className={cx('helpDescription', 'socialIconText')} key={dataItem.id}>{dataItem.text}</span>
            </a>
        );
        // ConnectWithUs
        const JCPenneyCredits = (<List
            datasource={this.props.footerMenus.JCPenneyCredits} listDataId="rewards" childRenderer={anchorRenderer}
            itemStyleClass={styles.footerJCPPrivacyListItem} direction="Vertical" spacing="None"
            automationId="footer-jcp-credits"
        />);

        // jcpLegal
        const jcpLegal = (<List
            datasource={this.props.footerMenus.TermsLegal} listDataId="rewards" childRenderer={anchorRenderer}
            listBodyClass={styles.footerJCPTermsBlock} listStyleClass={styles.footerJCPTermsList}
            itemStyleClass={styles.footerJCPTermsListItem} direction="Vertical" spacing="None"
            automationId="footer-jcp-privacy"
        />);

            // jcpPrivacy
        const jcpPrivacy = (<List
            datasource={this.props.footerMenus.Privacy} listDataId="rewards" childRenderer={anchorRenderer}
            listBodyClass={styles.footerJCPTermsBlock} listStyleClass={styles.footerJCPTermsList}
            itemStyleClass={styles.footerJCPTermsListItem} direction="Vertical" spacing="None"
            automationId="footer-jcp-privacy-two"
        />);

        // SocialShare
        const socialShare = (<div className={styles.socialWrap}>
            <SocialShare automationId="footer-social-share" iconClass="class1 class2" socialShareIcons={['FACEBOOK', 'TWITTER', 'PINTEREST', 'GOOGLEPLUS', 'YOUTUBE', 'BLOG']} />
        </div>);

        // jcpFooterNote
        // const jcpFooterNote = (
        //     <div className={cx('footerNote')}>
        //         <h2>{'JCPenney is Your One-Stop Shop for Easter Clothes, Shoes & Accessories'}</h2>
        //         <p>{"At JCPenney, we're dedicated to bringing you the very best in stylish and affordable goods. Your entire family will look their best with our selection of Easter clothing! Shop Easter dresses for women and girls in stunning colors, beautiful designs, and flattering silhouettes. We have handsome dress clothes for men and boys, including two-piece suits and dress shirts in spring inspired colors. Get darling Easter outfits for babies and toddlers that are just picture perfect! Match your outfits with new Easter shoes from our shoe department, and finish the look with the right accessories! At JCPenney, you’ll find everything you need for a stylish Easter. Your journey towards better value starts and ends with us, online or in your closest JCPenney store!"}</p>
        //     </div>
        // );
        const CreditAndFooterNote = () => (expandedFooter ?
            <div>
                <div className={cx('jcpCreditWrap')}>
                    <img
                        className={cx('imageClass')}
                        src={jcpMasterCardImage}
                        alt=""
                    />
                    <h2>{'JCPenney Credit'}</h2>
                    {JCPenneyCredits}
                </div>
                {/* {jcpFooterNote} */}
            </div> : ''
        );
        const accordianSection = () => {
            let footerLinkArr = [];
            if (this.props.footerMenus.FooterLinks) {
                const footerLinkData = this.props.footerMenus.FooterLinks.slice(0, 5);
                footerLinkArr = footerLinkData.map((value) => {
                    const footerLinkList = (
                        <List
                            datasource={value.data} key={`footer-list-${value.key}`} listDataId="rewards" childRenderer={anchorRenderer}
                            itemStyleClass={styles.footerJCPPrivacyListItem} direction="Vertical" spacing="None"
                            automationId={`footer-${value.text}`}
                            />
                        );
                    return (
                        <AccordionSection
                            key={`footer-list-${value.key}`}
                            title={value.text} index={value.key}
                            automationId={`accordian-sec-${value.text}`}>
                            {footerLinkList}
                        </AccordionSection>
                    );
                });
            }
            return footerLinkArr;
        };

        const articalSection = () => {
            let footerLinkArr = [];
            if (this.props.footerMenus.FooterLinks) {
                footerLinkArr = (this.props.footerMenus.FooterLinks).map((value, index) => {
                    let footerLinkList;
                    if (value.data[index] && value.data[index].iconName) {
                        footerLinkList = (<List
                            datasource={value.data} key={`footer-list-${value.key}`} listDataId="rewards" childRenderer={anchorWithIconRenderer}
                            itemStyleClass={styles.footerJCPPrivacyListItem} direction="Vertical" spacing="None"
                            automationId={`footer-${value.text}`}
                        />
                        );
                    } else {
                        footerLinkList = (<List
                            key={`footerLink-list-${value.key}`}
                            datasource={value.data} listDataId="rewards" childRenderer={anchorRenderer}
                            itemStyleClass={styles.footerJCPPrivacyListItem} direction="Vertical" spacing="None"
                            automationId={`footer-${value.text}`}
                        />
                        );
                    }
                    return (
                        <div className={styles.footerLinks}>
                            <h5 data-automation-id={`article-sec-${value.text}`}> {value.text} </h5>
                            {footerLinkList}
                        </div>
                    );
                });
            }
            return footerLinkArr;
        };

        const deviceFooterlinks = () => (expandedFooter || condensedFooter ?
            <div>
                <Accordion isAutoCollapsible={isAutoCollapsible} themeConfig={footerTheme} automationId="footer-accordian-mobile-footer">
                    {accordianSection()}
                </Accordion>
                {socialShare}
            </div> : ''
        );

        const desktopFooterLinks = () => (expandedFooter || condensedFooter ?
            <article className={styles.footerLinksBlock}>
                <section className={styles.footerMainLinks}>
                    {articalSection()}
                </section>
            </article> : ''
        );

        // For Mobile and Tablet
        const deviceFooterRenderer = () => (
            // if (this.props.subscriptionStatus.subscribed === true) {
            //     //  this.footerAccordion.onAccordionSectionSelect();
            //     this.emailInput.value = null;
            //     this.phoneInput.value = null;
            //     this.props.subscriptionStatus.subscribed = false;
            // }

            <div className={cx('footerMobileBlock', 'containerWidth')}>
                {deviceFooterlinks()}
                { CreditAndFooterNote() }
                <div className={styles.copyRightWrap}>
                    <div className={styles.privacyLegalLinks} data-automation-id="footer-privacy">
                        <div className={styles.footerJCPTermsWrap}>
                            {jcpLegal}
                        </div>
                        <div className={styles.footerJCPTermsWrap}>
                            {jcpPrivacy}
                        </div>
                    </div>
                    <ul>
                        <li data-automation-id="footer-copy" className={styles.inline}>&copy; JCP Media, Inc. {this.state.currentYear}</li>
                        <li data-automation-id="footer-copy-two" className={styles.inline}> . All Rights Reserved</li>
                    </ul>
                </div>
            </div>
        );

        const desktopFooterRenderer = () => (
            <div className={cx('containerWidth')}>
                {desktopFooterLinks()}
                {CreditAndFooterNote()}
                <div className={styles.copyRightWrap}>
                    <div className={styles.privacyLegalLinks} data-automation-id="footer-privacy">
                        <div className={styles.footerJCPTermsWrap}>
                            {jcpLegal}
                        </div>
                        <div className={styles.footerJCPTermsWrap}>
                            {jcpPrivacy}
                        </div>
                        <div className={styles.copyRightText}>
                            <div data-automation-id="footer-copy" className={styles.inline}>&copy; JCP Media, Inc. {this.state.currentYear}</div>
                            <div data-automation-id="footer-copy-two" className={styles.inline}> . All Rights Reserved</div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const footerRenderer = isDesktop ? desktopFooterRenderer : deviceFooterRenderer;
        return (
            <div>
                <div className={styles.footerListBlock}>{footerRenderer()}</div>
            </div>
        );
    }
}

export default FooterLinks;
