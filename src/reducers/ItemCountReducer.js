import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import * as types from '../actionTypes/OrderActionTypes';
import * as Constants from '../common/Constants';

const saveCartCount = (count) => {
    Cookies.save(Constants.ITEM_COUNT, count);
};

/**
 * TEMP FIX: For: https://jira.jcpenney.com/browse/MNPDPYODA-2592
 *
 * Order API drops ItemCount cookie. However we found that this cookie
 * was not dropped from desktop. As a work around, we were told to use desktop cookie
 * DP_ORDER_INFO which get drops by ATG, meaning, when exp-com class header is loaded, this cookie is dropped
 * However, this would not fix the actual problem. Still if user stays on Yoda and never visting classic deskto pages
 * the count will never get shown till API fixes the issue.
 *
 * DP_ORDER_INFO: 1|$9.99|$
 */
const getCartCount = (count) => {
    // if we get count from action payload, give that a preference else go look directly for cookie value
    if (count) {
        saveCartCount(count);
        return count;
    }
    const orderAPICartCount = Cookies.load(Constants.ITEM_COUNT);
    if (orderAPICartCount) {
        return orderAPICartCount;
    }

    // Fallback
    const desktopLegacyCartCount = Cookies.load(Constants.DESKTOP_ITEM_COUNT);
    /** istanbul ignore else */
    if (desktopLegacyCartCount) {
        const orderInfo = desktopLegacyCartCount.split('|');
        if (orderInfo && orderInfo.length > 0) {
            try {
                return Number(orderInfo[0]);
            } catch (err) {
                // Do nothing
            }
        }
    }

    return null;
};

export default function ItemCountReducer(state = 0, action) {
    let itemCount = 0;
    switch (action.type) {
        case types.UPDATE_ITEM_COUNT:
            itemCount = getCartCount(action.payload);
            return itemCount || 0;
        case types.RESET_ITEM_COUNT:
            saveCartCount(0);
            return 0;
        default:
            return state;
    }
}
