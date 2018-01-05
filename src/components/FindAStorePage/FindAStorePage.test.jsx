import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FindAStorePageConnected, { FindAStorePage } from './FindAStorePage';
import { storeInfoMock } from '../../../test/mockData/FindAStorePageDetails';

describe('<FindAStorePage/> Component testing', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const findMoreStoresPage = sinon.spy();
    const findStoresPage = sinon.spy();
    const setMyStore = sinon.spy();
    const deviceType = { isMobile: true };
    const storeInfo = {
        storeSelectedServices: [],
        count: 0,
        miles: 15,
        nextPageLink: 'http://m.jcpenney.com/v2/stores?limit=15&storeService=&latitude=33.0787152&longitude=-96.8083063&dpAkamaiOverride=1',
    };
    const actions = {
        findMoreStoresPage,
        findStoresPage,
        setMyStore,
        prePopulateStores: sinon.spy(),
    };
    let store = mockStore({
        findAStorePageInfo: storeInfo,
        context: { deviceType },
        galleryStoreReducer: {
            selectedStores: [],
            headerStore: null,
        },
        actions,
    });

    describe('FindAStorePage component exists', () => {
        const context = { store };
        wrapper = shallow(<FindAStorePage
            actions={actions}
            selectedStore={{}}
            deviceType={{}}
            storeInfo={storeInfo}/>, { context });
        expect(wrapper).to.exist;
        wrapper.setProps({ foo: 'foo' });
    });

    describe('onFilterChange condition', () => {
        store = mockStore({
            context: { deviceType },
            selectedStore: {
                storeDetails: storeInfoMock.stores[0],
            },
            findAStorePageInfo: {
                stores: storeInfoMock.stores,
                initialPageLink: 'http://dummyLink',
                storeSelectedServices: ['majorappliances'],
            },
            galleryStoreReducer: {
                selectedStores: [],
                headerStore: null,
            },
            actions,
        });

        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindAStorePageConnected/>
                </Provider>);
        });

        it('FindAStorePage exists', () => {
            expect(wrapper).to.exist;
        });

        it('findMoreStoresPage should not be trigerred', () => {
            wrapper.find('div.mobileFilterStoreBlock button').simulate('click');
            wrapper.find('div.mobileFilterStoreBlock input[type="checkbox"]').at(0).simulate('change');
            expect(findMoreStoresPage.callCount).to.equal(0);
        });
    });

    describe('findMoreStoresPage should be trigerred', () => {
        const newStore = mockStore({
            context: { deviceType },
            selectedStore: {
                storeDetails: storeInfoMock.stores[0],
            },
            findAStorePageInfo: {
                stores: storeInfoMock.stores,
                storeSelectedServices: ['majorappliances'],
            },
            galleryStoreReducer: {
                selectedStores: [],
                headerStore: null,
            },
            actions,
        });
        wrapper = mount(
            <Provider store={newStore}>
                <FindAStorePageConnected/>
            </Provider>);

        wrapper.find('div.mobileFilterStoreBlock button').simulate('click');
        wrapper.find('div.mobileFilterStoreBlock input[type="checkbox"]').at(0).simulate('change');
    });

    describe('Tooltip block should be rendred', () => {
        const newStore = mockStore({
            selectedStore: {
                storeDetails: storeInfoMock.stores[0],
            },
            findAStorePageInfo: {
                stores: storeInfoMock.stores,
                storeSelectedServices: ['majorappliances'],
                invalidInput: true,
            },
            galleryStoreReducer: {
                selectedStores: [],
                headerStore: null,
            },
            actions,
        });
        wrapper = mount(
            <Provider store={newStore}>
                <FindAStorePageConnected/>
            </Provider>);

        expect(wrapper.find('div.filterStoreBlock').length).to.equal(1);

        it('on setMyStore should not be trigerred on unMount', () => {
            wrapper.unmount();
            expect(setMyStore.callCount).to.equal(0);
        });
    });

    describe('Should trigger setMyStore if user doesnt select a store', () => {
        const newStore = mockStore({
            selectedStore: {
                storeDetails: null,
            },
            findAStorePageInfo: {
                stores: storeInfoMock.stores,
                storeSelectedServices: ['majorappliances'],
                invalidInput: true,
            },
            galleryStoreReducer: {
                selectedStores: [],
                headerStore: null,
            },
            actions,
        });
        const newWrapper = mount(
            <Provider store={newStore}>
                <FindAStorePageConnected/>
            </Provider>);


        it('on setMyStore should not be trigerred on unMount', () => {
            newWrapper.unmount();
            newWrapper.update();
            expect(setMyStore.callCount).to.equal(0);
        });
    });

    describe('Should trigger setMyStore if user doesnt select a store - Theme - Gallery', () => {
        const newStore = mockStore({
            selectedStore: {
                storeDetails: null,
            },
            findAStorePageInfo: {
                stores: storeInfoMock.stores,
                storeSelectedServices: ['majorappliances'],
                invalidInput: true,
            },
            galleryStoreReducer: {
                selectedStores: [],
                headerStore: null,
            },
            actions,
        });
        const newWrapper = mount(
            <Provider store={newStore}>
                <FindAStorePageConnected theme="gallery"/>
            </Provider>);


        it('on setMyStore should not be trigerred on unMount', () => {
            newWrapper.unmount();
            newWrapper.update();
            expect(setMyStore.callCount).to.equal(0);
        });
    });
});
