import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import MessagePopup from './MessagePopup';

describe('<MessagePopup /> ', () => {
    it('MessagePopup exists', () => {
        const wrapper = mount(
            <MessagePopup/>,
        );

        expect(wrapper).to.exist; // eslint-disable-line
        expect(wrapper.find('ModalBox')).to.have.lengthOf(1);
    });
});
