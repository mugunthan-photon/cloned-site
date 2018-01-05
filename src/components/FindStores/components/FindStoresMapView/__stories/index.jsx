import React from 'react';
import FindStoresMapView from '../FindStoresMapView';
import * as storeData from './mock';

const clickStore = (plot) => {
    console.log(plot);
};

const stories = [{
    name: 'FindStoresMapView',
    story: () => (
        <FindStoresMapView plotPlaces={storeData.stores} center={storeData.center} automationId="test-automation-map" clickStore={clickStore} />
    ),
}];

export default stories;
