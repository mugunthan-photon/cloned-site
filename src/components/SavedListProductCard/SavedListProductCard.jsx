import classNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import Card from 'yoda-core-components/lib/components/Card/Card';
import Rating from 'yoda-core-components/lib/components/Rating/Rating';
import Button from 'yoda-core-components/lib/components/Button/Button';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import BundleBadge from '../ProductBadges/BundleBadge';
import Pricing from '../Pricing/Pricing';
import PricingHelper from '../Pricing/PricingHelper';
import config from './SavedListProductCard.config';
import * as styles from './SavedListProductCard.css';

const cx = classNames.bind(styles);

class ProductCard extends Component {
    static propTypes = {
        /**
         * Usage
         *
         * detailed -> more robust card with extra information
         * mini -> card with less detailed information
         *
         * @type {[type]}
         */
        cardType: PropTypes.oneOf([
            config.cardTypes.LIST,
            config.cardTypes.GRID,
        ]),
        imageUrl: PropTypes.string,
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        reviewCount: PropTypes.number,
        price: PropTypes.oneOfType([PropTypes.object]),
        rating: PropTypes.number,
        customClass: PropTypes.string,
        badge: PropTypes.oneOfType([PropTypes.object]),
        extendedSize: PropTypes.string,
        skuSwatch: PropTypes.oneOfType([PropTypes.array]),
        ecoRebate: PropTypes.bool,
        footerChildren: PropTypes.node,
        headerChildren: PropTypes.node,
        cardTheme: PropTypes.oneOf([
            config.cardTheme.CARTRIDGE,
            config.cardTheme.YODA,
            config.cardTheme.ONE_RECORD_BANNER,
        ]),
        skuId: PropTypes.string,
        protectionPlan: PropTypes.oneOfType([PropTypes.object]),
        qty: PropTypes.string,
        SKUList: PropTypes.oneOfType([PropTypes.array]),
        reviewRatingLink: PropTypes.string,
    };

    /** @properties {Default set up} [description] */
    static defaultProps = {
        cardType: config.cardTypes.GRID,
        imageUrl: '',
        title: '',
        rating: 0,
        reviewCount: 0,
        price: null,
        customClass: '',
        badge: null,
        extendedSize: '',
        skuSwatch: null,
        ecoRebate: false,
        footerChildren: (<span />),
        headerChildren: (<span />),
        cardTheme: config.cardTheme.YODA,
        skuId: '',
        protectionPlan: null,
        qty: null,
        SKUList: null,
        reviewRatingLink: '',
    };
    state = {
        // imageError: false,
        openRebatesModal: false,
        hideSKUDetails: false,
    }

