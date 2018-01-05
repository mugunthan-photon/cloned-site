import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ProductTitle from './ProductTitle';

describe('<ProductTitle />', () => {
    let wrapper;
    const titleProps = {
        title: 'Product details',
    };

    beforeEach(() => {
        wrapper = shallow(<ProductTitle {...titleProps} />);
    });

    it('Should render product title', () => {
        expect(wrapper.find('h6.title').length).to.equal(1);
    });

    it('Should render product title as a link', () => {
        const onProductClickSpy = sinon.spy();
        wrapper.setProps({ productUrl: '/p/product' });
        expect(wrapper.find('h6.title').length).to.equal(1);
        wrapper.find('a').simulate('click');
        wrapper.setProps({ onProductClick: onProductClickSpy });
        wrapper.find('a').simulate('click');
        expect(onProductClickSpy.callCount).to.equal(1);
    });
});
