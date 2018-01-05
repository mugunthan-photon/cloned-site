import { describe, it } from 'mocha';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MarketingZonesConnected, { MarketingZones } from './MarketingZones';

describe('MarketingZones', () => {
    const mockData = {
        home: {
            'Content-ZoneA': {
                requestDateTime: null,
                channelName: null,
                jvmName: 'dtexpdv1l1j1_01',
                requestUrl: null,
                maxAge: 66628,
                contentExpiry: 'Thu Jan 26 2017 12:00:00 PM',
                allDay: false,
                type: 'Content-ZoneA',
                zoneType: 'image',
                imageBannerDetails: {
                    type: null,
                    contentType: 'MultiChannelSlotImageBanner',
                    desktopImageDetails: {
                        imageSrc: 'http://m.jcpenney.com/tablet//images/cat100240022_m2600019_70300015.jpg',
                        imageAlt: '',
                        imageUrl: '/g/view-all-accessories/N-bwo3yDgm42c8',
                        dimensionId: null,
                    },
                    mobileImageDetails: {
                        imageSrc: 'http://m.jcpenney.com/tablet//images/cat100240022_m2600019_70300015.jpg',
                        imageAlt: 'Mobile Zone A',
                        imageUrl: '/g/shops/N-1az9fo4',
                        dimensionId: '2840670868',
                    },
                    tabletImageDetails: {
                        imageSrc: 'http://m.jcpenney.com/tablet//images/cat100240022_m2600019_70300015.jpg',
                        imageAlt: '',
                        imageUrl: '/g/women/N-bwo3x?pageType=X2H2',
                        dimensionId: '20000013',
                    },
                    nativeAppsImageDetails: {
                        imageSrc: 'Desktop_Home_Zone A_Image_Div 1_jewelry_01202017_0000_01262017_0000.jpg',
                        imageAlt: 'Native Apps Alt Text',
                        imageUrl: '/g/shops/N-1az9fo4',
                        dimensionId: '2840670868',
                    },
                    extraLargeImageDetails: {
                        imageSrc: 'http://m.jcpenney.com/tablet//images/cat100240022_m2600019_70300015.jpg',
                        imageAlt: '',
                        imageUrl: '/g/view-all-accessories/N-bwo3yDgm42c8',
                        dimensionId: null,
                    },
                },
                imageMapDetails: null,
            },
        },
    };

    const featureFlagJson = {
        'Content-ZoneC': false,
        'Content-ZoneA': false,
        ContentGrid: true,
        GridTimer: true,
        HTTPS_FOR_SEO_ENABLED: false,
        Home_Content_HorizontalAds: true,
        Home_Content_HorizontalBottomAds: true,
        Home_Content_RecommendationA: true,
        Home_Content_RecommendationB: true,
        Home_Content_ZoneA: true,
        Home_Content_ZoneB: true,
        Home_Content_ZoneC: true,
        Home_Content_ZoneG: true,
        Home_Content_ZoneI: true,
        ZoneA: true,
        ZoneB: true,
        ZoneC: true,
        ZoneD: true,
        ZoneE: true,
    };

    describe('<MarketingZones/> Testing the redux', () => {
        const mockStore = configureStore([]);
        const store = mockStore(mockData);
        const presentation = ['Content-ZoneA'];

        it('partial zones overloaded', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <MarketingZonesConnected
                        deviceType="mobile"
                        pageName="home" allZones={false}
                        presentation={presentation}
                        timerZone="CST"
                        displayTimer />
                </Provider>,
            );

            expect(wrapper).to.exist;
        });
    });

    describe('<MarketingZones/> Testing the redux', () => {
        const mockStore = configureStore([]);
        const store = mockStore(mockData);
        const presentation = ['Content-ZoneA-Invalid'];

        it('partial zones overloaded', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <MarketingZonesConnected
                        deviceType="mobile"
                        pageName="home" allZones={presentation}
                        timerZone="CST"
                        presentation={presentation}
                        displayTimer/>
                </Provider>,
            );
            expect(wrapper).to.exist;
        });
    });

    describe('<MarketingZones/> Testing the redux invalid page name', () => {
        const mockStore = configureStore([]);
        const store = mockStore(mockData);
        const presentation = ['Content-ZoneA'];

        it('partial zones overloaded', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <MarketingZonesConnected
                        deviceType="mobile"
                        pageName="non-exists" allZones={false}
                        presentation={presentation}
                        timerZone="CST"
                        displayTimer />
                </Provider>,
            );

            expect(wrapper).to.exist;
        });
    });

    describe('<MarketingZones/> Testing redux with devicetype', () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            context: {
                deviceType: {
                    isDesktop: true,
                    isMobile: false,
                    isTablet: false,
                },
                preferences: {
                    timeZone: 'CST',
                },
                featureFlags: {
                    zoneTimer: true,
                },
            },
        });
        const presentation = ['Content-ZoneA'];

        it('partial zones overloaded', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <MarketingZonesConnected
                        deviceType="mobile"
                        pageName="home" allZones={false}
                        presentation={presentation}
                        timerZone="CST"
                        displayTimer />
                </Provider>,
            );

            expect(wrapper).to.exist;
        });
    });


    describe('<MarketingZones>  Testing functionalities', () => {
        const action = {
            zoneLoad() {
                return true;
            },
        };

        it('presentPartialZones with presentation', () => {
            const presentation = ['Content-ZoneA'];
            const wrapper = mount(
                <MarketingZones
                    actions={action}
                    deviceType="mobile"
                    marketingZonesData={mockData}
                    pageName="home"
                    allZones={presentation}
                    presentation={presentation}
                    featureflgsZone={featureFlagJson}
                    timerZone="CST"
                    displayTimer
                />,
            );

            const instance = wrapper.instance();
            expect(wrapper).to.exist;
            instance.shouldComponentUpdate({
                marketingZonesData: mockData.home,
            });
            expect(instance.presentPartialZones()).to.have.length.above(0);
            wrapper.setProps({
                featureflgsZone: featureFlagJson['Content-ZoneC'],
            });
            instance.abstractComponent(mockData.home['Content-ZoneA']);
        });

        it('renderSpecificZone to get rendered', () => {
            const presentation = ['Content-ZoneA'];
            const wrapper = mount(
                <MarketingZones
                    actions={action}
                    deviceType="mobile"
                    marketingZonesData={mockData}
                    pageName="home"
                    allZones={presentation}
                    presentation={presentation}
                    featureflgsZone={featureFlagJson}
                    timerZone="CST"
                    singleZone="Content-ZoneA"
                    displayTimer
                />,
            );
            const instance = wrapper.instance();
            instance.renderSpecificZone();
        });

        it('render, if presentation array is given', () => {
            const presentation = ['Content-ZoneA'];
            const wrapper = mount(
                <MarketingZones
                    actions={action}
                    deviceType="mobile"
                    marketingZonesData={mockData}
                    pageName="home"
                    presentation={presentation}
                    timerZone="CST"
                    featureflgsZone={featureFlagJson}
                    displayTimer
                />,
            );

            const instance = wrapper.instance();
            expect(instance.render()).to.be.an('object');
        });

        it('getDeviceType, Mobile', () => {
            const presentation = ['Content-ZoneA'];
            const deviceType = {
                isDesktop: false,
                isMobile: true,
                isTablet: false,
            };
            const wrapper = mount(
                <MarketingZones
                    actions={action}
                    deviceTypes={deviceType}
                    marketingZonesData={mockData}
                    pageName="home"
                    presentation={presentation}
                    timerZone="CST"
                    featureflgsZone={featureFlagJson}
                    displayTimer
                />,
            );
            const instance = wrapper.instance();
            expect(instance.getDeviceType()).to.be.equal('mobile');
        });

        it('getDeviceType, Tablet', () => {
            const presentation = ['Content-ZoneA'];
            const deviceType = {
                isDesktop: false,
                isMobile: false,
                isTablet: true,
            };
            const wrapper = mount(
                <MarketingZones
                    actions={action}
                    deviceTypes={deviceType}
                    marketingZonesData={mockData}
                    pageName="home"
                    presentation={presentation}
                    timerZone="CST"
                    featureflgsZone={featureFlagJson}
                    displayTimer
                />,
            );
            const instance = wrapper.instance();
            expect(instance.getDeviceType()).to.be.equal('tablet');
        });

        it('getDeviceType, Desktop', () => {
            const presentation = ['Content-ZoneA'];
            const deviceType = {
                isDesktop: true,
                isMobile: false,
                isTablet: false,
            };
            const wrapper = mount(
                <MarketingZones
                    actions={action}
                    deviceTypes={deviceType}
                    marketingZonesData={mockData}
                    pageName="home"
                    presentation={presentation}
                    timerZone="CST"
                    featureflgsZone={featureFlagJson}
                    displayTimer
                />,
            );
            const instance = wrapper.instance();
            expect(instance.getDeviceType()).to.be.equal('desktop');
            instance.presentPartialZones();
        });
    });
});
