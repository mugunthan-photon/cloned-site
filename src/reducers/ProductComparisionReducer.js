import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import {
    TOGGLE_PRODUCTS_TO_COMPARE,
    RESET_PRODUCTS_COMPARE,
    SET_ZONE_PARAM,
    PRODUCTS_BY_ID_SUCCESS_FOR_COMPARE,
} from '../actionTypes/ProductComparisionActionTypes';

function findInArray(selectedProducts, product) {
    const storeIndex = selectedProducts.findIndex(currentStore => currentStore.ppId === product.ppId);
    if (storeIndex >= 0) {
        selectedProducts.splice(storeIndex, 1);
    } else {
        selectedProducts.push(product);
    }
    return [...selectedProducts];
}

function getProductCompareUrl(compareProducts) {
    const { products } = compareProducts;
    const refUrl = encodeURIComponent(compareProducts.refUrl);
    const allProducts = products.map(product => product.ppId).join();
    return `/l/productcompare?ppId=${allProducts}&ref=${refUrl}`;
}

function serializeProductDetails(productDetails) {
    const { id, name, images, ppUrl } = productDetails;
    // return {
    //     imageUrl: '//s7d9.scene7.com/is/image/JCPenney/DP0112201717234138M.tif?$gallery$',
    //     title: 'Haier 15 Cu.Ft. Bottom Mount Refrigerator',
    //     ppId: 'ppr5007213350',
    //     altImageUrl: '//s7d9.scene7.com/is/image/JCPenney/DP0911201719190827M.tif?$gallery$',
    //     productUrl: '/p/haier-15-cuft-bottom-mount-refrigerator/ppr5007213350?pTmplType=silver&catId=SearchResults&searchTerm=refrigerators',
    // };
    return {
        imageUrl: images && images[0].url,
        title: name,
        ppId: id,
        altImageUrl: images && images[0].url,
        productUrl: ppUrl,
    };
}

function getStateWithCompareUrl(state) {
    return Object.assign({}, state, {
        comparePageUrl: getProductCompareUrl(state),
    });
}

const initialState = {
    products: [],
    productToDisplayError: {},
    zoneParam: '',
    productsZoneParam: '', // Zone param for which products has been added
    refUrl: '',
    comparePageUrl: '',
};

export default function CompareProductsReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_PRODUCTS_TO_COMPARE: {
            let products;
            let productToDisplayError;
            // productsZoneParam will be added only when the user selects a product but zoneParam will be added on every gallery call
            const resetProducts = state.zoneParam !== state.productsZoneParam;
            const selectedProducts = resetProducts ? [] : [...state.products];
            products = findInArray(selectedProducts, action.productDetails);
            if (products.length > 4) {
                products = state.products;
                productToDisplayError = action.productDetails;
            } else {
                productToDisplayError = {};
            }
            const storeProductsToCompare = {
                zoneParam: state.zoneParam,
                products: products.map(product => product.ppId),
            };
            LocalStorage.setData('compareProducts', storeProductsToCompare, true);
            const mergedState = Object.assign({}, state, {
                products,
                productsZoneParam: state.zoneParam,
                productToDisplayError,
            });
            return getStateWithCompareUrl(mergedState);
        }
        // This action will be invoked in gallery
        case SET_ZONE_PARAM: {
            const { zoneParam, refUrl } = action.payload;
            return Object.assign({}, state, {
                zoneParam,
                productsZoneParam: zoneParam,
                refUrl,
            });
        }

        case PRODUCTS_BY_ID_SUCCESS_FOR_COMPARE: {
            const { payload: { data }, productsZoneParam, resetProducts, refUrl } = action;
            const serializedProductData = data && data.map(productDetails =>
            serializeProductDetails(productDetails));
            let appendToState = {};
            /* istanbul ignore next */
            if (Array.isArray(serializedProductData)) {
                appendToState = {
                    products: resetProducts ? serializedProductData :
                    (serializedProductData.concat(state.products) || []),
                };
            }

            if (productsZoneParam) {
                appendToState.productsZoneParam = productsZoneParam;
            }

            if (refUrl) {
                appendToState.refUrl = refUrl;
            }
            const mergedState = Object.assign({}, state, appendToState);

            return getStateWithCompareUrl(mergedState);
        }

        case RESET_PRODUCTS_COMPARE: {
            LocalStorage.removeData('compareProducts', true);
            return Object.assign({}, state, {
                products: [],
                productToDisplayError: {},
            });
        }
        default: {
            return state;
        }
    }
}
