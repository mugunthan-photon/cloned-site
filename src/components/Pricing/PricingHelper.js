/* istanbul ignore next */
export const getLocaleString = (price, isFraction) => {
    if (price) {
        const values = (isFraction ? parseFloat(price).toFixed(2) : parseFloat(price)).toString().split('.');
        return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + (values.length === 2 ? `.${values[1]}` : '');
    }
    return '0';
};

/* istanbul ignore next */
const AddPriceWithCommas = (price) => {
    if (typeof price === 'string') {
        price = isNaN(price) ? 0 : price;
        price = parseFloat(price);
    }
    // adding zero if decimal point is 1 (ex: 12.2 = 12.20)
    if (parseInt(price, 10) !== price) {
        return getLocaleString(price, true);
    }
    return getLocaleString(price);
};

/* istanbul ignore next */
const getPriceFormat = (min, max, isCurrency) => {
    let priceMatch;
    const dollarSymbol = '$';
    const percentageOff = '% off';
    if (min === 0 && min === max) {
        return '';
    }
    if (isCurrency) {
        priceMatch = (min === max) ?
            `${dollarSymbol}${AddPriceWithCommas(max)}` :
            `${dollarSymbol}${AddPriceWithCommas(min)} - ${dollarSymbol}${AddPriceWithCommas(max)}`;
    } else {
        priceMatch = (min === max) ?
            `${min}${percentageOff}` :
            `${AddPriceWithCommas(min)} - ${AddPriceWithCommas(max)}${percentageOff}`;
    }
    return priceMatch;
};

/* istanbul ignore next */
const getPrice = (prices) => {
    if (!prices) {
        return null;
    }

    const originalPrice = prices.amounts.filter(amount => amount.type.toUpperCase() === 'ORIGINAL')[0];
    const defaultPrice = prices.amounts.filter(amount => amount.type.toUpperCase() !== 'ORIGINAL')[0];
    let defaults = null;
    let type = null;
    let percentOff = null;
    let original = '';
    let originalType = '';
    let dashed = '';
    let originalPriceMin = (originalPrice && originalPrice.min) || 0;
    let originalPriceMax = (originalPrice && originalPrice.max) || 0;
    let mapPrice = '';
    const promotions = (prices.promotions && (prices.promotions[0] || {}).message) ? prices.promotions[0].message : '';
    const marketingLabel = prices.marketingLabel ? prices.marketingLabel : '';
    if (!prices.manufacturerAdvertised && defaultPrice !== undefined) {
        let defaultPriceMin = defaultPrice.min;
        let defaultPriceMax = defaultPrice.max;

        if (!Number.isInteger(defaultPriceMin)
            || !Number.isInteger(defaultPriceMax)) {
            defaultPriceMin = defaultPriceMin.toFixed(2);
            defaultPriceMax = defaultPriceMax.toFixed(2);
        }

        if (!Number.isInteger(originalPriceMin)
            || !Number.isInteger(originalPriceMax)) {
            originalPriceMin = originalPriceMin.toFixed(2);
            originalPriceMax = originalPriceMax.toFixed(2);
        }
        defaults = getPriceFormat(defaultPriceMin, defaultPriceMax, true);
        type = (defaultPrice.type.toUpperCase() !== 'DEFAULT') ? defaultPrice.type.toLowerCase() : '';
        percentOff = (defaultPrice.minPercentOff > 0) ? getPriceFormat(defaultPrice.minPercentOff, defaultPrice.maxPercentOff, false) : '';
        /* istanbul ignore next */
        if (originalPrice !== undefined && type) {
            original = getPriceFormat(originalPriceMin, originalPriceMax, true);
            originalType = 'was';
            if (defaultPrice.minPercentOff > 0) {
                dashed = ' | ';
            }
        }
    } else {
        if (!Number.isInteger(originalPriceMin) || !Number.isInteger(originalPriceMax)) {
            originalPriceMin = originalPriceMin.toFixed(2);
            originalPriceMax = originalPriceMax.toFixed(2);
        }
        if (prices.manufacturerAdvertised) {
            mapPrice = 'View Price in Cart';
        }
        defaults = getPriceFormat(originalPriceMin, originalPriceMax, true);
    }

    /**
     * If original and offer price both are same, we will show only one price
     */
    /* istanbul ignore next */
    if (defaults === original) {
        original = '';
        originalType = '';
        dashed = '';
        type = '';
    }

    /* istanbul ignore next */
    if (!defaults && !original) {
        mapPrice = 'View Price in Cart';
    }

    const price = {
        defaults,
        original,
        originalType,
        percentOff,
        type,
        marketingLabel,
        promotions,
        dashed,
        mapPrice,
    };
    return price;
};

export default getPrice;
