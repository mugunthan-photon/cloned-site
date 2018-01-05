import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ReviewAndRating from './ReviewAndRating';


describe('<ReviewAndRating />', () => {
    let wrapper;
    const reviewAndRating = {
        rating: 4.95,
        reviewCount: 230,
    };

    beforeEach(() => {
        wrapper = shallow(<ReviewAndRating {...reviewAndRating}/>);
    });

    it('Should render reviews and rating', () => {
        expect(wrapper.find('Rating').length).to.equal(1);
        expect(wrapper.find('span.reviewCount').length).to.equal(1);
    });


    it('Should render reviews and rating as link', () => {
        const onProductClickSpy = sinon.spy();
        wrapper.setProps({ productUrl: '/p/product' });
        wrapper.find('a.ratingWrapper').simulate('click');
        expect(wrapper.find('Rating').length).to.equal(1);
        expect(wrapper.find('span.reviewCount').length).to.equal(1);
        wrapper.setProps({ onProductClick: onProductClickSpy });
        wrapper.find('a.ratingWrapper').simulate('click');
        expect(onProductClickSpy.callCount).to.equal(1);
    });

    it('Should not render reviews and rating', () => {
        wrapper.setProps({ rating: 0, reviewCount: '0' });
        expect(wrapper.find('Rating').length).to.equal(0);
        expect(wrapper.find('span.reviewCount').length).to.equal(0);
    });
});
