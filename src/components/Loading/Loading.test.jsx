import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoadingConnected, { Loading } from './Loading';


describe('<Loading />', () => {
    describe('Dumb Component testing', () => {
        it('should component update test', () => {
            const loaderComponent = mount(<Loading />);
            loaderComponent.update();
            expect(loaderComponent).to.exist;
        });
    });


    describe('Connected smart component testing', () => {
        it('showing Loader', () => {
            /* FUll DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            const store = mockStore({
                isLoading: true,
            });


            const wrapper = mount(<Provider store={store}>
                <LoadingConnected />
            </Provider>);
            expect(wrapper).to.exist;
        });

        it('hiding Loader', () => {
            /* FUll DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            const store = mockStore({
                isLoading: false,
            });

            const wrapper = mount(<Provider store={store}>
                <LoadingConnected />
            </Provider>);
            expect(wrapper).to.exist;
        });
    });
});
