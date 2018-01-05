import React from 'react';
import AppBanner from '../AppBanner';

const params = {
    deviceType: { isMobile: true },
    automationId: 'app-banner',
};

const stories = [
    {
        name: 'App Banner',
        story: () => (
            <div>
                <AppBanner {...params}/>
            </div>
        ),
    },
];

export default stories;
