import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import FooterLinks from './FooterLinks';
import DefaultTemplate from '../../YodaFooter.config';

describe('Test Suite for <FooterLinks>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<FooterLinks/>);
    });

    it('FooterLinks component should exist in desktop view for expandedFooter', () => {
        wrapper.setProps({
            deviceType: {
                isDesktop: true,
            },
            expandedFooter: true,
            footerMenus: DefaultTemplate,
        });
        expect(wrapper).to.be.exist;
    });
    it('FooterLinks component should exist in desktop view for expandedFooter', () => {
        wrapper.setProps({
            deviceType: {
                isDesktop: true,
            },
            expandedFooter: true,
            footerMenus: {},
        });
        expect(wrapper).to.be.exist;
    });
    it('FooterLinks component should exist in desktop view for expandedFooter', () => {
        wrapper.setProps({
            deviceType: {
                isMobile: true,
            },
            expandedFooter: true,
            footerMenus: {},
        });
        expect(wrapper).to.be.exist;
    });
    it('FooterLinks credit card image should exist ', () => {
        wrapper.setProps({
            deviceType: {
                isDesktop: true,
            },
            expandedFooter: true,
            footerMenus: DefaultTemplate,
        });
        expect(wrapper).to.be.exist;
        expect(wrapper.find('img')).to.have.length(2);
    });

    it('FooterLinks component should exist in desktop view for condensedFooter', () => {
        wrapper.setProps({
            deviceType: {
                isDesktop: true,
            },
            condensedFooter: true,
            footerMenus: DefaultTemplate,
        });
        expect(wrapper).to.be.exist;
    });
    it('Simulate accordian click in device view', () => {
        wrapper.setProps({
            deviceType: {
                isMobile: true,
            },
            expandedFooter: true,
            footerMenus: DefaultTemplate,
        });
        expect(wrapper).to.be.exist;
        expect(wrapper.find('AccordionSection')).to.be.exist;
    });
});

