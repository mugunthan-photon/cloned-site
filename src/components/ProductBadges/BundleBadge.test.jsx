import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import BundleBadge from './BundleBadge';

describe('<SEO Meta Data Testcases />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <BundleBadge text={'save up to $3.98'} cardType="grid"/>,
        );
    });

    it('Connected Smart Components, with connect', () => {
        wrapper.setProps({ text: '' });
        wrapper.setProps({ text: 'save up to $40', cardType: 'list' });
        wrapper.setProps({ text: 'save up to $40', cardType: '' });
        expect(wrapper).to.exist;
    });
});
