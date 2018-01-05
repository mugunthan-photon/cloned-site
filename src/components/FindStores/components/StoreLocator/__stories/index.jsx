import React from 'react';
import StoreLocator from '../StoreLocator';
import * as storeData from './mock';

const clickStore = (plot) => {
    console.log(plot);
};

const stories = [{
    name: 'StoreLocator',
    story: () => (
        <StoreLocator plotPlaces={storeData.stores} center={storeData.center} automationId="test-automation-map" clickStore={clickStore} />
    ),
}];

export default stories;
