import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import GridHeader from './GridHeader';

describe('Dumb Component Testing', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<GridHeader />);
    });

    it('Non Connected Dumb, component', () => {
        expect(wrapper).to.exist;
    });

    it('Prop Testing', () => {
        wrapper = shallow(<GridHeader marketingText="Fathers Day Deals" />);
        expect(wrapper).to.exist;
    });
});
