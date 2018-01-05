import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import DepartmentVisualNavConnected, { DepartmentVisualNav } from './DepartmentVisualNav';
import mockData from './__stories/mock';


describe('<DepartmentVisualNav />', () => {
    describe('Connected component testing', () => {
        it('Connected Smart Components, with connect', () => {
            /* Full DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            const store = mockStore({
                departmentsVisualNavigation: [],
            });

            const wrapper = mount(
                <Provider store={store}>
                    <DepartmentVisualNavConnected direction="Fluid" />
                </Provider>,
            );

            store.clearActions();

            expect(wrapper).to.exist;
        });

        it('should display as per store data , Making Sure the Actual Data is rendered', () => {
            const mockStore = configureStore([]);

            const store = mockStore({
                departmentsVisualNavigation: mockData,
                context: {
                    deviceType: {
                        mobile: true,
                    },
                },
            });
            const spygetDepartmentAction = sinon.spy();
            const actions = {
                getDepartmentVisualNavigationAction: spygetDepartmentAction,
            };

            const newWrapper = mount(<Provider store={store}>
                <DepartmentVisualNavConnected actions={actions} direction="Fluid" />
            </Provider>);
            newWrapper.update();

            expect(store.getState().departmentsVisualNavigation).to.equal(mockData);
        });

        it('componentWillReceiveProps', () => {
            const props = {
                actions: {
                    getDepartmentVisualNavigationAction() {
                        return true;
                    },
                    nTypeID: 'nid',
                    pageName: 'dept',
                },
            };

            const newProp = {
                forceRenderClient: true,
                nTypeID: 'nid',
                pageName: 'dept',
                departmentsVisualNavigation: [],
            };

            const newWrapper = mount(<DepartmentVisualNav {...props} />);
            newWrapper.setProps({ departmentsVisualNavigation: mockData });
            const instance = newWrapper.instance();
            const spygetDepartmentAction = sinon.spy(instance.props.actions, 'getDepartmentVisualNavigationAction');
            instance.componentWillReceiveProps(newProp);
            expect(spygetDepartmentAction.called).to.true;
        });

        it('componentWillReceiveProps, prop changes', () => {
            const spygetDepartmentAction = sinon.spy();
            const actions = {
                getDepartmentVisualNavigationAction: spygetDepartmentAction,
            };

            const newWrapper = mount(<DepartmentVisualNav actions={actions} />);
            newWrapper.setProps({ departmentsVisualNavigation: mockData });
            expect(newWrapper.props().departmentsVisualNavigation).to.have.length.above(0);
        });
    });
});
