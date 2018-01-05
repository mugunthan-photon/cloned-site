import * as BreadCrumbNavActionTypes from '../actionTypes/BreadCrumbNavActionTypes';

const getBreadCrumbsAction = payload => ({
    type: BreadCrumbNavActionTypes.BREADCRUMBNAV_GET_REQUEST,
    payload,
});

export default {
    getBreadCrumbsAction,
};
