import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import YodaHeader from '../../YodaHeader/Header';
import { modifiedData } from './mock';

const mockStore = configureStore([]);

const store = mockStore({
    session: { signedOut: true },
    desktopDepartmentVisualNav: modifiedData,
    context: { deviceType: { isMobile: false, isTablet: false, isDesktop: true } },
});

const stories = [{
    name: 'YodaHeader',
    story: () => (
        <Provider store={store}>
            <YodaHeader />
        </Provider>
    ),
}];

export default stories;
