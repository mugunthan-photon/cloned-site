import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { HotDealsResponse } from './mock';
import HotDeals from '../../HotDeals/HotDeals';

const initialProperties = {
    slotId: 'HotDeals1',
    pageType: 'HOME',
    type: 'HotDeals1',
    attributes: {
        contentrecommendations: true,
        recommendations: true,
        schemes: 'home1_rr;home2_rr;hotdeals1_rr',
    },
    automationId: 'test-automation-hotdeals-cartridge-B',
    hotDealsCartridgeSlots: HotDealsResponse,
    deviceType: { isMobile: true, isTablet: false, isDesktop: false },
};


const mockStore = configureStore([]);

const store = mockStore({
    context: { featureFlags: { UrgencyMessageEnabled: true } },
    regionalPricing: { regionZone: '0' },
});


const stories = [
    {
        name: 'HotDeals',
        story: () => (
            <div>
                <Provider store={store}>
                    <HotDeals {...initialProperties} />
                </Provider>
            </div>
        ),
    },
];

export default stories;
