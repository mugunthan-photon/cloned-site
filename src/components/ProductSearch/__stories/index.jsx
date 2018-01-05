import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ProductSearch from '../../ProductSearch/ProductSearch';
import ProductSearchMock from './mock';

const mockStore = configureStore([]);

const store = mockStore({
    productSearchResults: ProductSearchMock,
    deviceType: { isTablet: true, isMobile: false, isDesktop: false, isBot: false },
});

const stories = [{
    name: 'Product Search',
    story: () => (
        <Provider store={store}>
            <ProductSearch automationId="test-automation-search" />
        </Provider>
    ),
}];

export default stories;
