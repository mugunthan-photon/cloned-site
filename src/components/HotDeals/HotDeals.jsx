import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _find from 'lodash/find';
import RegionalPriceHelper from 'yoda-interfaces/lib/helpers/RegionalPriceHelper';
import * as styles from './HotDeals.css';
import ProductCartridge from '../../components/ProductCartridge/ProductCartridge';
import SiteComponent from '../SiteComponent/SiteComponent';
import CartridgeList from '../CartridgeList/CartridgeList';
import ProductCard from '../ProductCard/ProductCard';
import config from '../ProductCard/ProductCard.config';
import TimerWrapper from '../TimerWrapper/TimerWrapper';

const cx = classNames.bind(styles);
export class HotDeals extends SiteComponent {

    static defaultProps = {
        regionZone: '0',
        featureFlags: {},
    };

    static propTypes = {
        // regionZone value
        regionZone: PropTypes.string,
        featureFlags: {},
    }

    decorateToCartridgeList = (item) => {
        /* istanbul ignore else */
        if (item) {
            const { url,
                originalMax,
                originalMin,
                currentMin,
                currentMax,
                reviewCount,
                averageRating,
                ppId,
                imageId,
                marketingLabel,
                currentPriceLabel,
                mapPrice: manufacturerAdvertised,
        } = item;
            item.reviews = Number.parseInt(reviewCount, 10);
            item.rating = averageRating;
            item.id = ppId;
            item.imageURL = `//s7d1.scene7.com/is/image/JCPenney/${
                imageId}?wid=450&amp;hei=450&amp;op_sharpen=1`;
            item.linkURL = url;
            if (!(this.props.featureFlags.enableRegionPricing && __SERVER__)) {
                item.priceDetails = {
                    amounts: [{
                        min: parseFloat(originalMin),
                        max: parseFloat(originalMax),
                        type: 'original',
                        minPercentOff: 0,
                        maxPercentOff: 0,
                    },
                    {
                        min: parseFloat(currentMin),
                        max: parseFloat(currentMax),
                        type: currentPriceLabel || 'original',
                        minPercentOff: 0,
                        maxPercentOff: 0,
                    }],
                    marketingLabel,
                    manufacturerAdvertised,
                };
            }
        }
        return item;
    };

    // Query param separator
    getQueryParamSeparator = url => (url && url.indexOf('?') === -1 ? '?' : '&')

    // Binding items to product card
    defaultcardListRenderer = (item, listContext) => {
        const dataItem = this.decorateToCartridgeList(item);
        const { linkURL, analyticsTag } = dataItem;
        const linkUrlWithSlotId = linkURL ?
            linkURL.concat(`${this.getQueryParamSeparator(linkURL)}${analyticsTag}`) : linkURL;
        return (
            <a
                href={linkUrlWithSlotId}
                className={cx('linkColor', 'productPanelLinkBlock')}
                data-automation-id="reczone-hotdeals-link"
                ref={(cartridgePane) => { listContext.cartridgePane = cartridgePane; }} >
                <ProductCard
                    customClass={styles.productCard}
                    imageUrl={dataItem.imageURL}
                    title={dataItem.name}
                    price={dataItem.priceDetails}
                    key={dataItem.id}
                    cardType={config.cardTypes.GRID}
                    rating={Number(dataItem.rating)}
                    reviewCount={dataItem.reviews}
                    cardTheme={'cartridge'}
                    skuId={dataItem.skuId}
                    skuSwatch={dataItem.skuSwatch}
                    automationId="hotdeals-cartridge-product-list"
                />
            </a>
        );
    }

    getProductHotDealsCatridge = (recordsInfoList) => {
        const { deviceType } = this.props;
        /* istanbul ignore else */
        if (recordsInfoList && recordsInfoList.length > 0) {
            RegionalPriceHelper.populateRegionalPricesInContentData(recordsInfoList, this.props.regionZone);
            return (<CartridgeList
                cartridgeList={recordsInfoList}
                deviceType={deviceType}
                automationId="product-hotdeals-cartridge-list"
                slotId={Date.now()}
                cartridgeListRenderer={this.defaultcardListRenderer} />);
        }
        /* istanbul ignore next */
        return null;
    };

