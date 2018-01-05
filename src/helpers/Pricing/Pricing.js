export const getPriceFormat = (min, max, isCurrency) => {
    let priceMatch;
    const dollarSymbol = '$';
    const percentageOff = '% off';
    if (isCurrency) {
        priceMatch = (min === max) ? `${dollarSymbol}${max}` : `${dollarSymbol}${min} - ${dollarSymbol}${max}`;
    } else {
        priceMatch = (min === max) ? `${min}${percentageOff}` : `${min} - ${max}${percentageOff}`;
    }
    return priceMatch;
};


class Pricing {
    static getPrice(prices) {
        if (!prices) {
            return null;
        }
        const originalPrice = prices.amounts[0];
        const defaultPrice = prices.amounts[1];
        let defaults = null;
        let type = null;
        let percentOff = null;
        let original = '';
        let originalType = '';

        if (defaultPrice) {
            defaults = getPriceFormat(defaultPrice.min, defaultPrice.max, true);
            type = (defaultPrice.type.toUpperCase() !== 'DEFAULT') ? defaultPrice.type : '';
            percentOff = (defaultPrice.minPercentOff > 0) ? getPriceFormat(defaultPrice.minPercentOff, defaultPrice.maxPercentOff, false) : '';
        }
        if (originalPrice) {
            original = getPriceFormat(originalPrice.min, originalPrice.max, true);
            if (defaults === original) {
                original = '';
            } else {
                originalType = 'original';
            }
        }
        const price = {
            defaults,
            original,
            originalType,
            percentOff,
            type,
        };
        return price;
    }
}

export default Pricing;
