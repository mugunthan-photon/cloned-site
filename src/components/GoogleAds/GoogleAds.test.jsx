import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import GoogleAds from './GoogleAds';

describe('<GoogleAds />', () => {
    it('calls componentDidMount', () => {
        const wrapper = shallow(<GoogleAds />);
        expect(wrapper.exists());
    });
});
