import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';
import SiteComponent from '../SiteComponent/SiteComponent';
import * as actions from '../../actions/PromotionalBannerAction';
import * as styles from './PromotionalBanner.css';

const cx = classNames.bind(styles);

export class PromotionalBanner extends SiteComponent {
    static propTypes = {
        deviceType: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        actions: PropTypes.objectOf(PropTypes.func),
        offerDetails: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    }
    static defaultProps = {
        deviceType: {},
        OfferData: '',
        actions: {},
        offerDetails: {},
    }

    unlisten = null;

    isOfferDataExpired () {
        const contentDate = new Date(this.props.offerDetails.contentExpiry);
        const currentDate = new Date();
        if (contentDate >= currentDate) {
            return true;
        }
        return false;
    }

    hydrate () {
        if (!this.props.offerDetails.contentExpiry && !__SERVER__) {
            this.props.actions.getOfferDetailsAction();
        }
    }

    triggerSitePromoAction() {
        /* istanbul ignore next */
        if (browserHistory && typeof browserHistory.listen === 'function') {
            this.unlisten = browserHistory.listen(() => {
                // Calling action when url is updated
                this.props.actions.getOfferDetailsAction();
            });
        }
    }

    componentDidMount() {
        // if (!this.props.offerDetails.contentExpiry && !__SERVER__) {
        // console.log('not server');
        //     this.props.actions.getOfferDetailsAction();
        // } else {
        // console.log('triggerSitePromoAction');

        this.triggerSitePromoAction();
        // }
    }

    componentWillUnmount() {
        /* istanbul ignore next */
        if (typeof this.unlisten === 'function') {
            this.unlisten();
        }
    }

    /*  DONT REMOVE FOR GETTING FADEIN and FADEOUT % Based on StayTime
    decideAnimationTimes = (fadeTime, stayTime, elementsCount) => {
        const upTo = 10;
        upTo.forEach((element, i) => {
            const count = i;
            const animationTime = (2 * fadeTime) + stayTime;
            const totalElementPercent = 100 / count;
            const fadePerc = ((fadeTime / animationTime) * totalElementPercent);
            const stayPerc = ((stayTime / animationTime) * totalElementPercent);
            const fadeInAt = fadePerc;
            const stayAt = fadePerc + stayPerc;
            const fadeOutAt = totalElementPercent;
            const animationName = 'fadeInOut';
            const keyFrames = `@keyframes ${animationName}${count} { 0% { opacity: 0; } ${fadeInAt}% { opacity: 1;} ${stayAt}% { opacity: 1;} ${fadeOutAt}% { opacity: 0;} }`;
            if (count !== elementsCount) {
                console.log(keyFrames);
            }
        });
    } */

    /* Animation is written only for 10 elements */
    loadOfferDetails = (devicetype) => {
        const offerData = this.props.offerDetails[devicetype];
        const sitePromoClassName = offerData.length > 1 ? cx('sitePromoAnimation', 'promotionalBannerContent') : cx('promotionalBannerContent');
        return offerData.map((v) => {
            if (v.promoText.length > 0 || v.promoText !== '') {
                return (
                    <div
                        className={sitePromoClassName}>
                        <p className={cx('promotext')}>
                            {v.promoText}
                        </p>
                        <a className={cx('promotionalBannerLink')} href={v.targetUrl}>{v.targetUrl ? 'See Details' : ''}</a>
                    </div>);
            }
            return null;
        });
    };

    loadOfferDataForDevice = () => {
        const { isTablet, isMobile, isDesktop } = this.props.deviceType;
        let offerData;
        if (isMobile) {
            offerData = 'small';
        } else if (isTablet) {
            offerData = 'medium';
        } else if (isDesktop) {
            offerData = 'large';
        } else {
            offerData = 'large';
        }
        return this.loadOfferDetails(offerData);
    };


    render() {
        return (
            <div>
                {this.isOfferDataExpired() ? <div className={cx('promotionalBanner')}>{this.loadOfferDataForDevice()}</div> : ''}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    offerDetails: store.promotionalBannerData,
    deviceType: store.context ? store.context.deviceType : {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromotionalBanner);
