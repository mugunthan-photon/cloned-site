import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import PreRender from './PreRender';

describe('PreRender Testcases', () => {
    let wrapper;

    it('Connected Smart Components, with connect', () => {
        wrapper = mount(
            <PreRender url="/p/product"/>,
        );
        expect(wrapper).to.exist;
    });

    it('PreRender should not happen if url is not available', () => {
        wrapper = shallow(
            <PreRender/>,
        );
        wrapper.instance().shouldComponentUpdate();
        expect(wrapper).to.exist;
    });
});
