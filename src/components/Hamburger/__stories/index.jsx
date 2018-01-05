import React from 'react';
import Hamburger from '../../Hamburger/Hamburger';

const stories = [
    {
        name: 'Hamburger',
        story: () => (
            <Hamburger title="hello" automationId="test-automation-slide" />
        ),
    },
];

export default stories;
