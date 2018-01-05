import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import rewire from 'rewire';
import configureStore from 'redux-mock-store';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies'; // eslint-disable-line no-unused-vars
import FindAStoreConnected from './FindAStore';
import Checkbox from './Checkbox'; // eslint-disable-line no-unused-vars
import FilterStore from './FilterStore';

const storeCardData = { // eslint-disable-line no-unused-vars
    id: '1572',
    name: 'Fox Hills Mall',
    street: '6000 S Hannum Ave',
    city: 'Culver City',
    zip: '90230',
    phone: '(310) 390-8966',
    distance: 5.2,
    latitude: 33.98674,
    longitude: -118.39158,
    number: '1572',
    country: null,
    state: 'CA',
    timings: [
        {
            days: 'Mon-Sat',
            time: '10:00am-9:00pm',
        },
        {
            days: 'Sun',
            time: '11:00am-7:00pm',
        },
    ],
    timingsOverrideMessage: null,
    services: [
        'big and tall',
        'major appliances',
        'custom decorating',
        'furniture',
        'wedding registry',
        'optical',
        'portrait studio',
        'salon',
        'Sephora',
        'jewelry',
    ],
};

describe('<FindAStore />', () => {
    describe('Empty Store , Initial Condition test', () => {
        it('Testing Sample initial condn', () => {
            const mockStore = configureStore([]);
            const store = mockStore({
                stores: [],
                latLong: { lat: 60.558151, lng: 22.095773 },
            });

            mount(<Provider store={store}>
                <FindAStoreConnected displayMap/>
            </Provider>);

            store.clearActions();
        });
    });

    describe('Get store testing', () => {
        let findAStoreRewire;
        let getStores;
        beforeEach(() => {
            findAStoreRewire = rewire('./FindAStore');
            getStores = findAStoreRewire.__get__('getStores');
        });
        it('function testing', () => {
            const s = getStores(1, {}, {}, {});
            expect(s.page).to.equal(1);
        });
    });

    // describe('Empty Store , Initial Condition test with displayMap to false', () => {
    //     it('Testing Sample initial condn', () => {
    //         const mockStore = configureStore([]);
    //         const displayMap = false;
    //         const store = mockStore({
    //             stores: {
    //                 status: 'check',
    //             },
    //             latLong: { lat: 60.558151, lng: 22.095773 },
    //         });
    //
    //         mount(<Provider store={store}>
    //             <FindAStoreConnected displayMap={displayMap}/>
    //         </Provider>);
    //
    //         store.clearActions();
    //     });
    // });
    //
    //
    // describe('Connected component testing', () => {
    //     let wrapper;
    //     let store;
    //     beforeEach(() => {
    //         /* Full DOM Rendering component in before each to eliminate duplication */
    //         const mockStore = configureStore([]);
    //         store = mockStore({
    //             stores: [storeCardData],
    //             latLong: { lat: 60.558151, lng: 22.095773 },
    //         });
    //
    //         Cookies.save('storeLat', 33.98674, '', '');
    //         Cookies.save('storeLng', -118.39158, '', '');
    //         Cookies.save('storeId', 1572, '', '');
    //
    //         wrapper = mount(<Provider store={store}>
    //             <FindAStoreConnected displayMap/>
    //         </Provider>);
    //
    //         // hydrate will be called and action is triggered.
    //         expect(store.getActions().length).to.equal(1);
    //         expect(store.getActions()[0]).to.deep.equal({
    //             type: 'GET_STORES_GET_REQUEST',
    //             payload: {
    //                 location: { lat: '33.98674', lng: '-118.39158' },
    //                 page: 1,
    //                 pageSize: 5,
    //                 searchLimit: 25,
    //             },
    //         });
    //
    //         store.clearActions();
    //     });
    //
    //     it('Connected Smart Components, with connect renders', () => {
    //         expect(store).to.exist;
    //     });
    //
    //     it('on Component unmount, expect clear action to be called', () => {
    //         expect(store.getActions().length).to.equal(0);
    //         sinon.spy(FindAStoreConnected.prototype, 'componentWillUnmount');
    //         wrapper.unmount();
    //         expect(FindAStoreConnected.prototype.componentWillUnmount.calledOnce).to.equal(true);
    //         expect(store.getActions().length).to.equal(1);
    //     });
    //
    //     it('input value set and on click call action', () => {
    //         const submitPin = sinon.spy();
    //         expect(store.getActions().length).to.equal(0);
    //         const input = wrapper.find('input').get(0);
    //         input.value = 'Dallas';
    //         wrapper.find('Button').at(1).simulate('click');
    //         expect(submitPin).to.be.calledOnce;
    //         expect(store.getActions().length).to.equal(1);
    //         expect(store.getActions()[0]).to.deep.equal({
    //             type: 'GET_STORES_GET_REQUEST',
    //             payload: {
    //                 address: 'Dallas',
    //                 page: 1,
    //                 pageSize: 5,
    //                 searchLimit: 25,
    //             },
    //         });
    //     });
    //
    //     it('show Map is called', () => {
    //         wrapper.find('Button').at(3).simulate('click');
    //     });
    //
    //     it('hide Map is called', () => {
    //         wrapper.find('Button').at(4).simulate('click');
    //     });
    //
    //     it('Store card component exists inside here', () => {
    //         expect(wrapper.find('StoreCard')).to.have.length(1);
    //     });
    //
    //     it('Modal Box component exists inside here', () => {
    //         expect(wrapper.find('ModalBox')).to.have.length(1);
    //     });
    //
    //     it('get More stores test', () => {
    //         expect(wrapper.find('a#btnGetMore').length).to.equal(1);
    //         wrapper.find('a#btnGetMore').simulate('click');
    //     });
    //
    //     it('open Filters Modal onclick and make sure that filters are available for it', () => {
    //         const openFiltersModal = sinon.spy();
    //         wrapper.find('Button').at(2).simulate('click');
    //         expect(openFiltersModal).to.have.been.called;
    //
    //         // The Modal is open and Filters are present
    //         expect(wrapper.find('ModalBox').children().find('FilterStore')).to.have.length(1);
    //
    //         // check for calling onFilterChange being called
    //         wrapper.find('ModalBox').children().find('FilterStore').props()
    //             .onFilterChange(['Furniture']); // on clicking done a callback is called
    //
    //         wrapper.find('ModalBox').children().find('FilterStore').props()
    //             .onDoneCallback(); // on clicking done a callback is called
    //
    //         // call it by set index
    //         wrapper.find('StoreCard').props().setStoreCallback(1);
    //     });
    //
    //     it('close Filters Modal onclick', () => {
    //         const closeFiltersModal = sinon.spy();
    //         wrapper.find('ModalBox').props().onClose();
    //         expect(closeFiltersModal).to.have.been.called;
    //     });
    // });
    //
    // describe('Checkbox works fine', () => {
    //     let wrapper;
    //     const callBackFunc = sinon.spy();
    //     beforeEach(() => {
    //         /* Shallow Rendering component in before each to eliminate duplication */
    //         wrapper = mount(<Checkbox handleCheckboxChange={callBackFunc} onDoneCallback={callBackFunc}/>);
    //     });
    //
    //
    //     it('Checkbox component should exist ', () => {
    //         expect(wrapper).to.exist;
    //     });
    //
    //     it('Handle checkbox change', () => {
    //         wrapper.find('input').props().onChange();
    //     });
    //
    //     it('Should call toggleCheckBoxChange on change of checkbox', () => {
    //         const instance = wrapper.instance();
    //         const someInst = sinon.spy(instance, 'toggleCheckboxChange');
    //         wrapper.update();
    //         wrapper.find('input').simulate('change');
    //         expect(someInst.calledOnce).to.equal(true);
    //     });
    // });
    //
    describe('Filter store Tests', () => {
        let wrapper;

        beforeEach(() => {
            const callBackFunc = sinon.spy();
            /* Shallow Rendering component in before each to eliminate duplication */
            wrapper = mount(<FilterStore onDoneCallback={callBackFunc} onFilterChange={callBackFunc}/>);
        });

        it('Checkbox component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('Filter reset call triggered ', () => {
            wrapper.find('Button').at(0).simulate('click');
        });

        it('Filter done call triggered ', () => {
            wrapper.find('Button').at(1).simulate('click');
            wrapper.find('Checkbox').at(0).props().handleCheckboxChange(1, 'Filter');
        });
    });
    //
    // describe('Filter store Tests', () => {
    //     let wrapper;
    //
    //     beforeEach(() => {
    //         const callBackFunc = sinon.spy();
    //         /* Shallow Rendering component in before each to eliminate duplication */
    //         wrapper = mount(<FilterStore onFilterChange={callBackFunc}/>);
    //     });
    //
    //     it('toggleChebox functionality test ', () => {
    //         const instance = wrapper.instance();
    //         instance.toggleCheckbox = sinon.spy(instance, 'toggleCheckbox');
    //         wrapper.update();
    //         sinon.stub(instance.selectedCheckboxes, 'has', () => true);
    //         instance.toggleCheckbox(0, 10);
    //         expect(instance.toggleCheckbox).to.have.been.called;
    //     });
    //
    //     it('Checkbox component should exist ', () => {
    //         expect(wrapper).to.exist;
    //     });
    //
    //     it('Filter reset call triggered ', () => {
    //         wrapper.find('Button').at(0).simulate('click');
    //     });
    //
    //     it('Filter done call triggered ', () => {
    //         wrapper.find('Button').at(1).simulate('click');
    //         wrapper.find('Checkbox').at(0).props().handleCheckboxChange(1, 'Filter');
    //     });
    // });
});
