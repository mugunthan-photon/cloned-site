import * as NavigationMenuActionTypes from '../actionTypes/NavigationMenuActionTypes';

const getActiveMenuOnClickAction = menuItem => ({
    type: NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_ONCLICK,
    payload: menuItem,
});

const getActiveMenuAction = id => ({
    type: NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_ONCLICK_GET_REQUEST,
    payload: id,
});

const getPreviousMenuAction = menuListBefore => ({
    type: NavigationMenuActionTypes.NAVIGATION_MENU_PREVIOUS_ONCLICK,
    payload: menuListBefore,
});

export default {
    getActiveMenuOnClickAction,
    getActiveMenuAction,
    getPreviousMenuAction,
};
