import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import FilterStore from './FilterStore';
import { storeInfoMock } from '../../../../../test/mockData/FindAStorePageDetails';

describe('<FilterStore/> component testing', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
        const onFilterChange = () => {};
        const deviceType = {
            isMobile: true,
        };
        wrapper = mount(
            <FilterStore
                onFilterChange={onFilterChange}
                stores={storeInfoMock.stores}
                deviceType={deviceType}
            />,
        );
        wrapperInstance = wrapper.instance();
    });

    it('FilterStore component should exist', () => {
        expect(wrapper).to.exist;
    });

    it('Default state of component', () => {
        expect(wrapper.state()).to.deep.equal({
            displayFilters: false,
        });
    });

    it('Should render mobileFilterStoreBlock container for mobile view', () => {
        expect(wrapper.find('div.mobileFilterStoreBlock').length).to.equal(1);
    });

    it('Should not display filters on initial load and display on click', () => {
        expect(wrapper.find('div.mobileFilterStoreBlock input[type="checkbox"]').length).to.equal(0);
        wrapper.find('div.mobileFilterStoreBlock button').simulate('click');
        expect(wrapper.state().displayFilters).to.be.true;
        expect(wrapper.find('div.mobileFilterStoreBlock input[type="checkbox"]').length).to.equal(10);
    });

    it('Should render filterStoreBlock for large screen devices', () => {
        wrapper.setProps({ deviceType: { isMobile: false } });
        expect(wrapper.find('div.filterStoreBlock').length).to.equal(1);
        const event = {
            type: 'click',
            nativeEvent: { stopImmediatePropagation: () => {} },
        };
        wrapperInstance.toggleFilters(event);
        expect(wrapper.state().displayFilters).to.be.true;
    });
});
