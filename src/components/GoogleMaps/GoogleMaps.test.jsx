import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import GoogleMaps from './GoogleMaps';

describe('<GoogleMaps />', () => {
    describe('Google Maps testing', () => {
        it('Google Map should be rendered', () => {
            const center = {
                lat: parseFloat(33.082081),
                lng: parseFloat(-96.832876),
            };
            const wrapper = mount(
                <GoogleMaps center={center}/>,
          );
            expect(wrapper).to.exist;
        });
    });
});
