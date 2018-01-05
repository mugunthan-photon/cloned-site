import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './Pricing.css';

const cx = classNames.bind(styles);
class Pricing extends Component {
    static defaultProps = {
        pricingDetails: {},
        dynamicFont: false,
        priceWrapperClass: '',
        priceClass: '',
        priceLabelClass: '',
        priceSummaryClass: '',
        customMarketingLabel: '',
        mapPriceClass: '',
    };

    static propTypes = {
        pricingDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        dynamicFont: PropTypes.bool,
        priceWrapperClass: PropTypes.string,
        priceClass: PropTypes.string,
        priceLabelClass: PropTypes.string,
        priceSummaryClass: PropTypes.string,
        customMarketingLabel: PropTypes.string,
        mapPriceClass: PropTypes.string,
    };

    constructor() {
        super();
        this.state = {
            reducePriceFont: false,
        };
    }

    componentDidMount() {
        this.setFontSize();
    }

    componentDidUpdate() {
        this.setFontSize();
    }

    /**
    * Decrease the font size of price text if its too big for the container
    * Requirement - https://app.zeplin.io/project.html#pid=588a77ff0deb55f27cd8829f&sid=589ce6a239daf1ba0cd3bdaf
    */
    setFontSize() {
        if (this.props.dynamicFont && this.priceText) {
            const pricingDetails = this.props.pricingDetails;
            const { reducePriceFont } = this.state;
            const priceTextWidth = this.priceText.clientWidth;
            const scrollWidth = this.priceText.scrollWidth;
            const price = pricingDetails.defaults || pricingDetails.original;
            /** If scroll width is greater than actual width of the element then reduce the font size
             * Adding reducePriceFont to condition to avoid infinite loop
            */
            /* istanbul ignore next */
            if (!reducePriceFont && price && price.length && scrollWidth > priceTextWidth) {
                this.setState({
                    reducePriceFont: true,
                });
            }
        }
    }

    render() {
        const {
            pricingDetails,
            priceWrapperClass,
            priceClass,
            priceLabelClass,
            priceSummaryClass,
            customMarketingLabel,
            mapPriceClass,
        } = this.props;
        const priceCustomClass = cx('priceWrapper', { reducePriceFont: this.state.reducePriceFont }, priceWrapperClass);
        return (
            <div className={styles.pricing}>
                <p className={cx('marketingLabel', customMarketingLabel)} data-automation-id="at-price-promotions-label">{pricingDetails.promotions}</p>
                <p className={cx('marketingLabel', customMarketingLabel)} data-automation-id="at-price-marketing-label">{pricingDetails.marketingLabel}</p>
                {pricingDetails.mapPrice ? <p
                    className={cx('mapPrice', mapPriceClass)}
                    data-automation-id="at-price-map-price-label">
                    {pricingDetails.mapPrice}
                </p> : <p
                    data-automation-id={`${pricingDetails.type}-price-info`}
                    ref={(priceText) => { this.priceText = priceText; }}
                    className={priceCustomClass}
                  >
                    <span data-automation-id="at-price-value" className={cx('price', priceClass)}>
                        {pricingDetails.defaults || pricingDetails.original}
                    </span>
                    <span data-automation-id="at-price-label" className={cx(priceLabelClass, { sale: true, clearence: (pricingDetails.type === 'clearance') || false })}> {pricingDetails.type}</span>
                </p>
                }

                <p data-automation-id="price-old-sale" className={cx('salesummary', priceSummaryClass)}>
                    {pricingDetails.originalType} {pricingDetails.original} {pricingDetails.dashed}
                    {pricingDetails.percentOff ? <span data-automation-id="price-percent-off" className={cx('percentageOff')}>{pricingDetails.percentOff}</span> : ''}
                </p>
            </div>
        );
    }
}

export default Pricing;
