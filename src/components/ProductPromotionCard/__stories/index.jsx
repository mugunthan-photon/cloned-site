import React from 'react';
import ProductPromotionCard from '../ProductPromotionCard';
import productCardMockData from './mock';

const verticalCardStyle = {
    width: 222,
};

const stories = [
    {
        name: 'Product Promotion Card',
        story: () => (
            <div style={verticalCardStyle}>
                <ProductPromotionCard {...productCardMockData} />
            </div>
        ),
    },
];

export default stories;
