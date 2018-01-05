import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import FindStoresPageView from './FindStoresPageView';
import StoreDetailsCard from '../StoreDetailsCard/StoreDetailsCard';
import Constants from '../../../../common/Constants';
import { findStoresDetails } from '../../../../../test/mockData/FindStoresDetails';

describe('<FindStoresPageView />', () => {
    let wrapper;
    const mockStore = configureStore([]);
    describe('FindStoresPageView mounted with stores data', () => {
        const store = mockStore({
            selectedStore: findStoresDetails.stores[0],
        });
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresPageView
                        selectStoreAction={() => {}}
                        zipCode={findStoresDetails.zipCode}
                        stores={findStoresDetails.stores}
                    />
                </Provider>,
            );
        });

        it('FindStoresPageView component should exist ', () => {
            expect(wrapper).to.exist;
            expect(wrapper.find(StoreDetailsCard)).to.exist;
        });
    });

    describe('FindStoresPageView mounted - Initial', () => {
        const store = mockStore({
            selectedStore: findStoresDetails.stores[0],
        });
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresPageView
                        selectStoreAction={() => {}}
                        stores={[]}
                    />
                </Provider>,
            );
        });

        it('FindStoresPageView component should display default text if no stores set at header ', () => {
            expect(wrapper).to.exist;
            expect(wrapper.find(MessageBox)).to.have.length(1);
            expect(wrapper.find(MessageBox).text()).to.contain(Constants.findStores.defaultTitle);
        });
    });

    describe('FindStoresPageView mounted with no stores', () => {
        const findMoreStoresSpy = sinon.spy();
        const store = mockStore({
            selectedStore: findStoresDetails.stores[0],
        });
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresPageView
                        selectStoreAction={() => {}}
                        zipCode={findStoresDetails.zipCode}
                        stores={[]}
                        deviceType={{ isMobile: false }}
                        miles={findStoresDetails.miles}
                        theme={Constants.findStoreThemes.findAStorePage}
                        nextPageLink={findStoresDetails.nextPageLink}
                        findMoreStores={findMoreStoresSpy}
                        mapView
                    />
                </Provider>,
            );
        });

        it('FindStoresPageView component should error message when no stores were found ', () => {
            expect(wrapper).to.exist;
            expect(wrapper.find(MessageBox)).to.have.length(1);
        });
    });

    describe('FindStoresPageView mounted with stores', () => {
        const findMoreStoresSpy = sinon.spy();
        const store = mockStore({
            selectedStore: findStoresDetails.stores[0],
        });
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresPageView
                        selectStoreAction={() => {}}
                        zipCode={findStoresDetails.zipCode}
                        stores={findStoresDetails.stores}
                        deviceType={{ isMobile: false }}
                        miles={findStoresDetails.miles}
                        theme={Constants.findStoreThemes.findAStorePage}
                        nextPageLink={findStoresDetails.nextPageLink}
                        findMoreStores={findMoreStoresSpy}
                        mapView
                    />
                </Provider>);
        });

        it('Should render store details ', () => {
            expect(wrapper.find(StoreDetailsCard)).to.exist;
        });
    });

    describe('FindStoresPageView mounted with stores', () => {
        const findMoreStoresSpy = sinon.spy();
        const store = mockStore({
            selectedStore: findStoresDetails.stores[0],
        });
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresPageView
                        selectStoreAction={() => {}}
                        zipCode={findStoresDetails.zipCode}
                        stores={findStoresDetails.stores}
                        deviceType={{ isMobile: false }}
                        miles={100}
                        theme={Constants.findStoreThemes.findAStorePage}
                        nextPageLink={findStoresDetails.nextPageLink}
                        findMoreStores={findMoreStoresSpy}
                        mapView
                    />
                </Provider>);
        });

        it('Should render store details ', () => {
            expect(wrapper.find(StoreDetailsCard)).to.exist;
            wrapper.find('.loadMoreContainer button').simulate('click');
            expect(findMoreStoresSpy.callCount).to.equal(1);
        });
    });

    describe('FindStoresPageView mounted with stores', () => {
        const findMoreStoresSpy = sinon.spy();
        const store = mockStore({
            galleryStoreReducer: {
                selectedStores: [findStoresDetails.stores[0]],
            },
            selectedStore: findStoresDetails.stores[0],
        });
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresPageView
                        selectStoreAction={() => {}}
                        zipCode={findStoresDetails.zipCode}
                        stores={findStoresDetails.stores}
                        deviceType={{ isMobile: false }}
                        miles={100}
                        theme={Constants.findStoreThemes.gallery}
                        nextPageLink={findStoresDetails.nextPageLink}
                        findMoreStores={findMoreStoresSpy}
                        mapView
                    />
                </Provider>);
        });

        it('Should render MultiSelectStore ', () => {
            expect(wrapper.find('MultiSelectStore').length).to.equal(1);
        });
    });
});
