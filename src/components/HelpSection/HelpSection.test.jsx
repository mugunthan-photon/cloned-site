import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ContextProvider from 'yoda-core-components/lib/components/FeatureFlag/ContextProvider';
import HelpSection from './HelpSection';

const { describe, it } = global;

describe(' Test Suite for <HelpSection/> ', () => {
    let wrapper;
    const helpSections = [
        {
            id: 1,
            key: 1,
            type: 'svg',
            text: 'Give us a call',
            textStrong: '1-800-322-1189',
            name: 'give-us-a-call',
            hidden: true,
            placeholder: false,
        },
        {
            id: 2,
            key: 2,
            type: 'svg',
            text: 'Ask us on twitter ',
            textStrong: '@askjcp',
            name: 'ask-us-on-twitter',
            hidden: false,
            placeholder: false,
        },
        {
            id: 3,
            key: 3,
            type: 'svg',
            text: 'More help and ',
            textStrong: 'Chat',
            name: 'more-help-and',
            placeholder: true,
        },
    ];


    it('HelpSection component should exist ', () => {
        wrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                <HelpSection config={helpSections} />
            </ContextProvider>,
        );
        expect(wrapper).to.exist;
        // expect(defaultWrapper).to.exist;
    });

    it('component should contain h3', () => {
        wrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                <HelpSection config={helpSections} />
            </ContextProvider>,
        );
        expect(wrapper.find('h3')).to.have.length(1);
        const helpSection = wrapper.find('#help-link-1-block');
        expect(helpSection).to.have.length(1);
    });
    it('component should contain help-link-1-block with feature flag off', () => {
        wrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                <HelpSection/>
            </ContextProvider>,
        );
        const helpSection = wrapper.find('#help-link-1-block');
        expect(helpSection).to.have.length(0);
    });

    it('component should contain help-link-give_call-block with feature flag', () => {
        wrapper = mount(
            <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: true } }}>
                <HelpSection/>
            </ContextProvider>,
        );
        const helpSection = wrapper.find('#help-link-give_call-block');
        expect(helpSection).to.have.length(1);
    });
    // it('Icon component should contain an SVG component', () => {
    //     expect(wrapper.find('svg')).to.have.length(0);
    // });
});
