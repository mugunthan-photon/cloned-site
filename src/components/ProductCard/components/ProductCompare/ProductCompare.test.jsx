import { expect } from 'chai';
import { mount } from 'enzyme';
import { beforeEach, describe, it } from 'mocha';
import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductCompare from './ProductCompare';
import { productDetails } from '../../__stories/mock';


describe('<ProductCompare /> when compareIn = false', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const addOrRemoveProductsSpy = sinon.spy();
    const store = mockStore({
        compareProducts: {
            products: [],
            productToDisplayError: {},
        },
        actions: {
            addOrRemoveProducts: addOrRemoveProductsSpy,
        },
    });


    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <ProductCompare productDetails={productDetails}/>
            </Provider>,
        );
    });

    it('Should not display product compare checkbox', () => {
        expect(wrapper.find('input[type="checkbox"]').length).to.equal(0);
    });
});

describe('<ProductCompare /> initial state when compareIn = true', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const addOrRemoveProductsSpy = sinon.spy();
    const store = mockStore({
        compareProducts: {
            products: [],
            productToDisplayError: {},
        },
        actions: {
            addOrRemoveProducts: addOrRemoveProductsSpy,
        },
    });


    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <ProductCompare productDetails={Object.assign({}, productDetails, { compareIn: true })}/>
            </Provider>,
        );
    });

    it('Should display product compare checkbox', () => {
        expect(wrapper.find('input[checked]').length).to.equal(1);
    });
});

describe('<ProductCompare />', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const addOrRemoveProductsSpy = sinon.spy();
    const store = mockStore({
        compareProducts: {
            products: [productDetails, productDetails],
            productToDisplayError: productDetails,
        },
        actions: {
            addOrRemoveProducts: addOrRemoveProductsSpy,
        },
    });


    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <ProductCompare productDetails={Object.assign({}, productDetails, { compareIn: true })}/>
            </Provider>,
        );
    });

    it('Should display product compare checkbox', () => {
        expect(wrapper.find('a').length).to.equal(1);
    });

    it('Should display error text', () => {
        wrapper.find('input[checked]').simulate('change');
        expect(wrapper.find('div.errorText').length).to.equal(1);
    });
});

