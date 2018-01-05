import React from 'react';
import MarketingZone from '../MarketingZone';
import { ZoneContentDataImageMap } from './mock';

const stories = [
    {
        name: 'MarketingZone',
        story: () => (
            <MarketingZone zoneContent={ZoneContentDataImageMap} deviceType="mobile" zoneStyleClass="temp" />
        ),
    },
];

export default stories;
