import * as ActionTypes from '../actionTypes/SavedListToolTip';

/* istanbul ignore next */
export const getLists = (accountId, accessToken) => ({
    type: ActionTypes.GET_SITE_LIST,
    payload: { accountId, accessToken, payload: { params: { field: 'id,name,totalItems' } } },
});

export const createList = (accountId, accessToken, data) => ({
    type: ActionTypes.CREATE_SITE_NEW_LIST,
    payload: { accountId, accessToken, payload: { ...data } },
});

/* istanbul ignore next */
export const moveToList = (listId, savedItemId, params, accountId, accessToken) => ({
    type: ActionTypes.MOVETO_SITE_NEW_LIST,
    payload: { listId, savedItemId, params },
    accessToken,
    accountId,
});

export const moveToListEventSuccess = () => ({
    type: ActionTypes.MOVE_SITE_ITEMS_EVENT_ANALYTICS,
});

/* istanbul ignore next */
export const addToList = (listId, accountId, accessToken, payload, totalItemsSavedForLater) => ({
    type: ActionTypes.ADD_SITE_ITEM_TO_LIST,
    payload: { listId, accountId, accessToken, payload },
    analyticsData: { totalItemsSavedForLater },
});

export const createListError = error => ({
    type: ActionTypes.SITE_MOVETOLIST_ERROR_EVENT,
    payload: error,
});

export const addToListEventSuccess = payload => ({
    type: ActionTypes.ADD_SITE_TO_LIST_EVENT,
    payload,
});

export default getLists;
