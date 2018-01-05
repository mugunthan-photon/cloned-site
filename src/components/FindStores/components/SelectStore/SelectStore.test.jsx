import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SelectStoreConnected, { SelectStore } from './SelectStore';


describe('<SelectStore/> connected Component testing', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        selectedStore: {
            storeDetails: null,
            isGeoStore: false,
        },
    });

    const wrapper = mount(
        <Provider store={store}>
            <SelectStoreConnected />
        </Provider>,
    );
    expect(wrapper).to.exist;
});

describe('<SelectStore/> Component testing', () => {
    let wrapper;
    const storeDetails = {
        id: 1234,
    };
    const selectStoreActionSpy = sinon.spy();

    beforeEach(() => {
        wrapper = mount(
            <SelectStore
                storeInfo={storeDetails}
                storeDetails={storeDetails}
                selectStoreAction={selectStoreActionSpy}
            />,
        );
    });

    it('Should render "My Store"', () => {
        expect(wrapper.text()).to.contain('My Store');
    });

    it('Should render "My Store"', () => {
        wrapper.setProps({ storeInfo: { id: 22222 } });
        wrapper.find('button').simulate('click');
        expect(selectStoreActionSpy.callCount).to.equal(1);
    });

    it('Should return null', () => {
        wrapper.setProps({ theme: 'gallery' });
        wrapper.update();
        expect(wrapper.text()).to.contain('My Store');
    });
});

