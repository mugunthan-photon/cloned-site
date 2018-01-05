import * as LoadingActionTypes from '../actionTypes/LoadingActionTypes';

const showLoader = () => ({
    type: LoadingActionTypes.SHOW_LOADER,
});

const removeLoader = () => ({
    type: LoadingActionTypes.REMOVE_LOADER,
});

export default {
    showLoader,
    removeLoader,
};
