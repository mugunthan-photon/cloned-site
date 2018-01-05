import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CouponList from '../CouponList';
import CouponListMock from './mock';

const mockStore = configureStore([]);

const store = mockStore({
    coupons: CouponListMock,
    context: { deviceType: { isTablet: false, isMobile: true, isDesktop: false, isBot: false } },
});

const stories = [{
    name: 'IRISCouponList',
    story: () => (
        <Provider store={store}>
            <CouponList/>
        </Provider>
    ),
}];

export default stories;
