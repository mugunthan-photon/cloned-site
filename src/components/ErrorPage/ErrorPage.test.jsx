import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Error from './ErrorPage';

describe('<ErrorPages />', () => {
    const wrapper = mount(<Error />);
    it('ErrorPages Test', () => {
        expect(wrapper).to.exist;
    });
    it('ErrorPages component should contain an List component for 404Error', () => {
        expect(wrapper.find('List')).to.exist;
        wrapper.setProps({
            data: [{
                name: 'back to home',
                icon: 'twitter-fill',
            }],
            templateType: '404',
            errorInformation: 'Oops, something went wrong...',
            linkstitle: 'More Suggestions',
            assistancetitle: 'Need Assistance?',
            detailsData: 'We are unable to connect you to the page requested. Please try your request again.',
        });
    });

    it('ErrorPages component should contain an List component for 500Error', () => {
        expect(wrapper.find('List')).to.exist;
        wrapper.setProps({
            data: [{
                name: 'Back to Previous Page',
                icon: 'twitter-fill',
            }],
            templateType: '500',
            errorInformation: 'Oops, something went wrong...',
            linkstitle: 'Helpful Links',
            assistancetitle: 'Need Assistance?',
            detailsData: 'We couldnt find the page you were looking for; it may have been changed or removed.',
            informationData: 'Continue browsing our site or choose an option below:',
        });
        const windowReloadFunction = sinon.spy();
        wrapper.find('button').at(0).simulate('click');
        expect(windowReloadFunction()).to.be.called;
    });

    it('ErrorPages component should contain an List component for 500Error', () => {
        expect(wrapper.find('List')).to.exist;
        wrapper.setProps({
            data: [{
                name: 'back to home',
                icon: 'twitter-fill',
            }],
            templateType: '500',
            errorInformation: 'Oops, something went wrong...',
            linkstitle: 'More Suggestions',
            assistancetitle: 'Need Assistance?',
            detailsData: 'We are unable to connect you to the page requested. Please try your request again.',
        });
        const windowFunction = sinon.spy();
        wrapper.find('List ul li button').simulate('click');
        expect(windowFunction()).to.be.called;
    });

    it('ErrorPages component should contain an List component for 500', () => {
        expect(wrapper.find('List')).to.exist;
        wrapper.setProps({
            data: [{
                name: 'Back to Previous Page',
                icon: 'twitter-fill',
            }],
            templateType: '500',
            errorInformation: 'Oops, something went wrong...',
            linkstitle: 'More Suggestions',
            assistancetitle: 'Need Assistance?',
            detailsData: 'We are unable to connect you to the page requested. Please try your request again.',
        });
    });

    it('ErrorPages component should contain an List component for 400', () => {
        expect(wrapper.find('List')).to.exist;
        wrapper.setProps({
            data: [{
                name: 'Back to Previous Page',
                icon: 'twitter-fill',
            }],
            templateType: '404',
            errorInformation: 'Oops, something went wrong...',
            linkstitle: 'More Suggestions',
            assistancetitle: 'Need Assistance?',
            detailsData: 'We are unable to connect you to the page requested. Please try your request again.',
        });
    });
});
