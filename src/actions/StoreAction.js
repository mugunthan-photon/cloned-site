import { SET_MY_STORE } from '../actionTypes/StoreActionTypes';

const setMyStore = payload => ({
    type: SET_MY_STORE,
    payload,
});

export default {
    setMyStore,
};
