import React from 'react';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DisplayApiErrorMessageConnected, { DisplayApiErrorMessage } from './DisplayApiErrorMessage';

describe('Component:CouponAppliedModal', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        const mockStore = configureStore([]);
        store = mockStore({
            apiErrorMsgs: [
                {
                    errorId: 'ADJUSTMENTS_POST_ERROR',
                    errorType: 'error',
                    errorCode: 'SRV_PROMOCODE_INVALID',
                    errorMessage: 'Enter a valid code.',
                },
            ],
        });
        wrapper = mount(<Provider store={store}>
            <DisplayApiErrorMessageConnected
            />
        </Provider>);
    });

    it('statefull data', () => {
        expect(wrapper).to.exist;
    });

    it('details data', () => {
        const wrappernotconnected = shallow(<DisplayApiErrorMessage />);
        wrappernotconnected.setProps({ couponApplicationState: { status: 201, statusText: 'Created' } });
        wrappernotconnected.update();
    });

    it('handleCloseDialog', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: { clearErrorMsgs: spyGetDetail,
            },

        };
        const errorId = 'ADJUSTMENTS_POST_ERROR';
        const apiErrorMsgs = [
            {
                errorId: 'ADJUSTMENTS_POST_ERROR',
                errorType: 'error',
                errorCode: 'SRV_PROMOCODE_INVALID',
                errorMessage: 'Enter a valid code.',
            },
            {
                errorId: 'ADJUSTMENTS_POST_ERROR',
                errorType: 'error',
                errorCode: 'SRV_PROMOCODE_INVALID',
                errorMessage: 'Enter a valid code.',
            },
        ];
        const wrapperNotConnected = shallow(<DisplayApiErrorMessage {...defaultProps} />);
        wrapperNotConnected.setProps({ apiErrorMsgs, errorId });
        const instance = wrapperNotConnected.instance();
        instance.handleCloseDialog = sinon.spy(instance, 'handleCloseDialog');
        wrapperNotConnected.update();
        instance.handleCloseDialog();
    });
});
