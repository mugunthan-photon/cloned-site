import React from 'react';
import Slider from '../../Slider/Slider';

const stories = [
    {
        name: 'Slider',
        story: () => (
            <Slider title="hello" automationId="test-automation-slide" />
        ),
    },
];

export default stories;
