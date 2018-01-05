import React from 'react';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import ApplyCouponInputBoxConnected, { ApplyCouponInputBox, highlight } from './ApplyCouponInputBox';
import couponJson from './mock';
import * as Constants from '../../common/Constants';
import * as Config from '../CouponCard/CouponConfig';

const event = {
    preventDefault: () => {},
    target: {
        value: 'dpd',
        children: {
            TypeaheadSuggestBox: {
                firstElementChild: {
                    firstElementChild: {
                        innerText: 'DPDRPOUN',
                    },
                },
            },
        },
    },
};

const event2 = {
    preventDefault: () => {},
    target: {
        value: 'dpd',
        children: {
            TypeaheadSuggestBox: {
                firstElementChild: {
                    firstElementChild: {},
                },
            },
        },
    },
};

const event3 = {
    preventDefault: () => {},
    target: {
        value: 'aaa',
        children: {
            TypeaheadSuggestBox: {
                firstElementChild: {
                    firstElementChild: {
                        innerText: 'AAAAA',
                    },
                },
            },
        },
    },
};

const couponListName = ['DPDR123', 'DPDR1234', 'DPDR12345'];

describe(' Test Suite for <ApplyCouponInputBox/> ', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        const mockStore = configureStore([]);
        store = mockStore({
            couponApplicationState: {
                response: {
                    status: 500,
                    statusText: 'Internal Server Error',
                    data: [],
                },
            },
            messages: [],
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        });

        wrapper = mount(<Provider store={store}>
            <ApplyCouponInputBoxConnected />
        </Provider>);
    });

    it('statefull data', () => {
        expect(wrapper).to.exist;
    });

    it('details data', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getCouponsAction: spyGetDetail,
            },
            channel: 'BOF',
        };
        const wrappernotconnected = shallow(<ApplyCouponInputBox {...defaultProps}/>);
        wrappernotconnected.setProps({ couponApplicationState: { response: { status: 201, statusText: 'Created', data: [] } } });
        wrappernotconnected.update();
    });

    it('details data - empty props', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getCouponsAction: spyGetDetail,
            },
        };
        const wrappernotconnected = shallow(<ApplyCouponInputBox {...defaultProps}/>);
        wrappernotconnected.setProps({});
        wrappernotconnected.update();
    });

    it('Component should call componentWillReceiveProps on update', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
            },
            couponApplicationState: {},
            apiErrorMsgs: {},
        };
        const couponApplicationState = {
            response: {
                status: 201,
                statusText: 'Created',
                data: {
                    response: {
                        amount: 5,
                        code: 'COUPON',
                        message: 'This is the message',
                    },
                },
            },
        };
        const messages = [];
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState, messages });
    });

    it('Component should call componentWillReceiveProps on update', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {},
            messages: {},
        };
        const couponApplicationState = {
            response: {
                status: 405,
                statusText: Constants.COUPON_EMPTYCART_LABEL,
            },
        };
        const messages = [];
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState, messages });
    });

    it('Component should call componentWillReceiveProps on update', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {},
            messages: {},
        };
        const couponApplicationState = {
            response: {
                status: 400,
                statusText: Config.SERIAL_CODE_NEED,
                data: {
                    response: {
                        amount: 5,
                        code: 'COUPON',
                        message: 'This is the message',
                    },
                },
            },
        };
        const messages = [];
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState, messages });
    });

    it('Component should call componentWillReceiveProps on COUPON_EMPTYCART_LABEL', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {},
            messages: {},
        };
        const couponApplicationState = {
            response: {
                status: Constants.COUPON_EMPTYCART_LABEL,
            },
        };
        const messages = [];
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState, messages });
    });

    it('Component should call componentWillReceiveProps on update with apiErrorMsgs', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
            },
            messages: {},
        };
        const messages = {};
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps(messages);
    });

    it('submitSerialCodeForm', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
            },
            couponApplicationState: {},
        };
        const couponApplicationState = {
            response: {
                data: [{
                    id: '4443100003',
                    code: 'REWARDSCERT',
                    value: '8344970',
                    message: null,
                    amount: 14,
                    amountType: 'ABSOLUTE',
                    description: '40% Off Earned Rewards',
                    serialNumber: '0000014957',
                    subType: null,
                    restrictionType: null,
                }],
            },
        };
        const modalState = {
            payload: {
                code: 'FUNDEAL',
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        wrapperNotConnected.setState({ modalState });
        const instance = wrapperNotConnected.instance();
        instance.submitSerialCodeForm = sinon.spy(instance, 'submitSerialCodeForm');
        wrapperNotConnected.update();
        instance.submitSerialCodeForm('123456');
    });

    it('onValueChange - 1', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                removeAllMessages: spyGetDetail,
            },
            couponApplicationState: [{
                response: {
                    status: 400,
                    statusText: 'BAD REQUEST',
                    data: [{ errorCode: 'SVC_ORD_ERR_SERIAL_RESTRICTED' }],
                },
            }],
        };
        const couponApplicationState = [{
            response: {
                status: 400,
                statusText: 'BAD REQUEST',
                data: [{ errorCode: 'SVC_ORD_ERR_SERIAL_RESTRICTED' }],
            },
        }];
        const defaultValue = 'FUNDEAL';
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);

        wrapperNotConnected.setProps({ couponApplicationState, defaultValue, coupons: couponJson });
        wrapperNotConnected.setState({ couponListName });
        const instance = wrapperNotConnected.instance();
        instance.onValueChange = sinon.spy(instance, 'onValueChange');
        wrapperNotConnected.update();
        instance.onValueChange(event);
        wrapperNotConnected.update();
        instance.onValueChange(event);
    });

    it('onValueChange - 2', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                removeAllMessages: spyGetDetail,
            },
            couponApplicationState: [{
                response: {
                    status: 400,
                    statusText: 'BAD REQUEST',
                    data: [{ errorCode: 'SRV_REWARD_TOKEN_MISSING' }],
                },
            }],
        };
        const couponApplicationState = [{
            response: {
                status: 400,
                statusText: 'BAD REQUEST',
                data: [{ errorCode: 'SRV_REWARD_TOKEN_MISSING' }],
            },
        }];
        const defaultValue = 'FUNDEAL';
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);

        wrapperNotConnected.setProps({ couponApplicationState, defaultValue, coupons: null });
        wrapperNotConnected.setState({ couponListName });
        const instance = wrapperNotConnected.instance();
        instance.onValueChange = sinon.spy(instance, 'onValueChange');
        wrapperNotConnected.update();
        instance.onValueChange(event);
        wrapperNotConnected.update();
        instance.onValueChange(event);
    });

    it('handleCloseModal', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
            },
            messages: {},
            couponApplicationState: {},
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };
        const couponApplicationState = {
            response: {
                status: 400,
                statusText: 'BAD REQUEST',
                data: [
                  { errorCode: 'SVC_ORD_ERR_SERIAL_RESTRICTED' },
                ],
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.handleCloseModal = sinon.spy(instance, 'handleCloseModal');
        wrapperNotConnected.update();
        instance.handleCloseModal();
    });

    it('handleCloseModal 1', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
            },
            messages: {},
            couponApplicationState: {},
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };
        const couponApplicationState = {
            response: {
                status: 400,
                statusText: 'BAD REQUEST',
                data: [
                  { errorCode: 'SVC_ORD_ERR_SERIAL_RESTRICTED' },
                ],
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.handleCloseModal = sinon.spy(instance, 'handleCloseModal');
        wrapperNotConnected.update();
        instance.handleCloseModal();
    });

    it('handleCloseModal 2', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
            },
            messages: {},
            couponApplicationState: {},
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };
        const couponApplicationState = {
            response: {
                status: 400,
                statusText: 'BAD REQUEST',
                data: [
                  { errorCode: 'SVC_ORD_ERR_SERIAL_RESTRICTED' },
                ],
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.handleCloseModal = sinon.spy(instance, 'handleCloseModal');
        wrapperNotConnected.update();
        instance.handleCloseModal();
    });

    it('submitForm - 1', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {
                response: {
                    status: 400,
                    statusText: 'BAD REQUEST',
                    data: [],
                },
            },
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };
        const couponApplicationState = {
            response: {
                status: 201,
                message: 'SRV_REWARD_CODE_ERR',
                statusText: 'CREATED',
                code: 'COUPON',
                data: [],
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.submitForm = sinon.spy(instance, 'submitForm');
        wrapperNotConnected.update();
        instance.submitForm(new Event('submit', event));
    });

    it('submitForm - 2', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {
                response: {
                    status: 400,
                    statusText: 'BAD REQUEST',
                    data: [],
                },
            },
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };
        document.activeElement.blur = sinon.spy();
        const couponApplicationState = {
            response: {
                status: 201,
                data: [],
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.setState({ value: 'DPDRPOUN' });
        instance.submitForm = sinon.spy(instance, 'submitForm');
        wrapperNotConnected.update();
        instance.submitForm(event);
        instance.submitForm(event2);
    });

    it('submitForm - with cookies set', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {},
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };

        Cookies.save('DPOrder', 5, '', '');
        Cookies.save('OrderId', 12345, '', '');
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        // wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.setState({ value: 'abc' });
        instance.submitForm = sinon.spy(instance, 'submitForm');
        wrapperNotConnected.update();
        instance.submitForm(event);
    });

    it('submitForm - 3', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {
                response: {
                    status: 400,
                    statusText: 'BAD REQUEST',
                    data: [{ errorMessage: 'Enter a valid code' }],
                },
            },
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };
        const couponApplicationState = {
            response: {
                status: 401,
                message: 'SRV_PROMOCODE_INVALID',
                statusText: 'Bad Request',
                code: 'COUPON',
                data: [{ errorMessage: 'Enter a valid code' }],
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.submitForm = sinon.spy(instance, 'submitForm');
        instance.setState({ showInlineErrorMessage: true, inlineErrorMessage: 'Enter a valid code' });
        wrapperNotConnected.update();
        instance.submitForm(new Event('submit', event3));
    });

    it('submitForm - 4', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
                triggerFormError: spyGetDetail,
                addMessage: spyGetDetail,
            },
            couponApplicationState: {
                response: {
                    status: 201,
                    statusText: 'CREATED',
                    isSuccess: true,
                    data: {},
                },
            },
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };
        const couponApplicationState = {
            isSuccess: true,
            response: {
                status: 201,
                message: 'SRV_REWARD_CODE_ERR',
                statusText: 'CREATED',
                code: 'COUPON',
                data: [],
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.submitForm = sinon.spy(instance, 'submitForm');
        instance.setState({ showModal: true });
        wrapperNotConnected.update();
        instance.submitForm(new Event('submit', event));
    });


    it('handleOnSelect', () => {
        const spyGetDetail = sinon.spy();
        const couponApplicationState = [{
            response: {
                status: 400,
                statusText: 'BAD REQUEST',
                data: {},
            },
        }];
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
            },
            couponApplicationState: [{
                response: {
                    status: 400,
                    statusText: 'BAD REQUEST',
                    data: {},
                },
            }],
            modalOnClose: () => {},
            coupons: couponJson,
        };
        const data = ['FUN', 'FUNDEAL', 'FUNDEALZ'];
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        wrapperNotConnected.setState({ value: 'DPD', datasource: data });
        wrapperNotConnected.update();
        wrapperNotConnected.find('div.typeaheadSuggestionBox').find('button').at(0).simulate('click', { currentTarget: { children: ['FUNDEAL'] } });
    });

    /*
    it('onBlur for clearing the inline error message', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                applyAdjustment: spyGetDetail,
                getCouponsAction: spyGetDetail,
            },
            couponApplicationState: {},
            modalOnClose: () => {},
            closeCouponSlider: () => {},
        };
        const couponApplicationState = {
            response: {
                status: 400,
                statusText: 'BAD REQUEST',
                data: {},
            },
        };
        const wrapperNotConnected = shallow(<ApplyCouponInputBox {...defaultProps} />);
        wrapperNotConnected.setProps({ couponApplicationState });
        const instance = wrapperNotConnected.instance();
        instance.setState({ value: '' });
        instance.clearAndResetMessage = sinon.spy(instance, 'clearAndResetMessage');
        wrapperNotConnected.update();
        instance.clearAndResetMessage();
    });
    */

    it('Test highlight', () => {
        const name = 'Test1234';
        const query = '';
        highlight(name, query);
    });
});
