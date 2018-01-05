import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import HotDeals from './HotDeals';
import {
    HotDealsResponse,
    HotDealsCertonaResponse,
    HotDealsNullResponse,
    HotDealsSEOURLResponse,
} from './__stories/mock';

describe('<HotDeals />', () => {
    describe('HotDeals component testing', () => {
        let hotDealsComponent;

        it('Mobile Url tagging', () => {
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: true, isDesktop: false, isTablet: false },
                hotDealsCartridgeSlots: HotDealsResponse,
                featureFlags: { UrgencyMessageEnabled: false },
            };
            const mockStore = configureStore([]);
            const store = mockStore({
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsCertonaResponse,
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
                context: { featureFlags: { UrgencyMessageEnabled: true } },
                regionalPricing: { regionZone: '0' },
            });

            hotDealsComponent = mount(
                <Provider store={store}>
                    <HotDeals {...initialProperties} />
                </Provider>,
            );
            expect(hotDealsComponent.props().children.props.deviceType.isMobile).to.equal(true);
        });

        it('seoUrl query string Url', () => {
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: true, isDesktop: false, isTablet: false },
                hotDealsCartridgeSlots: HotDealsSEOURLResponse,
                featureFlags: { URGENCY_MESSAGE_ENABLED: true },
            };
            const mockStore = configureStore([]);
            const store = mockStore({
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsCertonaResponse,
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            });

            hotDealsComponent = mount(
                <Provider store={store}>
                    <HotDeals {...initialProperties} />
                </Provider>,
            );
            expect(hotDealsComponent.props().children.props.deviceType.isMobile).to.equal(true);
        });

        it('Desktop Url tagging', () => {
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: true, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsResponse,
                featureFlags: { URGENCY_MESSAGE_ENABLED: true },
            };
            const mockStore = configureStore([]);
            const store = mockStore({
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsCertonaResponse,
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            });
            hotDealsComponent = mount(
                <Provider store={store}>
                    <HotDeals {...initialProperties} />
                </Provider>,
            );
            expect(hotDealsComponent.props().children.props.deviceType.isDesktop).to.equal(true);
        });

        it('should not show banner for null response', () => {
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: true, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsNullResponse,
                featureFlags: { URGENCY_MESSAGE_ENABLED: true },
            };
            const mockStore = configureStore([]);
            const store = mockStore({
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsCertonaResponse,
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            });

            hotDealsComponent = mount(
                <Provider store={store}>
                    <HotDeals {...initialProperties} />
                </Provider>,
            );
            expect(hotDealsComponent.props().children.props.recordsInfoList).to.equal(undefined);
        });

        it('certona product cartridge should load if CertonaEabled flag true', () => {
            // const spyGetProductListForCartridgeSlot = sinon.spy();
            // const resetProductCartridgeStoreSpy = sinon.spy();
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsCertonaResponse,
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
                featureFlags: { URGENCY_MESSAGE_ENABLED: true },
            };
            /* Full DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            const store = mockStore({
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsCertonaResponse,
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            });

            hotDealsComponent = mount(
                <Provider store={store}>
                    <HotDeals {...initialProperties} />
                </Provider>,
            );
            expect(hotDealsComponent.props().children.props.hotDealsCartridgeSlots.HotDeals1.certonaEnabled)
                .to.equal(true);
        });
    });
    describe('connected component testing', () => {
        it('Connected smart coponent, with connect', () => {
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
                hotDealsCartridgeSlots: HotDealsResponse,
                deviceType: { isMobile: false, isTablet: true, isDesktop: false },
            };

            const mockStore = configureStore([]);
            const store = mockStore({
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsCertonaResponse,
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            });

            const wrapper = mount(
                <Provider store={store}>
                    <HotDeals {...initialProperties} />
                </Provider>,
            );
            expect(wrapper).to.exist;
        });

        it('should display mocked store data from HotDeals component', () => {
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
                hotDealsCartridgeSlots: HotDealsResponse,
                deviceType: { isMobile: false, isTablet: false, isDesktop: true },
            };

            const mockStore = configureStore([]);
            const store = mockStore({
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                hotDealsCartridgeSlots: HotDealsCertonaResponse,
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            });

            const hotDealsComponent = mount(
                <Provider store={store}>
                    <HotDeals {...initialProperties} />
                </Provider>,
            );
            expect(hotDealsComponent.props().children.props.hotDealsCartridgeSlots).to.equal(HotDealsResponse);
        });
    });
});
