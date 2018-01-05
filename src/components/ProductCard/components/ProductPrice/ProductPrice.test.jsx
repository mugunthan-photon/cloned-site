import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { priceDetails } from '../../__stories/mock';

import ProductPrice from './ProductPrice';

describe('<ProductPrice /> Component Testing', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ProductPrice price={priceDetails}/>);
    });

    it('Should render product price', () => {
        expect(wrapper.find('Pricing').length).to.equal(1);
    });

    it('Should not render product price', () => {
        wrapper.setProps({ price: null });
        expect(wrapper.find('Pricing').length).to.equal(0);
    });
});

