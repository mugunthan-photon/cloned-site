import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SeoBlockConnected, { SeoBlock } from './SeoBlock';
// import SeoBlock from './SeoBlock';

describe('<SeoBlockConnected /> component testing', () => {
    const mockStore = configureStore([]);
    let wrapper;
    let store = mockStore({
        context: { featureFlags: { HTTPS_FOR_SEO_ENABLED: true, Home_SEOBlockEnabled: true },
            deviceType: {
                isMobile: false,
                isTablet: false,
                isDesktop: true,
                isBot: false,
            },
        },

    });
    const props = {
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
    /* it('if component props are empty', () => {
        wrapper = mount(
            <Provider store={store}>
                <SeoBlockConnected />
            </Provider>,
    );
        expect(wrapper).to.exist;
    }); */
    it('connected component should exist', () => {
        wrapper = mount(
            <Provider store={store}>
                <SeoBlockConnected seoTitleTags={props} />
            </Provider>,
        );
        expect(wrapper).to.exist;
    });

    it('should show less on button click', () => {
        wrapper = mount(
            <Provider store={store}>
                <SeoBlockConnected seoTitleTags={props} />
            </Provider>,
        );
        wrapper.find('button').at(0).simulate('click');
        wrapper.setState({
            showHideCopyText: '',
            copyTextButtonName: 'Show less',
        });
        expect(wrapper.toggleCopyText).to.have.been.called;
        wrapper.find('button').at(0).simulate('click');
        wrapper.setState({
            showHideCopyText: 'seoContentHeight',
            copyTextButtonName: 'Show more',
        });
        expect(wrapper.toggleCopyText).to.have.been.called;
    });

    it('seoLayout condition', () => {
        const seoTitles = {
            canonicalURL: '/g/',
            noIndexNoFollowRequired: true,
        };

        wrapper = mount(
            <SeoBlock
                seoTitleTags={seoTitles}
            />,
        );
        const instance = wrapper.instance();
        expect(instance.setMetaData()).to.be.an('object');
    });

    it('seoLayout header title', () => {
        expect(document.title).to.equal('JCPenney: Window & Home Decor, Bedding, Appliances & Clothing');
    });

    it('connected component should exist', () => {
        store = mockStore({});
        wrapper = mount(
            <Provider store={store}>
                <SeoBlockConnected seoTitleTags={props} />
            </Provider>,
        );
        expect(wrapper).to.exist;
    });
});

describe('<SeoBlock /> component testing', () => {
    let wrapper;
    const props = {
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
    it('non connected component should exists', () => {
        wrapper = mount(<SeoBlock />);
        expect(wrapper).to.exist;
    });

    it('non connected component should exists', () => {
        wrapper = mount(<SeoBlock seoTitleTags={props} />);
        expect(wrapper).to.exist;
    });

    // it('should not exist', () => {
    //     wrapper.setProps({ Home_SEOBlockEnabled: false });
    //     expect(wrapper.children()).to.have.length(0);
    // });
});

