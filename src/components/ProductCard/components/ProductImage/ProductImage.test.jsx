import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ProductImage from './ProductImage';

describe('<ProductImage />', () => {
    let wrapper;
    const setParentStateSpy = sinon.spy();
    const productClickSpy = sinon.spy();
    const productProps = {
        imageUrl: '/p/dummy.png',
        imageError: false,
        setParentState: setParentStateSpy,
        swatchImageSrc: '',
    };

    beforeEach(() => {
        wrapper = shallow(<ProductImage {...productProps}/>);
    });

    it('Should display Product Image', () => {
        expect(wrapper.find('[src="/p/dummy.png"]').length).to.equal(1);
    });

    it('Should display empty string as src for img', () => {
        wrapper.setProps({ deviceType: { isDesktop: true }, imageSrc: '', imageUrl: '' });
        expect(wrapper.find('[src=""]').length).to.equal(1);
    });

    it('Should display product image with click enabled', () => {
        wrapper.setProps({ deviceType: { isDesktop: true }, productUrl: '/p/product' });
        expect(wrapper.find('a').length).to.equal(1);
        wrapper.find('a').simulate('click');
        wrapper.setProps({ onProductClick: productClickSpy });
        wrapper.find('a').simulate('click');
        expect(productClickSpy.callCount).to.equal(1);
    });

    it('Displaying altImage on mouseOver - Desktop functionality', () => {
        wrapper.setProps({ deviceType: { isDesktop: true }, productUrl: '/p/product' });
        wrapper.find('[src="/p/dummy.png"]').simulate('mouseOver');
        wrapper.find('[src="/p/dummy.png"]').simulate('mouseLeave');
        wrapper.setProps({ altImageUrl: '/altimage/', setParentState: setParentStateSpy });
        wrapper.find('[src="/p/dummy.png"]').simulate('mouseOver');
        expect(setParentStateSpy.callCount).to.equal(1);
        wrapper.find('[src="/p/dummy.png"]').simulate('mouseLeave');
        expect(setParentStateSpy.callCount).to.equal(2);
    });

    it('loadImageNotAvailable - Should load no image found onError', () => {
        const setParentSpyForNoImage = sinon.spy();
        wrapper.setProps({ setParentState: setParentSpyForNoImage });
        wrapper.instance().loadImageNotAvailable();
        expect(setParentSpyForNoImage.args[0][0].imageError).to.equal(true);

        wrapper.setProps({ deviceType: { isDesktop: true } });
        wrapper.instance().loadImageNotAvailable();
    });

    it('Should load altImageUrl if (altImageUrl === imageSrc)', () => {
        wrapper.setProps({ imageError: true });
        wrapper.instance().loadImageNotAvailable();
        const setParentSpyForNoImage = sinon.spy();
        wrapper.setProps({ deviceType: { isDesktop: true },
            imageError: false,
            imageSrc: '/p/dummy.png',
            setParentState: setParentSpyForNoImage,
            altImageUrl: '/p/dummy.png' });

        wrapper.instance().loadImageNotAvailable();
        expect(setParentSpyForNoImage.args[0][0].imageSrc).to.equal('/p/dummy.png');
    });

    it('Should load altImageUrl if (swatchImageSrc === imageSrc)', () => {
        const setParentSpyForNoImage = sinon.spy();
        wrapper.setProps({ deviceType: { isDesktop: true },
            imageSrc: '/p/dummy.png',
            setParentState: setParentSpyForNoImage,
            swatchImageSrc: '/p/dummy.png' });

        wrapper.instance().loadImageNotAvailable();
        expect(setParentSpyForNoImage.args[0][0].imageSrc).to.equal('/p/dummy.png');
    });
});

