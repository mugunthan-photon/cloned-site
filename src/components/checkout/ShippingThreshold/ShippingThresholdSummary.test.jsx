import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ShippingThresholdSummary from './ShippingThresholdSummary';

describe('Test Suite for <ShippingThresholdSummary /> ', () => {
    let showProgressWrapper;
    let freeShippingWrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        showProgressWrapper = shallow(<ShippingThresholdSummary
            orderTotal={10.00}
            shippingShortTotal={20.00}
            />);
        freeShippingWrapper = shallow(<ShippingThresholdSummary
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
