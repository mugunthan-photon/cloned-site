import { put, call, takeEvery, select, fork, take } from 'redux-saga/effects';
import PricingApi from 'yoda-interfaces/lib/Product/PricingApi';
import * as ProductCartridgeActionTypes from '../actionTypes/ProductCartridgeActionTypes';
import CertonaLoader from '../helpers/CertonaLoader/CertonaLoader';

/**
 * Get the data from store to verify loader status
 * @param {Object}  state(Application state)
 * @param {Object} payload(Component props)
 * @return {boolean}
 */
export const isCertonaLoaderInvokedForPageType = (state, payload) => {
    const { loader, pageType } = payload;
    const isLoaderPresent = state.productCartridge.loaders[loader];
    return isLoaderPresent && isLoaderPresent[pageType];
};


/**
 * Merge price list with product list and return an object {slotId: [productList] }
 * @param {array}  schemeWithPrice
 * @param {Object} currentScheme
 * @return {Object}
 */
export const mergeCertonaData = (schemeWithPrice, currentScheme) => {
    const { scheme, display } = currentScheme;
    let productListToRender = [];

    if (display === 'yes') {
        productListToRender = currentScheme.items.map((item) => {
                // Merge data if product ID of price list matches with product list ID
            if (item.id === schemeWithPrice.id && schemeWithPrice.amounts) {
                return {
                    ...item,
                    priceDetails: schemeWithPrice,
                };
            }
            return item;
        });
    }

    currentScheme.items = productListToRender;
    return { [scheme]: currentScheme };
};

function* fetPricingInfo(params) {
    try {
        let productsCount = 0;
        const currentScheme = params.currentScheme;
        const currentSchemeItems = currentScheme.items;

        while (productsCount < currentSchemeItems.length) {
            const productDetails = currentScheme.items[productsCount];
            productsCount += 1;
            const context = state => state.context;
            const appContext = yield select(context);
            const featureFlags = (appContext || {}).featureFlags || {};

            const pricingInfoObj = {
                id: productDetails.id,
                host: params.host,
                regionZone: params.regionZone,
                callRootPriceAPI: featureFlags.callRootPriceAPI,
            };
            const pricingInfo = yield call(PricingApi.getPriceByProduct, pricingInfoObj);
            /**
              * pricingInfo consists of product list with price information
              * mergeCertonaData function will merge price information with actual product information
            */
            const slotData = yield call(mergeCertonaData, pricingInfo, currentScheme);
            yield put({ type: ProductCartridgeActionTypes.ADD_PRODUCT_CARTRIDGE_SLOT, slotData });
        }
    } catch (error) {
        yield put({ type: 'PRICING_ERROR', error });
    }
}

/**
 * Get data from certona
 * @param {Object} initialData
 */
function* fetchDataFromCertona(initialData) {
    try {
        // Check in store to ensure certona loader is invoked or not
        let loaderTriggered = yield select(isCertonaLoaderInvokedForPageType, initialData.payload);

        // To cancel the request if loader is already trigerred
        while (!loaderTriggered) {
            yield put({ type: ProductCartridgeActionTypes.ADD_CERTONA_LOADER_TO_LIST, initialData });
            loaderTriggered = true;
            // Fetch all schemes of pageType(Ex. 'HOME', 'DEPARTMENT')
            const responseData = yield call(CertonaLoader.load, initialData);
            let readSchemes = 0;

            // Loop through all schemes and fetch price details for each product in scheme
            while (responseData.schemes.length > readSchemes) {
                const currentScheme = responseData.schemes[readSchemes];
                const { scheme, display } = currentScheme;
                let slotData;
                readSchemes += 1;

                if (display === 'yes') {
                    // Creating header key for Product cartridge Header
                    currentScheme.header = currentScheme.explanation;
                    // Render products cartridge without price information.
                    slotData = { [scheme]: currentScheme };
                    yield put({ type: ProductCartridgeActionTypes.ADD_PRODUCT_CARTRIDGE_SLOT, slotData });
                    const pricingObj = {
                        currentScheme,
                        host: initialData.payload.host,
                        regionZone: initialData.payload.regionZone,
                    };
                    yield fork(fetPricingInfo, pricingObj);
                }
            }
        }
    } catch (error) {
        yield put({ type: 'PRODUCT_ERROR', error });
    }
}

function* resetProductCartridgeReducer() {
    yield put({ type: ProductCartridgeActionTypes.RESET_PRODUCT_CARTRIDGE_REDUCER });
}

export default function* watchProductListRequest() {
    yield takeEvery(ProductCartridgeActionTypes.FETCH_DATA_FROM_CERTONA, fetchDataFromCertona);
}

export function* watchResetProductList() {
    yield take(ProductCartridgeActionTypes.RESET_PRODUCT_CARTRIDGE_REDUCER, resetProductCartridgeReducer);
}
