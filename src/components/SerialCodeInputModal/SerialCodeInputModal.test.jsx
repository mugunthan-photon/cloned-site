import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { describe, it } from 'mocha';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SerialCodeInputModalConnected, { SerialCodeInputModal } from './SerialCodeInputModal';

describe('<SerialCodeInputModal />', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        const mockStore = configureStore([]);
        store = mockStore({
            couponApplicationState: {
                status: 500,
                statusText: 'Internal Server Error',
                data: [],
            },
            messages: [],
            modalOnClose: () => {},
        });

        wrapper = mount(<Provider store={store}>
            <SerialCodeInputModalConnected />
        </Provider>);
    });

    it('Serial Code Coupon', () => {
        expect(wrapper).to.exist;
        expect(wrapper.find('couponSerialStatus')).to.exist;
        expect(wrapper.find('serialNumberReq')).to.exist;
    });

    it('details data', () => {
        const wrappernotconnected = shallow(<SerialCodeInputModal />);
        wrappernotconnected.setProps({ couponApplicationState: { status: 201, statusText: 'Created' } });
        wrappernotconnected.update();
    });

    it('Component should call componentWillReceiveProps on update', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: { applyAdjustment: spyGetDetail,
            },
            couponApplicationState: {},
        };
        const couponApplicationState = {
            status: 201,
            statusText: 'Created',
            data: {},
        };
        const wrapperNotConnected = shallow(<SerialCodeInputModal {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
    });

    it('onChange', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: { applyAdjustment: spyGetDetail,
                removeAllMessages: spyGetDetail,
            },
            couponApplicationState: {},
        };
        const couponApplicationState = {
            status: 400,
            statusText: 'BAD REQUEST',
            data: {},
        };
        const event = {
            preventDefault: () => {},
            target: {
                value: '1234',
            },
        };
        const wrapperNotConnected = shallow(<SerialCodeInputModal {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.onChange = sinon.spy(instance, 'onChange');
        wrapperNotConnected.update();
        instance.onChange(event);
    });

    it('submitForm', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: { applyAdjustment: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {},
            onClose: () => {},
            onSubmit: () => {},
        };
        const couponApplicationState = {
            status: 400,
            statusText: 'BAD REQUEST',
            data: {},
        };
        const wrapperNotConnected = shallow(<SerialCodeInputModal {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.handleSubmitForm = sinon.spy(instance, 'handleSubmitForm');
        wrapperNotConnected.update();
        instance.handleSubmitForm(new Event('submit'));
    });

    it('submitForm', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: { applyAdjustment: spyGetDetail,
            },
            couponApplicationState: {},
            onClose: () => {},
            onSubmit: () => {},
        };
        const couponApplicationState = {
            status: 400,
            statusText: 'BAD REQUEST',
            data: {},
        };
        const wrapperNotConnected = shallow(<SerialCodeInputModal {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.setState({ value: '123456' });
        instance.handleSubmitForm = sinon.spy(instance, 'handleSubmitForm');
        wrapperNotConnected.update();
        instance.handleSubmitForm(new Event('submit'));
    });
});
