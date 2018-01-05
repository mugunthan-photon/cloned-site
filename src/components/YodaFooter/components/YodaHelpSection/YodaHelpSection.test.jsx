import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import HelpSection from './YodaHelpSection';

const { describe, it } = global;

describe(' Test Suite for <HelpSection/> ', () => {
    let wrapper;

    const helpSections = [
        {
            id: 'give_call',
            key: 1,
            type: 'svg',
            text: 'Give us a call ',
            textStrong: '1-800-JCP-RWDS',
            linkPath: 'tel:1-800-322-1189',
            name: 'phone',
        },
        {
            id: 'text_us',
            key: 2,
            type: 'svg',
            text: 'Send us a text ',
            textStrong: 'IM Message',
            linkPath: 'tel:1-855-808-7710',
            name: 'chat-fill',
        },
        {
            id: 'ask_us',
            key: 3,
            type: 'svg',
            text: 'Ask us on twitter ',
            textStrong: '@askjcp',
            linkPath: 'https://twitter.com/askjcp',
            name: 'ask-us-on-twitter',
            newTab: '_blank',
        },
        {
            id: 'chat_us',
            key: 4,
            type: 'svg',
            text: 'Chat with us ',
            textStrong: 'Customer Service',
            linkPath: '/customerService',
            name: 'customer-service',
        },
    ];

    const helpSectionRenderer = dataItem => (
        <a>
            <span>
                <Icon
                    iconType={dataItem.type} width="30px" height="30px" viewBox="0 0 1024 1024"
                    name={dataItem.name}
                />
            </span>
            <span key={dataItem.id}>{dataItem.text}
                <strong> {dataItem.textStrong} </strong>
            </span>
        </a>
    );

    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<HelpSection datasource={helpSections} childRenderer={helpSectionRenderer}/>);
    });

    it('HelpSection component should exist ', () => {
        expect(wrapper).to.exist;
    });
});
