import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import isEmpty from 'lodash/isEmpty';
import Image from 'yoda-core-components/lib/components/Image/Image';

import styles from './SwatchList.css';

const cx = classNames.bind(styles);
const getScene7ImageURL = url => (`//s7d4.scene7.com/is/image/JCPenney/${url}
?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2`);
const getSwatchScene7ImageURL = url => (`//s7d1.scene7.com/is/image/JCPenney/${url}?
wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2`);

class SwatchList extends PureComponent {
    constructor() {
        super();
        this.state = {
            activeSwatch: {},
        };
        this.defaultSwatch = {};
    }

    onSwatchHoverAndClick(currentSwatch, setDefault) {
        if (!isEmpty(currentSwatch)) {
            const { setParentState } = this.props;
            const newSrcUrl = getScene7ImageURL(currentSwatch.colorizedImageId);
            this.setState({
                activeSwatchImageId: currentSwatch.swatchImageId,
            });

            if (setDefault) {
                this.defaultSwatch = currentSwatch;
            }

            setParentState({
                swatchImageSrc: newSrcUrl,
                imageSrc: newSrcUrl,
                imageError: false,
            });
        }
    }

    getSwatches() {
        const { skuSwatch } = this.props;
        const { activeSwatchImageId } = this.state;

        return skuSwatch.map((currentSwatch) => {
            const { colorName, swatchImageId, defaultSwatch } = currentSwatch;
            const swatchCardClass = cx('swatchCard', {
                swatchHover: activeSwatchImageId ? (activeSwatchImageId === swatchImageId) : defaultSwatch,
            });

            if (!activeSwatchImageId && defaultSwatch) {
                this.defaultSwatch = currentSwatch;
            }

            return (
                <li className={cx('swatchContainer')} key={swatchImageId}>
                    <button
                        className={swatchCardClass}
                        onClick={() => this.onSwatchHoverAndClick(currentSwatch, true)}
                        onMouseOver={() => this.onSwatchHoverAndClick(currentSwatch)}
                        onMouseLeave={() => this.onSwatchHoverAndClick(this.defaultSwatch)}
                    >
                        <Image
                            title={colorName}
                            alt={colorName}
                            animate
                            src={getSwatchScene7ImageURL(swatchImageId)}
                        />
                    </button>
                </li>
            );
        },
           );
    }

    render() {
        const { swatchHide } = this.props;

        return (
            <ul className={cx('swatchListCommon', 'swatchList', swatchHide)}>
                {this.getSwatches()}
            </ul>
        );
    }
}

SwatchList.propTypes = {
    skuSwatch: PropTypes.oneOfType([PropTypes.array]).isRequired,
    setParentState: PropTypes.func.isRequired,
    swatchHide: PropTypes.string.isRequired,
};

export default SwatchList;
