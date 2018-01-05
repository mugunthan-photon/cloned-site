import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames/bind';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import SwatchList from './components/SwatchList/SwatchList';

import styles from './ColorSwatch.css';

const cx = classNames.bind(styles);

class ColorSwatch extends PureComponent {
    state = {
        showAllSwatchs: false,
    }

    showAllSwatchs(flag) {
        this.setState({
            showAllSwatchs: flag,
        });
    }

    render() {
        const { skuSwatch,
            deviceType: { isDesktop },
            productUrl,
            setParentState,
            onProductClick,
          } = this.props;
        if (skuSwatch && isDesktop) {
            const itemsPerRow = 6;
            const maxSwatchRows = 3;
            let icon = (
                <button onClick={() => this.showAllSwatchs(true)}>
                    <Icon iconType="svg" automationId="pluse-automation-swatch" width="25px" height="25px" viewBox="0 0 25 25" name="icon-plus" key="+" pathClassName={styles.swatchButtonIcon}/>
                </button>
            );
            let swatchBox = '';
            let moreSwatchText = '';
            let swatchHide = 'closeSwatch';
            // Load only 6 swatches as we display only 6
            let displaySkuSwatch = skuSwatch.slice(0, 6);
            if (this.state.showAllSwatchs) {
                swatchHide = 'openSwatch';
                const totalSwatchs = maxSwatchRows * itemsPerRow;
                displaySkuSwatch = skuSwatch.slice(0, totalSwatchs);
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
                <div className={cx('colorSwatch')}>
                    <div className={cx('swatchListWrapper')} data-automation-id="color-availability">
                        <div className={cx(swatchBox)}>
                            <div className={cx('swatchTable')}>
                                <div className={cx('swatchSection')}>
                                    <SwatchList
                                        skuSwatch={displaySkuSwatch}
                                        swatchHide={swatchHide}
                                        setParentState={setParentState}
                                    />
                                </div>
                                <div className={cx('swatchSection')}>
                                    {skuSwatch.length > itemsPerRow && icon}
                                </div>
                            </div>
                            {(moreSwatchText && productUrl) &&
                            <a
                                href={productUrl}
                                className={cx('moreSwatchText')}
                                onClick={(e) => { onProductClick(e, 'swatches'); }}
                            >
                                    {moreSwatchText}
                            </a>
                        }
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}


ColorSwatch.propTypes = {
    skuSwatch: PropTypes.oneOfType([PropTypes.array]),
    deviceType: PropTypes.oneOfType([PropTypes.object]),
    productUrl: PropTypes.string,
    onProductClick: PropTypes.oneOfType([PropTypes.func]),
    setParentState: PropTypes.func.isRequired,
};

ColorSwatch.defaultProps = {
    skuSwatch: [],
    onProductClick: () => {},
    productUrl: '',
    deviceType: {},
};

export default ColorSwatch;
