import * as BreadCrumbNavActionTypes from '../actionTypes/BreadCrumbNavActionTypes';

export default function BreadCrumbNavReducer(state = [], action) {
    switch (action.type) {

        case BreadCrumbNavActionTypes.BREADCRUMBNAV_GET_SUCCESS:
            return action.breadCrumbs;
        case BreadCrumbNavActionTypes.BREADCRUMBNAV_CLEAR:
            return [];
        default:
            return state;

    }
}
