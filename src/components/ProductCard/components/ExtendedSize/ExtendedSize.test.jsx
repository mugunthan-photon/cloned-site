import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import config from '../../ProductCard.config';

import ExtendedSize from './ExtendedSize';

describe('<ExtendedSize />', () => {
    let wrapper;
    const extendedSizProps = {
        bottomBadge: {
            text: 'New',
        },
    };

    beforeEach(() => {
        wrapper = shallow(<ExtendedSize {...extendedSizProps} />);
    });

    it('Should render Extended Size', () => {
        expect(wrapper.find('div.extendedSize').length).to.equal(1);
    });

    it('Should render Extended Size in Product Description', () => {
        wrapper.setProps({ inDescription: true, deviceType: { isMobile: true }, cardType: config.cardTypes.LIST });
        expect(wrapper.find('div.extendedSize').length).to.equal(1);
    });

    it('Should not render Extended Size', () => {
        wrapper.setProps({ bottomBadge: {} });
        expect(wrapper.find('div.extendedSize').length).to.equal(0);
    });
});
