import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SelectStoreCheckboxConnected from './SelectStoreCheckbox';
import { storeInfoMock } from '../../../../../test/mockData/FindAStorePageDetails';


describe('<SelectStoreCheckbox/> connected Component testing - With Selected Store', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        galleryStoreReducer: {
            selectedStores: [storeInfoMock.stores[0]],
        },
    });

    const wrapper = mount(
        <Provider store={store}>
            <SelectStoreCheckboxConnected storeInfo={storeInfoMock.stores[0]}/>
        </Provider>,
    );

    expect(wrapper).to.exist;

    it('Store should be checked on load - Store present in selectedStores', () => {
        expect(wrapper.find('input[checked=true]').length).to.equal(1);
        wrapper.find('input[checked=true]').simulate('change');
    });

    it('onChangeCallback should be trigerred', () => {
        const onChangeCallbackSpy = sinon.spy();
        const wrapperWithCallback = mount(
            <Provider store={store}>
                <SelectStoreCheckboxConnected
                    storeInfo={storeInfoMock.stores[0]}
                    onChangeCallback={onChangeCallbackSpy}/>
            </Provider>,
        );
        wrapperWithCallback.find('input[checked=true]').simulate('change');
        expect(onChangeCallbackSpy.callCount).to.equal(1);
    });
});

describe('<SelectStoreCheckbox /> - 0 Selected Store', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        galleryStoreReducer: {
            selectedStores: [storeInfoMock.stores[1]],
        },
    });

    const wrapper = mount(
        <Provider store={store}>
            <SelectStoreCheckboxConnected
                storeInfo={storeInfoMock.stores[0]} />
        </Provider>,
    );

    it('Store should not be checked', () => {
        expect(wrapper.find('input[checked=true]').length).to.equal(0);
    });
});
