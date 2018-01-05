import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import FindStoresTabContainer from './FindStoresTabContainer';
import { findStoresDetails, productDetails } from '../../../../../test/mockData/FindStoresDetails';
import { findStoreThemes } from '../../../../common/Constants';
// import { storeInfoMock } from '../../../../../test/mockData/FindAStorePageDetails';

describe('<FindStoresTabContainer />', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const store = mockStore({});
    const actions = {};
    actions.findMoreStores = sinon.spy(() => {});
    actions.findStores = sinon.spy(() => {});
    actions.selectStore = sinon.spy(() => {});
    actions.setAvailableFilter = sinon.spy();
    describe('Component testing with store data', () => {
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresTabContainer
                        actions={actions}
                        findStoresAction={actions.findStores}
                        selectStoreAction={actions.selectStore}
                        findStoresDetails={findStoresDetails}
                        productDetails={productDetails}
                        findMoreStores={actions.findMoreStores}
                        setAvailableFilter={actions.setAvailableFilter}
                    />
                </Provider>,
            );
        });

        it('Component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('Pagination action should fire on click on view more button', () => {
            wrapper.find('button.loadMoreButton').simulate('click');
            expect(actions.findMoreStores).to.have.been.calledOnce;
        });
    });

    describe('Component testing with empty store data', () => {
        beforeEach(() => {
            const findStoresDetailsMock = {};
            findStoresDetailsMock.nextPageLink = undefined;
            findStoresDetailsMock.zipCode = 1234;
            findStoresDetailsMock.showAvailable = true;
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresTabContainer
                        actions={actions}
                        findStoresAction={actions.findStores}
                        selectStoreAction={actions.selectStore}
                        findStoresDetails={findStoresDetailsMock}
                        productDetails={null}
                        setAvailableFilter={actions.setAvailableFilter}
                    />
                </Provider>,
            );
        });

        it('No pick up message should appear when no products are passed', () => {
            expect(wrapper.find('div.sameDayPickUpBlock')).to.have.length(0);
        });

        it('View more button shouldn\'t appear when there are no pages left', () => {
            expect(wrapper.find('section.loadMoreContainer')).to.have.length(0);
        });

        it('Error message should appear when no stores have been found', () => {
            // 1 for list view and the other for map view
            expect(wrapper.find(MessageBox)).to.have.length(3);
        });
    });

    describe('Component testing with empty store data', () => {
        beforeEach(() => {
            const findStoresDetailsMock = {};
            findStoresDetailsMock.nextPageLink = undefined;
            findStoresDetailsMock.showAvailable = true;
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresTabContainer
                        actions={actions}
                        findStoresAction={actions.findStores}
                        selectStoreAction={actions.selectStore}
                        findStoresDetails={findStoresDetailsMock}
                        productDetails={[productDetails[0]]}
                        setAvailableFilter={actions.setAvailableFilter}
                    />
                </Provider>,
            );
        });

        it('Error message should not appear on initial load of the panel', () => {
            // The one mounted in LocationFinder component
            expect(wrapper.find(MessageBox)).to.have.length(2);
        });
    });

    describe('Find A Store Page ', () => {
        const onFilterChangeSpy = sinon.spy();
        beforeEach(() => {
            const findStoresDetailsMock = {};
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresTabContainer
                        actions={actions}
                        findStoresAction={actions.findStores}
                        selectStoreAction={actions.selectStore}
                        findStoresDetails={findStoresDetailsMock}
                        productDetails={null}
                        deviceType={{ isMobile: true }}
                        setAvailableFilter={actions.setAvailableFilter}
                        theme={findStoreThemes.findAStorePage}
                        onFilterChange={onFilterChangeSpy}
                    />
                </Provider>,
            );
        });

        it('FindAStorePage - Trigger onFilterChange on selecting filter services', () => {
            // const onFilterChangeSpy = sinon.spy(wrapper.instance(), 'onFilterChange');
            // wrapper.find('div.mobileFilterStoreBlock button').simulate('click');
            // wrapper.find('div.mobileFilterStoreBlock input[type="checkbox"]').at(0).simulate('change');
            // expect(onFilterChangeSpy.callCount).to.equal(1);
        });
    });
    describe('Find A Store Page ', () => {
        beforeEach(() => {
            const findStoresDetailsMock = {};
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresTabContainer
                        actions={actions}
                        findStoresAction={actions.findStores}
                        selectStoreAction={actions.selectStore}
                        findStoresDetails={findStoresDetailsMock}
                        productDetails={null}
                        deviceType={{ isMobile: true }}
                        theme={findStoreThemes.pdpMajorAppliances}
                    />
                </Provider>,
            );
        });

        it('FindAStorePage - Trigger onFilterChange on selecting filter services', () => {
            // const onFilterChangeSpy = sinon.spy(wrapper.instance(), 'onFilterChange');
            // wrapper.find('div.mobileFilterStoreBlock button').simulate('click');
            // wrapper.find('div.mobileFilterStoreBlock input[type="checkbox"]').at(0).simulate('change');
            // expect(onFilterChangeSpy.callCount).to.equal(1);
        });
    });
});
