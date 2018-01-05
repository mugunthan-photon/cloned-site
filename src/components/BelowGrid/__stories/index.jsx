import React from 'react';
import BelowGrid from '../BelowGrid';
import mockData from './mock';

const stories = [
    {
        name: 'Below Grid',
        story: () => (
            <BelowGrid
                gridData={mockData}
            />
        ),
    },
];

export default stories;
