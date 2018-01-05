import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import StoreCard from './StoreCard';
import storeCardData from './__stories/mock';

describe(' Test Suite for <StoreCard /> ', () => {
    let wrapper;

    beforeEach(() => {
        /* FullDOM Rendering component in before each to eliminate duplication */
        const setStoreCallback = () => undefined;
        wrapper = mount(<StoreCard dataConfig={storeCardData} setStoreCallback={setStoreCallback}/>);
    });

    it('StoreCard component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('StoreCard component should contain dataConfig to be passed as props ', () => {
        expect(wrapper.prop('dataConfig')).to.be.defined;
    });

    it('StoreCard component should contain button to set the store ', () => {
        expect(wrapper.find('Button')).to.exist;
    });

    it('StoreCard component should default state', () => {
        expect(wrapper.state().isStoreDetailsBlockOpen).to.equal(false);
    });

    it('StoreCard component should select my store click event handler triggered', () => {
        const instance = wrapper.instance();
        instance.setStore = sinon.spy(instance, 'setStore');
        wrapper.update();
        wrapper.find('button').at(0).simulate('click');
        expect(instance.setStore.calledOnce).to.equal(true);
    });

    it('StoreCard component should trigger handle click when clicking on store service element', () => {
        const instance = wrapper.instance();
        instance.handleClick = sinon.spy(instance, 'handleClick');
        wrapper.update();
        console.log(wrapper.foid);
        wrapper.find('a').at(2).simulate('click');
        expect(instance.handleClick.calledOnce).to.equal(true);
    });
});


describe(' Test Suite for <StoreCard />  with different state', () => {
    let wrapper;

    beforeEach(() => {
        /* FullDOM Rendering component in before each to eliminate duplication */
        const setStoreCallback = () => undefined;
        const data = Object.assign({}, storeCardData);
        delete data.name;
        delete data.id;
        delete data.latitude;
        delete data.longitude;
        delete data.timings;
        delete data.zip;

        wrapper = mount(<StoreCard dataConfig={data} activeStore="1572" setStoreCallback={setStoreCallback}/>);
        wrapper.setState({ isStoreDetailsBlockOpen: true });
    });

    it('StoreCard component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('StoreCard component should contain dataConfig to be passed as props ', () => {
        expect(wrapper.prop('dataConfig')).to.be.defined;
    });

    it('StoreCard component should contain button to set the store ', () => {
        expect(wrapper.find('Button')).to.exist;
    });

    it('StoreCard component should default state', () => {
        expect(wrapper.state().isStoreDetailsBlockOpen).to.equal(true);
    });

    it('StoreCard component should select my store click event handler triggered', () => {
        const instance = wrapper.instance();
        instance.setStore = sinon.spy(instance, 'setStore');
        wrapper.update();
        wrapper.find('button').at(0).simulate('click');
        expect(instance.setStore.calledOnce).to.equal(true);
    });

    it('StoreCard component should trigger handle click when clicking on store service element', () => {
        const instance = wrapper.instance();
        instance.handleClick = sinon.spy(instance, 'handleClick');
        wrapper.update();
        console.log(wrapper.foid);
        wrapper.find('a').at(2).simulate('click');
        expect(instance.handleClick.calledOnce).to.equal(true);
    });
});


describe(' Test Suite for <StoreCard />  without few default props', () => {
    let wrapper;
    beforeEach(() => {
        /* FullDOM Rendering component in before each to eliminate duplication */
        const setStoreCallback = () => undefined;
        wrapper = mount(<StoreCard activeStore="1572" setStoreCallback={setStoreCallback}/>);
        wrapper.update();
    });
});
