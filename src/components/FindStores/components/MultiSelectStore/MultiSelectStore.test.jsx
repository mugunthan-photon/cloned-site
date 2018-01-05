import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SelectStoreCheckboxConnected from './MultiSelectStore';
import { storeInfoMock } from '../../../../../test/mockData/FindAStorePageDetails';


describe('<MultiSelectStore/> connected Component testing', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        galleryStoreReducer: {
            selectedStores: [storeInfoMock.stores[0]],
        },
    });
    const selectStoreAction = sinon.spy();

    const wrapper = mount(
        <Provider store={store}>
            <SelectStoreCheckboxConnected
                selectStoreAction={selectStoreAction}/>
        </Provider>,
    );

    expect(wrapper).to.exist;

    it('Should render button with 1 selected store', () => {
        expect(wrapper.find('button').text()).to.equal('Select Stores (1)');
        wrapper.find('button').simulate('click');
        expect(selectStoreAction.callCount).to.equal(1);
    });
});

