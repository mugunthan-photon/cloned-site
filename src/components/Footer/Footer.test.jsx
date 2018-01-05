import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ContextProvider from 'yoda-core-components/lib/components/FeatureFlag/ContextProvider';
import FooterConnected, { Footer } from './Footer';

const { describe, it } = global;

describe(' Test Suite for <Footer/> ', () => {
    describe('Dumb component testing', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<Footer />);  // eslint-disable-line no-undef
        });

        it('Non Connected Dumb, component', () => {
            expect(wrapper).to.exist;
        });

        it.skip('Should have props and initial state set', () => {
            expect(wrapper.props().orders).to.deep.equal([]);
            expect(wrapper.props().subscriptionStatus).to.deep.equal({});
        });

        it('Footer component should contain accordion component ', () => {
            expect(wrapper.find('Accordion')).to.have.length(1);
        });

        it('Footer component should contain accordion section component ', () => {
            expect(wrapper.find('AccordionSection')).to.have.length(3);
        });

        it('Accordion section component should contain different sub components', () => {
            expect(wrapper.find('Accordion').childAt(0).find('MarketingOptInSection')).to.have.length(2);
            expect(wrapper.find('Accordion').childAt(1).find('List')).to.have.length(1);
            expect(wrapper.find('Accordion').childAt(2).find('List')).to.have.length(1);
        });

        it('Modal openModal', () => {
            const openModal = sinon.spy();
            wrapper.find('button#termsAndConditionsLink').simulate('click');
            expect(openModal).to.have.been.called;
            expect(wrapper.state().isModalOpen).to.equal(true);
        });


        it('Should have props and initial state set', () => {
            expect(wrapper.state().isModalOpen).to.equal(false);
        });

        it('Should Render', () => {
            wrapper.setState({ shouldInitiateRender: false });
            expect(wrapper.children()).to.have.length(0);
        });
    });

    describe('Connected component testing', () => {
        let wrapper;
        let store;

        beforeEach(() => {
            /* FUll DOM Rendering component in before each to eliminate duplication */
            const mockStore = configureStore([]);
            store = mockStore({
                stores: [],
                subscriptionStatus: { subscribed: 'false' },
                orders: [],
                context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
            });

            wrapper = mount(
                <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                    <Provider store={store}>
                        <FooterConnected />
                    </Provider>
                </ContextProvider>);

            store.clearActions();
        });

        it('Footer component should contain a Modal component', () => {
            expect(wrapper.find('ModalBox')).to.have.length(2);
        });

        it('Modal closeModal', () => {
            const closeModal = sinon.spy(wrapper.instance().closeModal);
            wrapper.find('ModalBox').at(0).props().onClose();
            expect(closeModal).to.have.been.called;
        });

        it('Modal closeModal', () => {
            const closeModal = sinon.spy(wrapper.instance().closeModalOfferMessage);
            wrapper.find('ModalBox').at(1).props().onClose();
            expect(closeModal).to.have.been.called;
        });

        it('InnerConnectConnected, with connect', () => {
            expect(wrapper).to.exist;
        });

        it('Footer component should contain socialshare component ', () => {
            expect(wrapper.find('SocialShare')).to.have.length(1);
        });

        it('Footer component should contain socialshare component ', () => {
            expect(wrapper.find('MarketingOptInSection')).to.have.length(2);
        });

        it('handle submit subscribe with email', () => {
            const subscribeWithEmail = sinon.spy();
            expect(store.getActions().length).to.equal(0);

            /** Valid Email Case */
            const inputEle = wrapper.find('MarketingOptInSection').at(0).find('input').get(0);
            inputEle.value = 'test@test.com';
            wrapper.find('MarketingOptInSection').at(0).find('Button').simulate('click');
            expect(subscribeWithEmail).to.have.been.called;
            expect(store.getActions().length).to.equal(1);
            expect(store.getActions()[0]).to.deep.equal({ payload: { type: 'EMAIL', value: 'test@test.com' }, type: 'OPT_IN_POST_REQUEST' });
            store.clearActions();

            /** Invalid Email value case */
            inputEle.value = 'test';
            wrapper.find('MarketingOptInSection').at(0).find('Button').simulate('click');
            expect(subscribeWithEmail).to.have.been.called;
            expect(store.getActions().length).to.equal(1);
            expect(store.getActions()[0]).to.deep.equal({ errorDetails: [{ errorDescription: 'Please enter a valid email address' }], type: 'ANALYTICS_FORM_ERROR' });
            store.clearActions();

            /** Empty Email value */
            inputEle.value = '';
            expect(store.getActions().length).to.equal(0);
            wrapper.find('MarketingOptInSection').at(0).find('Button').simulate('click');
            expect(subscribeWithEmail).to.have.been.called;
            expect(store.getActions().length).to.equal(1);
            expect(store.getActions()[0]).to.deep.equal({ errorDetails: [{ errorDescription: 'Enter email address' }], type: 'ANALYTICS_FORM_ERROR' });
        });

        it('handle submit subscribe with Phone Number', () => {
            const subscribeWithPhoneNum = sinon.spy();
            expect(store.getActions().length).to.equal(0);

            /** Valid Phone Number Test */

            const inputEle = wrapper.find('MarketingOptInSection').at(1).find('input').get(0);
            inputEle.value = '1234567890';
            wrapper.find('MarketingOptInSection').at(1).find('Button').simulate('click');
            expect(subscribeWithPhoneNum).to.have.been.called;
            expect(store.getActions().length).to.equal(1);
            expect(store.getActions()[0]).to.deep.equal({ payload: { type: 'MOBILE', value: '1234567890' }, type: 'OPT_IN_POST_REQUEST' });
            store.clearActions();

            /** Invalid phone Number case */
            inputEle.value = '123456789';
            wrapper.find('MarketingOptInSection').at(1).find('Button').simulate('click');
            expect(subscribeWithPhoneNum).to.have.been.called;
            expect(store.getActions().length).to.equal(1);
            expect(store.getActions()[0]).to.deep.equal({ errorDetails: [{ errorDescription: 'Please enter a valid phone number' }], type: 'ANALYTICS_FORM_ERROR' });
            store.clearActions();

            /** Empty Phone Number Test */
            inputEle.value = '';
            expect(store.getActions().length).to.equal(0);
            wrapper.find('MarketingOptInSection').at(1).find('Button').simulate('click');
            expect(subscribeWithPhoneNum).to.have.been.called;
            expect(store.getActions().length).to.equal(1);
            expect(store.getActions()[0]).to.deep.equal({ errorDetails: [{ errorDescription: 'Enter phone number' }], type: 'ANALYTICS_FORM_ERROR' });
        });

        it('check for isTablet', () => {
            const mockStore = configureStore([]);
            store = mockStore({
                stores: [],
                subscriptionStatus: { subscribed: 'false' },
                orders: [],
                context: { deviceType: { isTablet: true, isMobile: false, isDesktop: false, isBot: false } },
            });

            wrapper = mount(
                <ContextProvider context={{ featureFlags: { selfServiceCustomerEngagement: false } }}>
                    <Provider store={store}>
                        <FooterConnected />
                    </Provider>
                </ContextProvider>);

            store.clearActions();
        });
    });
});
