import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import config from './ShippingThreshold.config';
import ShippingThresholdBar from './ShippingThresholdBar';

describe('Test Suite for <ShippingThresholdBar /> ', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<ShippingThresholdBar
            orderTotal={10.00}
            shippingShortTotal={20.00}
            progressBarType={config.PRGRESS_BAR_TYPE.HEADER}
            />);
    });

    it('component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('should contain progress bar', () => {
        expect(wrapper.find('Icon')).to.have.length(1);
    });
});
