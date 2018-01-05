import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ApplyCouponInputBox from '../ApplyCouponInputBox';
import CouponListMock from './mock';

const mockStore = configureStore([]);

const store = mockStore({
    coupons: CouponListMock,
    context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
});


const stories = [
    {
        name: 'Apply Coupon Input Box',
        story: () => (
            <Provider store={store}>
                <ApplyCouponInputBox />
            </Provider>
        ),
    },
];

export default stories;
