import { put, call, takeLatest } from 'redux-saga/effects';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import SavedItemsApi from 'yoda-interfaces/lib/SavedItems/SavedItemsApi';
import currencyFormatter from 'currency-formatter';
import TokenProvider from '../helpers/TokenProvider/TokenProvider';
import FactorySaga from './FactorySaga';
import constants from '../common/Constants';
import * as ProductCartridgeActionTypes from '../actionTypes/ProductCartridgeActionTypes';

const MAX_DISPLAY_NUM = 11;
const generateSlotData = (initialData, saveForLaterItems, totalItems) => {
    // const filteredItems = filter(saveForLaterItems, item => (item.itemId));
    // let productList = filteredItems;
    let items = null;
    let productItems = null;
    if (saveForLaterItems && saveForLaterItems.items) {
        items = saveForLaterItems.items;
        let showViewAllCard = false;
        if (totalItems > MAX_DISPLAY_NUM) {
            showViewAllCard = true;
        }

        const getItemType = amounts => (find(amounts, item => (item.type && item.type.toLowerCase() === 'sale')) ? 'SALE' : '');
        const getFormattedPrice = price => (currencyFormatter.format(price, { code: 'USD', precision: 2 }));
        const getDiscount = (amounts) => {
            const amount = find(amounts, item => (item.type && item.type.toLowerCase() === 'sale'));
            return amount ? `${amount.minPercentOff}% off` : '';
        };
        const getDefaultPrice = (amounts) => {
            const defaultAmount = find(amounts, item => (item.type && item.type.toLowerCase() === 'default'));
            return defaultAmount ? getFormattedPrice(defaultAmount.min) : '';
        };
        const getOriginalPrice = (amounts) => {
            const originalAmount = find(amounts, item => (item.type && item.type.toLowerCase() === 'original'));
            return originalAmount ? getFormattedPrice(originalAmount.min) : '';
        };
        const mappedProductItems = map(items, item => ({
            linkURL: item.product.href,
            name: item.product.name,
            imageURL: item.product.image ? item.product.image.url : '',
            defaults: item.pricing ? getDefaultPrice(item.pricing.amounts) : '',
            original: item.pricing ? getOriginalPrice(item.pricing.amounts) : '',
            originalDesc: 'was',
            id: item.id,
            type: item.pricing ? getItemType(item.pricing.amounts) : '',
            percentOff: item.pricing ? getDiscount(item.pricing.amounts) : '',
            rating: item.reviews ? item.reviews.rating : '',
            reviewCount: item.reviews ? item.reviews.reviewCount : '',
            skuId: item.itemId,
            ppId: item.product.id,
            productType: item.product.type,
            inventoryStatus: item.inventory ? item.inventory.message : '',
            viewAllCard: false,
            attributes: item.attributes,
        }));

        productItems = filter(mappedProductItems, item => !isEmpty(item.name) && !isEmpty(item.imageURL));

        if (showViewAllCard) {
            productItems.push({ viewAllCard: true });
        }
    }

    const itemNumber = items ? items.length : 0;
    const saveForLaterSchema = {
        schema: 'saved_items',
        items: productItems,
        itemNumber,
    };

    return { [initialData.payload.slotId]: saveForLaterSchema };
};

function generateSavedItemHeaderValue() {
    let savedItems = [];
    if (TokenProvider.get(constants.DP_CHECKOUT_SAVED_ITEMS_PAYLOAD)) {
        savedItems = JSON.parse(TokenProvider.get(constants.DP_CHECKOUT_SAVED_ITEMS_PAYLOAD));
    }

    return reduce(savedItems, (result, item) => {
        let value = result;
        if (result.length > 0) {
            value = `${result},`;
        }
        return `${value}${item.product.id}:${item.itemId}`;
    }, '');
}

function* fetchDataFromSavedItems(initialData) {
    try {
        yield put({ type: ProductCartridgeActionTypes.ADD_LOADER_TO_LIST, initialData });
        const action = {
            payload: {
                params: {
                    limit: MAX_DISPLAY_NUM,
                },
                cartSavedItems: true,
            },
        };

        let callApi = true;
        if (TokenProvider.get(constants.DP_USER_STATE) !== '1') {
            action.payload.guestSavedItems = true;
            const itemData = yield call(generateSavedItemHeaderValue);
            action.payload.savedItemsData = itemData;
            if (!itemData || itemData.length === 0) {
                callApi = false;
            }
        }

        let result = {};
        if (callApi) {
            result = yield call(FactorySaga, SavedItemsApi.getAllSavedItems, action);
        } else {
            result.isSuccess = true;
            result.response = {};
        }

        if (result.isSuccess) {
            const saveForLaterItems = result.response.data;
            const totalItems = (saveForLaterItems) ? saveForLaterItems.totalItems : 0;
            const slotData = yield call(generateSlotData, initialData, saveForLaterItems, totalItems);
            yield [
                put({ type: ProductCartridgeActionTypes.ADD_PRODUCT_CARTRIDGE_SLOT, slotData }),
            ];
        }
    } catch (error) {
        yield put({ type: ProductCartridgeActionTypes.FETCH_DATA_FROM_SAVED_ITEMS_ERROR, error });
    }
}

export default function* watchSavedItemsProductListRequest() {
    yield takeLatest(ProductCartridgeActionTypes.FETCH_DATA_SAVE_FOR_LATER, fetchDataFromSavedItems);
}
