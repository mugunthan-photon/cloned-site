import React from 'react';
import GoogleMaps from '../../GoogleMaps/GoogleMaps';

const jcpStoresInfo = {
    stores: [
        {
            id: '0179',
            latitude: 32.86288,
            longitude: -96.75233,
        },
        {
            id: '2338',
            latitude: 32.80629,
            longitude: -96.62279,
        },
        {
            id: '2826',
            latitude: 32.59359,
            longitude: -96.94627,
        },
        {
            id: '2055',
            latitude: 33.01284,
            longitude: -96.71364,
        },
        {
            id: '2685',
            latitude: 32.68068,
            longitude: -97.12822,
        },
    ],
};

const center = [32.7432998, -96.78687939999998];

const stories = [{
    name: 'Google Maps',
    story: () => (
        <GoogleMaps plotPlaces={jcpStoresInfo.stores} center={center} automationId="test-automation-map" />
    ),
}];

export default stories;
