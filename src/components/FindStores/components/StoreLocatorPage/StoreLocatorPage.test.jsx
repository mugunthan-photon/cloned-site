import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StoreLocatorPageConnected from './StoreLocatorPage';

describe('Component:StoreLocatorPage', () => {
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

    console.log(jcpStoresInfo);

    // const maps = { ControlPosition: { RIGHT_BOTTOM: 'RIGHT_BOTTOM' }, ZoomControlStyle: { SMALL: 'SMALL' } };

    describe('StoreLocatorPage: Initial Render', () => {
        const mockStore = configureStore([]);
        let wrapper;
        const store = mockStore({
            selectedStore: {
                storeDetails: null,
                isGeoStore: false,
            },
        });

        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <StoreLocatorPageConnected
                        plotPlaces={jcpStoresInfo.stores}
                        automationId={'at-google-maps-pickup-store'}
                    />
                </Provider>,
            );
        });

        it('shoould render map', () => {
            expect(wrapper).to.exist;
        });
    });

    describe('StoreLocatorPage: Initial Render', () => {
        const mockStore = configureStore([]);
        let wrapper;
        const store = mockStore({
            selectedStore: {
                storeDetails: null,
                isGeoStore: false,
            },
        });

        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <StoreLocatorPageConnected
                        plotPlaces={jcpStoresInfo.stores}
                        automationId={'at-google-maps-pickup-store'}
                        userLatLong={'1.2222,2.3333'}
                    />
                </Provider>,
            );
        });

        it('shoould render user location', () => {
            expect(wrapper.find('div.plotUserLocationStyle').length).to.equal(1);
        });
    });
});
