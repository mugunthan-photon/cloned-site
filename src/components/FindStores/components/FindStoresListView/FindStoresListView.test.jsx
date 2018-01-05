import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import FindStoresListView from './FindStoresListView';
import StoreDetailsCard from '../StoreDetailsCard/StoreDetailsCard';
import Constants from '../../../../common/Constants';
import { findStoresDetails } from '../../../../../test/mockData/FindStoresDetails';

describe('<FindStoresListView />', () => {
    let wrapper;
    describe('FindStoresListView mounted with stores data', () => {
        beforeEach(() => {
            wrapper = mount(
                <FindStoresListView
                    selectStoreAction={() => {}}
                    zipCode={findStoresDetails.zipCode}
                    stores={findStoresDetails.stores}
                />,
            );
        });

        it('FindStoresListView component should exist ', () => {
            expect(wrapper).to.exist;
            expect(wrapper.find(StoreDetailsCard)).to.exist;
        });
    });
    describe('FindStoresListView mounted with no stores', () => {
        beforeEach(() => {
            wrapper = mount(
                <FindStoresListView
                    selectStoreAction={() => {}}
                    zipCode={findStoresDetails.zipCode}
                    stores={[]}
                />,
            );
        });

        it('FindStoresListView component should error message when no stores were found ', () => {
            expect(wrapper).to.exist;
            expect(wrapper.find(MessageBox)).to.have.length(1);
        });
    });
    describe('FindStoresListView mounted with no stores and product data', () => {
        beforeEach(() => {
            wrapper = mount(
                <FindStoresListView
                    productDetails={[{ name: 'temp', imageURL: 'temp' }]}
                    selectStoreAction={() => {}}
                    zipCode={findStoresDetails.zipCode}
                    stores={[]}
                />,
            );
        });

        it('FindStoresListView component should error message when no stores were found ', () => {
            expect(wrapper).to.exist;
            expect(wrapper.find(MessageBox)).to.have.length(1);
        });
    });
    describe('FindStoresListView mounted with invalid zip code', () => {
        beforeEach(() => {
            wrapper = mount(
                <FindStoresListView
                    selectStoreAction={() => {}}
                    zipCode={Constants.findStores.INVALID_INPUT}
                    stores={[]}
                />,
            );
        });

        it('FindStoresListView component should error message when invalid input is present ', () => {
            expect(wrapper).to.exist;
            expect(wrapper.find(MessageBox)).to.have.length(1);
        });
    });
});