    getChannel = (deviceType) => {
        let channel = '';
        if (deviceType.isMobile) {
            channel = 'MW';
        } else if (deviceType.isTablet) {
            channel = 'TW';
        } else {
            channel = 'DT';
        }
        return channel;
    };

    // TODO: Enable below method when certona ready for production.
    // loading certona info using product cartridge component
    loadCertonaSchema = hotDealsSchema => (<section className={cx('rowBlock', 'bgWhite', 'cartridgeSlot')}>
        <div className={cx('cartridgeContainer')}>
            <ProductCartridge
                pageType={this.props.pageType}
                automationId="test-automation-product-cartridge-B"
                slotId={hotDealsSchema}
                loader="certona"
                attributes={this.props.attributes}
            />
        </div>
    </section>);

    loadHotDealsBanner = (hotdeals, UrgencyMessageEnabled) => {
        const { seoUrl,
            shopAllTitle,
            marketingTagLineColor,
            backGroundColor,
            imagePath,
            analyticsTag,
            timerEnabled,
            marketingHeadLine } = hotdeals;

        let { marketingTagLine } = hotdeals;
        if (marketingTagLine && marketingTagLine.length > 18) {
            marketingTagLine = marketingTagLine.substring(0, 18);
        }
        const { deviceType } = this.props;
        const marketingTagLineBGColor = {};
        if (!deviceType.isDesktop) {
            marketingTagLineBGColor.background = backGroundColor; // hot deals banner backgound color
        }

        // Seo tagging
        const seoTaggingUrl = this.generageSEOTagginURL(seoUrl, analyticsTag);

        // display Marketing style
        const displayMarketingButton = shopAllTitle ?
            { visibility: 'visible', background: marketingTagLineColor } :
            { visibility: 'hidden', background: marketingTagLineColor };

        // Marketing tag line color
        const marketingTagLineStyle = { color: marketingTagLineColor };

        return (
            <div className={cx('hotDeals')} style={marketingTagLineBGColor}>
                {/* banner background color coming from service response */}
                <div className={cx('hotDealsInfo')}>
                    <div className={cx('hotDealsTextInfo')}>
                        <div className={cx('hotDealsMainText')} />
                        {/* Banner content -- from API response */}
                        <div className={cx('hotDealsImage', 'forLargerScreens')}>
                            <img className={cx('hotDealsImg')} src={`/dotcom/images/${imagePath}`} alt="Hot Deals" />
                        </div>
                        {/* Only For Mobile */}
                        <div className={cx('hotDealsSubText', 'forSmallerScreens')} style={marketingTagLineStyle}>
                            {marketingTagLine}
                        </div>
                        {/* Only for Mobile Ends */}

                        {/* Only for Larger Screens */}
                        <div className={cx('hotDealsSubText', 'forLargerScreens')} style={marketingTagLineStyle}>
                            {marketingHeadLine}
                        </div>

                        <div>
                            {
                                timerEnabled
                                && UrgencyMessageEnabled
                                && this.displayTimerControl(hotdeals)
                            }
                        </div>
                        {/* Only for Larger Screen Ends */}
                    </div>
                    <div className={cx('hotDealsCta')}>
                        {/* button background color and content coming from server */}
                        <a
                            className={cx('hotDealsLink')}
                            href={seoTaggingUrl}
                            style={displayMarketingButton}>{shopAllTitle}
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    displayTimerControl = (hotdeals) => {
        const {
            liveText: liveTextLabel,
            timerTextColor: liveTextLabelColor,
            liveTextColor: timerTextColor,
            timer: finishTime,
        } = hotdeals;
        const { timerZone } = this.props;
        const timerProps = {
            liveTextLabel,
            liveTextLabelColor,
            timerTextColor,
            finishTime,
            timerTextConfig: {
                h: 'hrs',
                m: 'min',
                s: 'sec',
            },
            timerZone,
        };
        return (
            <div className={cx('timerBlock')} >
                <TimerWrapper
                    {...timerProps}
                    removeTimerZeros
                />
            </div >);
    }
    /**
     * stripping zero priced product items
     */
    stripZeroPricedProducts = recordsInfoList => (
        recordsInfoList && recordsInfoList.filter((item) => {
            const isPriceHasZero = ((!item.originalMax || item.originalMax === '0')
                && (!item.originalMin || item.originalMin === '0')
                && (!item.currentMin || item.currentMin === '0')
                && (!item.currentMax || item.currentMax === '0'));
            return !isPriceHasZero;
        })
    );

    generageSEOTagginURL = (seoUrl, analyticsTag) => {
        const channelAnalyticsTag = analyticsTag && `${analyticsTag}_${this.getChannel(this.props.deviceType)}`;
        return seoUrl && String(seoUrl).toLowerCase().indexOf('cm_re') === -1
            ? `${seoUrl}${this.getQueryParamSeparator(seoUrl)}${channelAnalyticsTag || ''}`
            : seoUrl;
    };

    displaySmallBanner = (hotdeals, UrgencyMessageEnabled) => {
        const {
            marketingTagLine,
            marketingHeadLine,
            seoUrl,
            analyticsTag,
            shopAllTitle,
            timerEnabled,
            marketingTagLineColor,
        } = hotdeals;
        // Seo tagging
        const seoTaggingUrl = this.generageSEOTagginURL(seoUrl, analyticsTag);
        return (<div className={cx('hotDealsTitleBtnTimerBlock')}>
            <div className={cx('hotDealsTitleBtnBlock')}>
                <div className={cx('hotDealsTitleBlock')}>
                    <h3
                        className={cx('hotDealsTitle')}
                        style={{ color: marketingTagLineColor }}>{marketingTagLine}</h3>
                    <div className={cx('hotDealsSubTitleBtn')}>
                        <h4 className={cx('hotDealsSubTitle')}>{marketingHeadLine}</h4>
                        <div className={cx('hotDealsViewAllBlock')}>
                            <a
                                className={cx('hotDealsviewAll')}
                                href={seoTaggingUrl}>{shopAllTitle}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* displaying timer based on feature-flag */}
            {
                timerEnabled
                && UrgencyMessageEnabled
                && this.displayTimerControl(hotdeals)
            }
        </div>);
    }
    render() {
        const { hotDealsCartridgeSlots, slotId, featureFlags } = this.props;
        const { UrgencyMessageEnabled } = featureFlags;
        if (hotDealsCartridgeSlots && Object.keys(hotDealsCartridgeSlots).length > 0) {
            // fetching hotdeal from slot which is supplied from component.
            const hotdeals = _find(hotDealsCartridgeSlots, slots => (slots && slots.type) === slotId);
            /* istanbul ignore else */
            if (hotdeals) {
                const { certonaStrategy, certonaEnabled, recordsInfoList } = hotdeals;
                // if recommendation zone is empty we don't show respective banner
                /* istanbul ignore else */
                let filteredrecordsList;
                if ((recordsInfoList && recordsInfoList.length > 0) || certonaEnabled) {
                    // stripping zero priced product items
                    filteredrecordsList = this.stripZeroPricedProducts(recordsInfoList);
                    return (
                        <section>
                            {/* displaySmallBanner: will render hotdeals banner only for small & medium scales */}
                            {this.displaySmallBanner(hotdeals, UrgencyMessageEnabled)}
                            <div className={cx('hotDealsBlock')}>
                                {
                                    ((filteredrecordsList && filteredrecordsList.length > 0) || certonaEnabled)
                                    && this.loadHotDealsBanner(hotdeals, UrgencyMessageEnabled)
                                }
                                {
                                    // Loading recommentations based on certonaEnabled flag
                                    certonaEnabled ?
                                        this.loadCertonaSchema(certonaStrategy) :
                                        this.getProductHotDealsCatridge(filteredrecordsList)}
                            </div>
                        </section>
                    );
                }
            }
        }
        return null;
    }
}
const mapStateToProps = ({ regionalPricing, context }) => ({
    regionZone: regionalPricing ? (regionalPricing.regionZone || '0') : '0',
    featureFlags: context ? context.featureFlags : {},
    timerZone: context && context.preferences ? context.preferences.timeZone : {},
});

export default connect(mapStateToProps)(HotDeals);
