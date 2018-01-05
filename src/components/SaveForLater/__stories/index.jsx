import React from 'react';
import SaveForLater from '../SaveForLater';

const stories = [
    {
        name: 'Save For Later',
        story: () => (
            <SaveForLater isSaved="true" ppId="abc" pdpUrl="help" />
        ),
    },
];

export default stories;
