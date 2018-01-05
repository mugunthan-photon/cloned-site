import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import SaveForLaterConnected, { SaveForLater } from './SaveForLater';

describe('<SaveForLater - Full Render/>', () => {
    describe('Connected component testing', () => {
        let wrapper;
        const mockStore = configureStore([]);
        let store = mockStore({ savedItemStatus: [], savedItems: {}, context: { deviceType: { isDesktop: true } } });

        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <SaveForLaterConnected />
                </Provider>,
            );
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.find('button').at(0).props().onClick({
                preventDefault: sinon.spy(),
                stopPropagation: sinon.spy(),
                nativeEvent: {
                    stopImmediatePropagation: sinon.spy(),
                },
            });
            wrapper.find('button').at(0).props().onMouseOver();
            wrapper.find('button').at(0).props().onMouseLeave();
            wrapper.setState({ isSaved: true });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            store = mockStore({ savedItemStatus: [], savedItems: {}, context: { deviceType: { isDesktop: false } } });
            wrapper = mount(
                <Provider store={store}>
                    <SaveForLaterConnected />
                </Provider>,
            );
            wrapper.find('button').at(0).props().onClick({
                preventDefault: sinon.spy(),
                stopPropagation: sinon.spy(),
                nativeEvent: {
                    stopImmediatePropagation: sinon.spy(),
                },
            });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            store = mockStore({ savedItemStatus: [], savedItems: {}, context: null });
            wrapper = mount(
                <Provider store={store}>
                    <SaveForLaterConnected />
                </Provider>,
            );
            expect(wrapper).to.exist;
        });
    });
});

describe('<SaveForLater - Shallow Render />', () => {
    describe('Connected component testing', () => {
        let wrapper;
        const clock = sinon.useFakeTimers();

        beforeEach(() => {
            wrapper = shallow(
                <SaveForLater
                    savedItemStatus={false} savedItems={null} deviceType={{}}
                    actions={{ removeItem: sinon.spy(),
                        resetStatus: sinon.spy(),
                        addItem: sinon.spy(),
                        triggerFormError: sinon.spy() }}/>,
            );
        });

        it('Connected Smart Components, with connect', () => {
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.setState({ overlayText: true });
            wrapper.setProps({ cardType: 'list' });
            wrapper.setProps({ cardType: 'list', deviceType: { isMobile: false } });
            wrapper.setProps({ cardType: 'list', deviceType: { isMobile: true } });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.setProps({ cardType: 'grid', deviceType: { isDesktop: true } });
            wrapper.setState({ overlayText: true, isSaved: true });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.instance().resetLabel();
            wrapper.instance().deleteItem(0);
            wrapper.setState({ isSaved: true, isInProgress: true });
            wrapper.setProps({ ppId: 'p1', savedItems: { p1: 2 } });
            wrapper.instance().saveorDeleteItem({
                preventDefault: sinon.spy(),
                stopPropagation: sinon.spy(),
                nativeEvent: {
                    stopImmediatePropagation: sinon.spy(),
                },
            });
            wrapper.setState({ isInProgress: false });
            wrapper.setProps({ ppId: 'p1', savedItems: null });
            wrapper.instance().saveorDeleteItem({
                preventDefault: sinon.spy(),
                stopPropagation: sinon.spy(),
                nativeEvent: {
                    stopImmediatePropagation: sinon.spy(),
                },
            });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.instance().resetLabel();
            wrapper.instance().deleteItem(0);
            wrapper.setState({ isSaved: true });
            wrapper.setProps({ ppId: 'p1', savedItems: { p1: 2 } });
            wrapper.instance().saveorDeleteItem({
                preventDefault: sinon.spy(),
                stopPropagation: sinon.spy(),
                nativeEvent: {
                    stopImmediatePropagation: sinon.spy(),
                },
            });
            wrapper.setProps({ ppId: 'p1', savedItems: {} });
            wrapper.setState({ isInProgress: false });
            wrapper.instance().saveorDeleteItem({
                preventDefault: sinon.spy(),
                stopPropagation: sinon.spy(),
                nativeEvent: {
                    stopImmediatePropagation: sinon.spy(),
                },
            });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.setProps({ ppId: 'p1', savedItems: { p1: 5 } });
            wrapper.setState({ isInProgress: false, isSaved: true });
            wrapper.instance().onLeave();
            wrapper.instance().onHover();
            wrapper.setProps({ ppId: 'p1', savedItems: null });
            wrapper.setState({ isInProgress: false, isSaved: false });
            wrapper.instance().onHover();
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.setProps({ ppId: 'p1' });
            wrapper.instance().componentWillReceiveProps({
                savedItems: { p1: 5 },
                savedItemStatus: [{ ppId: 'p1', isSuccess: true }],
            });
            wrapper.instance().componentWillReceiveProps({
                savedItems: { p1: 5 },
                savedItemStatus: [{ ppId: 'p1', isSuccess: true, action: 'add' }],
            });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.setProps({ ppId: 'p1' });
            wrapper.instance().componentWillReceiveProps({
                savedItems: { p1: 5 },
                savedItemStatus: [{ ppId: 'p1', isSuccess: true, action: 'remove' }],
            });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.setProps({ ppId: 'p1' });
            wrapper.instance().componentWillReceiveProps({
                savedItems: { p1: 5 },
                savedItemStatus: [{ ppId: 'p1', isSuccess: true, errorCode: 'SAVED_ITEMS_MAX_COUNT' }],
            });
            expect(wrapper).to.exist;
        });

        it('Connected Smart Components, with connect', () => {
            wrapper.setProps({ ppId: 'p1' });
            clock.tick(5000);
            wrapper.instance().componentWillReceiveProps({
                savedItems: { p1: 5 },
                savedItemStatus: [{ ppId: 'p1' }],
            });
            wrapper.instance().componentWillReceiveProps({
                savedItems: { p1: 5 },
                savedItemStatus: [{ ppId: 'p1', errorCode: 'SAVED_ITEMS_MAX_COUNT' }],
            });
            clock.restore();
            expect(wrapper).to.exist;
        });
    });
});
