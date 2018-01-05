import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import CartridgeList from './CartridgeList';
import cartridgeListResponse from './__stories/mock';

describe('<CartridgeList component testing />', () => {
    describe('connected component testing', () => {
        it('Connected smart coponent, with connect', () => {
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
            };

            const wrapper = mount(
                <Provider>
                    <CartridgeList {...initialProperties} />
                </Provider>,
            );
            expect(wrapper).to.exist;
        });

        it('should display mocked store data from HotDeals component', () => {
            const initialProperties = {
                slotId: 'HotDeals1',
                PageType: 'HOME',
                deviceType: { context: { isDesktop: false, isTablet: true, isMobile: false } },
                cartridgeList: cartridgeListResponse,
                cartridgeListRenderer: ((t, listContext) => (<a
                    href={t.url}
                    ref={(cartridgePane) => { listContext.cartridgePane = cartridgePane; }} >test</a>)),
            };
            const cartridgeListComponent = mount(
                <Provider>
                    <CartridgeList {...initialProperties} />
                </Provider>,
            );
            expect(cartridgeListComponent.props()
                .children.props.cartridgeList.length).to.equal(cartridgeListResponse.length);
        });

        describe('CartridgeList component testing', () => {
            let cartridgeListComponent;
            it('should not render pagination buttons for mobile and tablet', () => {
                const initialProperties = {
                    slotId: 'HotDeals1',
                    PageType: 'HOME',
                    deviceType: { context: { isDesktop: false, isTablet: true, isMobile: false } },
                    cartridgeList: cartridgeListResponse,
                    cartridgeListRenderer: ((t, listContext) => (<a
                        href={t.url}
                        ref={(cartridgePane) => { listContext.cartridgePane = cartridgePane; }} >test</a>)),
                };
                cartridgeListComponent = mount(
                    <CartridgeList {...initialProperties} />,
                );
                const productCartridgeInstance = cartridgeListComponent.instance();
                const getPaginationButtonsSpy = sinon.spy(productCartridgeInstance, 'getPaginationButtons');
                expect(getPaginationButtonsSpy.callCount).to.equal(0);
            });

            it('should render pagination buttons for desktop', () => {
                const initialProperties = {
                    slotId: 'HotDeals1',
                    PageType: 'HOME',
                    deviceType: { isMobile: false, isDesktop: true, isTablet: false },
                    cartridgeList: cartridgeListResponse,
                    cartridgeListRenderer: ((t, listContext) => (<a
                        href={t.url}
                        ref={(cartridgePane) => { listContext.cartridgePane = cartridgePane; }} >test</a>)),
                };
                cartridgeListComponent = mount(
                    <CartridgeList {...initialProperties} />,
                );
                const cartridgeListInstance = cartridgeListComponent.instance();
                const getPaginationButtonsSpy = sinon.spy(cartridgeListInstance, 'getPaginationButtons');
                expect(getPaginationButtonsSpy.callCount).to.equal(0);
            });

            it('productCartridgeList length should be equal to zero', () => {
                const initialProperties = {
                    slotId: 'HotDeals1',
                    PageType: 'HOME',
                    deviceType: { isMobile: false, isDesktop: true, isTablet: true },
                    cartridgeList: [],
                    cartridgeListRenderer: ((t, listContext) => (<a
                        href={t.url}
                        ref={(cartridgePane) => { listContext.cartridgePane = cartridgePane; }} >test</a>)),
                };
                cartridgeListComponent = mount(
                    <CartridgeList {...initialProperties} />,
                );
                expect(cartridgeListComponent.props().cartridgeList.length).to.equal(0);
            });

            it('should invoke scrollCartridge on click of pagination buttons', () => {
                const initialProperties = {
                    slotId: 'HotDeals1',
                    PageType: 'HOME',
                    deviceType: { isMobile: false, isDesktop: true },
                    cartridgeList: cartridgeListResponse,
                    cartridgeListRenderer: ((t, listContext) => (<a
                        href={t.url}
                        ref={(cartridgePane) => { listContext.cartridgePane = cartridgePane; }} >test</a>)),
                };
                cartridgeListComponent = mount(
                    <CartridgeList {...initialProperties} />,
                );
                const scrollCartridgeSpy = sinon.spy(cartridgeListComponent.instance(), 'scrollCartridge');
                const getDotsSpy = sinon.spy(cartridgeListComponent.instance(), 'getDots');

                cartridgeListComponent.find('button').at(1).simulate('click');
                expect(scrollCartridgeSpy.calledWith(true)).to.equal(true);

                cartridgeListComponent.find('button').at(0).simulate('click');
                expect(scrollCartridgeSpy.calledWith(false)).to.equal(true);
                expect(scrollCartridgeSpy.calledTwice).to.equal(true);
                expect(getDotsSpy.calledOnce).to.equal(false);
            });
        });
    });
});
