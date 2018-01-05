import React from 'react';
import MarketingZones from '../MarketingZones';

const presentation = ['Content-ZoneB', 'Content-ZoneA'];
const presentation1 = ['Content-ZoneH'];
const allZones = ['Content-ZoneB', 'Content-ZoneA', 'Content-ZoneH'];

const stories = [{
    name: 'Marketing Zones',
    story: () => (
        <div>
            <MarketingZones deviceType="mobile" pageName="home" allZones={allZones} presentation={presentation} />
            any slots in between

            <MarketingZones deviceType="mobile" pageName="home" allZones={allZones} presentation={presentation1} />

        </div>
    ) }];

export default stories;
