import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FindStoresMapView from './FindStoresMapView';
import StoreMockData from './__stories/mock';

describe('Component:MapWrapper', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <FindStoresMapView
                stores={StoreMockData.stores}
                center={StoreMockData.stores[0]}
            />,
        );
    });

    it('To check if the MapWrapper component exist', () => {
        expect(wrapper).to.exist;
    });

    it('Simulate click should change stores information', () => {
        wrapper.instance().clickStore({ plot: StoreMockData.stores[1] });
    });

    it('Check if the error message hides on re-render', () => {
        wrapper.setProps({ center: 1, stores: [1, 2] }); // This will call componentWillReceiveProps
        expect(wrapper.state('center')).to.equal(1);
    });
});
