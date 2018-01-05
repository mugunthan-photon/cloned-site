const price = {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23.99,
            min: 20.99,
            type: 'ORIGINAL',
            minPercentOff: 60,
            maxPercentOff: 65,
        },
        {
            max: 23.99,
            min: 20.99,
            type: 'clearance',
            minPercentOff: 60,
            maxPercentOff: 65,
        },
    ],
    manufacturerAdvertised: false,
    marketingLabel: 'SPOTLIGHT DEAL!',
    promotions: 'test',
};

const priceData = { data: {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23.99,
            min: 20.99,
            type: 'ORIGINAL',
            minPercentOff: 60,
            maxPercentOff: 65,
        },
        {
            max: 23.99,
            min: 20.99,
            type: 'clearance',
            minPercentOff: 60,
            maxPercentOff: 65,
        },
    ],
    manufacturerAdvertised: false,
    marketingLabel: 'SPOTLIGHT DEAL!',
    promotions: 'test',
},
};

const priceEqual = {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23,
            min: 23,
            type: 'ORIGINAL',
            minPercentOff: 0,
            maxPercentOff: 0,
        },
        {
            max: 23,
            min: 23,
            type: 'sale',
            minPercentOff: 0,
            maxPercentOff: 0,
        },
    ],
    manufacturerAdvertised: false,
    marketingLabel: 'SPOTLIGHT DEAL!',
    promotions: '',
};

const percentageEqual = {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23,
            min: 23,
            type: 'ORIGINAL',
            minPercentOff: 60,
            maxPercentOff: 60,
        },
        {
            max: 23.99,
            min: 20,
            type: 'DEFAULT',
            minPercentOff: 60,
            maxPercentOff: 60,
        },
    ],
    manufacturerAdvertised: false,
    promotions: '',
};

const marketingLabel = {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23.99,
            min: 20,
            type: 'ORIGINAL',
            minPercentOff: 60,
            maxPercentOff: 60,
        },
    ],
    manufacturerAdvertised: false,
    promotions: '',
};
const promotionalMessage = {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23,
            min: 20,
            type: 'ORIGINAL',
            minPercentOff: 60,
            maxPercentOff: 65,
        },
        {
            max: 23.99,
            min: 20.99,
            type: 'clearance',
            minPercentOff: 60,
            maxPercentOff: 65,
        },
    ],
    manufacturerAdvertised: true,
    marketingLabel: 'SPOTLIGHT DEAL!',
    promotions: [{ message: '50% off' }],
};
export {
   price,
   priceData,
   priceEqual,
   percentageEqual,
   marketingLabel,
   promotionalMessage,
};
