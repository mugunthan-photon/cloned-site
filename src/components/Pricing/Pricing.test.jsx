import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Pricing from './Pricing';

describe('<pricing />', () => {
    let priceMount;
    let priceMountInstance;
    beforeEach(() => {
        const pricingDetails = { defaults: '$24.99', original: '$50', originalType: 'was', percentOff: '50% off', type: 'sale', marketingLabel: '', promotions: '' };
        priceMount = mount(<Pricing
            pricingDetails={pricingDetails}
            dynamicFont
        />);
        priceMountInstance = priceMount.instance();
    });
    it('should have a div ', () => {
        const wrapper = shallow(<Pricing />);
        expect(wrapper.find('div')).to.have.length(1);
    });

    it('should have deafult price', () => {
        expect(priceMount.props().pricingDetails.defaults).to.equal('$24.99');
    });
    it('should have original price', () => {
        expect(priceMount.props().pricingDetails.original).to.equal('$50');
    });
    it('should have originalType', () => {
        expect(priceMount.props().pricingDetails.originalType).to.equal('was');
    });
    it('should have percentOff', () => {
        expect(priceMount.props().pricingDetails.percentOff).to.equal('50% off');
    });

    it('Should trigger setFontSize on component mount and update with default price', () => {
        const pricingDetails = { original: '$50', originalType: 'was', percentOff: '50% off', type: 'sale', marketingLabel: '', promotions: '' };
        priceMount = mount(<Pricing
            pricingDetails={pricingDetails}
        />);
        priceMountInstance = priceMount.instance();
        const renderCardSpy = sinon.spy(priceMountInstance, 'setFontSize');
        priceMount.update();

        expect(renderCardSpy.calledOnce).to.equal(true);
        priceMount.setProps({ pricingDetails });
        expect(renderCardSpy.calledTwice).to.equal(true);
    });

    it('Should trigger setFontSize on component mount and update without default price', () => {
        const pricingDetails = { original: '$50', originalType: 'was', percentOff: '50% off', type: 'sale', marketingLabel: '', promotions: '' };
        priceMount = mount(<Pricing
            pricingDetails={pricingDetails}
            dynamicFont
        />);
        priceMountInstance = priceMount.instance();
        const renderCardSpy = sinon.spy(priceMountInstance, 'setFontSize');
        expect(renderCardSpy.calledOnce).to.equal(false);
    });
});
