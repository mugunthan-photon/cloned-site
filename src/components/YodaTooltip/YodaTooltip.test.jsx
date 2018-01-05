import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import YodaTooltip from './YodaTooltip';


describe(' Test Suite for <YodaTooltip/> ', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<YodaTooltip />);  // eslint-disable-line no-undef
        wrapper.setState({ isOpen: true });
    });

    it('Tooltip component should exist', () => {
        expect(wrapper).to.exist;
    });

    it('Onmouseleave function to trigger', () => {
        // const wrapper1 = mount(<YodaTooltip />);
        wrapper.setProps({
            triggerEventName: 'mouseover',
        });
        wrapper.find('button').at(0).simulate('mouseLeave');
        wrapper.setProps({
            triggerEventName: '',
        });
        wrapper.find('button').at(0).simulate('mouseLeave');
        // wrapper1.find('button').at(1).simulate('click');
    });

    it('should invoke componentWillUnMount', () => {
        __SERVER__ = true;
        wrapper.instance().componentWillUnmount();
    });

    it('should check else condition to', () => {
        const event = {
            type: 'event',
            nativeEvent: {
                stopImmediatePropagation: () => {},
                preventDefault: sinon.stub(),
            },
        };
        const instance = wrapper.instance();
        instance.onClickTooltip(event);
    });

    it('should check tooltip Position', () => {
        const event = {
            type: 'click',
            nativeEvent: {
                stopImmediatePropagation: () => {},
                preventDefault: sinon.stub(),
            },
        };
        const instance = wrapper.instance();
        instance.onClickTooltip(event);
        const windowHeight = global.window.innerHeight;
        const getPosition = sinon.spy(YodaTooltip.prototype, 'getPosition');
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                height: 10000,
                left: 20,
                right: 30,
                top: 270000,
                width: 27,
                windowHeight,
            }),
        };
        instance.getPosition();
        expect(getPosition).to.be.called;
        instance.onClickTooltip(event);
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                height: 1,
                left: 20,
                right: 30,
                top: 7,
                width: 27,
                windowHeight,
            }),
        };
        instance.getPosition();
        expect(getPosition).to.be.called;
        instance.onClickTooltip(event);
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                height: 1,
                left: 0,
                right: 30,
                top: 7,
                width: 27,
                windowHeight,
            }),
        };
        instance.getPosition();
        expect(getPosition).to.be.called;
        instance.onClickTooltip(event);
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                left: 100,
                right: 30,
                width: 27,
                windowHeight,
            }),
        };
        instance.getPosition();
        expect(getPosition).to.be.called;
        instance.onClickTooltip(event);
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                right: 30,
                width: 27,
                windowHeight,
            }),
        };
        instance.getPosition();
        expect(getPosition).to.be.called;
        instance.onClickTooltip(event);
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                right: 30,
                width: 27,
                left: -10,
                windowHeight,
            }),
        };
        instance.getPosition();
        expect(getPosition).to.be.called;
        __SERVER__ = false;

        const toggleTooltip = sinon.spy(YodaTooltip.prototype, 'toggleTooltip');
        const windowWidth = global.window.innerWidth;
        expect(toggleTooltip).to.be.called;
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                width: 27,
                left: -10,
                top: 11,
                height: 7,
                windowHeight,
                windowWidth,
            }),
        };
        instance.getPosition();
        expect(getPosition).to.be.called;
        expect(toggleTooltip).to.be.called;
    });
    it('should check tooltip position values', () => {
        const event = {
            type: 'click',
            nativeEvent: {
                stopImmediatePropagation: () => {},
                preventDefault: sinon.stub(),
            },
        };
        const instance = wrapper.instance();
        instance.onClickTooltip(event);
        const windowHeight = global.window.innerHeight;
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                height: 10,
                left: 0,
                right: 30,
                top: 5,
                width: 17,
                windowHeight,
            }),
        };
        instance.getPosition();
        instance.onClickTooltip(event);
        instance.tooltip = {
            getBoundingClientRect: () => ({
                bottom: 10,
                height: 10,
                left: -20,
                right: -30,
                top: 5,
                width: 1,
                windowHeight,
            }),
        };
        __SERVER__ = false;
        wrapper.instance().componentWillUnmount();
        wrapper.state({ isOpen: 'tooltip' });
        wrapper.setProps({
            triggerEventName: 'mouseover',
        });
        instance.toggleTooltip('placevalue');
    });
});
