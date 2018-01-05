import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';


import ProductBadge from './ProductBadge';

describe('<ProductBadge />', () => {
    let wrapper;
    const badgeProps = {
        upperBadge: {
            text: 'new',
        },
        playVideo: false,
    };

    beforeEach(() => {
        wrapper = shallow(<ProductBadge {...badgeProps}/>);
    });

    it('Should render product badge', () => {
        wrapper.debug();
        expect(wrapper.find('div.badge').length).to.equal(1);
    });

    it('Should render bundle product badge', () => {
        wrapper.setProps({ badge: { text: 'new', type: 'bundle' } });
        expect(wrapper.find('BundleBadge').length).to.equal(1);
    });

    it('Should not render product badge', () => {
        wrapper.setProps({ playVideo: true });
        expect(wrapper.find('div.badge').length).to.equal(0);
    });
});
