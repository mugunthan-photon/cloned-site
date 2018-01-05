import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Message from './Message';

const childrenMockId = 'children-mock-id';
const childrenMock = (
    <div id={childrenMockId}>I am mock</div>
);
const titleMock = 'titleMock';

describe('<Message /> ', () => {
    it('Message exists', () => {
        const wrapper = mount(
            <Message/>,
        );

        expect(wrapper).to.exist; // eslint-disable-line
        expect(wrapper.find('div.message')).to.have.lengthOf(1);
    });

    it('Message Title And Children are rendered in case are provided', () => {
        const wrapper = mount(
            <Message title={titleMock}>
                {childrenMock}
            </Message>,
        );

        expect(wrapper).to.exist; // eslint-disable-line
        expect(wrapper.find('.messageTitle')).to.have.lengthOf(1);
        expect(wrapper.find(`#${childrenMockId}`)).to.have.lengthOf(1);
    });
});
