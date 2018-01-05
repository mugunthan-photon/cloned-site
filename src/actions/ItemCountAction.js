import * as OrderActionTypes from '../actionTypes/OrderActionTypes';

const updateItemCountAction = payload => ({
    type: OrderActionTypes.UPDATE_ITEM_COUNT,
    payload,
});

const resetItemCountAction = () => ({
    type: OrderActionTypes.RESET_ITEM_COUNT,
});

export default {
    updateItemCountAction,
    resetItemCountAction,
};
