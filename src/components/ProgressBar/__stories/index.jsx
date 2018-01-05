import React from 'react';
import ProgressBar from '../../ProgressBar/ProgressBar';
import ProgressBarData from './mock';

const stories = [
    {
        name: 'ProgressBar',
        story: () => (
            <ProgressBar points={ProgressBarData} />
        ),
    },
];

export default stories;
