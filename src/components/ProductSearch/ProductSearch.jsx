import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'yoda-core-components/lib/components/Button/Button';
import TypeaheadInput from 'yoda-core-components/lib/components/TypeaheadInput/TypeaheadInput';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _take from 'lodash/take';
import { withRouter } from 'react-router';
import * as actions from '../../actions/ProductSearchAction';
import config from './ProductSearch.config';
import * as styles from './ProductSearch.css';
import ProductCard from '../ProductCard/ProductCard';
import RecentSearch from './RecentSearch';
import Utils from '../../helpers/Utils/Utils';

export const delay = () => {
    let timer = 0;

    return function call(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
};

const getAmount = price => price.split(',').join('').trim();

export const renderPrice = (price, type) => {
    if (price) {
        price = price.split('$').join('');
        const prices = price.split('-');
        if (prices.length === 2) {
            const n = prices[1].trim().split(' ');
            /* istanbul ignore else */
            if (n.length === 2) {
                prices[1] = n[0];
                type = n[1];
            }
        } else {
            const n = prices[0].split(' ');
            if (n.length === 2) {
                prices[0] = n[0];
                type = n[1];
            }
        }

        const minPrice = getAmount(prices[0]).trim();
        /* istanbul ignore else */
        if (!Number(minPrice)) return null;

        const maxPrice = prices.length === 2 ? getAmount(prices[1]) : null;
        return {
            max: Number(maxPrice) || Number(minPrice) || 0,
            min: Number(minPrice) || 0,
            type: type || '',
            minPercentOff: 0,
            maxPercentOff: 0,
        };
    }

    return null;
};

export const renderCard = (item) => {
    const { title, imageId, averageRating, totalReviewCount, totalColorCount, productCurSlotPrice,
        productOrgSlotPrice, productPromoMktgLabel, productPromoMessage, productUrl, productMapPriceDesc } = item;
    const imageUrl = `//s7d9.scene7.com/is/image/JCPenney/${imageId}?wid=152&hei=152&op_sharpen=1`;
    let skuSwatch = new Array(Number(totalColorCount));
    if (skuSwatch && skuSwatch.length <= 0) {
        skuSwatch = null;
    }

    let priceDetails = {
        amounts: [],
        manufacturerAdvertised: false,
        marketingLabel: productPromoMessage && productPromoMessage === 'null' ? null : productPromoMessage,
        promotions: [{ message: productPromoMktgLabel && productPromoMktgLabel === 'null' ? null : productPromoMktgLabel }],
    };

    if (productMapPriceDesc && productMapPriceDesc.toLowerCase() === config.manufacturerAdvertised) {
        priceDetails.manufacturerAdvertised = true;
    }

    if (!productOrgSlotPrice && !productCurSlotPrice) {
        priceDetails = null;
    } else {
        const originalPrice = renderPrice(productOrgSlotPrice, 'original');
        const defaultPrice = renderPrice(productCurSlotPrice);

        /* istanbul ignore else */
        if (originalPrice) {
            priceDetails.amounts.push(originalPrice);
        }
        /* istanbul ignore else */
        if (defaultPrice) {
            priceDetails.amounts.push(defaultPrice);
        }
    }

    return (
        <a
            href={productUrl}
            className={styles.pCard}
        >
            <ProductCard
                imageUrl={imageUrl}
                title={title}
                key={imageId}
                price={priceDetails}
                skuSwatch={skuSwatch}
                rating={Number(averageRating)}
                reviewCount={Number(totalReviewCount)}
                automationId="product-featured-product-list"
                cardTheme="productSearch"
            />
        </a>
    );
};

export const getSearchURL = (term, params = {}) => {
    const desired = term.replace(/[^\w\s/+]/gi, '');
    const searchText = desired.replace(/[+]/gi, '-');
    const url = `${config.link.sub}/${encodeURIComponent(searchText).replace(/%20/g, '+').replace(/%2F/g, '+')}`;
    const queryParams = _map(params, (value, key) => (`${key}=${value}`)).join('&');

    return !queryParams.length ? url : `${url}?${queryParams}`;
};

export const navigateTo = (navResult, datasourceType) => {
    const param = {};
    // Searchtype query param
    /* istanbul ignore else */
    if (datasourceType) {
        param.searchType = encodeURIComponent(datasourceType).replace(/%20/g, '+');
    }
    // Ntt query param
    param.Ntt = encodeURIComponent(navResult.term).replace(/%20/g, '+');

    /* istanbul ignore else */
    if (navResult.dept) {
        param.deptName = navResult.dept;
    } else if (navResult.testVersion) {
        param.testVersion = navResult.testVersion;
    }

    /* istanbul ignore else */
    if (navResult.predictiveDetail) {
        param.predictiveDetail = navResult.predictiveDetail;
    }
    // adding predSearchTerm query param to URL
    /* istanbul ignore else */
    if (navResult.predSearchTerm) {
        param.predSearchTerm = navResult.predSearchTerm;
    }

    window.location = getSearchURL(navResult.term, param);
};

const prepareData = (dataSoure, maxItemsLength) => {
    if (dataSoure && Array.isArray(dataSoure)) {
        const dataLength = dataSoure.length;
        const length = maxItemsLength < dataLength ? maxItemsLength : dataLength;
        const data = [];

        dataSoure.forEach((item, i) => {
            data.push({
                type: 'term',
                value: item.term,
                position: i + 1,
                categoryPosition: i + 1,
            });

            if (item.depts) {
                item.depts.map((dept, index) => {
                    data.push({
                        type: 'dept',
                        value: ` in ${dept.name}`,
                        parentItem: item.term,
                        link: dept.href,
                        position: index + 1,
                        categoryPosition: i + 1,
                    });

                    return data;
                });
            }
        });

        return _take(data, length);
    }
    return null;
};

export class ProductSearch extends Component {
    static defaultProps = {
        minSearchInputLength: 3,
        maxItemsLength: 10,
        actions: {},
        productSearchResults: [],
        automationId: '',
        showFeatureResult: true,
        deviceType: {},
        location: {},
        abTestEngagements: [],
        regionZone: '',
    };

    static propTypes = {
        minSearchInputLength: PropTypes.number,
        maxItemsLength: PropTypes.number,
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        productSearchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
        automationId: PropTypes.string,
        showFeatureResult: PropTypes.bool,
        deviceType: PropTypes.oneOfType([PropTypes.object]),
        location: PropTypes.objectOf(PropTypes.object),
        abTestEngagements: PropTypes.objectOf(PropTypes.object),
        regionZone: PropTypes.string,
    };

    static deviceType = {
        isDesktop: false,
        isMobile: true,
        isTablet: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            datasourceType: config.data.dataType.recentSearchTerm,
            cacheData: [],
            isFocused: false,
            isIgnoreBlur: false,
            header: null,
            retainSearchStatus: 0, // 0: search text not mounted, 1: search text mounted, 2: search triggered on focus
        };
    }

    componentDidMount() {
        const seachTerm = this.getUserSearchText();
        if (seachTerm.length >= this.props.minSearchInputLength && this.state.retainSearchStatus === 0) {
            // eslint-disable-next-line
            this.setState({
                searchText: seachTerm,
                retainSearchStatus: 1,
            });
        }
    }

    onFocus = () => {
        const { retainSearchStatus, searchText } = this.state;
        /* istanbul ignore else */
        if (searchText.length === 0) {
            this.resetCurrentSearchResults(config.data.dataType.recentSearchTerm);
        }
        if (retainSearchStatus === 1) {
            this.onChange(searchText);
            this.setState({ retainSearchStatus: 2 });
        }
        this.setState({ isFocused: true });
    };

    onBlur = () => {
        if (!this.state.isIgnoreBlur) {
            this.setState({ isFocused: false });
        }
    };

    onClearCache = () => {
        RecentSearch.clearData();
        this.setState({ cacheData: [] });
    };

    onChange = (value) => {
        const { predictSearch, recentSearchTerm } = config.data.dataType;
        const Product = 'products';
        const TypeAhead = 'TypeAhead';
        const { minSearchInputLength, deviceType, abTestEngagements } = this.props;

        if (value.length >= minSearchInputLength) {
            const params = {};

            // passing user search text in q
            params.q = value;
            params.channel = Utils.fetchChannelInfo(deviceType);

            // passing search query param based on device Type
            if (!deviceType.isMobile) {
                params.responseGroup = Product;
            }
            // fetching userSegment key if testType is 'TypeAhead'
            const abTestSegment = _find(abTestEngagements, obj => obj.testType === TypeAhead);
            /* istanbul ignore else */
            if (abTestSegment) {
                const userSegInfo = abTestSegment.userSegments.split('=');
                /* istanbul ignore else */
                if (userSegInfo.length > 1) {
                    params[userSegInfo[0]] = userSegInfo[1];
                }
            }

            delay(this.props.actions.getProductSearchAction(params, this.props.regionZone), config.data.delay);
            this.setState({
                header: null,
                datasourceType: predictSearch,
            });
        } else if (value.length === 0) {
            this.resetCurrentSearchResults(recentSearchTerm);
        } else {
            this.setState({
                cacheData: null,
                header: null,
                datasourceType: recentSearchTerm,
            });
        }

        this.setState({
            searchText: value,
            isFocused: true,
        });
    };

    onMouseDown = () => {
        this.setState({ isIgnoreBlur: true });
    };

    onMouseUp = () => {
        this.setState({ isIgnoreBlur: false });
    };

    onKeyDown = (value) => {
        this.setState({
            searchText: value,
        });
    }

    onReset = () => {
        this.setState({ searchText: '', isFocused: false });
    };
    // predictive search
    onSelect = (searchResult) => {
        const searchText = searchResult.term;
        let searchTextWithDept = searchText;
        let type = 'keyword';

        /* istanbul ignore else */
        if (searchResult.dept) {
            searchTextWithDept = `${searchText}${searchResult.dept}`;
            searchResult.term = searchTextWithDept;
            searchResult.dept = '';
            type = 'department';
        }
        // Reseting predSearchTerm  on every search
        searchResult.predSearchTerm = '';
        /* istanbul ignore else */
        if ((this.state.searchText.length >= this.props.minSearchInputLength)) {
            const predictiveInfo = encodeURIComponent(`${
                this.state.searchText}:${searchResult.position}:${searchResult.term}`);
            searchResult.predictiveDetail = `${type}:${predictiveInfo}`;
            searchResult.predSearchTerm = this.state.searchText;
        }

        const { predictSearch, recentSearchTerm } = config.data.dataType;
        const datasourceType = (this.state.searchText.length >= this.props.minSearchInputLength) ?
            predictSearch : recentSearchTerm;

        this.setState({
            datasourceType,
        }, () => { this.navigateToSearch(searchResult); });
    };
    // Search textbox enter key event
    onSubmit = (searchResult) => {
        this.setState({
            datasourceType: '',
        }, () => { this.navigateToSearch(searchResult); });
    };

    /**
     * util function to read URL params
     * @param {string} key - query parameter name
     * @param {http url} url (optional) - soruce of url to read params
     */
    getURLParameterBykey = (key, url = this.props.location.search) => { // TODO - this will moved to Util function later
        let name = key;
        name = name.replace(/[[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        /* istanbul ignore else */
        if (!results) return null;
        /* istanbul ignore else */
        if (!results[2]) return '';
        // While passing to search page, blank space are replaced by +
        // So when we get the value, + is replaced by blankspace
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    getUserSearchText = () => {
        // 'Ntt' will get on following navigation home >> search
        let userSearchText = this.getURLParameterBykey('Ntt');
        // 'redirectTerm' will get on following navigation home >> department
        /* istanbul ignore else */
        if (!userSearchText) {
            userSearchText = this.getURLParameterBykey('redirectTerm');
        }
        // 'searchTerm' will get on following navigation home >> search >> pdp
        /* istanbul ignore else */
        if (!userSearchText) {
            userSearchText = this.getURLParameterBykey('searchTerm');
        }
        return userSearchText || '';
    };

    // reseting current search results
    resetCurrentSearchResults = (recentSearchTerm) => {
        this.setState({
            cacheData: RecentSearch.getRecentData(),
            header: this.renderCachedSuggestionBoxHeader(),
            datasourceType: recentSearchTerm,
        });
        const { productSearchResults } = this.props;
        if (productSearchResults && productSearchResults.length > 0) {
            this.props.actions.resetProductSearchResults();
        }
    };

    navigateToSearch = (searchResult) => {
        const nav = {
            term: searchResult.term,
            dept: searchResult.dept,
        };

        /* istanbul ignore else */
        if (searchResult.predictiveDetail) {
            nav.predictiveDetail = searchResult.predictiveDetail;
        }

        if (searchResult.predSearchTerm) {
            nav.predSearchTerm = searchResult.predSearchTerm;
        }

        /* istanbul ignore else */
        if (this.props.abTestEngagements) {
            const abTestSegment = _find(this.props.abTestEngagements, obj => obj.testType && obj.testType.toLowerCase() === 'organicsearch');
            if (abTestSegment) {
                nav.testVersion = abTestSegment.abTest;
            }
        }

        navigateTo(nav, this.state.datasourceType);
    }

    renderCachedSuggestionBoxHeader() {
        return (
            <li>
                <div className={styles.productSearchTermBoxHeader}>
                    <div className={styles.productTermWrapper}>
                        <b>Recent Searches </b>
                    </div>
                    <div className={styles.productSearchTermButtonWrapper}>
                        <Button
                            type="button"
                            className={styles.typeaheadTermBoxButton}
                            size={'Sm'}
                            buttonType={'Link'}
                            onClick={this.onClearCache}>Clear</Button>
                    </div>
                </div>
            </li>
        );
    }

    render() {
        const { automationId, maxItemsLength, productSearchResults, deviceType, showFeatureResult } = this.props;
        const { datasourceType, cacheData, header, isFocused, searchText } = this.state;
        const type = datasourceType === config.data.dataType.recentSearchTerm;
        const datasource = type ? cacheData : productSearchResults;
        const suggestionData = prepareData(datasource, maxItemsLength);

        return (
            <div
                data-automation-id={automationId}
                data-automation-container="search-block"
                className={styles.productSearchContainer}>
                <div className={styles.productSearchInputWrapper}>
                    <TypeaheadInput
                        datasource={datasource}
                        data={suggestionData}
                        header={header}
                        showFeatureResult={showFeatureResult}
                        renderCard={renderCard}
                        type="search"
                        isFocused={isFocused}
                        inputText={searchText}
                        deviceType={deviceType}
                        onChange={this.onChange} onSelect={this.onSelect} onSubmit={this.onSubmit}
                        onFocus={this.onFocus} onBlur={this.onBlur} onReset={this.onReset}
                        onKeyDown={this.onKeyDown}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        automationId="search-text-box"
                        disableAutoComplete
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ productSearchResults, productSearchDetailResult, context, regionalPricing }) => ({
    productSearchResults,
    productSearchDetailResult,
    regionZone: regionalPricing ? regionalPricing.regionZone : '0',
    deviceType: context ? context.deviceType : ProductSearch.deviceType,
    abTestEngagements: context ? context.abTestEngagements : [],
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductSearch));
