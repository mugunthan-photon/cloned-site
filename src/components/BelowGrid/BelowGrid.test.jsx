import React from 'react';
import { mount } from 'enzyme';
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import BelowGrid from './BelowGrid';
import GridPainter from './GridPainter';
import MockData from './__stories/mock';


describe('<BelowGrid />', () => {
    describe('Main', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(<BelowGrid gridData={MockData} />);
        });

        it('component exist', () => {
            expect(wrapper).to.exist;
        });

        it('compoent will receive props', () => {
            wrapper.setProps({ gridData: MockData });
            wrapper.update();
            const instance = wrapper.instance();
            expect(instance.constructWithImageUrl()).to.length.above(0);
        });

        it('compoent will receive props wthout griddata', () => {
            wrapper.setProps({ gridData: [] });
            wrapper.update();
            const instance = wrapper.instance();
            expect(instance.constructWithImageUrl()).to.length.below(1);
        });

        it('compoent will receive props, getdata contains unexpected data', () => {
            wrapper.setProps({ gridData: [{ belowGridContents: [{}] }] });
            wrapper.update();
            const instance = wrapper.instance();
            expect(instance.constructWithImageUrl()).to.length.above(0);
        });
    });
    describe('GridPainter', () => {
        it('paintImgBanner without imageSrc', () => {
            expect(GridPainter.paintImgBanner({})).to.be.null;
        });
        it('paintImgMap without imageSrc', () => {
            expect(GridPainter.paintImgMap({})).to.be.null;
        });
        it('paintImgMap empty image map area ', () => {
            expect(GridPainter.paintImgMap({ image: 'IMG', imagemapArea: [] })).to.be.null;
        });
        it('renderImageMapOrImageBanner with no data ', () => {
            expect(GridPainter.renderImageMapOrImageBanner(null)).to.be.null;
        });
    });
});
