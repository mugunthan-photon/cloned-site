import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import ProductCartridgeConnected, { ProductCartridge } from './ProductCartridge';
import mockedProductCartridge from './__stories/mock';

describe('<ProductCartridge />', () => {
    describe('Connected component testing', () => {
        it('Connected Smart Components, with connect', () => {
            /* Full DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            const store = mockStore({
                productCartridge: { productCartridgeSlots: [] },
                context: { deviceType: { isDesktop: false } },
            });
            const initialProperties = {
                slotId: 'home1_rr',
                pageType: 'HOME',
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            };

            const wrapper = mount(
                <Provider store={store}>
                    <ProductCartridgeConnected {...initialProperties}/>
                </Provider>,
            );

            store.clearActions();

            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            /* Full DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            const store = mockStore({
                context: { deviceType: { isDesktop: false } },
            });
            const initialProperties = {
                slotId: 'home1_rr',
                pageType: 'HOME',
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            };

            const wrapper = mount(
                <Provider store={store}>
                    <ProductCartridgeConnected {...initialProperties}/>
                </Provider>,
            );

            store.clearActions();

            expect(wrapper).to.exist;
        });

        it('should display as per store data , Making Sure the Actual Data is rendered', () => {
            const mockStore = configureStore([]);
            const store = mockStore({
                productCartridge: { productCartridgeSlots: mockedProductCartridge },
                context: { deviceType: { isDesktop: true } },
            });
            const initialProperties = {
                slotId: 'home1_rr',
                pageType: 'HOME',
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            };

            mount(
                <Provider store={store}>
                    <ProductCartridgeConnected {...initialProperties} />
                </Provider>,
            );

            expect(store.getState().productCartridge.productCartridgeSlots).to.equal(mockedProductCartridge);
        });

        it('should display as per store data , Making Sure the Actual Data is rendered', () => {
            const mockStore = configureStore([]);
            const store = mockStore({
                productCartridge: { productCartridgeSlots: mockedProductCartridge },
            });
            const initialProperties = {
                slotId: 'home1_rr',
                pageType: 'HOME',
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
            };

            const wrapper = mount(
                <Provider store={store}>
                    <ProductCartridgeConnected {...initialProperties} />
                </Provider>,
            );

            expect(wrapper).to.exist;
        });

        it('should display as per store data , Making Sure the Actual Data is rendered for saveforlater', () => {
            const mockStore = configureStore([]);
            const store = mockStore({
                productCartridge: { productCartridgeSlots: mockedProductCartridge },
            });
            const initialProperties = {
                slotId: 'saved_items',
                pageType: 'cart',
                loader: 'getAllSaveForLater',
                customRenderProductCard: true,
            };

            const wrapper = mount(
                <Provider store={store}>
                    <ProductCartridgeConnected {...initialProperties} />
                </Provider>,
            );

            expect(wrapper).to.exist;
        });

        it('should display as per store data , Making Sure the Actual Data is rendered', () => {
            const initialProperties = {
                slotId: 'home1_rr',
                linkURL: 'www.jcp.com',
                pageType: 'HOME',
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
                deviceType: { isDesktop: true },
                productPane: { getBoundingClientRect: () => ({ width: 0 }) },
            };
            const actions = {
                getProductListForCartridgeSlot: sinon.spy(),
            };

            const wrap = shallow(
                <ProductCartridge {...initialProperties} actions={actions}/>,
            );

            wrap.instance().disableRightArrowOnLoad({ getBoundingClientRect: () => ({ width: 1 }) });
            wrap.setProps({ customRenderProductCard: true, renderProductCard: sinon.spy() });

            wrap.instance().productCardRenderer();
        });
    });

    describe(' ProductCartridge component testing ', () => {
        let productCartridgeComponent;
        let saveForLaterComponent;
        const spyGetProductListForCartridgeSlot = sinon.spy();
        const spyRenderProductCard = sinon.spy();
        const resetProductCartridgeStoreSpy = sinon.spy();
        beforeEach(() => {
            const defaultProps = {
                pageType: 'HOME',
                slotId: 'home1_rr',
                loader: 'certona',
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
                actions: {
                    getProductListForCartridgeSlot: spyGetProductListForCartridgeSlot,
                    resetProductCartridgeStore: resetProductCartridgeStoreSpy,
                },
                deviceType: { isDesktop: true },
                productPane: { getBoundingClientRect: () => ({ width: 0 }) },
            };

            productCartridgeComponent = shallow(
                <ProductCartridge {...defaultProps}/>,
              );

            const saveForLaterProperties = {
                slotId: 'saved_items',
                pageType: 'cart',
                loader: 'getAllSaveForLater',
                actions: { getProductListForCartridgeSlot: spyGetProductListForCartridgeSlot },
                deviceType: { isDesktop: true },
                renderProductCard: spyRenderProductCard,
                customRenderProductCard: true,
            };

            saveForLaterComponent = mount(
                <ProductCartridge {...saveForLaterProperties}/>,
            );
        });

        it('productCartridgeList spyRenderProductCard', () => {
            const saveForLaterInstance = saveForLaterComponent.instance();
            // saveForLaterComponent.setProps({ productCartridgeSlots: { saved_items: mockedProductCartridge } });
            expect(saveForLaterInstance.props.renderProductCard.callCount).to.equal(0);
        });

        it('productCartridgeList length should be equal to 0 on mount', () => {
            expect(productCartridgeComponent.state().productCartridgeList.length).to.equal(0);
        });

        it('should invoke componentWillReceiveProps on setProps', () => {
            const componentWillReceivePropsSpy = sinon.spy(productCartridgeComponent.instance(), 'componentWillReceiveProps');
            productCartridgeComponent.setProps({ productCartridgeSlots: { home1_rr: mockedProductCartridge } });
            expect(componentWillReceivePropsSpy.callCount).to.equal(1);
        });

        it('should not render pagination buttons for medium and small screens', () => {
            const productCartridgeInstance = productCartridgeComponent.instance();
            const getPaginationButtonsSpy = sinon.spy(productCartridgeInstance, 'getPaginationButtons');
            productCartridgeComponent.setProps({ deviceType: { isDesktop: false },
                productCartridgeSlots: { home1_rr: mockedProductCartridge } });

            expect(getPaginationButtonsSpy.callCount).to.equal(0);

            productCartridgeComponent.setProps({ deviceType: { isDesktop: true } });
            expect(getPaginationButtonsSpy.callCount).to.equal(1);
        });

        it('productCartridgeList length should be equal to zero if productCartridgeSlots does not have required key', () => {
            productCartridgeComponent.setProps({ productCartridgeSlots: { home2_rr: mockedProductCartridge } });
            expect(productCartridgeComponent.state().productCartridgeList.length).to.equal(0);
        });

        it('should invoke scrollCartridge on click of pagination buttons', () => {
            productCartridgeComponent.setProps({ productCartridgeSlots: { home1_rr: mockedProductCartridge } });
            productCartridgeComponent.instance().wrapper = { getBoundingClientRect: () => ({ width: 100 }) };
            const scrollCartridgeSpy = sinon.spy(productCartridgeComponent.instance(), 'scrollCartridge');

            productCartridgeComponent.find('button').at(1).simulate('click');
            expect(scrollCartridgeSpy.calledWith(true)).to.equal(true);

            productCartridgeComponent.find('button').at(0).simulate('click');
            expect(scrollCartridgeSpy.calledWith(false)).to.equal(true);

            expect(scrollCartridgeSpy.calledTwice).to.equal(true);
        });

        it('should invoke dots page load', () => {
            productCartridgeComponent.setProps({ productCartridgeSlots: { home1_rr: mockedProductCartridge } });
            productCartridgeComponent.instance().wrapper = { getBoundingClientRect: () => ({ width: 100 }) };
            const scrollCartridgeSpy = sinon.spy(productCartridgeComponent.instance(), 'scrollCartridge');

            productCartridgeComponent.find('button').at(1).simulate('click');
            expect(scrollCartridgeSpy.calledWith(true)).to.equal(true);

            productCartridgeComponent.find('button').at(0).simulate('click');
            expect(scrollCartridgeSpy.calledWith(false)).to.equal(true);

            expect(scrollCartridgeSpy.calledTwice).to.equal(true);
        });

        it('should trigger resetProductCartridgeStore on unmount', () => {
            productCartridgeComponent.unmount();
            expect(resetProductCartridgeStoreSpy.calledOnce).to.be.equal(true);
        });
    });

    describe(' ProductCartridge component forceMobile testing ', () => {
        let productCartridgeComponent;
        let saveForLaterComponent;
        const spyGetProductListForCartridgeSlot = sinon.spy();
        const spyRenderProductCard = sinon.spy();
        const resetProductCartridgeStoreSpy = sinon.spy();
        beforeEach(() => {
            const defaultProps = {
                pageType: 'HOME',
                slotId: 'home1_rr',
                loader: 'certona',
                forceMobile: true,
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
                actions: {
                    getProductListForCartridgeSlot: spyGetProductListForCartridgeSlot,
                    resetProductCartridgeStore: resetProductCartridgeStoreSpy,
                },
                deviceType: { isDesktop: true },
                productPane: { getBoundingClientRect: () => ({ width: 0 }) },
            };

            productCartridgeComponent = shallow(
                <ProductCartridge {...defaultProps}/>,
            );

            const saveForLaterProperties = {
                slotId: 'saved_items',
                pageType: 'cart',
                loader: 'getAllSaveForLater',
                actions: { getProductListForCartridgeSlot: spyGetProductListForCartridgeSlot },
                deviceType: { isDesktop: true },
                renderProductCard: spyRenderProductCard,
                customRenderProductCard: true,
            };

            saveForLaterComponent = mount(
                <ProductCartridge {...saveForLaterProperties}/>,
            );
        });

        it('productCartridgeList spyRenderProductCard', () => {
            const saveForLaterInstance = saveForLaterComponent.instance();
            // saveForLaterComponent.setProps({ productCartridgeSlots: { saved_items: mockedProductCartridge } });
            expect(saveForLaterInstance.props.renderProductCard.callCount).to.equal(0);
        });

        it('productCartridgeList length should be equal to 0 on mount', () => {
            expect(productCartridgeComponent.state().productCartridgeList.length).to.equal(0);
        });

        it('should invoke componentWillReceiveProps on setProps', () => {
            const componentWillReceivePropsSpy = sinon.spy(productCartridgeComponent.instance(), 'componentWillReceiveProps');
            productCartridgeComponent.setProps({ productCartridgeSlots: { home1_rr: mockedProductCartridge } });
            expect(componentWillReceivePropsSpy.callCount).to.equal(1);
        });

        it('should not render pagination buttons for medium and small screens', () => {
            const productCartridgeInstance = productCartridgeComponent.instance();
            const getPaginationButtonsSpy = sinon.spy(productCartridgeInstance, 'getPaginationButtons');
            productCartridgeComponent.setProps({ deviceType: { isDesktop: false },
                productCartridgeSlots: { home1_rr: mockedProductCartridge } });

            expect(getPaginationButtonsSpy.callCount).to.equal(0);

            productCartridgeComponent.setProps({ deviceType: { isDesktop: true } });
            expect(getPaginationButtonsSpy.callCount).to.equal(1);
        });

        it('should render dots for medium and small screens', () => {
            const productCartridgeInstance = productCartridgeComponent.instance();
            const getPaginationButtonsSpy = sinon.spy(productCartridgeInstance, 'getDots');
            productCartridgeComponent.setProps({ deviceType: { isDesktop: false },
                productCartridgeSlots: { home1_rr: mockedProductCartridge } });

            expect(getPaginationButtonsSpy.callCount).to.equal(1);
        });

        it('should update currentDotsPosition', () => {
            const productCartridgeInstance = productCartridgeComponent.instance();
            __SERVER__ = false;
            productCartridgeInstance.wrapper = { getBoundingClientRect: () => ({ width: 0 }) };
            productCartridgeInstance.getDots();
            productCartridgeInstance.updateDotsPosition();
            expect(productCartridgeInstance.state.currentDotIndex).not.to.equal(0);

            productCartridgeInstance.wrapper = undefined;
            productCartridgeComponent.setProps({ productPane: undefined });

            productCartridgeInstance.getDots();
            productCartridgeInstance.updateDotsPosition();
            expect(productCartridgeInstance.state.currentDotIndex).not.to.equal(0);
        });

        it('should update currentDotsPosition', () => {
            const productCartridgeInstance = productCartridgeComponent.instance();
            __SERVER__ = false;
            productCartridgeInstance.listenScrollEvent();
            console.log('COOOOOU::', productCartridgeInstance.delayedExec.callCount);
        });


        it('productCartridgeList length should be equal to zero if productCartridgeSlots does not have required key', () => {
            productCartridgeComponent.setProps({ productCartridgeSlots: { home2_rr: mockedProductCartridge } });
            expect(productCartridgeComponent.state().productCartridgeList.length).to.equal(0);
        });

        it('should invoke scrollCartridge on click of pagination buttons', () => {
            productCartridgeComponent.setProps({ productCartridgeSlots: { home1_rr: mockedProductCartridge } });
            productCartridgeComponent.instance().wrapper = { getBoundingClientRect: () => ({ width: 100 }) };
            const scrollCartridgeSpy = sinon.spy(productCartridgeComponent.instance(), 'scrollCartridge');

            productCartridgeComponent.find('button').at(1).simulate('click');
            expect(scrollCartridgeSpy.calledWith(true)).to.equal(true);

            productCartridgeComponent.find('button').at(0).simulate('click');
            expect(scrollCartridgeSpy.calledWith(false)).to.equal(true);

            expect(scrollCartridgeSpy.calledTwice).to.equal(true);
        });

        it('should trigger resetProductCartridgeStore on unmount', () => {
            productCartridgeComponent.unmount();
            expect(resetProductCartridgeStoreSpy.calledOnce).to.be.equal(true);
        });
    });
    describe(' ProductCartridge component regionZone testing ', () => {
        let productCartridgeComponent;
        const spyGetProductListForCartridgeSlot = sinon.spy();
        let defaultProps;
        beforeEach(() => {
            defaultProps = {
                pageType: 'HOME',
                slotId: 'home1_rr',
                loader: 'certona',
                forceMobile: true,
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
                enableRegionPricing: false,
                actions: {
                    getProductListForCartridgeSlot: spyGetProductListForCartridgeSlot,
                },
                deviceType: { isDesktop: true },
                productPane: { getBoundingClientRect: () => ({ width: 0 }) },
            };
        });

        it('productCartridgeList disable region price', () => {
            productCartridgeComponent = shallow(
                <ProductCartridge {...defaultProps}/>,
                 { lifecycleExperimental: true },
            );
            const productCartridgeInstance = productCartridgeComponent.instance();
            expect(productCartridgeInstance.props.actions.getProductListForCartridgeSlot.callCount).to.equal(1);
        });
        it('productCartridgeList disable region price and non certona', () => {
            const spyLocalGetProductListForCartridgeSlot = sinon.spy();
            const props = {
                ...defaultProps,
                loader: 'certona',
                actions: {
                    getProductListForCartridgeSlot: spyLocalGetProductListForCartridgeSlot,
                },
            };
            productCartridgeComponent = shallow(
                <ProductCartridge {...props}/>,
                 { lifecycleExperimental: true },
            );
            const productCartridgeInstance = productCartridgeComponent.instance();
            expect(productCartridgeInstance.props.actions.getProductListForCartridgeSlot.callCount).to.equal(1);
        });
        it('productCartridgeList enable region price and non certona loader', () => {
            const spyLocalGetProductListForCartridgeSlot = sinon.spy();
            const props = {
                ...defaultProps,
                enableRegionPricing: true,
                actions: {
                    getProductListForCartridgeSlot: spyLocalGetProductListForCartridgeSlot,
                },
                loader: 'getAllSaveForLater',
            };
            productCartridgeComponent = shallow(
                <ProductCartridge {...props}/>,
                 { lifecycleExperimental: true },
            );
            const productCartridgeInstance = productCartridgeComponent.instance();
            expect(productCartridgeInstance.props.actions.getProductListForCartridgeSlot.callCount).to.equal(1);
        });
        it('productCartridgeList enable region price', () => {
            const spyLocalGetProductListForCartridgeSlot = sinon.spy();
            const props = {
                ...defaultProps,
                enableRegionPricing: true,
                actions: {
                    getProductListForCartridgeSlot: spyLocalGetProductListForCartridgeSlot,
                },
            };
            productCartridgeComponent = shallow(
                <ProductCartridge {...props}/>,
                 { lifecycleExperimental: true },
            );
            const productCartridgeInstance = productCartridgeComponent.instance();
            expect(productCartridgeInstance.props.actions.getProductListForCartridgeSlot.callCount).to.equal(0);
        });
    });
    describe(' ProductCartridge component componentWillReceiveProps regionZone testing ', () => {
        let productCartridgeComponent;
        const spyGetProductListForCartridgeSlot = sinon.spy();
        let defaultProps;
        beforeEach(() => {
            defaultProps = {
                pageType: 'HOME',
                slotId: 'home1_rr',
                loader: 'certona',
                forceMobile: true,
                attributes: {
                    customerid: '',
                    recommendations: true,
                },
                enableRegionPricing: true,
                actions: {
                    getProductListForCartridgeSlot: spyGetProductListForCartridgeSlot,
                },
                deviceType: { isDesktop: true },
                productPane: { getBoundingClientRect: () => ({ width: 0 }) },
            };
        });

        it('productCartridgeList enable region price componentWillReceiveProps', () => {
            const spyLocalGetProductListForCartridgeSlot = sinon.spy();
            const props = {
                ...defaultProps,
                actions: {
                    getProductListForCartridgeSlot: spyLocalGetProductListForCartridgeSlot,
                },
            };
            productCartridgeComponent = shallow(
                <ProductCartridge {...defaultProps}/>,
                 { lifecycleExperimental: true },
            );
            const newProps = {
                regionZone: 1,
            };
            const productCartridgeInstance = productCartridgeComponent.instance();
            productCartridgeInstance.props = props;
            productCartridgeInstance.componentWillReceiveProps(newProps);
            expect(productCartridgeInstance.props.actions.getProductListForCartridgeSlot.callCount).to.equal(1);
        });
        it('productCartridgeList enable region price and non certona: componentWillReceiveProps call', () => {
            const spyLocalGetProductListForCartridgeSlot = sinon.spy();
            const props = {
                ...defaultProps,
                actions: {
                    getProductListForCartridgeSlot: spyLocalGetProductListForCartridgeSlot,
                },
                loader: 'getAllSaveForLater',
            };
            productCartridgeComponent = shallow(
                <ProductCartridge {...props}/>,
                 { lifecycleExperimental: true },
            );
            const newProps = {
                regionZone: 1,
            };
            const productCartridgeInstance = productCartridgeComponent.instance();
            productCartridgeInstance.props = props;
            productCartridgeInstance.componentWillReceiveProps(newProps);
            expect(productCartridgeInstance.props.actions.getProductListForCartridgeSlot.callCount).to.equal(1);
        });
        it('productCartridgeList enable region price new regionZone undefined changes: componentWillReceiveProps', () => {
            const spyLocalGetProductListForCartridgeSlot = sinon.spy();
            const props = {
                ...defaultProps,
                actions: {
                    getProductListForCartridgeSlot: spyLocalGetProductListForCartridgeSlot,
                },
            };
            productCartridgeComponent = shallow(
                <ProductCartridge {...defaultProps}/>,
                 { lifecycleExperimental: true },
            );
            const newProps = {
                regionZone: undefined,
            };
            const productCartridgeInstance = productCartridgeComponent.instance();
            productCartridgeInstance.props = props;
            productCartridgeInstance.componentWillReceiveProps(newProps);
            expect(productCartridgeInstance.props.actions.getProductListForCartridgeSlot.callCount).to.equal(0);
        });
        it('productCartridgeList enable region price new regionZone null changes: componentWillReceiveProps', () => {
            const spyLocalGetProductListForCartridgeSlot = sinon.spy();
            const props = {
                ...defaultProps,
                actions: {
                    getProductListForCartridgeSlot: spyLocalGetProductListForCartridgeSlot,
                },
            };
            productCartridgeComponent = shallow(
                <ProductCartridge {...defaultProps}/>,
                 { lifecycleExperimental: true },
            );
            const newProps = {
                regionZone: null,
            };
            const productCartridgeInstance = productCartridgeComponent.instance();
            productCartridgeInstance.props = props;
            productCartridgeInstance.componentWillReceiveProps(newProps);
            expect(productCartridgeInstance.props.actions.getProductListForCartridgeSlot.callCount).to.equal(0);
        });
    });
});
