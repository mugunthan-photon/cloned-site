import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HeaderConnected, { Header } from './Header';

require('../../../test/util');

const { describe, it } = global;


const storeCardData = {
    id: '1572',
    name: 'Fox Hills Mall',
    street: '6000 S Hannum Ave',
    city: 'Culver City',
    zip: '90230',
    phone: '(310) 390-8966',
    distance: 5.2,
    latitude: 33.98674,
    longitude: -118.39158,
    number: '1572',
    country: null,
    state: 'CA',
    timings: [
        {
            days: 'Mon-Sat',
            time: '10:00am-9:00pm',
        },
        {
            days: 'Sun',
            time: '11:00am-7:00pm',
        },
    ],
    timingsOverrideMessage: null,
    services: [
        'big and tall',
        'major appliances',
        'custom decorating',
        'furniture',
        'wedding registry',
        'optical',
        'portrait studio',
        'salon',
        'Sephora',
        'jewelry',
    ],
};


describe(' Test Suite for <Header/> ', () => {
    describe('Dumb component testing', () => {
        describe('Local storage empty test', () => {
            let storageComp;

            beforeEach(() => {
                localStorage.removeItem('userStore');
                LocalStorage.setData('storeConfig', '');
                const listsActions = { loadLists: function loadLists() { } };
                const itemCountAction = { updateItemCountAction: function itemCountAction() { } };
                const actions = { triggerNavigationClick: function triggerNavigationClick() { } };
                storageComp = shallow(
                    <Header
                        listActions={listsActions}
                        actions={actions}
                        itemCountAction={itemCountAction}
                    />,
                );
                document.cookie = 'storeId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            });
            it('Setting local storage empty test', () => {
                expect(storageComp).to.exist;
            });
        });

        describe('Without Cookie', () => {
            let headerComp;

            beforeEach(() => {
                LocalStorage.setData('storeConfig', storeCardData);
                const listsActions = { loadLists: function loadLists() { } };
                const itemCountAction = { updateItemCountAction: function itemCountAction() { } };
                const actions = { triggerNavigationClick: function triggerNavigationClick() { } };
                headerComp = shallow(
                    <Header
                        listActions={listsActions}
                        actions={actions}
                        itemCountAction={itemCountAction}
                    />,
                );
            });

            it('Without Cookie set', () => {
                expect(headerComp).to.exist;
            });

            it('Find a Store Click condn ', () => {
                // const openStoresModal = sinon.spy(headerComp.instance().openStoresModal);
                const eve = { name: 'Sign in', url: 'find-store', leaf: true };
                headerComp.find('DropdownMenu').at(0).props().handleMenuClick(eve);
                // openStoresModal(eve);
            });

            it('On Credit card click condn', () => {
                const eve = { url: 'http://jcp.mycreditcard.mobi' };
                headerComp.find('DropdownMenu').at(0).props().handleMenuClick(eve);
            });

            it('Tooltip clicks', () => {
                headerComp.find('button#toggleToolTip').simulate('click');
            });

            it.skip('openStore Tablet clicks', () => {
                headerComp.find('li.store-block').find('button').at(0).simulate('click');
            });

            it('handle ToolTip close clicks', () => {
                const handleTooltipClose = sinon.spy(headerComp.instance().handleTooltipClose);
                const event = new Event('mousedown');
                document.dispatchEvent(event);
                expect(handleTooltipClose).to.have.been.called;
            });

            it('List is called with a child renderer', () => {
                // headerComp.find('List').props().childRenderer();
                expect(headerComp.find('List')).to.exist;
            });
        });

        describe('With Cookie', () => {
            let wrapper;

            beforeEach(() => {
                const listActions = { loadLists: function loadLists() { } };
                LocalStorage.setData('storeConfig', storeCardData);
                Cookies.save('ItemCount', 5, '', '');
                Cookies.save('storeId', 12345, '', '');
                Cookies.save('DP_USER_STATE', 1, '', '');
                Cookies.save('storeName', 'Test', '', '');
                const actions = { triggerNavigationClick: function triggerNavigationClick() { } };
                const itemCountAction = { updateItemCountAction: function itemCountAction() { } };
                wrapper = shallow(
                    <Header
                        listActions={listActions}
                        actions={actions}
                        itemCountAction={itemCountAction}
                    />,
                );
            });

            it('Non Connected Dumb, component', () => {
                expect(wrapper).to.exist;
            });
            it('testing local storage', () => {
                LocalStorage.getData('storeConfig');
            });

            it('Tooltip clicks', () => {
                wrapper.find('button#toggleToolTip').simulate('click');
            });

            it('openStore Tablet clicks', () => {
                wrapper.find('li.store-block').find('button').at(0).simulate('click');
            });
        });
    });

    describe('Connected component initial state testing', () => {
        describe('connected without context', () => {
            it('InnerConnectConnected, with connect', () => {
                const mockStore = configureStore([]);
                const data = {
                    session: { signedOut: false },
                    context: {
                        featureFlags: {
                            enableRegionPricing: false,
                        },
                        deviceType: {
                            isMobile: true,
                        },
                    },
                };
                const store = mockStore(data);

                const wrapperNoContext = mount(<Provider store={store}>
                    <HeaderConnected />
                </Provider>);

                store.clearActions();

                expect(wrapperNoContext).to.exist;
            });
        });

        describe('Connect component with IsTablet Condns', () => {
            let wrapperInitial;
            let store;

            beforeEach(() => {
                LocalStorage.setData('storeConfig', storeCardData);
                Cookies.save('itemCount', 5);
                Cookies.save('storeId', 12345);
                Cookies.save('DP_USER_STATE', 1);
                Cookies.save('storeName', 'Test');
                Cookies.save('itemCount', 5);
                /* FUll DOM Rendering component in before each to eliminate duplication */
                Cookies.save('DP_USER_STATE', 1);
                const mockStore = configureStore([]);
                const data = {
                    session: { signedOut: false },
                    context: {
                        deviceType: {
                            isBot: false,
                            isDesktop: false,
                            isMobile: false,
                            isTablet: false,
                        },
                        messagesTexts: {
                            HamburgerZeroLevel: {},
                        },
                    },
                };
                store = mockStore(data);

                wrapperInitial = mount(<Provider store={store}>
                    <HeaderConnected />
                </Provider>);

                store.clearActions();
            });

            it('InnerConnectConnected, with connect', () => {
                expect(wrapperInitial).to.exist;
            });

            it('clicking coupon', () => {
                expect(store.getActions().length).to.equal(0);
                wrapperInitial.find('a.header-icon').at(0).simulate('click');
                expect(store.getActions().length).to.equal(1);
            });

            it('Modals are Triggered', () => {
                wrapperInitial.find('ModalBox').at(0).props().onClose();
                wrapperInitial.find('ModalBox').at(1).props().onClose();
            });

            it('Modal Calls', () => {
                wrapperInitial.find('ModalBox').at(0).props().onClose();
                wrapperInitial.find('ModalBox').at(1).props().onClose();
            });

            // it('close modal, called', () => {
            //     wrapperInitial.find('ModalBox').at(0).find('button').at(0)
            //         .simulate('click');
            // });
            /* it('signout click condn', () => {
                const eve = { name: 'Sign Out', url: 'signout', leaf: true };
                expect(store.getActions().length).to.equal(0);
                wrapperInitial.find('DropdownMenu').at(1).props().handleMenuClick(eve);
                expect(store.getActions().length).to.equal(1);
            }); */
        });


        describe('Connected component with isMobile Condns', () => {
            let wrapperData;
            let store;

            beforeEach(() => {
                LocalStorage.setData('storeConfig', storeCardData);

                /* FUll DOM Rendering component in before each to eliminate duplication */
                Cookies.save('DP_USER_STATE', 1);
                const mockStore = configureStore([]);
                const data = {
                    session: { signedOut: true },
                    context: {
                        deviceType: {
                            isBot: false,
                            isDesktop: false,
                            isMobile: true,
                            isTablet: false,
                        },
                        messagesTexts: {
                            HamburgerZeroLevel: {},
                        },
                    },
                };
                store = mockStore(data);

                wrapperData = mount(<Provider store={store}>
                    <HeaderConnected />
                </Provider>);

                store.clearActions();
            });

            it('InnerConnectConnected, with connect', () => {
                expect(wrapperData).to.exist;
            });

            // it('handle ToolTip close clicks', () => {
            //     const event = { target: 'abc' };
            //     wrapperData.find('Tooltip').at(0).props().handleTooltipClose(event);
            //     wrapperData.find('Tooltip').at(1).props().handleTooltipClose(event);
            // });
        });

        describe('Empty Cookie Condn', () => {
            let wrapperData;
            let store;

            beforeEach(() => {
                LocalStorage.setData('storeConfig', storeCardData);

                document.cookie = 'storeId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                const mockStore = configureStore([]);
                const data = {
                    session: { signedOut: false },
                    context: {
                        deviceType: {
                            isBot: false,
                            isDesktop: false,
                            isMobile: false,
                            isTablet: true,
                        },
                        messagesTexts: {
                            HamburgerZeroLevel: {},
                        },
                    },
                    stores: [],
                    latLong: { lat: 60.558151, lng: 22.095773 },
                };
                store = mockStore(data);

                wrapperData = mount(<Provider store={store}>
                    <HeaderConnected />
                </Provider>);

                store.clearActions();
            });

            it('InnerConnectConnected, with connect', () => {
                expect(wrapperData).to.exist;
            });


            // it('openStore Tablet clicks', () => {
            //     expect(store.getActions().length).to.equal(0);
            //     wrapperData.find('li.store-block').find('button').at(0).simulate('click');
            //     expect(store.getActions().length).to.equal(2);
            // });
        });
    });
});
