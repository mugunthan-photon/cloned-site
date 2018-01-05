import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import BulletedCopy from './BulletedCopy';
import config from '../../ProductCard.config';

describe('<BulletedCopy /> ', () => {
    let wrapper;
    const onProductClickSpy = sinon.spy();
    const props = {
        productUrl: '/p/shirts',
        deviceType: { isDesktop: true },
        bulletedCopyAttrs: [
            'bulleted-1',
            'bulleted-2',
            'bulleted-3',
            'bulleted-4',
            'bulleted-5',
            'bulleted-6',
            'bulleted-7',
            'bulleted-8',
        ],
    };

    beforeEach(() => {
        wrapper = shallow(<BulletedCopy {...props}/>);
    });

    it('Should render bullted copy', () => {
        expect(wrapper.find('div.bulletedCopyBlock').length).to.equal(1);
    });

    it('Should render 5 bullted copy', () => {
        expect(wrapper.find('ul.bulletedCopyMain li').length).to.equal(5);
    });

    it('Should render "Learn More" link', () => {
        const learnMore = wrapper.find('a.learnMore');
        expect(learnMore.length).to.equal(1);
    });

    it('Should redirect on click of "Learn More"', () => {
        wrapper.find('a.learnMore').simulate('click');
        wrapper.setProps({ onProductClick: onProductClickSpy });
        wrapper.find('a.learnMore').simulate('click');
        expect(onProductClickSpy.callCount).to.equal(1);
    });

    it('Should render <ProductAvailability>', () => {
        wrapper.setProps({ cardType: config.cardTypes.LIST });
        expect(wrapper.find('[name="enableProductAvailability"]').length).to.equal(1);
    });

    it('Should not render "Learn More" if productUrl is not available', () => {
        wrapper.setProps({ productUrl: '' });
        expect(wrapper.find('a.learnMore').length).to.equal(0);
    });

    it('Should return null', () => {
        wrapper.setProps({ deviceType: { isDesktop: false } });
        expect(wrapper.find('div.bulletedCopyBlock').length).to.equal(0);
    });
});
