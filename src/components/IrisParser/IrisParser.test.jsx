import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import IrisParserConnected from './IrisParser';
import mock from './__stories/mock';


const { describe, it } = global;

describe(' Test Suite for <IrisParser/> connected', () => {
    let wrapper;
    beforeEach(() => {
        global.URLSearchParams = () => ({ get: () => true });
        const mockStore = configureStore([]);
        const store = mockStore({
            session: { signedOut: false },
            context: {},
            irisData: mock,
        });
        wrapper = mount(
            <Provider store={store}>
                <IrisParserConnected/>
            </Provider>,
        );
    });
    it('IrisParser component should exist ', () => {
        expect(wrapper).to.exist;
    });
});

