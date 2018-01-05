import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import RenderIcon from './RenderIcon';

describe('RenderIcon', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<RenderIcon iconName="icon-green-check" />);
    });

    it('To check if the RenderIcon component exist', () => {
        expect(wrapper).to.exist;
    });

    it('component should contain a span tag as a parent', () => {
        expect(wrapper.type()).to.equal('span');
    });

    it('component should render provided icon', () => {
        expect(wrapper.html()).to.contains('icon-green-check');
    });
});
