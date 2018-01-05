import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import LocationFinder from './LocationFinder';
import { findStoreErrorMessages, cookie } from '../../common/Constants';

const position = {};
position.coords = {};
position.coords.latitude = '60.558151';
position.coords.longitude = '22.095773';

describe('Test suite for LocationFinder component with no availabilty message', () => {
    let wrapper;

    let getStores = () => {};
    getStores = sinon.spy(getStores);

    const navigator = global.navigator;
    navigator.geolocation = {};
    navigator.geolocation.getCurrentPosition = success => success.call(null, position);

    beforeEach(() => {
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
        wrapper = mount(
            <LocationFinder
                onFormSubmit={getStores}
            />,
        );
    });

    afterEach(() => {
        wrapper.unmount();
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
    });

    it('LocationFinder component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('Check if availability and cancel button are not visible when availabilty msg is not present', () => {
        expect(wrapper.find('.availableMsg').hasClass('hide')).to.equal(true);
    });

    it('Check if the form hides on click of cancel button', () => {
        wrapper.find('.toggleForm').simulate('click');
        expect(wrapper.state('showForm')).to.equal(false);
    });

    it('Check if getLatLong method is called on click of Use my location', () => {
        wrapper.find('.locationBtn').simulate('click');
        expect(getStores).to.have.been.calledOnce;
    });

    it('Check if getStoresByZipCode method is called on form submission', () => {
        wrapper.find('input').simulate('change', { target: { value: '12345' } });
        wrapper.find('.searchStoreBtn').simulate('click');
        expect(getStores).to.have.been.calledOnce;
    });

    it('on enter, location search must be triggered', () => {
        wrapper.find('input').simulate('keyUp', { keyCode: 13 });
        expect(wrapper.state('locationError').showErrorMessage).to.equal(true);
    });

    it('Check if error message is shown when form is submitted with empty zipcode', () => {
        wrapper.find('.searchStoreBtn').simulate('click');
        expect(wrapper.state('locationError').showErrorMessage).to.equal(true);
        expect(wrapper.state('locationError').errorMsg).to.equal(findStoreErrorMessages.EMPTY_ZIP_CODE);
    });

    it('Check if error is handled when Use my location is clicked', () => {
        navigator.geolocation.getCurrentPosition = (success, error) => error.call(null, 'Geolocation not enabled !');
        wrapper.find('.locationBtn').simulate('click');
        expect(wrapper.state('locationError').showErrorMessage).to.equal(true);
    });

    it('Check if fallsback', () => {
        Cookies.save(cookie.LATLONG, '33.1872301,-96.67444979999999', '', '');
        navigator.geolocation.getCurrentPosition = (success, error) => error.call(null, 'Geolocation not enabled !');
        wrapper.find('.locationBtn').simulate('click');
        expect(wrapper.state('locationError').showErrorMessage).to.equal(false);
        Cookies.remove(cookie.LATLONG, '');
    });

    it('Check if error is handled when geolocation is not available in browser', () => {
        navigator.geolocation = null;
        wrapper.find('.locationBtn').simulate('click');
        expect(wrapper.state('locationError').showErrorMessage).to.equal(true);
        navigator.geolocation = {};
    });

    it('Check if message is hiding on click of close button', () => {
        navigator.geolocation = null;
        wrapper.find('.locationBtn').simulate('click');
        wrapper.find(MessageBox).find('button').simulate('click');
        expect(wrapper.state('locationError').showErrorMessage).to.equal(false);
        navigator.geolocation = {};
    });

    it('Check if zipCode state changes on zipcode change', () => {
        wrapper.find('input').simulate('change', { target: { value: '12345' } });
        expect(wrapper.state('zipCode')).to.equal('12345');
    });

    it('Check if miles state changes on miles change', () => {
        wrapper.find('select').simulate('change', { target: { value: '30' } });
        expect(wrapper.state('miles')).to.equal('30');
    });

    it('Check if the error message hides on re-render', () => {
        wrapper.setProps({}); // This will call componentWillReceiveProps
        expect(wrapper.state('locationError').showErrorMessage).to.equal(false);
    });

    it('Check if the error message hides on re-render', () => {
        wrapper.setProps({
            theme: 'findAStorePage',
        });
        wrapper.find('input').simulate('change', { target: { value: '12345' } });
        wrapper.find('.searchStoreBtn').simulate('click');
        expect(wrapper.state('invalidZipCode')).to.equal(false);
    });

    it('Check if the error message hides on re-render', () => {
        wrapper.setProps({
            theme: 'selectAStore',
        });
        wrapper.find('input').simulate('change', { target: { value: '1235' } });
        wrapper.find('.searchStoreBtn').simulate('click');
        expect(wrapper.state('invalidZipCode')).to.equal(true);
    });
});

describe('Test suite for LocationFinder component with availabilty message', () => {
    let getStores = () => {};
    let wrapper = {};
    getStores = sinon.spy(getStores);

    const navigator = global.navigator;
    navigator.geolocation = {};
    navigator.geolocation.getCurrentPosition = success => success.call(null, position);

    beforeEach(() => {
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
        wrapper = mount(
            <LocationFinder
                onFormSubmit={getStores}
                restrictMiles
            >7 stores within 25mi of 75920</LocationFinder>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
    });

    it('Check if availability and cancel button are visible when availabilty msg is present', () => {
        expect(wrapper.find('.availableMsg').hasClass('hide')).to.equal(false);
    });
});