    toggleSKUDetails() {
        this.setState({ hideSKUDetails: !this.state.hideSKUDetails });
    }
    pdpNavigation(data) {
        const url = data.split('.com');
        window.location.assign(url[1]);
    }
    renderCard() {
        const {
            title,
            rating,
            reviewCount,
            badge,
            cardType,
            extendedSize,
            skuSwatch,
            ecoRebate,
            footerChildren,
            headerChildren,
            cardTheme,
            skuId,
            protectionPlan,
            qty,
            SKUList,
            reviewRatingLink,
        } = this.props;
        let imageUrl = this.props.imageUrl;
        let pdpUrl = '';
        if (this.props.id !== null && this.props.imageUrl === '') {
            imageUrl = '/static-listing/images/img-not-available.jpg';
        }
        const url = reviewRatingLink.split('.com');
        pdpUrl = url[1];
        const badgeDisplay = () => {
            if (badge) {
                if (badge.type === 'bundle') {
                    return <BundleBadge text={badge.text} />;
                }
                return (
                    <div className={cx('badge', badge.theme)}>
                        <span className={cx('badgechild')} />
                        {badge.text}
                    </div>
                );
            }
            return '';
        };

        const extendedSizeDisplay = () => {
            if (extendedSize) {
                return (
                    <div className={cx('extendedSize')} data-automation-id="product-extended-size">
                        {extendedSize}
                    </div>
                );
            }

            return '';
        };

        const displayPricing = () => {
            if (this.props.price) {
                return (
                    <Pricing
                        dynamicFont={cardTheme === config.cardTheme.CARTRIDGE}
                        pricingDetails={PricingHelper(this.props.price)}
                        priceWrapperClass={cx('priceWrapperClass')}
                        priceClass={cx('priceClass')}
                        customMarketingLabel={cx('labelClass')} />
                );
            }
            return '';
        };

        const displayColorSwatch = () => {
            if (skuSwatch) {
                return (
                    <div className={cx('colorSwatchText')}>
                        Available in {skuSwatch.length} color{skuSwatch.length > 1
                        ? 's'
                        : ''}
                    </div>
                );
            }

            return '';
        };

        const displayEcoRebate = () => {
            if (ecoRebate) {
                return (
                    <div className={cx('ecoRebate')} data-automation-id="product-eco-rebate">
                        <Button onClick={this.openRebateModelDialog} className={cx('link')} type="button" automationId="rebates-link" buttonType="Link" size="Sm">
                            <span>
                                Rebate Available
                            </span>
                        </Button>
                        {this.state.openRebatesModal ? this.renderRebatesModal() : null}
                    </div>
                );
            }
            return '';
        };

        this.openRebateModelDialog = (e) => {
            this.setState({
                openRebatesModal: true,
            });
            e.preventDefault();
            e.stopPropagation();
        };

        this.closeRebatesModal = () => {
            this.setState({
                openRebatesModal: false,
            });
        };

        this.renderRebatesModal = () => {
            const rebateWidgetUrl = `https://jcpenney.ecorebates.com/ui/widgets/jcpenney/rebatedetails.html?ecr_skus=${skuId}`;
            const rebatesMarkup = `<style>
            .er-container {position: relative; overflow: auto;}
            .er-container iframe {width: 100%; height: calc(100vh - 200px)}
          </style><div class="er-container"><iframe src=${rebateWidgetUrl}
            align="middle" frameborder="0" width="360" class="er-iframe">
            Content is not supported on this device</iframe></div>`;
            return (
                // eslint-disable-block
                <ModalBox
                    showModal={this.state.openRebatesModal}
                    onClose={this.closeRebatesModal}
                    automationId="ecorebates-modal"
                    modalTheme={cx('rebateModalBlock')}>
                    { /* eslint-disable react/no-danger */}
                    <div className={cx('holder')} dangerouslySetInnerHTML={{ __html: rebatesMarkup }} />
                </ModalBox>
            );
        };

        const displayRatingCount = () => {
            /* istanbul ignore else */
            if (reviewCount > 0) {
                return (<span
                    className={cx('reviewCount')}
                    data-automation-id="product-review-count">({reviewCount.toLocaleString()})</span>);
            }
            return null;
        };
        const displayReviewRating = () => {
            /* istanbul ignore else */
            if (rating > 0) {
                return (<span className={cx('ratingContainer')}>
                    <Rating
                        total={5}
                        rating={rating}
                        svgClassName={cx('rating')}
                        size={config.ratingSize[cardTheme]}
                        space={40}
                        shape={'star'}
                        color={'#a2000f'}
                        automationId="productCard-automation-rating" />
                </span>);
            }
            return null;
        };

        const displayProtectionPlan = () => {
            if (protectionPlan && protectionPlan.warrantyId && protectionPlan.warrantyName) {
                return (<p><span className={cx('proPlanTitle')}>Protection Plan:</span> {protectionPlan.warrantyName}
                    {protectionPlan.warrantyPrice && <span className={cx('proPlanTitle')}>({protectionPlan.warrantyPrice})</span>}</p>);
            }
            if (protectionPlan && !protectionPlan.warrantyId) {
                return (<p><span className={cx('proPlanTitle')}>Protection Plan:</span> {protectionPlan.warrantyName}
                    <span className={cx('proPlanFree')}> Free</span></p>);
            }
            return '';
        };

        const displyQty = () => {
            if (qty) {
                return (<p>Qty: {qty}</p>);
            }
            return '';
        };
        /* istanbul ignore next */
        const displaySKUS = () => {
            if (SKUList) {
                const skuView = [];
                for (let idx = 0; idx < SKUList.length; idx += 1) {
                    if (idx > 1 && !this.state.hideSKUDetails) {
                        skuView.push(
                            <Button buttonType="Link" onClick={() => { this.toggleSKUDetails(); }} className={cx('linkStyle')}>
                                <span className={'toggleLink'}>Show Details</span>
                                <img src="/static-listing/images/triangle-right.png" alt="show" />
                            </Button>,
                        );
                        break;
                    }
                    skuView.push(
                        <p>
                            <span className={cx('SKUType')}> {SKUList[idx].type}:</span>
                            <span className={cx('SKUValue')}> {SKUList[idx].value}</span>
                        </p>,
                    );

                    if (idx === (SKUList.length - 1) && this.state.hideSKUDetails) {
                        skuView.push(
                            <Button buttonType="Link" onClick={() => { this.toggleSKUDetails(); }} className={cx('linkStyle')}>
                                <span className={'toggleLink'}>Hide Details</span>
                                <img src="/static-listing/images/triangle-up-sku.svg" alt="hide" />
                            </Button>,
                        );
                    }
                }

                return skuView;
            }

            return '';
        };
        return (
            <div>
                <div className={cx('container', cardType)}>
                    <div className={cx('imgBlock')}>
                        {badgeDisplay()}
                        <a className={cx('pdpUrl')} href={pdpUrl}>
                            <img className={cx('imageClass')} src={imageUrl} alt="" />
                        </a>
                        {extendedSizeDisplay()}
                    </div>
                    {headerChildren}
                    <div className={cx('detailsWrapper')}>
                        <div className={cx('colorSwatch')}>
                            {displayColorSwatch()}
                        </div>
                        <div className={cx('pricingWrapper')}>
                            { displayPricing()}
                        </div>
                        { displayEcoRebate()}
                        <h6 className={cx('title')}>{title}</h6>
                        {cardType === 'list' && <div className={cx('skuWrapper')}>
                            <p className={cx('skuTitle')}>
                                {displaySKUS()}
                            </p>
                            {displayProtectionPlan()}
                        </div>}
                        <button className={cx('ratingWrapper')} onClick={() => { this.pdpNavigation(reviewRatingLink); }}>
                            {displayReviewRating()}
                            {displayRatingCount()}
                        </button>
                        {displyQty()}
                        {footerChildren}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { customClass, cardTheme } = this.props;

        return (
            <div className={cx('productCardFinal', customClass, cardTheme)}>
                <Card cardClass={styles.card}>
                    { this.renderCard() }
                </Card>
            </div>
        );
    }
}

export default ProductCard;
