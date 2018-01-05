import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect, assert } from 'chai';
import { beforeEach } from 'mocha';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies'; // eslint-disable-line no-unused-vars
import configureStore from 'redux-mock-store';
import ProductSearchConnected, { getSearchURL, delay, ProductSearch, navigateTo, renderPrice, renderCard } from './ProductSearch';
import RecentSearch from './RecentSearch';
import mockData from './__stories/mock';

const checkValue = (actualValue, expectedValue) => {
    expect(actualValue).to.equal(expectedValue);
};

describe(' Test Suite for <ProductSearch/> ', () => {
    let wrapper;
    let store;
    let mockStore;

    beforeEach(() => {
        mockStore = configureStore([]);
        store = mockStore({
            productSearchResults: mockData,
            productSearchDetailResult: {},
            context: {
                deviceType: {
                    isDesktop: false,
                    isMobile: false,
                    isTablet: true,
                },
                abTestEngagements: [{
                    testNumber: '123456',
                    channel: 'RWD',
                    testType: 'TypeAhead',
                    userSegments: 'UsrSeg=1234567',
                }],
                featureFlags: {},
            },
        });

        wrapper = mount(<Provider store={store}>
            <ProductSearchConnected />
        </Provider>);
    });


    it('statefull data', () => {
        expect(wrapper).to.exist;
    });

    it('details data', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        wrappernotconnected.setProps({ productSearchDetailResult: { query: 'wo', standardizedQuery: 'two', count: 100 } });
        wrappernotconnected.update();
    });

    it('mousedown', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.setState({ isIgnoreBlur: true });
        instance.onMouseDown = sinon.spy(instance, 'onMouseDown');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').at(0).simulate('mousedown');
        expect(instance.onMouseDown.calledOnce).to.equal(true);
    });


    it('mouseup', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.setState({ isIgnoreBlur: true });
        instance.onMouseUp = sinon.spy(instance, 'onMouseUp');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').at(0).simulate('mouseup');
        expect(instance.onMouseUp.calledOnce).to.equal(true);
    });


    it('onblur not connected ', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.setState({ isIgnoreBlur: true });
        instance.onBlur = sinon.spy(instance, 'onBlur');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').at(0).simulate('blur');
        expect(instance.onBlur.calledOnce).to.equal(true);
    });

    it('onblur not connected ignoreblur false ', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.onBlur = sinon.spy(instance, 'onBlur');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').at(0).simulate('blur');
        expect(instance.onBlur.calledOnce).to.equal(true);
    });


    it('onfocus not connected ', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.setState({ searchText: 'tshirt' });
        instance.onFocus = sinon.spy(instance, 'onFocus');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').at(0).simulate('focus');
        expect(instance.onFocus.calledOnce).to.equal(true);
    });

    it('trigger predictive search API on search textfocus', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchAction: spyGetDetail,
            },
            showFeatureResult: true,
            location: { search: '?Ntt=shirts' },
        };
        const wrappernotconnected = mount(<ProductSearch {...defaultProps} />);
        const instance = wrappernotconnected.instance();
        instance.setState({ searchText: 'tshirt' });
        instance.onFocus = sinon.spy(instance, 'onFocus');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').at(0).simulate('focus');
        expect(spyGetDetail.calledOnce).to.equal(true);
        expect(instance.onFocus.calledOnce).to.equal(true);
    });


    it('mouseup', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            showFeatureResult: true,
        };
        const wrappernotconnected = mount(<ProductSearch {...defaultProps} />);
        const instance = wrappernotconnected.instance();
        instance.setState({ searchText: 'women' });
        instance.setState({ isIgnoreBlur: true });
        instance.onSelect = sinon.spy(instance, 'onSelect');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').props().onSelect({ term: 'hh', dept: 'dddd' });
        expect(instance.onSelect.calledOnce).to.equal(true);
    });


    it('reset', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        wrapper.find('TypeaheadInput').props().onReset();
        instance.onReset = sinon.spy(instance, 'onSelect');
        wrappernotconnected.update();
        assert.isString(instance.state.searchText);
    });

    it('simulate submit', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            showFeatureResult: true,
        };
        const wrappernotconnected = mount(<ProductSearch {...defaultProps} />);
        const instance = wrappernotconnected.instance();
        instance.onSubmit = sinon.spy(instance, 'onSubmit');
        wrappernotconnected.update();
        expect(spyGetDetail.called).to.equal(false);
        wrappernotconnected.find('TypeaheadInput').props().onSubmit({ term: 'tt', dept: 'dept' });
        expect(instance.onSubmit.calledOnce).to.equal(true);
    });

    it('simulate submit disableLocalSearch', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            disableLocalSearch: true,
        };
        const wrappernotconnected = mount(<ProductSearch {...defaultProps} />);
        const instance = wrappernotconnected.instance();
        instance.onSubmit = sinon.spy(instance, 'onSubmit');
        wrappernotconnected.update();
        expect(spyGetDetail.called).to.equal(false);
        wrappernotconnected.find('TypeaheadInput').props().onSubmit({ term: 'tt', dept: 'dept' });
        expect(instance.onSubmit.calledOnce).to.equal(true);
    });

    it('simulate submit when return prodct result', () => {
        const result = [{ term: 'disney' }, { term: 'disney frozen' }];
        const detail = { query: 'wo', standardizedQuery: 'two', count: 100 };
        const wrappe = mount(<ProductSearch
            productSearchResults={result}
            productSearchDetailResult={detail}
        />);
        const instance = wrappe.instance();
        instance.onSubmit = sinon.spy(instance, 'onSubmit');
        wrappe.update();
        wrappe.find('TypeaheadInput').props().onSubmit({ term: 'dis', dept: 'dept' });
        expect(instance.onSubmit.calledOnce).to.equal(true);
    });

    it('simulate submit when return prodct result', () => {
        const result = [{ term: 'wo' }, { term: 'women' }];
        const detail = { query: 'wo', standardizedQuery: 'two', count: 100 };
        const wrappe = mount(<ProductSearch
            productSearchResults={result}
            productSearchDetailResult={detail}
        />);
        const instance = wrappe.instance();
        instance.onSubmit = sinon.spy(instance, 'onSubmit');
        wrappe.update();
        wrappe.find('TypeaheadInput').props().onSubmit({ term: 'wo', dept: '' });
        expect(instance.onSubmit.calledOnce).to.equal(true);
    });

    it('simulate submit when return prodct result', () => {
        const result = [{ term: 'wo' }, { term: 'women' }];
        const detail = {
            query: 'women',
            count: 0,
            redirectUrl:
            [
                {
                    channel: 'tablet',
                    url: 'https://m.jcpenney.com/tablet/g/women/N-bwo3x?redirectTerm=Women',
                },
                {
                    channel: 'mobile',
                    url: 'https://m.jcpenney.com/mobile/g/women/N-bwo3x?redirectTerm=Women',
                },
                {
                    channel: 'online',
                    url: 'https://m.jcpenney.com/dotcom/g/women/N-bwo3x?redirectTerm=Women',
                },
            ],
        };
        let wrappe = mount(<ProductSearch
            productSearchResults={result}
        />);
        wrappe.update();
        wrappe = mount(<ProductSearch
            productSearchResults={result}
            productSearchDetailResult={detail}
        />);
        const instance = wrappe.instance();
        instance.setState({ searchText: 'women' });
        instance.onSubmit = sinon.spy(instance, 'onSubmit');
        wrappe.find('TypeaheadInput').props().onSubmit({ term: 'women', dept: '' });
        wrappe.update();
        expect(instance.onSubmit.calledOnce).to.equal(false);
    });

    it('simulate onchange tablet', () => {
        wrapper.find('TypeaheadInput').props().onChange('tshi--1');
        assert.isNotNull(wrapper.props().store.getState());
    });

    it('simulate onchange mobile', () => {
        const mobileStore = mockStore({
            productSearchResults: [{ term: 'shirts', departments: [{ name: 'men', href: 'http://m.jcpenney.com/v4?q=shirt&filters=20000014&deptName=men&predSearchTerm=shirt&breadcrumbs=dept20000014&deptName=men&predSearchTerm=shirt' }, { name: 'kids', href: 'http://m.jcpenney.com/v4?q=shirt&filters=20000016&deptName=kids&predSearchTerm=shirt&breadcrumbs=dept20000016&deptName=kids&predSearchTerm=shirt' }, { name: 'baby', href: 'http://m.jcpenney.com/v4?q=shirt&filters=20000017&deptName=baby&predSearchTerm=shirt&breadcrumbs=dept20000017&deptName=baby&predSearchTerm=shirt' }], products: [{ title: 'Arizona Boys Short Sleeve Button-Front Shirt - Boys 8-20 and Husky', imageId: 'DP1020201617084473M.tif', productUrl: '/p/arizona-boys-short-sleeve-button-front-shirt-boys-8-20-and-husky/ppr5007180557?pTmplType=regular&N=20000016&searchTerm=shirts&catId=SearchResults&searchType=Predictive%20Search|Products|2', averageRating: '4.65', totalReviewCount: '20', totalColorCount: '9', productCurSlotPrice: null, productOrgSlotPrice: '$26 - $28', productPromoMktgLabel: 'BUY MORE AND SAVE WITH CODE: 43GOSHOP', productMapPriceDesc: null, productPromoMessage: null }] }, { term: 't shirt' }, { term: 'polo shirts' }, { term: 'mens dress shirts' }, { term: 'denim shirts' }, { term: 'mens shirts' }, { term: 'flannel shirts' }, { term: 'long sleeve shirts' }, { term: 'nike shirts' }, { term: 'stafford shirts' }],
            productSearchDetailResult: {},
            context: {
                deviceType: {
                    isDesktop: false,
                    isMobile: true,
                    isTablet: false,
                },
                abTestEngagements: [{
                    testNumber: '123456',
                    channel: 'RWD',
                    testType: 'TypeAhead',
                    userSegments: 'UsrSeg=1234567',
                }],
                featureFlags: {},
            },
        });

        const mobileWrapper = mount(<Provider store={mobileStore}>
            <ProductSearchConnected />
        </Provider>);

        mobileWrapper.find('TypeaheadInput').props().onChange('tshi--1');
        assert.isNotNull(mobileWrapper.props().store.getState());
    });

    it('simulate onchange desktop', () => {
        const mobileStore = mockStore({
            productSearchResults: [{ term: 'shirts', departments: [{ name: 'men', href: 'http://m.jcpenney.com/v4?q=shirt&filters=20000014&deptName=men&predSearchTerm=shirt&breadcrumbs=dept20000014&deptName=men&predSearchTerm=shirt' }, { name: 'kids', href: 'http://m.jcpenney.com/v4?q=shirt&filters=20000016&deptName=kids&predSearchTerm=shirt&breadcrumbs=dept20000016&deptName=kids&predSearchTerm=shirt' }, { name: 'baby', href: 'http://m.jcpenney.com/v4?q=shirt&filters=20000017&deptName=baby&predSearchTerm=shirt&breadcrumbs=dept20000017&deptName=baby&predSearchTerm=shirt' }], products: [{ title: 'Arizona Boys Short Sleeve Button-Front Shirt - Boys 8-20 and Husky', imageId: 'DP1020201617084473M.tif', productUrl: '/p/arizona-boys-short-sleeve-button-front-shirt-boys-8-20-and-husky/ppr5007180557?pTmplType=regular&N=20000016&searchTerm=shirts&catId=SearchResults&searchType=Predictive%20Search|Products|2', averageRating: '4.65', totalReviewCount: '20', totalColorCount: '9', productCurSlotPrice: null, productOrgSlotPrice: '$26 - $28', productPromoMktgLabel: 'BUY MORE AND SAVE WITH CODE: 43GOSHOP', productMapPriceDesc: null, productPromoMessage: null }] }, { term: 't shirt' }, { term: 'polo shirts' }, { term: 'mens dress shirts' }, { term: 'denim shirts' }, { term: 'mens shirts' }, { term: 'flannel shirts' }, { term: 'long sleeve shirts' }, { term: 'nike shirts' }, { term: 'stafford shirts' }],
            productSearchDetailResult: {},
            context: {
                deviceType: {
                    isDesktop: true,
                    isMobile: false,
                    isTablet: false,
                },
                abTestEngagements: [{
                    testNumber: '123456',
                    channel: 'RWD',
                    testType: 'TypeAhead',
                    userSegments: 'UsrSeg=1234567',
                }],
                featureFlags: {},
            },
        });

        const mobileWrapper = mount(<Provider store={mobileStore}>
            <ProductSearchConnected />
        </Provider>);

        mobileWrapper.find('TypeaheadInput').props().onChange('tshi--1');
        assert.isNotNull(mobileWrapper.props().store.getState());
    });

    it('simulate onchange with length ', () => {
        wrapper.setState({ searchText: 'shirt' });
        wrapper.find('TypeaheadInput').props().onFocus();
        // wrapper.find('Button').props().onClick(handler);
    });

    it('simulate onchange with lengthsssss ', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.clearCache = sinon.spy(instance, 'onClearCache');
        wrappernotconnected.update();
        instance.clearCache();
    });


    it('onfocus not connected . onChange ', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        wrappernotconnected.setProps({ minSearchInputLength: 6 });
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').at(0).simulate('change', { value: 'tar' });
        assert.isString(instance.state.datasourceType);
    });

    it('onselect ', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        wrappernotconnected.find('TypeaheadInput').props().onSelect({ term: 'tshir' });
        instance.onSelect = sinon.spy(instance, 'onSelect');
        wrappernotconnected.update();
        assert.isString(instance.state.datasourceType);
    });

    it('on keydown ', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.onKeyDown('shirts');
        expect(instance.state.searchText).to.be.equal('shirts');
        instance.onKeyDown('shirts in men');
        expect(instance.state.searchText).to.be.equal('shirts in men');
    });

    it('onselect recentSearchTerm', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.setState({ searchText: 'women' });
        wrappernotconnected.find('TypeaheadInput').props().onChange('');
        expect(instance.state.datasourceType).to.equal('Recent Search Term');
    });

    it('onselect recentSearchTerm', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.setState({ searchText: 'women' });
        wrappernotconnected.find('TypeaheadInput').props().onChange('sh');
        expect(instance.state.datasourceType).to.equal('Recent Search Term');
    });

    it('onselect Predictive', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        const instance = wrappernotconnected.instance();
        instance.setState({ searchText: 'women' });
        wrappernotconnected.find('TypeaheadInput').props().onSelect({ term: 'tshir' });
        instance.onSelect = sinon.spy(instance, 'onSelect');
        wrappernotconnected.update();
        expect(instance.state.datasourceType).to.equal('Predictive Search');
    });

    it('onselect predictSearch', () => {
        const wrappernotconnected = mount(<ProductSearch />);
        wrappernotconnected.setState({ searchText: 'shirts' });
        const instance = wrappernotconnected.instance();
        wrappernotconnected.find('TypeaheadInput').props().onSelect({ term: 'tshirts' });
        instance.onSelect = sinon.spy(instance, 'onSelect');
        wrappernotconnected.update();
        expect(instance.state.datasourceType).to.equal('Predictive Search');
    });

    it('onselect classic search', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            disableLocalSearch: true,
        };
        const wrappernotconnected = mount(<ProductSearch {...defaultProps} />);
        wrappernotconnected.find('TypeaheadInput').props().onSelect({ term: 'tshir' });
        wrappernotconnected.update();
        expect(spyGetDetail.called).to.equal(false);
    });

    it('Component should call componentWillReceiveProps on update', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            productSearchDetailResult: {},
        };
        const detail = {
            query: 'women',
            count: 0,
            redirectUrl:
            [
                {
                    channel: 'tablet',
                    url: 'https://m.jcpenney.com/tablet/g/women/N-bwo3x?redirectTerm=Women',
                },
                {
                    channel: 'mobile',
                    url: 'https://m.jcpenney.com/mobile/g/women/N-bwo3x?redirectTerm=Women',
                },
                {
                    channel: 'online',
                    url: 'https://m.jcpenney.com/dotcom/g/women/N-bwo3x?redirectTerm=Women',
                },
            ],
        };
        const wraper = shallow(<ProductSearch {...defaultProps} />);
        wraper.setState({ searchText: 'women' });
        wraper.setProps({ productSearchDetailResult: detail });
    });

    it('Component should call componentWillReceiveProps on update', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            productSearchDetailResult: {},
        };
        const detail = {
            query: 'wo',
            standardizedQuery: 'two',
            count: 10,
        };
        const wraper = shallow(<ProductSearch {...defaultProps} />);
        wraper.setState({ searchText: 'wo' });
        wraper.setProps({ productSearchDetailResult: detail });
    });


    it('Component should call componentWillReceiveProps on update', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            productSearchDetailResult: {},
        };
        const detail = {
            query: 'women shoes',
            count: 10,
        };
        const wraper = shallow(<ProductSearch {...defaultProps} />);
        wraper.setState({ searchText: 'women shoes' });
        wraper.setProps({ productSearchDetailResult: detail });
    });

    it('Component should call componentWillReceiveProps on update 500', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            productSearchDetailResult: {},
        };
        const detail = {
            status: 500,
        };
        const wraper = shallow(<ProductSearch {...defaultProps} />);
        wraper.setState({ searchText: 'women shoes' });
        wraper.setProps({ productSearchDetailResult: detail });
    });


    it('Component should call componentWillReceiveProps on query is not ', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            productSearchDetailResult: {},
        };
        const detail = {
            status: 200,
        };
        const wraper = shallow(<ProductSearch {...defaultProps} />);
        wraper.setState({ searchText: 'women shoes' });
        wraper.setProps({ productSearchDetailResult: detail });
    });

    it('Component should call componentWillReceiveProps on update', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            productSearchDetailResult: {},
        };
        const detail = {
            query: 'nothing',
            count: 0,
        };
        const wraper = shallow(<ProductSearch {...defaultProps} />);
        wraper.setState({ searchText: 'nothing' });
        wraper.setProps({ productSearchDetailResult: detail });
    });

    it('delay function returning another function', () => {
        const getProductSearchAction = value => ({
            type: 'REQUEST',
            value,
        });
        const curriedDelay = delay();
        curriedDelay(getProductSearchAction, 1000);
        assert.isFunction(curriedDelay);
    });

    it('getSearchURL function returning without param', () => {
        const term = 'shoes';
        const getUrl = getSearchURL(term);
        expect(getUrl).to.equal('/s/shoes');
    });

    it('getSearchURL function returning witt param', () => {
        const term = 'shoes';
        const param = {
            Ntt: term,
        };
        const getUrl = getSearchURL(term, param);
        expect(getUrl).to.equal('/s/shoes?Ntt=shoes');
    });

    it('navigateTo function returning param', () => {
        const result = { term: 'shoes', dept: 'women' };
        const datatype = 'Predictive Search';
        navigateTo(result, datatype);
    });

    it('abTest with correct value ', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            showFeatureResult: true,
            abTestEngagements: [{
                testNumber: '123456',
                channel: 'RWD',
                testType: 'OrganicSearch',
                platform: 'SOLR',
                userSegments: 'UsrSeg=1234567',
                abTest: 'JCP123:RWD:OrganicSearch:SOLR:UsrSeg=1234567',
            }],
        };
        const windowBkp = global.window;
        global.window = {
            location: {
                href: 'http://m.jcpenney.com/',
            },
            open: windowBkp.open,
        };
        const wrappernotconnected = mount(<ProductSearch {...defaultProps} />);
        const instance = wrappernotconnected.instance();
        instance.setState({ isIgnoreBlur: true });
        instance.onSelect = sinon.spy(instance, 'onSelect');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').props().onSelect({ term: 'shirts' });
        expect(instance.onSelect.calledOnce).to.equal(true);
        const actualUrlValue = global.window.location;
        const expectedUrlValue = '/s/shirts?searchType=Recent+Search+Term&Ntt=shirts&testVersion=JCP123:RWD:OrganicSearch:SOLR:UsrSeg=1234567';
        global.window = windowBkp;
        expect(actualUrlValue).to.equal(expectedUrlValue);
        // reset window object else other test cases breaking
    });
    it('abTest with incorrect value', () => {
        const spyGetDetail = sinon.spy();
        const defaultProps = {
            actions: {
                getProductSearchDetailAction: spyGetDetail,
            },
            showFeatureResult: true,
            abTestEngagements: [{
                testNumber: '123456',
                testType: 'TypeAhead',
                channel: 'RWD',
                platform: 'SOLR',
                userSegments: 'UsrSeg=1234567',
                abTest: 'JCP123:RWD:TypeAhead:SOLR:UsrSeg=1234567',
            }],
        };
        const windowBkp = global.window;
        global.window = {
            location: {
                href: 'http://m.jcpenney.com/',
            },
            open: windowBkp.open,
        };
        const wrappernotconnected = mount(<ProductSearch {...defaultProps} />);
        const instance = wrappernotconnected.instance();
        instance.setState({ isIgnoreBlur: true });
        instance.onSelect = sinon.spy(instance, 'onSelect');
        wrappernotconnected.update();
        wrappernotconnected.find('TypeaheadInput').props().onSelect({ term: 'shirts' });
        expect(instance.onSelect.calledOnce).to.equal(true);
        const actualUrlValue = global.window.location;
        const expectedUrlValue = '/s/shirts?searchType=Recent+Search+Term&Ntt=shirts';
        global.window = windowBkp;
        expect(actualUrlValue).to.equal(expectedUrlValue);
        // reset window object else other test cases breaking
    });
    it('renderPrice - $50', () => {
        const price = '$50';
        const priceObj = renderPrice(price);
        const expected = {
            max: 50,
            min: 50,
            type: '',
            minPercentOff: 0,
            maxPercentOff: 0,
        };
        checkValue(priceObj.min, expected.min);
        checkValue(priceObj.max, expected.max);
        checkValue(priceObj.type, expected.type);
    });

    it('renderPrice - $50 original', () => {
        const price = '$50';
        const priceObj = renderPrice(price, 'original');
        const expected = {
            max: 50,
            min: 50,
            type: 'original',
            minPercentOff: 0,
            maxPercentOff: 0,
        };
        checkValue(priceObj.min, expected.min);
        checkValue(priceObj.max, expected.max);
        checkValue(priceObj.type, expected.type);
    });

    it('renderPrice - $50 - $75 sale', () => {
        const price = '$50 - $75 sale';
        const priceObj = renderPrice(price);
        const expected = {
            max: 75,
            min: 50,
            type: 'sale',
            minPercentOff: 0,
            maxPercentOff: 0,
        };
        checkValue(priceObj.min, expected.min);
        checkValue(priceObj.max, expected.max);
        checkValue(priceObj.type, expected.type);
    });

    it('renderPrice - $50 sale', () => {
        const price = '$50 sale';
        const priceObj = renderPrice(price);
        const expected = {
            max: 50,
            min: 50,
            type: 'sale',
            minPercentOff: 0,
            maxPercentOff: 0,
        };
        checkValue(priceObj.min, expected.min);
        checkValue(priceObj.max, expected.max);
        checkValue(priceObj.type, expected.type);
    });

    it('renderPrice - null', () => {
        const price = null;
        const priceObj = renderPrice(price);
        checkValue(priceObj, null);
    });

    it('renderPrice - NaN', () => {
        const price = 'NaN';
        const priceObj = renderPrice(price);
        checkValue(priceObj, null);
    });

    describe('render Card', () => {
        let item;
        beforeEach(() => {
            item = {
                title: 'test',
                imageId: 'testImage',
                productUrl: 'testProduct',
                averageRating: '4.5',
                totalReviewCount: '33',
                totalColorCount: '20',
                productCurSlotPrice: '$50',
                productOrgSlotPrice: '$50',
                productPromoMktgLabel: null,
                productPromoMessage: null,
            };
        });

        it('item pass', () => {
            const actual = renderCard(item);
            assert.isNotNull(actual);
        });

        it('item pass', () => {
            item.productPromoMessage = 'null';
            const actual = renderCard(item);
            assert.isNotNull(actual);
        });

        it('item with invalid price', () => {
            item.productCurSlotPrice = null;
            item.productOrgSlotPrice = null;
            const actual = renderCard(item);
            assert.isNotNull(actual);
        });
    });
});

