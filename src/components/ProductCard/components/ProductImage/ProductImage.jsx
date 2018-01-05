import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';

import noImageFound from '../../NoImageFound';
import styles from './ProductImage.css';

const cx = classNames.bind(styles);

class ProductImage extends PureComponent {
    constructor() {
        super();
        this.state = {
            defaultImageFail: false,
            noAltImage: false,
        };
    }

    imageMouseOver = () => {
        const { altImageUrl, setParentState } = this.props;
        if (altImageUrl && !this.state.noAltImage) {
            setParentState({
                imageSrc: altImageUrl,
                imageError: false,
            });
        }
    }

    imageMouseLeave = () => {
        const { altImageUrl, setParentState, swatchImageSrc, imageUrl } = this.props;
        if (altImageUrl) {
            setParentState({
                imageSrc: swatchImageSrc || imageUrl,
                imageError: false,
            });
        }
    }

    loadImageNotAvailable = () => {
        const {
            deviceType: { isDesktop },
            altImageUrl,
            imageUrl,
            imageSrc,
            imageError,
            swatchImageSrc,
            setParentState,
        } = this.props;

        if (!imageError) {
            if (isDesktop) {
                let newImageSrc = noImageFound;
                let defaultImageFail = false;
                const noAltImage = (altImageUrl && altImageUrl === imageSrc);
                if (noAltImage) {
                    newImageSrc = swatchImageSrc || imageUrl;
                } else if (swatchImageSrc && swatchImageSrc === imageSrc) {
                    newImageSrc = this.state.defaultImageFail ? noImageFound : imageUrl;
                } else {
                    defaultImageFail = true;
                }

                setParentState({
                    imageSrc: newImageSrc,
                    imageError: true,
                });

                this.setState({
                    defaultImageFail: this.state.defaultImageFail || defaultImageFail,
                    noAltImage: this.state.noAltImage || noAltImage,
                });
            } else {
                setParentState({
                    imageSrc: noImageFound,
                    imageError: true,
                });
            }
        }
    }

    render() {
        const { deviceType: { isDesktop },
        imageUrl,
        imageError,
        imageSrc,
        cardTheme,
        onProductClick,
        productUrl,
        } = this.props;
        let additionalProps = {};
        const imageToDisplay = imageSrc || imageUrl;
        const updateImageSrc = imageToDisplay ? imageToDisplay.replace(/^http[s]?:/, '') : '';

        if (isDesktop) {
            additionalProps = {
                onMouseOver: this.imageMouseOver,
                onMouseLeave: this.imageMouseLeave,
            };
        }
        const renderProductImage = (
            <img
                className={cx('imageClass', cardTheme)}
                src={imageError ? noImageFound : updateImageSrc}
                alt=""
                onError={this.loadImageNotAvailable}
                {...additionalProps}
            />
        );

        return productUrl ? <a
            href={productUrl}
            onClick={(e) => { onProductClick(e, 'image'); }}>
            {renderProductImage}
        </a> : renderProductImage;
    }
}

ProductImage.defaultProps = {
    imageUrl: '',
    altImageUrl: '',
    deviceType: {},
    cardTheme: '',
    imageSrc: '',
    onProductClick: () => {},
    productUrl: '',
};

ProductImage.propTypes = {
    imageUrl: PropTypes.string,
    altImageUrl: PropTypes.string,
    deviceType: PropTypes.oneOfType([PropTypes.object]),
    swatchImageSrc: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
    imageError: PropTypes.bool.isRequired,
    cardTheme: PropTypes.string,
    setParentState: PropTypes.func.isRequired,
    onProductClick: PropTypes.func,
    productUrl: PropTypes.string,
};

export default ProductImage;
