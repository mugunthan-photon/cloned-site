import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import SwatchList from './SwatchList';
// import { datasource } from '../../__stories/mock';

describe('<SwatchList /> - Product Card', () => {
    let wrapper;
    const setParentStateSpy = sinon.spy();
    const onMouseOverResponse = { swatchImageSrc: '//s7d4.scene7.com/is/image/JCPenney/DP0808201620472431C.tif\n?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2',
        imageSrc: '//s7d4.scene7.com/is/image/JCPenney/DP0808201620472431C.tif\n?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2',
        imageError: false };
    const skuSwatch = [
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
        skuSwatch,
        swatchHide: 'closeSwatch',
        setParentState: setParentStateSpy,
    };

    beforeEach(() => {
        wrapper = shallow(<SwatchList {...swatchProps}/>);
    });

    it('Should render render two color swatches', () => {
        expect(wrapper.find('li.swatchContainer').length).to.equal(2);
    });

    it('Should not change ProductImage on hover', () => {
        wrapper.find('button.swatchCard').at(0).simulate('mouseLeave');
        expect(setParentStateSpy.callCount).to.equal(0);
    });

    it('Should change Product Image on Hover', () => {
        skuSwatch[0].defaultSwatch = true;
        wrapper.setProps({ skuSwatch });
        wrapper.find('button.swatchCard').at(0).simulate('mouseOver');
        expect(setParentStateSpy.args[0][0]).to.deep.equal(onMouseOverResponse);
    });

    it('Should set activeSwatchImageId on click of swatch', () => {
        wrapper.find('button.swatchCard').at(0).simulate('click');
        expect(wrapper.state().activeSwatchImageId).to.equal('DP0830201317120247S.jpg');
    });
});
