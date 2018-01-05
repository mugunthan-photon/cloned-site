import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import ProductCard from './ProductCard';

describe('<ProductCard /> component testing', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ProductCard />);
    });

    it('Should render ProductCard', () => {
        expect(wrapper.find('ProductVideo').exists()).to.equal(true);
        expect(wrapper.find('ProductBadge').exists()).to.equal(true);
        expect(wrapper.find('ProductImage').exists()).to.equal(true);
        expect(wrapper.find('ExtendedSize').exists()).to.equal(true);
    });

    it('Should display showSaveForlater', () => {
        wrapper.setProps({ showSaveForlater: true });
        expect(wrapper.find('[name="enableSaveForLater"]').exists()).to.equal(true);
    });

    it('Should hide Image when video is clicked', () => {
        wrapper.instance().setParentState({ playVideo: true });
        expect(wrapper.find('div.hideImage').exists()).to.equal(true);
        wrapper.setProps({ deviceType: { isDesktop: true } });
        expect(wrapper.find('[cardClass="card cardMinWidth"]').exists()).to.equal(true);
    });
});

