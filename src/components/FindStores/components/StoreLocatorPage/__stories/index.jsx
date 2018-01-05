import React from 'react';
import StoreLocatorPage from '../StoreLocatorPage';
import * as storeData from './mock';

const clickStore = (plot) => {
    console.log(plot);
};

const stories = [{
    name: 'StoreLocatorPage',
    story: () => (
        <StoreLocatorPage plotPlaces={storeData.stores} center={storeData.center} automationId="test-automation-map" clickStore={clickStore} />
    ),
}];

export default stories;
