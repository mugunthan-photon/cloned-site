import * as types from '../actionTypes/DepartmentVisualNavigationActionTypes';

const getImagePrefix = (deviceType = {}) => {
    switch (true) {
        case deviceType.isTablet:
            return 'tablet';
        case deviceType.isDesktop:
            return 'dotcom';
        default:
            return 'mobile';
    }
};

export const filterData = (data, deviceType = {}) => {
    let retData = null;
    const imagePrefix = getImagePrefix(deviceType);
    const { name: title, imageId, seoUrl: links } = data;
    if (imageId && imageId.trim().length > 0) {
        const imageIdTrimmed = imageId.trim();
        const image = `/${imagePrefix}/images/${imageIdTrimmed}`;
        retData = { title, image, links };
    } else {
        retData = null;
    }
    return retData;
};

const getFilterData = (navData, action) => {
    const deptItem = filterData(navData, action.deviceType);
    if (deptItem) {
        deptItem.isInternalUrl = (navData.pageType && navData.pageType === 'X2H2');
        return deptItem;
    }
    return null;
};

export default function DepartmentVisualNavigationReducer(state = [], action) {
    let navData = [];
    switch (action.type) {
        case types.DEPARTMENT_VISUAL_NAVIGATION_CLEAR:
            return [];
        case types.DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS:
            if (action.departments.data && action.departments.data.topNavigationMap) {
                const newState = [];
                Object.keys(action.departments.data.topNavigationMap).forEach((key) => {
                    navData = action.departments.data.topNavigationMap[key][0];
                    const item = getFilterData(navData, action);
                    if (item) newState.push(item);
                });
                return newState;
            } else if (action.departments.data && action.departments.data.x2LeftNavDimensionMap) {
                const newState = [];
                Object.keys(action.departments.data.x2LeftNavDimensionMap).forEach((key) => {
                    action.departments.data.x2LeftNavDimensionMap[key].forEach((data) => {
                        navData = data;
                        const item = getFilterData(navData, action);
                        if (item) newState.push(item);
                    });
                });
                return newState;
            }
            return state;
        default:
            return state;
    }
}
