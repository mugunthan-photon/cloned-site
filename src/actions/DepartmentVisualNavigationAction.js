import * as DepartmentVisualNavigationActionTypes from '../actionTypes/DepartmentVisualNavigationActionTypes';

const getDepartmentVisualNavigationAction = (pageName, nTypeID, deviceType) => ({
    type: DepartmentVisualNavigationActionTypes.DEPARTMENT_VISUAL_NAVIGATION_GET_REQUEST,
    pageName,
    nTypeID,
    deviceType,
});

const getDesktopDepartmentVisualNavigationAction = (pageName, deviceType) => ({
    type: DepartmentVisualNavigationActionTypes.DESKTOP_DEPARTMENT_VISUAL_NAVIGATION_GET_REQUEST,
    pageName,
    deviceType,
});

const getDesktopCategoriesVisualNavigationAction = departments => ({
    type: DepartmentVisualNavigationActionTypes.DESKTOP_CATEGORIES_VISUAL_NAVIGATION_GET_REQUEST,
    departments,
});

const getDepartmentVisualLeftNavigationAction = (nTypeID, deviceType) => ({
    type: DepartmentVisualNavigationActionTypes.DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_REQUEST,
    nTypeID,
    deviceType,
});

export default {
    getDepartmentVisualNavigationAction,
    getDesktopDepartmentVisualNavigationAction,
    getDesktopCategoriesVisualNavigationAction,
    getDepartmentVisualLeftNavigationAction,
};
