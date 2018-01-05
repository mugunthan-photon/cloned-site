import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ToolTip from './SavedListToolTip';

const MyListActions = {
    getLists: sinon.spy(),
};

describe('<ToolTip />', () => {
    it('simulate all the actions', () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            MTLSavedLists: {
                listItems: {
                    data: {
                        totalList: 2,
                        listData: [
                            { id: 1, name: 'test', totalitems: 2 },
                            { id: 2, name: 'test2', totalitems: 2 },
                        ],
                    },
                },
                createList: { status: 412, data: { errorMessage: 'error' } },
                movedToList: { status: 201 },
            },
            actions: {},
            deviceType: { isMobile: true },
        });

        const wrapper = mount(
            <Provider store={store}>
                <ToolTip listId="1" productId="12" deviceType={{ isMobile: false }} handleCreateNewList={() => {}} origin="PDP"/>
            </Provider>,
        );

        wrapper.find('.radioButton').at(0).find('RadioButton')
        .find('input')
        .simulate('click');

        wrapper.find('Button')
        .at(0)
        .prop('onClick')
        .call();

        wrapper.find('.footerContainer')
        .find('Button').at(0)
        .prop('onClick')
        .call();

        wrapper.find('.moveButton').find('Button')
        .at(0)
        .prop('onClick')
        .call();

        wrapper.find('.inputContainer')
        .find('input').at(0)
        .node.value = '$#test';

        wrapper.find('.moveButton')
        .find('Button').at(0)
        .prop('onClick')
        .call();

        wrapper.find('.inputContainer')
        .find('input').at(0)
        .node.value = 'test';

        wrapper.find('.moveButton')
        .find('Button').at(0)
        .prop('onClick')
        .call();
    });

    it('receive props', () => {
        const mockStoreOne = configureStore([]);
        const storeOne = mockStoreOne({
            MTLSavedLists: {
                listItems: {
                    data: {
                        totalList: 2,
                        listData: [
                            { id: 1, name: 'test', totalitems: 2 },
                            { id: 2, name: 'test2', totalitems: 2 },
                        ],
                    },
                },
                createList: { status: 412, data: { errorMessage: 'error' } },
                actions: {},
                deviceType: { isMobile: false },
            },
        });
        mount(
            <Provider store={storeOne}>
                <ToolTip listId="1" productId="12" deviceType={{ isMobile: false }} MyListActions={MyListActions}/>
            </Provider>,
        );
    });

    it('without totalList', () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            MTLSavedLists: {
                listItems: {
                    data: {
                        totalList: 2,
                        listData: [
                            { id: 1, name: 'test', totalitems: 2 },
                            { id: 2, name: 'test2', totalitems: 2 },
                        ],
                    },
                },
                createList: { status: 412, data: { errorMessage: 'error' } },
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <ToolTip deviceType={{ isMobile: false }} />
            </Provider>,
        );
        wrapper.setState({ createNewList: true });
    });

    it('totalList > 7', () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            MTLSavedLists: {
                listItems: {
                    data: {
                        totalList: 2,
                        listData: [
                            { id: 1, name: 'test', totalitems: 2 },
                            { id: 2, name: 'test2', totalitems: 2 },
                        ],
                    },
                },
                createList: { status: 412, data: { errorMessage: 'error' } },
            },
        });

        mount(
            <Provider store={store}>
                <ToolTip listId="1" productId="12" deviceType={{ isMobile: true }}/>
            </Provider>,
        );
    });
});

describe('<ToolTip />', () => {
    it('Call will receive props', () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            MTLSavedLists: {
                listItems: {
                    data: {
                        totalList: 2,
                        listData: [
                            { id: 1, name: 'test', totalitems: 2 },
                            { id: 2, name: 'test2', totalitems: 2 },
                        ],
                    },
                },
                createList: { status: 412, data: { errorMessage: 'error' } },
            },
        });

        const wrapper = shallow(
            <Provider store={store}>
                <ToolTip listId="1" productId="12" deviceType={{ isMobile: true }}/>
            </Provider>,
        );

        wrapper.setProps({
            createList: { status: 412, data: { errorMessage: 'error' } },
        });

        wrapper.instance().componentWillReceiveProps({ ...store, createList: { status: 201, data: { errorMessage: 'error' } } });
    });
});

describe('<ToolTip />', () => {
    it('render without list', () => {
        const mockStore = configureStore([]);
        const store = mockStore({
            MTLSavedLists: {
                listItems: {
                    data: {},
                },
                createList: { status: 412, data: { errorMessage: 'error' } },
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <ToolTip listId="1" productId="12" deviceType={{ isMobile: true }} MyListActions={MyListActions}/>
            </Provider>,
        );

        wrapper.setProps({
            createList: { status: 412, data: { errorMessage: 'error' } },
        });

        wrapper.instance().componentWillReceiveProps({ ...store, createList: { status: 201, data: { errorMessage: 'error' } } });
    });
});
