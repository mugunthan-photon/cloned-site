import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SeoBlock from '../SeoBlock';

const mockStore = configureStore([]);

const seoTitleTags = {
    canonicalURL: 'http://www.jcpenney.com',
    copyText: '<h2>Labor Day Sales at JCPenney</h2>↵Shop Labor Day sales at JCPenney, and enjoy great savings on furniture, mattresses, home decor, jewelry, apparel and more. We have deals on top brands and trendy styles.',
    h1Data: 'JCPenney Home',
    noIndexNoFollowRequired: false,
    noIndexNoFollowString: null,
    searchTerms: ' ',
    seoMetaDescription: 'Enjoy great deals on furniture, bedding, window & home decor. Find appliances, clothing & shoes from your favorite brands. FREE shipping at jcp.com!',
    seoMetaKeyword: ' ',
    seoMetaTitle: 'JCPenney: Window & Home Decor, Bedding, Appliances & Clothing',
};

const store = mockStore({
    context: { featureFlags: { HTTPS_FOR_SEO_ENABLED: true, Home_SEOBlockEnabled: true } },
});

const stories = [
    {
        name: 'SEO Block',
        story: () => (
            <div>
                <Provider store={store}>
                    <SeoBlock seoTitleTags={seoTitleTags} />
                </Provider>
            </div>
        ),
    },
];

export default stories;
