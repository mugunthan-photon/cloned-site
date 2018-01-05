import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import ColorSwatch from './ColorSwatch';
import { datasource } from '../../__stories/mock';

describe('<ColorSwatch /> - Product Card', () => {
    let wrapper;
    const setParentStateSpy = sinon.spy();
    const productClickSpy = sinon.spy();
    const colors = [
        {
            colorName: 'Black',
            swatchImageId: 'DP0830201317120247S.jpg',
            colorizedImageId: 'DP0808201620472431C.tif',
            colorSeqNum: 1,
        },
        {
            colorName: 'Black Blue Stud',
            swatchImageId: 'DP0201201718514956S.jpg',
            colorizedImageId: 'DP0201201718514906M.tif',
            colorSeqNum: 2,
        },
    ];
    const swatchProps = {
        skuSwatch: colors,
        deviceType: { isDesktop: true },
        productUrl: '/p/shirts',
        setParentState: setParentStateSpy,
    };

    beforeEach(() => {
        wrapper = shallow(<ColorSwatch {...swatchProps}/>);
    });

    it('Should render color swatches', () => {
        expect(wrapper.find('div.colorSwatch').length).to.equal(1);
    });

    it('Hide and Show swatch functionality', () => {
        wrapper.setProps({ skuSwatch: datasource.skuSwatch });
        expect(wrapper.find("[name='icon-plus']").length).to.equal(1);
        wrapper.find("[name='icon-plus']").parent().simulate('click');
        expect(wrapper.state().showAllSwatchs).to.equal(true);
        expect(wrapper.find("[name='icon-minus']").length).to.equal(1);
        wrapper.find("[name='icon-minus']").parent().simulate('click');
        expect(wrapper.state().showAllSwatchs).to.equal(false);
    });

    it('Should render "View all colors" text', () => {
        wrapper.setProps({ skuSwatch: datasource.skuSwatch });
        wrapper.find("[name='icon-plus']").parent().simulate('click');
        expect(wrapper.find('a.moreSwatchText').length).to.equal(1);
        wrapper.find('a.moreSwatchText').simulate('click');
        wrapper.setProps({ onProductClick: productClickSpy });
        wrapper.find('a.moreSwatchText').simulate('click');
        expect(productClickSpy.callCount).to.equal(1);
    });

    it('Should not render "View all colors" text', () => {
        wrapper.setProps({ skuSwatch: datasource.skuSwatch.splice(0, 7) });
        wrapper.find("[name='icon-plus']").parent().simulate('click');
        expect(wrapper.find('a.moreSwatchText').length).to.equal(0);
    });

    it('Should return null', () => {
        wrapper.setProps({ deviceType: { isDesktop: false } });
        expect(wrapper.find('div.colorSwatch').length).to.equal(0);
    });
});
