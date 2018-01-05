import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import SmartProductPromotionList, { ProductPromotionList } from './ProductPromotionList';
import ProductPromotionListMockData from './__stories/mock';

describe('<ProductPromotionList />', () => {
    let wrapper;
    let noPromotionsWrapper;
    let actions;
    let storeWithContext;

    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({});
        storeWithContext = mockStore({
            context: {
                deviceType: {
                    isDesktop: true,
                    isMobile: false,
                    isTablet: false,
                },
            },
            productPromotions: {
                pageName: 'home',
                massagedData: [{}],
                timerEnabled: true,
            },
        });
        actions = {
            getProductPromotionListAction(pageName, urlParam) {
                return {
                    pageName,
                    urlParam,
                };
            },
            trackEventProductPromotionLoadMoreAction() {
                const returnPrams = {
                    type: 'PRODUCT_PROMOTION_LOAD_MORE_EVENT',
                };
                return returnPrams;
            },
        };
        wrapper = mount(
            <Provider store={store}>
                <SmartProductPromotionList
                    productPromotions={ProductPromotionListMockData}
                />
            </Provider>,
        );

        noPromotionsWrapper = mount(
            <Provider store={store}>
                <SmartProductPromotionList />
            </Provider>,
        );
    });

    it('ProductPromotionList component should exist ', () => {
        const withInitStore = mount(
            <Provider store={storeWithContext}>
                <SmartProductPromotionList isTimerEnabled />
            </Provider>,
        );
        expect(withInitStore).to.exist;
    });

    it('ProductPromotionList component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('ProductPromotionList component should contain an List component', () => {
        expect(wrapper.find('List')).to.exist;
    });
    it('List should not render ProductPromotionCard component', () => {
        expect(noPromotionsWrapper.find('ProductPromotionCard').length).to.equal(0);
    });

    it('Should trigger hydrate on component mount', () => {
        const getProductPromotionListActionSpy = sinon.spy();
        mount(
            <ProductPromotionList
                actions={{ getProductPromotionListAction: getProductPromotionListActionSpy }}
            />,
        );

        expect(getProductPromotionListActionSpy.called).to.equal(true);
    });
    it('Should trigger TrackEventProductPromotionLoadMoreAction', () => {
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} />,
        );
        const instance = wrapperDump.instance();
        instance.loadMoreData();
        expect(actions.trackEventProductPromotionLoadMoreAction()).deep.to.equal({ type: 'PRODUCT_PROMOTION_LOAD_MORE_EVENT' });
    });

    it('productPromotionCardRendererLoadMore', () => {
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} />,
        );
        const instance = wrapperDump.instance();
        const productPromotionCardRender = sinon.spy(instance, 'productPromotionCardRender');
        instance.productPromotionCardRendererLoadMore({}, 1);
        expect(productPromotionCardRender).to.be.called;
    });

    it('deviceTypeValue tablet', () => {
        const deviceType = {
            isDesktop: false,
            isMobile: false,
            isTablet: true,
        };
        const wrapperDump = mount(
            <ProductPromotionList deviceType={deviceType} actions={actions} />,
        );
        const instance = wrapperDump.instance();
        instance.deviceTypeValue();
        expect(instance.state.sourceAdapter).to.be.empty;
    });

    it('deviceTypeValue mobile', () => {
        const deviceType = {
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList deviceType={deviceType} actions={actions} />,
        );
        const instance = wrapperDump.instance();
        instance.deviceTypeValue();
        expect(instance.state.sourceAdapter).to.be.empty;
    });


    it('deviceTypeValue desktop', () => {
        const deviceType = {
            isDesktop: true,
            isMobile: false,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList deviceType={deviceType} actions={actions} />,
        );
        const instance = wrapperDump.instance();
        instance.deviceTypeValue();
        expect(instance.state.sourceAdapter).to.be.empty;
    });


    it('loadAdapter', () => {
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} />,
        );
        const instance = wrapperDump.instance();
        instance.loadAdapter();
        expect(instance.state.sourceAdapter).to.be.empty;
    });

    it('showPaginationText, loadMoreClicked is true', () => {
        const deviceType = {
            isDesktop: true,
            isMobile: false,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList deviceType={deviceType} actions={actions} />,
        );
        wrapperDump.setState({ loadMoreClicked: true });
        wrapperDump.setProps({ productPromotions: ProductPromotionListMockData });
        const instance = wrapperDump.instance();
        instance.showPaginationText();
        expect(instance.state.sourceAdapter).to.be.an('array');
    });

    it('showPaginationText, loadMoreClicked is false', () => {
        const deviceType = {
            isDesktop: true,
            isMobile: false,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList deviceType={deviceType} actions={actions} />,
        );
        wrapperDump.setState({ loadMoreClicked: false });
        wrapperDump.setProps({ productPromotions: ProductPromotionListMockData });
        const instance = wrapperDump.instance();
        instance.showPaginationText();
        expect(instance.state.sourceAdapter).to.be.an('array');
    });

    it('loadAdapter with deviceTypeValue  ', () => {
        const noOfItemShowInitiallyMobile = 2;
        const deviceType = {
            isDesktop: true,
            isMobile: false,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList
                deviceType={deviceType}
                noOfItemShowInitiallyMobile={noOfItemShowInitiallyMobile}
                actions={actions} />,
        );
        const instance = wrapperDump.instance();
        const deviceTypeValue = sinon.stub(instance, 'deviceTypeValue', (retValue) => {
            const localReturn = `noOfItemShowInitiallyMobile${retValue}`;
            return localReturn;
        });
        instance.loadAdapter(ProductPromotionListMockData.massagedData, deviceTypeValue);
        expect(instance.state.sourceAdapter).to.have.length.above(0);
    });


    it('loadAdapter, overrideData is empty', () => {
        const noOfItemShowInitiallyMobile = 2;
        const deviceType = {
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList
                deviceType={deviceType}
                noOfItemShowInitiallyMobile={noOfItemShowInitiallyMobile}
                actions={actions} />,
        );
        const instance = wrapperDump.instance();
        const deviceTypeValue = sinon.stub(instance, 'deviceTypeValue', (retValue) => {
            const localReturn = `noOfItemShowInitiallyMobile${retValue}`;
            return localReturn;
        });
        instance.loadAdapter(ProductPromotionListMockData.massagedData, deviceTypeValue);
        expect(instance.state.isLoadMoreEnabled).to.be.true;
    });

    it('loadAdapter, isLoadMoreEnabled is false', () => {
        const deviceType = {
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} deviceType={deviceType} />,
        );
        const instance = wrapperDump.instance();

        wrapperDump.setState({ isLoadMoreEnabled: true });
        instance.loadAdapter(ProductPromotionListMockData.massagedData);
        expect(instance.state.isLoadMoreEnabled).to.be.true;
    });

    it('loadMoreButton', () => {
        const deviceType = {
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} deviceType={deviceType} />,
        );
        const instance = wrapperDump.instance();
        wrapperDump.setState({ isLoadMoreEnabled: true });
        wrapperDump.setProps({ productPromotions: { massagedData: [] } });
        expect(instance.loadMoreButton()).to.be.null;
    });

    it('loadMoreButton, empty', () => {
        const deviceType = {
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} deviceType={deviceType} />,
        );
        const instance = wrapperDump.instance();

        wrapperDump.setState({ loadMoreClicked: false });
        wrapperDump.setProps({ productPromotions: { massagedData: [] } });
        instance.loadMoreButton();
        expect(instance.loadMoreButton()).to.be.null;
    });

    it('loadMoreButton productPromotions, empty', () => {
        const deviceType = {
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} deviceType={deviceType} />,
        );
        const instance = wrapperDump.instance();

        wrapperDump.setState({ loadMoreClicked: true });
        wrapperDump.setProps({ productPromotions: { massagedData: [] } });
        instance.loadMoreButton();
        expect(instance.loadMoreButton()).to.be.null;
    });


    it('componentWillReceiveProps', () => {
        const deviceType = {
            isDesktop: true,
            isMobile: false,
            isTablet: false,
        };
        const wrapperDump = mount(
            <ProductPromotionList deviceType={deviceType} actions={actions} />,
        );
        const instance = wrapperDump.instance();
        const loadAdapter = sinon.spy(instance, 'loadAdapter');
        wrapperDump.setState({ isLoadMoreEnabled: false });
        wrapperDump.setProps({ productPromotions: ProductPromotionListMockData });
        expect(loadAdapter.calledOnce).to.be.true;
    });

    it('componentWillReceiveProps, isLoadMoreEnabled flag is true', () => {
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} />,
        );
        const instance = wrapperDump.instance();
        const loadAdapter = sinon.spy(instance, 'loadAdapter');
        wrapperDump.setState({ isLoadMoreEnabled: true });
        wrapperDump.setProps({ productPromotions: ProductPromotionListMockData });
        expect(loadAdapter.calledOnce).to.be.false;
    });

    it('loadMoreData, empty', () => {
        const wrapperDump = mount(
            <ProductPromotionList actions={actions} />,
        );
        const instance = wrapperDump.instance();
        instance.loadMoreData();
        expect(instance.state.loadMoreClicked).to.be.true;
    });
});
