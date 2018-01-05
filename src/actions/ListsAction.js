import * as ListsActionTypes from '../actionTypes/ListsActionTypes';

export const ListTypes = {
    SAVED_ITEMS: 0,
};

const loadLists = (listType) => {
    switch (listType) {
        case ListTypes.SAVED_ITEMS:
            return {
                type: ListsActionTypes.SAVED_ITEMS_LOAD_REQUEST,
            };
        default:
            throw Error('Unknown list type`');
    }
};

export default {
    loadLists,
};
