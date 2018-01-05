import classNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import Card from 'yoda-core-components/lib/components/Card/Card';
import FeatureFlag from 'yoda-core-components/lib/components/FeatureFlag/FeatureFlag';
import SaveForLater from '../SaveForLater/SaveForLater';
import config from './ProductCard.config';
import * as styles from './ProductCard.css';

import ProductCompare from './components/ProductCompare/ProductCompare';
import ProductBadge from './components/ProductBadge/ProductBadge';
import BulletedCopy from './components/BulletedCopy/BulletedCopy';
import ProductAvailability from './components/ProductAvailability/ProductAvailability';
import ColorSwatch from './components/ColorSwatch/ColorSwatch';
import ProductImage from './components/ProductImage/ProductImage';
import EcoRebates from './components/EcoRebates/EcoRebates';
import ExtendedSize from './components/ExtendedSize/ExtendedSize';
import ReviewAndRating from './components/ReviewAndRating/ReviewAndRating';
import ProductPrice from './components/ProductPrice/ProductPrice';
import ProductVideo from './components/ProductVideo/ProductVideo';
import ProductTitle from './components/ProductTitle/ProductTitle';

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
        customClass: PropTypes.string,
        skuId: PropTypes.string,
        ppId: PropTypes.string,
        index: PropTypes.number,
        cardTheme: PropTypes.oneOf([
            config.cardTheme.CARTRIDGE,
            config.cardTheme.GALLERY,
            config.cardTheme.ONE_RECORD_BANNER,
        ]),
        showSaveForlater: PropTypes.bool,
        deviceType: PropTypes.oneOfType([PropTypes.object]),
    };

    /** @properties {Default set up} [description] */
    static defaultProps = {
        cardType: config.cardTypes.GRID,
        customClass: '',
        skuSwatch: null,
        skuId: '',
        ppId: '',
        index: 0,
        cardTheme: config.cardTheme.GALLERY,
        showSaveForlater: false,
        deviceType: {},
    };

    constructor() {
        super();
        this.state = {
            imageError: false,
            openRebatesModal: false,
            imageSrc: '',
            playVideo: false,
            noAltImage: false,
            swatchImageSrc: '',
            defaultImageFail: false,
        };
    }

    setParentState = (newState) => {
        this.setState(newState);
    }

    renderCard() {
        const {
            cardType,
            skuId,
            ppId,
            index,
            showSaveForlater,
        } = this.props;

        const { playVideo } = this.state;

        const productImageProps = {
            setParentState: this.setParentState,
            imageSrc: this.state.imageSrc,
            imageError: this.state.imageError,
            swatchImageSrc: this.state.swatchImageSrc,
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

        return (
            <div className={cx('container', cardType)}>
                <div className={cx('imgBlock')}>
                    <ProductVideo
                        {...this.props}
                        playVideo={playVideo}
                        setParentState={this.setParentState}
                        renderVideo
                    />
                    <ProductBadge {...this.props} playVideo={playVideo} />
                    <div className={cx('imageDetails', playVideo && 'hideImage')}>
                        <ProductImage {...this.props} {...productImageProps}/>
                        <ProductVideo {...this.props} playVideo={playVideo} setParentState={this.setParentState}/>
                        {saveForLaterDisplay()}
                        <ExtendedSize {...this.props}/>
                    </div>
                </div>
                <div className={cx('detailsWrapper')}>
                    <div className={cx('productdetailedBlock')}>
                        <ColorSwatch {...this.props} setParentState={this.setParentState}/>
                        <ExtendedSize {...this.props} inDescription />
                        <ProductPrice {...this.props} />
                        <EcoRebates {...this.props} />
                        <ProductTitle {...this.props} />
                        <ReviewAndRating {...this.props} />
                        <ProductAvailability {...this.props} />
                        <ProductCompare productDetails={this.props} />
                    </div>
                    <BulletedCopy {...this.props} />
                </div>
            </div>
        );
    }
    render() {
        const { customClass, cardTheme, deviceType: { isDesktop } } = this.props;
        return (
            <div className={cx('productCard', customClass, cardTheme)}>
                <Card cardClass={cx('card', isDesktop && 'cardMinWidth')} automationId="productCard">
                    {this.renderCard()}
                </Card>
            </div>
        );
    }
}

export default ProductCard;
