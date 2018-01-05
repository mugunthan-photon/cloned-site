import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Slider from './Slider';

describe('<Slider />', () => {
    let wrapper;

    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<Slider direction="RIGHT" />);
    });

    it('Slider component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('should have an initial state for slideOpen ', () => {
        expect(wrapper.state().slideOpen).to.equal(false);
    });

    it('should change state for isOpen on click', () => {
        const instance = wrapper.instance();
        instance.toggleMenu = sinon.spy(instance, 'toggleMenu');
        wrapper.update();
        wrapper.find('button').at(0).simulate('click');
        expect(instance.toggleMenu.calledOnce).to.equal(true);
    });

    it('should close menu to be called during anchor click', () => {
        const instance = wrapper.instance();
        instance.closeMenu = sinon.spy(instance, 'closeMenu');
        wrapper.update();
        wrapper.find('a').at(0).simulate('click');
        expect(instance.closeMenu.calledOnce).to.equal(true);
    });

    it('should component receive props to toggle', () => {
        const menu = sinon.spy(Slider.prototype, 'componentWillReceiveProps');
        wrapper.setProps({ toggleSlider: true });
        expect(Slider.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
        menu.restore();
    });


    it('should menu click be called during click of menus', () => {
        const instance = wrapper.instance();
        instance.menuClick = sinon.spy(instance, 'menuClick');
        wrapper.update();
        wrapper.find('a').at(0).find('div').at(1)
            .simulate('click');
        expect(instance.menuClick.calledOnce).to.equal(true);
    });
});


describe('<Slider />', () => {
    let wrapper;
    let customElement;

    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        customElement = React.createElement('div', null, 'Hello!');
        wrapper = mount(<Slider customIcon={customElement} />);
    });

    it('Slider component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('should have an initial state for slideOpen ', () => {
        expect(wrapper.state().slideOpen).to.equal(false);
    });


    it('should change state for isOpen on click', () => {
        const instance = wrapper.instance();
        instance.toggleMenu = sinon.spy(instance, 'toggleMenu');
        wrapper.update();
        wrapper.find('button').at(0).simulate('click');
        expect(instance.toggleMenu.calledOnce).to.equal(true);
    });

    it('should close menu to be called during anchor click', () => {
        const instance = wrapper.instance();
        instance.closeMenu = sinon.spy(instance, 'closeMenu');
        wrapper.update();
        wrapper.find('a').at(0).simulate('click');
        expect(instance.closeMenu.calledOnce).to.equal(true);
    });

    it('should component receive props to toggle', () => {
        const menu = sinon.spy(Slider.prototype, 'componentWillReceiveProps');
        wrapper.setProps({ toggleSlider: false });
        expect(Slider.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
        menu.restore();
    });

    it('should menu click be called during click of menus', () => {
        const instance = wrapper.instance();
        instance.menuClick = sinon.spy(instance, 'menuClick');
        wrapper.update();
        wrapper.find('a').at(0).find('div').at(1)
            .simulate('click');
        expect(instance.menuClick.calledOnce).to.equal(true);
    });

    it('toggleMenu ', () => {
        const instance = wrapper.instance();
        wrapper.setProps({
            closeMenuClick: sinon.spy(),
        });
        wrapper.setState({ slideOpen: true });
        instance.toggleMenu();
        expect(instance.props.closeMenuClick.called).to.equal(true);
    });
});
