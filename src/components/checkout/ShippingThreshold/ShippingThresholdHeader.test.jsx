import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ShippingThresholdHeader from './ShippingThresholdHeader';

describe('Test Suite for <ShippingThresholdHeader /> ', () => {
    let showProgressWrapper;
    let freeShippingWrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        showProgressWrapper = shallow(<ShippingThresholdHeader
            orderTotal={10.00}
            shippingShortTotal={20.00}
            />);
        freeShippingWrapper = shallow(<ShippingThresholdHeader
            orderTotal={10.00}
            shippingShortTotal={0}
            />);
    });

    it('component showProgressWrapper should exist ', () => {
        expect(showProgressWrapper).to.exist;
    });

    it('component freeShippingWrapper should exist ', () => {
        expect(freeShippingWrapper).to.exist;
    });

    it('showProgressWrapper should contain progress bar', () => {
        expect(showProgressWrapper.find('ShippingThresholdBar')).to.have.length(1);
    });

    it('freeShippingWrapper should not contain progress bar', () => {
        expect(freeShippingWrapper.find('ShippingThresholdBar')).to.have.length(0);
    });
});
