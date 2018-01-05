import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ProductPromotionCard, { getOverlayStyle, getOverlayLabel } from './ProductPromotionCard';
import mock from './__stories/mock';

const { describe, it } = global;

describe('<ProductPromotionCard> Product Promotion Card', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<ProductPromotionCard {...mock} />);
    });

    it('ProductPromotionCard component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('ProductPromotionCard component should contain a Card component', () => {
        expect(wrapper.find('Card')).to.exist;
    });

    it('overlay with o option', () => {
        expect(getOverlayStyle('o')).to.be.string;
    });
    it('overlay with f option', () => {
        expect(getOverlayStyle('f')).to.be.string;
    });

    it('overlay label o', () => {
        expect(getOverlayLabel('o')).to.be.string;
    });

    it('overlay label f', () => {
        expect(getOverlayLabel('f')).to.be.string;
    });

    it('ProductPromotionCard link', () => {
        expect(wrapper.find({ href: '/g/ana-women/N-bwo3xZ3v?cm_re=HP-DT-_-c2-_-First one|1|o_MW' }).length).to.equal(1);

        wrapper.setProps({ deviceType: { isDesktop: true } });
        expect(wrapper.find({ href: '/g/ana-women/N-bwo3xZ3v?cm_re=HP-DT-_-c2-_-First one|1|o_DT' }).length).to.equal(1);

        wrapper.setProps({ deviceType: { isTablet: true }, isOverlay: false });
        expect(wrapper.find({ href: '/g/ana-women/N-bwo3xZ3v?cm_re=HP-DT-_-c2-_-First one|1|o_TW' }).length).to.equal(1);
    });

    it('URL - With out ?', () => {
        mock.pageURL = '/g/ana-women/N-bwo3xZ3v?';
        wrapper = shallow(<ProductPromotionCard {...mock} />);
        expect(wrapper.find({ href: '/g/ana-women/N-bwo3xZ3v?&cm_re=HP-DT-_-c2-_-First one|1|o_MW' }).length).to.equal(1);
    });
});
