import React from 'react';
import GoogleAds from '../GoogleAds';

const stories = [
    {
        name: 'Google Ads',
        story: () => (
            <div>
                <GoogleAds adId="googleAdsUniqueId" />
            </div>
        ),
    },
];

export default stories;
