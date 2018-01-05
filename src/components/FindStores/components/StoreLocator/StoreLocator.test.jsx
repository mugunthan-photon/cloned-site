import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import StoreLocator from './StoreLocator';

describe('Component:StoreLocator', () => {
    let wrapper;
    const callback = sinon.spy();

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

    const center = {
        id: '0179',
        latitude: 32.86288,
        longitude: -96.75233,
    };

    const maps = { ControlPosition: { RIGHT_BOTTOM: 'RIGHT_BOTTOM' }, ZoomControlStyle: { SMALL: 'SMALL' } };


    beforeEach(() => {
        wrapper = mount(
            <StoreLocator
                center={center}
                plotPlaces={jcpStoresInfo.stores}
                automationId={'at-google-maps-pickup-store'}
                clickStore={callback}
            />,
        );
    });

    it('To check if the order total component exist', () => {
        expect(wrapper).to.exist;
    });

    it('Simulate click should change stores information', () => {
        wrapper.instance().onChildClick({}, {});
        expect(callback.calledOnce).to.equal(true);
    });

    it('Simulate click should change stores information', () => {
        StoreLocator.createMapOptions(maps);
    });
});
