import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FindStoresConnect, { FindStores } from './FindStores';
import FindStoresProductCard from './components/FindStoresProductCard/FindStoresProductCard';

describe('<FindStores />', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const store = mockStore({});
    const findStoresAction = () => {};
    const selectStoreAction = () => {};
    const setAvailableFilter = sinon.spy();
    const actions = {};
    actions.closeSlidePanel = sinon.spy(actions.closeSlidePanel);
    actions.findAllStores = sinon.spy(actions.findAllStores);

    describe('FindStores with no product details passed', () => {
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresConnect
                        productDetails={[]}
                        findStoresDetails={{}}
                        findStoresAction={findStoresAction}
                        selectStoreAction={selectStoreAction}
                        setAvailableFilter={setAvailableFilter}
                        actions={actions}
                    />
                </Provider>,
            );
        });

        it('Component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('Product Card should not exist ', () => {
            expect(wrapper.find(FindStoresProductCard)).to.have.length(0);
        });
    });

    describe('FindStores with only 1 product details passed', () => {
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresConnect
                        productDetails={[{}]}
                        findStoresDetails={{}}
                        findStoresAction={findStoresAction}
                        selectStoreAction={selectStoreAction}
                        setAvailableFilter={setAvailableFilter}
                        actions={actions}
                    />
                </Provider>,
            );
        });

        it('Product Card should not exist when only 1 product with no data is paased', () => {
            expect(wrapper.find(FindStoresProductCard).find('div.container')).to.have.length(0);
        });

        it('Panel should be closed when back button is clicked in the slide panel', () => {
            wrapper.find('button').at(0).simulate('click');
            expect(actions.closeSlidePanel).to.have.been.calledOnce;
        });

        it('Panel should be closed when back button is clicked in the slide panel and call findallstores', () => {
            wrapper.find('button').at(0).simulate('click');
            expect(actions.closeSlidePanel).to.have.been.calledOnce;
        });
    });

    describe('FindStores with only 1 product details passed', () => {
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <FindStoresConnect
                        productDetails={[{ name: 'temp', imageURL: 'temp' }]}
                        findStoresDetails={{}}
                        findStoresAction={findStoresAction}
                        selectStoreAction={selectStoreAction}
                        setAvailableFilter={setAvailableFilter}
                        actions={actions}
                    />
                </Provider>,
            );
        });

        it('Product Card should not exist when only 1 product with data is paased', () => {
            expect(wrapper.find(FindStoresProductCard).find('div.container')).to.have.length(1);
        });
    });

    it('Component on props change and SlidePanel closed', () => {
        const findStores = new FindStores();
        findStores.props = {
            findStoresDetails: {
                isSlidePanelOpen: true,
            },
            openPanelAnalyticsCallback: sinon.spy(),
        };
        const prevProps = {
            findStoresDetails: {
                isSlidePanelOpen: false,
            },
        };
        findStores.componentDidUpdate(prevProps);
        expect(findStores.props.openPanelAnalyticsCallback).to.been.calledOnce;
    });


    it('Component on props change and SlidePanel already closed', () => {
        const findStores = new FindStores();
        findStores.props = {
            findStoresDetails: {
                isSlidePanelOpen: false,
            },
            openPanelAnalyticsCallback: sinon.spy(),
        };
        findStores.componentDidUpdate();
        expect(findStores.props.openPanelAnalyticsCallback).to.been.notCalled;
    });


    it('On closing sidepanel and from is equal to account', () => {
        mount(
            <Provider store={store}>
                <FindStores
                    productDetails={[{ name: 'temp', imageURL: 'temp' }]}
                    findStoresDetails={{}}
                    findStoresAction={findStoresAction}
                    selectStoreAction={selectStoreAction}
                    actions={actions}
                    from="account"
                />
            </Provider>,
        );
        expect(actions.findAllStores).to.been.calledOnce;
        expect(actions.closeSlidePanel).to.been.calledOnce;
    });

    it('On closing sidepanel and from is not equal to account', () => {
        mount(
            <Provider store={store}>
                <FindStores
                    productDetails={[{ name: 'temp', imageURL: 'temp' }]}
                    findStoresDetails={{}}
                    findStoresAction={findStoresAction}
                    selectStoreAction={selectStoreAction}
                    actions={actions}
                    from="order"
                />
            </Provider>,
        );
        expect(actions.findAllStores).to.been.notCalled;
        expect(actions.closeSlidePanel).to.been.calledOnce;
    });

    it('Component on props change and SlidePanel open, should lock scroll in background', () => {
        mount(
            <Provider store={store}>
                <FindStores
                    productDetails={[{ name: 'temp', imageURL: 'temp' }]}
                    findStoresDetails={{ isSlidePanelOpen: true }}
                    findStoresAction={findStoresAction}
                    selectStoreAction={selectStoreAction}
                    actions={actions}
                />
            </Provider>,
        );

        expect(document.body.classList.contains('slide-panel-open')).to.be.true;
    });
    it('Component on props change and SlidePanel open, with previous state as false', () => {
        mount(
            <Provider store={store}>
                <FindStores
                    productDetails={[{ name: 'temp', imageURL: 'temp' }]}
                    findStoresDetails={{}}
                    findStoresAction={findStoresAction}
                    selectStoreAction={selectStoreAction}
                    actions={actions}
                />
            </Provider>,
        );
        expect(document.body.classList.contains('slide-panel-open')).to.be.false;
    });
    it('Component on props change, with SlidePanel already open', () => {
        const findStores = new FindStores();
        findStores.props = {
            findStoresDetails: {
                isSlidePanelOpen: true,
            },
            openPanelAnalyticsCallback: () => { },
        };
        const prevProps = {
            findStoresDetails: {
                isSlidePanelOpen: true,
            },
        };
        findStores.componentDidUpdate(prevProps);
    });
});
