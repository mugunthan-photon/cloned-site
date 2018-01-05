import React from 'react';
import { mount } from 'enzyme';
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BreadCrumbNavConnected, { BreadCrumbNav } from './BreadCrumbNav';
import BreadCrumbMockData from './__stories/mock';


describe('<BreadCrumbNav />', () => {
    describe('Dumb Component testing', () => {
        let wrapper;
        const props = {
            breadCrumbs: BreadCrumbMockData,
            actions: {
                getBreadCrumbsAction() { return true; },
            },
            status: 200,
        };
        beforeEach(() => {
            wrapper = mount(<BreadCrumbNav {...props} />);
        });

        it('component exist', () => {
            expect(wrapper).to.exist;
        });

        it('should component update is triggered', () => {
            wrapper.update();
        });

        it('Test for a different status', () => {
            const newProps = {
                breadCrumbs: BreadCrumbMockData,
                actions: {
                    getBreadCrumbsAction() { return true; },
                },
                status: 502,
            };
            mount(<BreadCrumbNav {...newProps} />);
        });
        it.skip('Test for a different status', () => {
            mount(<BreadCrumbNav />);
        });
    });


    describe('Connected smart component testing', () => {
        let wrapper;
        let store;

        beforeEach(() => {
            /* FUll DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            store = mockStore({
                breadCrumbsData: [],
                context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
            });


            wrapper = mount(<Provider store={store}>
                <BreadCrumbNavConnected nTypeId="N-bwo3v" />
            </Provider>);

            store.clearActions();

            // hydrate will be called and action is triggered.
            // expect(store.getActions().length).to.equal(1);
        });

        it('InnerConnectConnected, with connect', () => {
            expect(wrapper).to.exist;
        });

        it('Responds, with  a status of 502 Bad Gateway', () => {
            const mockStore = configureStore([]);
            store = mockStore({
                breadCrumbsData: [],
                context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
            });


            const statusComp = mount(<Provider store={store}>
                <BreadCrumbNavConnected status={502} />
            </Provider>);

            store.clearActions();
            expect(statusComp).to.exist;
        });

        it('WillReceiveProps', () => {
            BreadCrumbMockData.status = 200;
            BreadCrumbMockData.data = BreadCrumbMockData;
            const mockStore = configureStore([]);
            store = mockStore({
                breadCrumbsData: BreadCrumbMockData,
                context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
            });


            const statusComp = mount(<Provider store={store}>
                <BreadCrumbNavConnected nTypeId="N-bwo3x" />
            </Provider>);

            store.clearActions();
            expect(statusComp).to.exist;
        });
    });
});
