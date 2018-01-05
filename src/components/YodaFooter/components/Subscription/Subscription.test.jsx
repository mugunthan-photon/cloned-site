import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SubscriptionConnected, { Subscription } from './Subscription';

describe('Test Suite for <Subscription>', () => {
    let wrapper;
    const offerMessageData = {
        OfferMessage: {
            title: 'Thank You',
            Description: 'You have successfully signed up for email offers. Your first offer will be arriving shortly.',
        },
    };
    beforeEach(() => {
        const actions = {
            optin() {
                return true;
            },
            triggerFormError() {
                return true;
            },
        };
        wrapper = mount(<Subscription actions={actions} offerMessageData={offerMessageData}/>);
        wrapper.setProps({
            deviceType: {
                isDesktop: true,
            },
            expandedFooter: true,
        });
    });

    it('Component should exist non connected', () => {
        expect(wrapper).to.exist;
    });

    it('Component should exist setInputTypeEmail', () => {
        wrapper.setState({ setInputTypeEmail: true });
        expect(wrapper).to.exist;
    });

    it('Component should exist setInputTypePhone', () => {
        wrapper.setState({ setInputTypePhone: true });
        expect(wrapper).to.exist;
    });
    it(' handle onchange for email or phone input', () => {
        const changeSpy = sinon.spy(wrapper.instance(), 'onChangeInputType');
        wrapper.update();
        wrapper.find('MarketingOptInSection').at(0).find('input').at(0)
        .simulate('change', { target: { value: 'asasd@sds.ass' } });
        expect(changeSpy.calledOnce).to.equal(true);
    });

    it(' handle onchange for email or phone input', () => {
        wrapper.setState({
            setInputTypePhone: true,
            formatPhoneVal: '111-111-1111',
        });
        const changeSpy = sinon.spy(wrapper.instance(), 'onChangeInputType');
        wrapper.update();
        wrapper.find('MarketingOptInSection').at(0).find('input').at(0)
        .simulate('change', { target: { value: '111-111-1111' } });
        expect(changeSpy.calledOnce).to.equal(true);
    });

    it('handle submit subscribe with email or phone', () => {
        const instance = wrapper.instance();

        const inputEle = wrapper.find('MarketingOptInSection').at(0).find('input').get(0);
        inputEle.value = 'test@email.com';
        const subscribeWithPhoneOrEmailSpy = sinon.spy(instance, 'subscribeWithPhoneOrEmail');
        subscribeWithPhoneOrEmailSpy();
        wrapper.find('MarketingOptInSection').at(0).find('button').simulate('click');
        expect(subscribeWithPhoneOrEmailSpy).to.be.called;
    });
    it('handle submit subscribe with email or phone', () => {
        const instance = wrapper.instance();

      //  const inputEle = wrapper.find('MarketingOptInSection').at(0).find('button').get(0);
      //  inputEle.value = 'test@email.com';
        const clearInputValSpy = sinon.spy(instance, 'clearInputVal');
        clearInputValSpy();
        wrapper.find('MarketingOptInSection').at(0).find('button').simulate('click');
        expect(clearInputValSpy).to.be.called;
    });
    it('handle submit subscribe with email or phone', () => {
        const instance = wrapper.instance();
        wrapper.setState({
            showInputError: true,
            inputErrorText: 'Enter phone number or Email',
        });

        const inputEle = wrapper.find('MarketingOptInSection').at(0).find('input').get(0);
        inputEle.value = 'test@email';
        const subscribeWithPhoneOrEmailSpy = sinon.spy(instance, 'subscribeWithPhoneOrEmail');
        subscribeWithPhoneOrEmailSpy();
        wrapper.find('MarketingOptInSection').at(0).find('button').simulate('click');
        expect(subscribeWithPhoneOrEmailSpy).to.be.called;
    });

    it('Footer component should contain a Modal component', () => {
        expect(wrapper.find('ModalBox')).to.have.length(2);
    });

    it('Modal openModal', () => {
        const openModal = sinon.spy();
        wrapper.find('button#termsAndConditionsLink').simulate('click');
        expect(openModal).to.have.been.called;
        expect(wrapper.state().isModalOpen).to.equal(true);
    });

    it('Modal closeModal', () => {
        const closeModal = sinon.spy(wrapper.instance().closeModal);
        wrapper.find('ModalBox').at(0).props().onClose();
        expect(closeModal).to.have.been.called;
        expect(wrapper.state().isModalOpen).to.equal(false);
    });

    it('Modal closeModalOfferMessage', () => {
        const closeModalOfferMessage = sinon.spy(wrapper.instance().closeModalOfferMessage);
        wrapper.find('ModalBox').at(1).props().onClose();
        expect(closeModalOfferMessage).to.have.been.called;
        expect(wrapper.state().isModalOpen).to.equal(false);
    });

    it('Should have props and initial state set', () => {
        expect(wrapper.state().isModalOpen).to.equal(false);
    });
    it('componentWillUnmount', () => {
        const instance = wrapper.instance();
        const unmountSpy = sinon.spy();
        instance.unmount = unmountSpy;
        instance.componentWillUnmount();
        expect(unmountSpy.called).to.be.true;
    });
});

describe('Test Suite for <SubscriptionConnected>', () => {
    let wrapper;
    let store;
    beforeEach(() => {
        const mockStore = configureStore([]);
        const props = { offerMessageData: { OfferMessage: {
            title: 'Thank You',
            Description: 'You have successfully signed up for email offers. Your first offer will be arriving shortly.',
        },
        },
        };
        store = mockStore({
            stores: [],
            subscriptionStatus: { subscribed: 'false' },
            orders: [],
            context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
        });
        const action = {
            analyticsActions() {
                return true;
            },
            optin() {
                return true;
            },
        };
        wrapper = mount(
            <Provider store={store} actions={action} {...props}>
                <SubscriptionConnected/>
            </Provider>);
        store.clearActions();
    });

    it('Component should exist', () => {
        expect(wrapper).to.exist;
    });
});
