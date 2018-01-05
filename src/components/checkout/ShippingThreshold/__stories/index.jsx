import React from 'react';
import ShippingThresholdHeader from '../ShippingThresholdHeader';
import ShippingThresholdSummary from '../ShippingThresholdSummary';

const stories = [
    {
        name: 'ShippingThresholdHeader',
        story: () => (
            <ShippingThresholdHeader orderTotal={30.00} shippingShortTotal={99.99}/>
        ),
    },
    {
        name: 'ShippingThresholdSummary',
        story: () => (
            <ShippingThresholdSummary orderTotal={30.00} shippingShortTotal={50.99}/>
        ),
    },
];

export default stories;