describe(' Test Suite for <RecentSearch/> ', () => {
    it('Empty data', () => {
        RecentSearch.clearData('');
        RecentSearch.setData();
        assert.lengthOf(RecentSearch.getData(), 0);
    });

    it('getRecentData normal', () => {
        RecentSearch.clearData('');
        RecentSearch.setData('shoes', 'in women', 10, '');
        expect(RecentSearch.getRecentData()[0].term).to.equal('shoes in women');
    });

    it('RecentData null', () => {
        RecentSearch.clearData('');
        RecentSearch.setData(' ', 'in women', 10, '');
        assert.lengthOf(RecentSearch.getData(), 0);
    });

    it('getRecentData no departments', () => {
        RecentSearch.clearData('');
        RecentSearch.setData('shoes', '', 10, '');
        expect(RecentSearch.getRecentData()[0].term).to.equal('shoes');
    });

    it('getRecentData beyond max', () => {
        RecentSearch.clearData('');
        RecentSearch.setData('shoes', '', 1, '');
        RecentSearch.setData('jeans', '', 1, '');
        expect(RecentSearch.getRecentData()[0].term).to.equal('jeans');
    });

    it('getRecentData less than', () => {
        RecentSearch.clearData('');
        RecentSearch.setData('shoes', '', 10, '');
        RecentSearch.setData('jeans', '', 10, '');
        expect(RecentSearch.getRecentData()[0].term).to.equal('jeans');
        expect(RecentSearch.getRecentData()[1].term).to.equal('shoes');
    });

    it('getRecentData less than with default', () => {
        RecentSearch.clearData('');
        RecentSearch.setData('shoes', '', 10, '');
        RecentSearch.setData('jeans', '', 10, '');
        expect(RecentSearch.getRecentData()[0].term).to.equal('jeans');
        expect(RecentSearch.getRecentData()[1].term).to.equal('shoes');
    });

    it('Recent search max check', () => {
        RecentSearch.clearData('');
        const maxCount = 10;
        RecentSearch.setData('bags1', '', maxCount, '');
        RecentSearch.setData('bags2', '', maxCount, '');
        RecentSearch.setData('bags3', '', maxCount, '');
        RecentSearch.setData('bags4', '', maxCount, '');
        RecentSearch.setData('bags5', '', maxCount, '');
        RecentSearch.setData('bags6', '', maxCount, '');
        RecentSearch.setData('bags7', '', maxCount, '');
        RecentSearch.setData('bags8', '', maxCount, '');
        RecentSearch.setData('bags9', '', maxCount, '');
        RecentSearch.setData('bags10', '', maxCount, '');
        RecentSearch.setData('bags11', '', maxCount, '');
        RecentSearch.setData('bags12', '', maxCount, '');
        RecentSearch.setData('bags13', '', maxCount, '');
        const recent = RecentSearch.getRecentData();

        expect(recent.length).to.equal(10);
        expect(recent[0].term).to.equal('bags13');
        expect(recent[9].term).to.equal('bags4');
    });
});
