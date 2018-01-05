import classNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import Card from 'yoda-core-components/lib/components/Card/Card';
import Rating from 'yoda-core-components/lib/components/Rating/Rating';
import Button from 'yoda-core-components/lib/components/Button/Button';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import FeatureFlag from 'yoda-core-components/lib/components/FeatureFlag/FeatureFlag';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Pricing from '../Pricing/Pricing';
import SaveForLater from '../SaveForLater/SaveForLater';
import PricingHelper from '../Pricing/PricingHelper';
import config from './ProductCard.config';
import * as styles from './ProductCard.css';
import noImageFound from './NoImageFound';
import BundleBadge from '../ProductBadges/BundleBadge';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import ProductCompare from './components/ProductCompare/ProductCompare';

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
        title: PropTypes.string,
        reviewCount: PropTypes.number,
        price: PropTypes.oneOfType([PropTypes.object]),
        rating: PropTypes.number,
        customClass: PropTypes.string,
        badge: PropTypes.oneOfType([PropTypes.object]),
        upperBadge: PropTypes.oneOfType([PropTypes.object]),
        bottomBadge: PropTypes.oneOfType([PropTypes.object]),
        skuSwatch: PropTypes.oneOfType([PropTypes.array]),
        ecoRebate: PropTypes.bool,
        skuId: PropTypes.string,
        ppId: PropTypes.string,
        index: PropTypes.number,
        cardTheme: PropTypes.oneOf([
            config.cardTheme.CARTRIDGE,
            config.cardTheme.YODA,
            config.cardTheme.ONE_RECORD_BANNER,
        ]),
        showSaveForlater: PropTypes.bool,
        deviceType: PropTypes.oneOfType([PropTypes.object]),
        altImageUrl: PropTypes.string,
        videoId: PropTypes.string,
        availabilityStatus: PropTypes.oneOfType([PropTypes.array]),
        productUrl: PropTypes.string,
        onProductClick: PropTypes.oneOfType([PropTypes.func]),
        bulletedCopyAttrs: PropTypes.oneOfType([PropTypes.array]),
        compareIn: PropTypes.bool,
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
        upperBadge: {},
        bottomBadge: {},
        skuSwatch: null,
        ecoRebate: false,
        skuId: '',
        ppId: '',
        index: 0,
        cardTheme: config.cardTheme.YODA,
        showSaveForlater: false,
        deviceType: {},
        altImageUrl: '',
        videoId: '',
        availabilityStatus: [],
        productUrl: '',
        onProductClick: () => {},
        bulletedCopyAttrs: [],
        compareIn: false,
    };

    constructor() {
        super();
        this.state = {
            imageError: false,
            openRebatesModal: false,
            imageSrc: '',
            showAllSwatchs: false,
            playVideo: false,
            noAltImage: false,
            swatchImageSrc: '',
            defaultImageFail: false,
        };
        this.imageMouseOver = this.imageMouseOver.bind(this);
        this.imageMouseLeave = this.imageMouseLeave.bind(this);
        this.showAllSwatchs = this.showAllSwatchs.bind(this);
        this.onVideoEnd = this.onVideoEnd.bind(this);
        this.showSwatchImage = this.showSwatchImage.bind(this);
    }

    onVideoEnd = () => {
        this.setState({
            playVideo: false,
        });
    }

    imageMouseOver(imageUrl) {
        if (imageUrl && !this.state.noAltImage) {
            this.setState({
                imageSrc: imageUrl,
                imageError: false,
            });
        }
    }

    showSwatchImage(imageUrl) {
        if (imageUrl) {
            this.setState({
                swatchImageSrc: imageUrl,
                imageSrc: imageUrl,
                imageError: false,
            });
        }
    }

    imageMouseLeave() {
        if (this.props.altImageUrl) {
            this.setState({
                imageSrc: this.state.swatchImageSrc || this.props.imageUrl,
                imageError: false,
            });
        }
    }

    showAllSwatchs(flag) {
        this.setState({
            showAllSwatchs: flag,
        });
    }

    loadImageNotAvailable = () => {
        if (!this.state.imageError) {
            const { deviceType: { isDesktop } } = this.props;
            if (isDesktop) {
                let imageSrc = noImageFound;
                let defaultImageFail = false;
                const noAltImage = (this.props.altImageUrl && this.props.altImageUrl === this.state.imageSrc);
                /* istanbul ignore next */
                if (noAltImage) {
                    imageSrc = this.state.swatchImageSrc || this.props.imageUrl;
                /* istanbul ignore next */
                } else if (this.state.swatchImageSrc && this.state.swatchImageSrc === this.state.imageSrc) {
                    imageSrc = this.state.defaultImageFail ? noImageFound : this.props.imageUrl;
                } else {
                    defaultImageFail = true;
                }
                this.setState({
                    imageSrc,
                    defaultImageFail: this.state.defaultImageFail || defaultImageFail,
                    noAltImage: this.state.noAltImage || noAltImage,
                    imageError: true,
                });
            } else {
                this.setState({
                    imageSrc: noImageFound,
                    imageError: true,
                });
            }
        }
    }

    renderCard() {
        const {
            title,
            rating,
            badge,
            upperBadge,
            bottomBadge,
            cardType,
            skuSwatch,
            ecoRebate,
            skuId,
            ppId,
            cardTheme,
            index,
            showSaveForlater,
            deviceType: { isDesktop, isMobile },
            altImageUrl,
            videoId,
            availabilityStatus,
            productUrl,
            compareIn,
            onProductClick,
            bulletedCopyAttrs,
        } = this.props;
        let { reviewCount } = this.props;
        const { playVideo } = this.state;
        const displayExtendedSizeInDescription = isMobile && cardType === config.cardTypes.LIST;
        if (typeof reviewCount === 'string') {
            reviewCount = parseInt(reviewCount, 10);
        }
        const { imageError } = this.state;
        const imageUrl = this.state.imageSrc || this.props.imageUrl;
        const imageSrc = imageUrl ? imageUrl.replace(/^http[s]?:/, '') : '';

        const badgeDisplay = () => {
            /* istanbul ignore next */
            const activeBadge = (badge || upperBadge);
            if (activeBadge && activeBadge.text) {
                if (activeBadge.type === 'bundle') {
                    return <BundleBadge text={activeBadge.text} cardType={cardType} />;
                }
                return (
                    <div className={cx('badge', activeBadge.theme)}>
                        <span className={cx('badgechild')} />
                        {activeBadge.text}
                    </div>
                );
            }
            return '';
        };

        const extendedSizeDisplay = () => {
            if (bottomBadge && bottomBadge.text) {
                return (
                    <div className={cx('extendedSize')} data-automation-id="product-extended-size">
                        {bottomBadge.text}
                    </div>
                );
            }

            return '';
        };

        const renderVideo = () => {
            if (isDesktop && videoId) {
                return (
                    <div className={cx('videoWrapper')}>
                        <VideoPlayer videoId={videoId} index={index} onEnd={this.onVideoEnd}/>
                    </div>
                );
            }
            return null;
        };

        const showVideo = () => {
            this.setState({
                playVideo: true,
            });
        };

        const videoDisplay = () => {
            if (isDesktop && videoId) {
                return (
                    <div className={cx('video')} data-automation-id="product-video">
                        <button onClick={() => showVideo()}>
                            <Icon iconType="svg" automationId="video-automation-product" width="48px" height="48px" viewBox="0 0 48 48" name="video" key="video"/>
                        </button>
                    </div>
                );
            }

            return '';
        };

        const saveForLaterDisplay = () => {
            if (showSaveForlater) {
                const isFirstProduct = index === 1;
                return (
                    <FeatureFlag name="enableSaveForLater">
                        <div className={cx('saveForLaterContainer')}>
                            <SaveForLater
                                cardType={cardType}
                                isFirstProduct={isFirstProduct}
                                ppId={ppId}
                                skuId={skuId}/>
                        </div>
                    </FeatureFlag>
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
                        customMarketingLabel={cx('customPriceMarketingLabel')}
                        priceClass={cx('priceClass')}
                        priceLabelClass={cx('cardPriceLabel')}
                        priceSummaryClass={cx('cardSummaryLabel')} />
                );
            }
            return '';
        };

        const getScene7ImageURL = url => (`//s7d4.scene7.com/is/image/JCPenney/${url}
        ?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2`);
        const getSwatchScene7ImageURL = url => (`//s7d1.scene7.com/is/image/JCPenney/${url}?
        wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2`);
        const renderSwatchList = (swatch, swatchHide) => {
            const swatchs = [];
            for (let i = 0; i < swatch.length; i += 1) {
                const eachSwatch = (
                    <li>
                        <div className={cx('swatchCard')}>
                            <img
                                title={swatch[i].colorName}
                                alt={swatch[i].colorName}
                                src={getSwatchScene7ImageURL(swatch[i].swatchImageId)}
                                onMouseOver={() => this.showSwatchImage(getScene7ImageURL(swatch[i].colorizedImageId))}
                            />
                        </div>
                    </li>
                );
                swatchs.push(eachSwatch);
            }
            return (
                <ul className={cx('swatchListCommon', 'swatchList', swatchHide)}>
                    {swatchs}
                </ul>
            );
        };
        const displayColorSwatch = () => {
            if (skuSwatch) {
                if (isDesktop) {
                    const itemsPerRow = 6;
                    let icon = (
                        <button onClick={() => this.showAllSwatchs(true)}>
                            <Icon iconType="svg" automationId="pluse-automation-swatch" width="25px" height="25px" viewBox="0 0 25 25" name="icon-plus" key="+" pathClassName={styles.swatchButtonIcon}/>
                        </button>
                    );
                    let swatchBox = '';
                    let moreSwatchText = '';
                    let swatchHide = 'closeSwatch';
                    if (this.state.showAllSwatchs) {
                        swatchHide = 'openSwatch';
                        const totalSwatchs = 3 * itemsPerRow;
                        icon = (
                            <button onClick={() => this.showAllSwatchs(false)}>
                                <Icon iconType="svg" automationId="pluse-automation-swatch" width="25px" height="25px" viewBox="0 0 25 25" name="icon-minus" key="-" pathClassName={styles.swatchButtonIcon}/>
                            </button>
                        );
                        swatchBox = 'swatchBox';
                        if (skuSwatch.length > totalSwatchs) {
                            moreSwatchText = `view all colors (${totalSwatchs} out of ${skuSwatch.length})`;
                        }
                    }
                    return (
                        <div className={cx('swatchListWrapper', 'fixedSwatchHeight')} data-automation-id="color-availability">
                            <div className={cx(swatchBox)}>
                                <div className={cx('swatchTable')}>
                                    <div className={cx('swatchSection')}>
                                        {renderSwatchList(skuSwatch, swatchHide)}
                                    </div>
                                    <div className={cx('swatchSection')}>
                                        {skuSwatch.length > itemsPerRow && icon}
                                    </div>
                                </div>
                                {(moreSwatchText && productUrl) &&
                                    <a
                                        href={productUrl}
                                        className={cx('moreSwatchText')}
                                        onClick={(e) => { onProductClick(e, 'swatches'); }}>{moreSwatchText}
                                    </a>
                                }
                            </div>
                        </div>
                    );
                }
                return null;
            }

            return '';
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
                        starSize={cx('prodCardStarRating')}
                        automationId="productCard-automation-rating" />
                </span>);
            }
            return null;
        };
        const displayEcoRebate = () => {
            /* istanbul ignore else */
            if (ecoRebate) {
                return (
                    <div className={cx('ecoRebate')} data-automation-id="product-eco-rebate">
                        <Button onClick={this.openRebateModelDialog} className={cx('link')} type="button" automationId="rebates-link" buttonType="Link" size="Sm">
                            <span>
                                Rebates Available
                            </span>
                        </Button>
                        {this.state.openRebatesModal ? this.renderRebatesModal() : null}
                    </div>
                );
            }

            return '';
        };
        const productImage = () => {
            if (isDesktop) {
                /* istanbul ignore next */
                return (
                    <img
                        className={cx('imageClass')}
                        src={imageSrc}
                        alt=""
                        onError={this.loadImageNotAvailable}
                        onMouseOver={() => this.imageMouseOver(altImageUrl)}
                        onMouseLeave={this.imageMouseLeave}
                    />
                );
            }
            return (
                <img
                    className={cx('imageClass')}
                    src={imageError ? noImageFound : imageSrc}
                    alt=""
                    onError={this.loadImageNotAvailable}
                />
            );
        };

        const productAvailability = () => {
            if (isDesktop && availabilityStatus) {
                const availability = [];
                let availabilityContent = '';
                const getAvailabilityIcon = (iconName) => {
                    switch (iconName) {
                        case 'mouse':
                            return 'mouse';
                        case 'cross':
                            return 'close';
                        case 'warning':
                            return 'warning';
                        default:
                            return 'check';
                    }
                };
                for (let i = 0; i < availabilityStatus.length; i += 1) {
                    let storeName = availabilityStatus[i].storeName;
                    if (storeName) {
                        if (storeName.length > 19) {
                            storeName = `${storeName.slice(0, 19)}...`;
                        }
                    }
                    const content = (
                        <div className={cx('availabilityMessageWrapper')}>
                            <div className={cx('availabilityMessageEach')}>
                                <Icon iconType="svg" automationId="check-automation-swatch" width="24px" height="24px" viewBox="0 0 24 24" name={getAvailabilityIcon(availabilityStatus[i].icon)} key="availabilityIcon"/>
                            </div>
                            <div className={cx('availabilityMessageEach')}>
                                { /* eslint-disable react/no-danger */}
                                <div className={cx('message')} dangerouslySetInnerHTML={{ __html: availabilityStatus[i].message }}/>
                                {storeName && <div className={cx('storeLoc')}>{storeName}</div>}
                            </div>
                        </div>
                    );
                    availability.push(content);
                }

                if (availability.length > 0) {
                    availabilityContent = (
                        <div className={cx('availabilityWrapper')}>
                            <ul className={cx(`${cardType}view`)}>
                                {availability}
                            </ul>
                        </div>
                    );
                }

                return availabilityContent;
            }

            return null;
        };

        const loadBulletedCopyAttrs = () => {
            if (isDesktop && bulletedCopyAttrs && bulletedCopyAttrs.length > 0) {
                const bulletedCopyArray = [];
                let learnMore = null;
                const finalBulletedCopyAttrs = [...bulletedCopyAttrs].splice(0, 5);
                /* istanbul ignore next */
                learnMore = productUrl && (
                    <a className={cx('learnMore')} href={productUrl} onClick={(e) => { onProductClick(e, 'features'); }}>
                        Learn More
                    </a>
                );

                for (let i = 0; i < finalBulletedCopyAttrs.length; i += 1) {
                    /* eslint-disable react/no-danger */
                    const bulletedcopy = (
                        <li dangerouslySetInnerHTML={{ __html: finalBulletedCopyAttrs[i] }}/>
                    );
                    bulletedCopyArray.push(bulletedcopy);
                }

                return (
                    <div className={cx('bulletedCopyBlock')}>
                        <span className={cx('productFeaturesTitle')}>Product Features</span>
                        <ul className={cx('bulletedCopyMain')}>
                            {bulletedCopyArray}
                            {learnMore}
                        </ul>
                        { cardType === config.cardTypes.LIST &&
                            (
                                <FeatureFlag name="enableProductAvailability">
                                    {productAvailability()}
                                </FeatureFlag>
                            )
                        }
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
            const rebateWidgetUrl = `https://jcpenney.ecorebates.com/ui/widgets/jcpenney/rebatedetails.html?ecr_skus=${skuId}&ecr_uiContext=PLP`;
            const rebatesMarkup = `<style>.er-iframe {width: 100%; height: 100%;}</style>
                <iframe class="er-iframe" src=${rebateWidgetUrl}>Content is not supported on this device</iframe>`;
            return (
                // eslint-disable-block
                <ModalBox
                    showModal={this.state.openRebatesModal}
                    onClose={this.closeRebatesModal}
                    automationId="ecorebates-modal"
                    modalTheme={cx('rebateModalBlock')}
                    modalBlockTheme={cx('blockTheme')}>
                    { /* eslint-disable react/no-danger */ }
                    <div dangerouslySetInnerHTML={{ __html: rebatesMarkup }} />
                </ModalBox>
            );
        };

        return (
            <div className={cx('container', cardType)}>
                <div className={cx('imgBlock')}>
                    {playVideo && renderVideo()}
                    {!playVideo && badgeDisplay()}
                    <div className={cx('imageDetails', playVideo && 'hideImage')}>
                        {productUrl ?
                            <a href={productUrl} onClick={(e) => { onProductClick(e, 'image'); }}>
                                {productImage()}
                            </a> :
                            productImage()
                        }
                        {videoDisplay()}
                        {saveForLaterDisplay()}
                        {!displayExtendedSizeInDescription ? extendedSizeDisplay() : null}
                    </div>
                </div>
                <div className={cx('detailsWrapper')}>
                    <div className={cx('productdetailedBlock')}>
                        <div className={cx('colorSwatch')}>
                            {displayColorSwatch()}
                        </div>
                        { displayExtendedSizeInDescription ? extendedSizeDisplay() : null}
                        <div className={cx('pricingWrapper')} data-automation-id="product-price">
                            {displayPricing()}
                        </div>
                        {displayEcoRebate()}
                        {
                            productUrl ?
                                <a href={productUrl} onClick={(e) => { onProductClick(e, 'title'); }}>
                                    <h6 className={cx('title')} data-automation-id="product-title">{title}</h6>
                                </a> :
                                <h6 className={cx('title')} data-automation-id="product-title">{title}</h6>
                        }
                        {
                            productUrl ?
                                <a href={productUrl} className={cx('ratingWrapper')} onClick={(e) => { onProductClick(e, 'reviews'); }}>
                                    {displayReviewRating()}
                                    {displayRatingCount()}
                                </a> :
                                <div className={cx('ratingWrapper')}>
                                    {displayReviewRating()}
                                    {displayRatingCount()}
                                </div>
                        }
                        { cardType === config.cardTypes.GRID &&
                            (
                                <FeatureFlag name="enableProductAvailability">
                                    {productAvailability()}
                                </FeatureFlag>
                            )
                        }
                        {compareIn ? <ProductCompare productDetails={this.props} /> : null}
                    </div>
                    {loadBulletedCopyAttrs()}
                </div>
            </div>
        );
    }
    render() {
        const { customClass, cardTheme, deviceType: { isDesktop } } = this.props;
        return (
            <div className={cx('productCardFinal', customClass, cardTheme)}>
                <Card cardClass={cx('card', isDesktop && 'cardMinWidth')} automationId="productCard">
                    {this.renderCard()}
                </Card>
            </div>
        );
    }
}

export default ProductCard;
