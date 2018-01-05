import React from 'react';
import Pricing from '../Pricing';
import getPrice from '../PricingHelper';

const price = {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23.99,
            min: 20.99,
            type: 'original',
            minPercentOff: 0,
            maxPercentOff: 0,
        },
        {
            max: 23.99,
            min: 20.99,
            type: 'clearance',
            minPercentOff: 0,
            maxPercentOff: 0,
        },
    ],
    manufacturerAdvertised: false,
    marketingLabel: 'SPOTLIGHT DEAL!',
    promotions: 'test',
};
const promotionalMessage = {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23,
            min: 20,
            type: 'original',
            minPercentOff: 60,
            maxPercentOff: 70,
        },
        {
            max: 24.90,
            min: 25,
            type: 'sale',
            minPercentOff: 50,
            maxPercentOff: 60,
        },
    ],
    manufacturerAdvertised: false,
    marketingLabel: 'SPOTLIGHT DEAL!',
    promotions: [{ message: '50% off' }],
};
const promotionalMessage2 = {
    href: 'http://m.jcpenney.com:80/v4/products/1cca9b9/pricing/root',
    amounts: [
        {
            max: 23.99,
            min: 20.99,
            type: 'ORIGINAL',
            minPercentOff: 0,
            maxPercentOff: 0,
        },
        {
            max: 23.99,
            min: 20.99,
            type: 'clearance',
            minPercentOff: 0,
            maxPercentOff: 0,
        },
    ],
    manufacturerAdvertised: false,
    marketingLabel: 'SPOTLIGHT DEAL!',
    promotions: 'test',
};
const finalPrice1 = getPrice(price);
const finalPrice2 = getPrice(promotionalMessage);
const finalPrice3 = getPrice(promotionalMessage2);
const stories = [
    {
        name: 'Pricing',
        story: () => (
            <div>
                <Pricing pricingDetails={finalPrice1}/>
                <br/>
                <br/>
                <Pricing pricingDetails={finalPrice2}/>
                <br/>
                <br/>
                <Pricing pricingDetails={finalPrice3}/>
            </div>
        ),
    },
];

export default stories;
