import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import DepartmentVisualLeftNavConnected, { DepartmentVisualLeftNav } from './DepartmentVisualLeftNav';
import LeftVisualNavMenuResponse from './__stories/mock';


describe('<DepartmentVisualLeftNav />', () => {
    it('Connected Smart Components, with connect', () => {
        /* Full DOM Rendering component in before each to eliminate duplication */
        const mockStore = configureStore([]);
        const store = mockStore({
            departmentsVisualLeftNavigation: [],
        });

        const wrapper = mount(
            <Provider store={store}>
                <DepartmentVisualLeftNavConnected direction="Fluid" analyticsTag="testTag" deviceType="desktop"/>
            </Provider>,
        );

        store.clearActions();

        expect(wrapper).to.exist;
    });

    it('Connected Smart Components, with fully rendering', () => {
        /* Full DOM Rendering component in before each to eliminate duplication */
        const mockStore = configureStore([]);
        const store = mockStore({
            departmentsVisualLeftNavigation: LeftVisualNavMenuResponse.LeftVisualNavMenuResponse,
        });

        const wrapper = mount(
            <Provider store={store}>
                <DepartmentVisualLeftNavConnected direction="Fluid" nTypeID="N-bwo3w" analyticsTag="testTag" deviceType="desktop" />
            </Provider>,
        );

        expect(wrapper).to.exist;
    });

    it('componentWillReceiveProps', () => {
        const props = {
            actions: {
                getDepartmentVisualLeftNavigationAction() {
                    return LeftVisualNavMenuResponse.LeftVisualNavMenuResponse;
                },
                nTypeID: 'nid',
                pageName: 'dept',
            },
        };

        const newProp = {
            forceRenderClient: true,
            nTypeID: 'nid',
            pageName: 'dept',
            departmentsVisualLeftNavigation: LeftVisualNavMenuResponse,
        };

        const newWrapper = mount(<DepartmentVisualLeftNav {...props} />);
        const instance = newWrapper.instance();
        const spygetDepartmentAction = sinon.spy(instance.props.actions, 'getDepartmentVisualLeftNavigationAction');
        instance.componentWillReceiveProps(newProp);
        expect(spygetDepartmentAction.called).to.true;
    });
    it('componentWillReceiveProps', () => {
        const spygetDepartmentAction = sinon.spy();
        const defaultProps = {
            actions: {
                getDepartmentVisualLeftNavigationAction: spygetDepartmentAction,
            },
            departmentsVisualLeftNavigation: LeftVisualNavMenuResponse.LeftVisualNavMenuResponse,
        };
        const newWrapper = shallow(<DepartmentVisualLeftNav {...defaultProps} />);
        newWrapper.setProps({ departmentsVisualLeftNavigation: LeftVisualNavMenuResponse.LeftVisualNavMenuResponse });
        newWrapper.update();
        expect(spygetDepartmentAction.called).to.false;
    });
    it('Test click for desktop', () => {
        const spygetDepartmentAction = sinon.spy();
        const spyTriggerAction = sinon.spy();
        const defaultProps = {
            actions: {
                getDepartmentVisualLeftNavigationAction: spygetDepartmentAction,
                triggerNavigationClick: spyTriggerAction,
            },
            departmentsVisualLeftNavigation: LeftVisualNavMenuResponse.LeftVisualNavMenuResponse,
            deviceType: 'desktop',
        };
        const event = { target: { name: 'pollName', value: 'spam', innerText: 'DESKTOP' } };
        const newWrapper = mount(<DepartmentVisualLeftNav {...defaultProps} />);
        newWrapper.find('a').at(1).simulate('click', event);
        const linkName = spyTriggerAction.getCall(0).args[0].linkName;
        expect(spyTriggerAction.called).to.true;
        expect(linkName).to.equal('left:SHOP DEPARTMENTS:DESKTOP');
    });
    it('Test click for MOBILE', () => {
        const spygetDepartmentAction = sinon.spy();
        const spyTriggerAction = sinon.spy();
        const defaultProps = {
            actions: {
                getDepartmentVisualLeftNavigationAction: spygetDepartmentAction,
                triggerNavigationClick: spyTriggerAction,
            },
            departmentsVisualLeftNavigation: LeftVisualNavMenuResponse.LeftVisualNavMenuResponse,
            deviceType: 'mobile',
        };
        const event = { target: { name: 'pollName', value: 'spam', innerText: 'MOBILE' } };
        const newWrapper = mount(<DepartmentVisualLeftNav {...defaultProps} />);
        newWrapper.find('a').at(1).simulate('click', event);
        const linkName = spyTriggerAction.getCall(0).args[0].linkName;
        expect(spyTriggerAction.called).to.true;
        expect(linkName).to.equal('left:FEATURED CATEGORIES:MOBILE');
    });

    it('Test click for Tablet', () => {
        const spygetDepartmentAction = sinon.spy();
        const spyTriggerAction = sinon.spy();
        const defaultProps = {
            actions: {
                getDepartmentVisualLeftNavigationAction: spygetDepartmentAction,
                triggerNavigationClick: spyTriggerAction,
            },
            departmentsVisualLeftNavigation: LeftVisualNavMenuResponse.LeftVisualNavMenuResponse,
            deviceType: 'tablet',
        };
        const event = { target: { name: 'pollName', value: 'spam', innerText: 'TABLE' } };
        const newWrapper = mount(<DepartmentVisualLeftNav {...defaultProps} />);
        newWrapper.find('a').at(1).simulate('click', event);
        const linkName = spyTriggerAction.getCall(0).args[0].linkName;
        expect(spyTriggerAction.called).to.true;
        expect(linkName).to.equal('left:FEATURED CATEGORIES:TABLE');
    });

    it('Tablet for empty', () => {
        const spygetDepartmentAction = sinon.spy();
        const spyTriggerAction = sinon.spy();
        const defaultProps = {
            actions: {
                getDepartmentVisualLeftNavigationAction: spygetDepartmentAction,
                triggerNavigationClick: spyTriggerAction,
            },
            departmentsVisualLeftNavigation: {},
            deviceType: 'tablet',
        };
        const newWrapper = mount(<DepartmentVisualLeftNav {...defaultProps} />);
        expect(newWrapper).to.exist;
    });

    it('Test click for analyticsTag', () => {
        const spygetDepartmentAction = sinon.spy();
        const spyTriggerAction = sinon.spy();
        const defaultProps = {
            actions: {
                getDepartmentVisualLeftNavigationAction: spygetDepartmentAction,
                triggerNavigationClick: spyTriggerAction,
            },
            departmentsVisualLeftNavigation: LeftVisualNavMenuResponse,
            deviceType: 'desktop',
            analyticsTag: 'testTag',
            softRoute: true,
        };
        const windowBkp = global.window;
        global.window = {
            location: {
                href: 'http://m.jcpenney.com/',
            },
            open: windowBkp.open,
        };
        const event = { target: {
            name: 'pollName',
            value: 'spam',
            innerText: 'MOBILE',
            href: '/g/kitchen-dining/N-bwo3vD1nohow' } };
        const newWrapper = mount(<DepartmentVisualLeftNav {...defaultProps} />);
        newWrapper.find('a').at(1).simulate('click', event);
        const actualUrlValue = global.window.location;
        const expectedUrlValue = '/g/kitchen-dining/N-bwo3vD1nohow?testTag';
        global.window = windowBkp;
        expect(actualUrlValue).to.equal(expectedUrlValue);
    });

    it('Test click for analyticsTag more', () => {
        const spygetDepartmentAction = sinon.spy();
        const spyTriggerAction = sinon.spy();
        const defaultProps = {
            actions: {
                getDepartmentVisualLeftNavigationAction: spygetDepartmentAction,
                triggerNavigationClick: spyTriggerAction,
            },
            departmentsVisualLeftNavigation: LeftVisualNavMenuResponse.LeftVisualNavMenuResponse,
            deviceType: 'desktop',
            analyticsTag: 'testTag',
            softRoute: true,
        };
        const windowBkp = global.window;
        global.window = {
            location: {
                href: 'http://m.jcpenney.com/',
            },
            open: windowBkp.open,
        };
        const event = { target: {
            name: 'pollName',
            value: 'spam',
            innerText: 'MOBILE',
            href: '/g/bed-and-bath/N-bwo3w?pageType=X2H2' } };
        const newWrapper = mount(<DepartmentVisualLeftNav {...defaultProps} />);
        newWrapper.find('a').at(1).simulate('click', event);
        const actualUrlValue = global.window.location;
        const expectedUrlValue = '/g/bed-and-bath/N-bwo3w?pageType=X2H2&testTag';
        global.window = windowBkp;
        expect(actualUrlValue).to.equal(expectedUrlValue);
    });
});

