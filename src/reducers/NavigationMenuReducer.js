import * as NavigationMenuActionTypes from '../actionTypes/NavigationMenuActionTypes';
import * as DepartmentActionTypes from '../actionTypes/DepartmentActionTypes';

export default function NavigationMenuReducer(state = [], action) {
    switch (action.type) {
        case DepartmentActionTypes.DEPARTMENTS_GET_SUCCESS:
            return action.departments.data;
        case NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_ONCLICK:
            return action.payload.groups;
        case NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_GET_SUCCESS:
            return action.categories.groups;
        case NavigationMenuActionTypes.NAVIGATION_MENU_PREVIOUS_ONCLICK:
            return action.payload;
        default:
            return state;
    }
}
