import React from 'react';
import StoreCard from '../../StoreCard/StoreCard';
import storeCardData from './mock';

const stories = [
    {
        name: 'StoreCard',
        story: () => (
            <StoreCard dataConfig={storeCardData} index={0} automationId="test-automation-store"/>
        ),
    },
];

export default stories;
