import * as types from '../actionTypes/SavedListToolTip';

export default function Reducer(state = { listItems: { data: {} }, products: {} }, action) {
    switch (action.type) {
        case types.GET_SITE_LIST: {
            const listItems = {
                data: {},
            };
            return { ...state, listItems };
        }

        case types.GET_SITE_LIST_SUCCESS: {
            const listItems = action.listItems.response ? action.listItems.response : action.listItems;
            return { ...state, listItems, movedToList: {} };
        }

        case types.CREATENEW_SITE_LIST_SUCCESS: {
            const createList = action.list;
            return { ...state, createList };
        }

        case types.MOVETO_SITE_NEWPRODUCT_LIST_SUCCESS: {
            const movedToList = action.movedToListResponse;
            return { ...state, movedToList, createList: {} };
        }

        case types.ADD_SITE_ITEM_TO_LIST_SUCCESS: {
            const addItems = action.addToListResponse;
            return { ...state, addItems, createList: {}, products: {} };
        }

        case types.SITE_GETLIST_BASEDON_ID_SUCCESS: {
            const products = action.products;
            return { ...state, products };
        }

        case types.GET_SITE_LIST_ERROR: {
            return state;
        }

        default:
            return state;
    }
}
