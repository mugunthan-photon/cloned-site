import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import StoreDetailsCard from './StoreDetailsCard';
import { findStoresDetails, productDetails } from '../../../../../test/mockData/FindStoresDetails';

describe('Test suite for StoreDetailsCard', () => {
    let wrapper;
    const selectStoreAction = sinon.spy(() => {});

    describe('Mounting without product details', () => {
        beforeEach(() => {
            wrapper = mount(
                <StoreDetailsCard
                    deviceType={{ isMobile: true }}
                    store={findStoresDetails.stores[0]}
                    isExpanded
                    selectStoreAction={selectStoreAction}
                />,
            );
        });

        it('component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('Select store function should be called on select button click', () => {
            wrapper.find('button.redButton').simulate('click');
            expect(selectStoreAction).to.have.been.calledOnce;
        });
    });
    describe('Mouting with product details', () => {
        beforeEach(() => {
            wrapper = mount(
                <StoreDetailsCard
                    deviceType={{ isMobile: true }}
                    store={findStoresDetails.stores[0]}
                    productDetails={productDetails}
                    selectStoreAction={selectStoreAction}
                />,
            );
        });

        it('Store services section should display on show details button click ', () => {
            wrapper.find('button.showDetails').simulate('click');
            expect(wrapper.state('showDetailsSection')).to.equal(true);
        });
    });
    describe('Mouting in desktop mode', () => {
        beforeEach(() => {
            const deviceType = {
                isMobile: false,
                isDesktop: true,
            };
            wrapper = mount(
                <StoreDetailsCard
                    store={findStoresDetails.stores[0]}
                    productDetails={productDetails}
                    selectStoreAction={selectStoreAction}
                    deviceType={deviceType}
                />,
            );
        });

        it('The rendered link should have target _blank attribute ', () => {
            expect(wrapper.find('a.urlStyle').getDOMNode()).to.have.property('target');
        });
    });
});
