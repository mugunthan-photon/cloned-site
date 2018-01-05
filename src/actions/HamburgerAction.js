import * as HamburgerActionTypes from '../actionTypes/HamburgerActionTypes';

const getCategories = () => ({
    type: HamburgerActionTypes.SLIDER_CATEGORY_LOAD_REQUEST,
});

const getHoverPanel = nid => ({
    type: HamburgerActionTypes.SLIDER_HOVER_LOAD_REQUEST,
    nid,
});

export default {
    getCategories,
    getHoverPanel,
};
