import React from 'react';
import Tooltip from '../../Tooltip/Tooltip';

const stories = [
    {
        name: 'Tooltip',
        story: () => (
            <Tooltip isVisible automationId="test-autopmation-tooltip" />
        ),
    },
];

export default stories;
