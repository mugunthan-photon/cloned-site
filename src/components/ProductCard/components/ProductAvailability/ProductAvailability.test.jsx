import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import config from '../../ProductCard.config';
import ProductAvailabilityConnected, { ProductAvailability } from './ProductAvailability';
import { datasource } from '../../__stories/mock';

describe('<ProductAvailability />', () => {
    let wrapper;
    const availabilityProps = {
        deviceType: { isDesktop: true },
        cardType: config.cardTypes.GRID,
        featureFlags: { enableProductAvailability: true },
        availabilityStatus: datasource.availabilityStatus,
    };
    beforeEach(() => {
        wrapper = shallow(<ProductAvailability {...availabilityProps} />);
    });

    it('Should render availability status', () => {
        expect(wrapper.find('div.availabilityWrapper').length).to.equal(1);
        expect(wrapper.find('li.availabilityMessageWrapper').length).to.equal(2);
    });

    it('Should truncate store name if it is more than 19 char', () => {
        datasource.availabilityStatus[0].storeName = 'Store More than 19 characters';
        datasource.availabilityStatus[0].icon = 'cross';
        delete datasource.availabilityStatus[1].icon;
        wrapper.setProps({ availabilityStatus: datasource.availabilityStatus });
        expect(wrapper.find('div.storeLoc').text()).to.equal('Store More than 19 ...');
    });

    it('Should not render availability status', () => {
        wrapper.setProps({ deviceType: { isDesktop: false } });
        expect(wrapper.find('div.availabilityWrapper').length).to.equal(0);
    });
});


describe('<ProductAvailability /> Connected', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { featureFlags: { enableProductAvailability: false } },
    });
    const context = { store };
    const wrapper = shallow(<ProductAvailabilityConnected />, { context });

    it('Should not render availability status', () => {
        expect(wrapper.find('div.availabilityWrapper').length).to.equal(0);
    });
});

