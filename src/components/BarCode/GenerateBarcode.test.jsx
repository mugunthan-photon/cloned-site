import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import GenerateBarcode from './GenerateBarcode';

describe('GenerateBarcode', () => {
    const stateData = {
        id: 'MC8351351120005143000073',
        reference: '',
    };

    const wrapper = mount(
        <GenerateBarcode id={stateData.id} />,
    );

    it('should render a svg', () => {
        expect(wrapper.find('svg')).to.have.length(1);
    });
});

