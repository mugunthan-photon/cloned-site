import _forEach from 'lodash/forEach';
import * as types from '../actionTypes/DepartmentVisualNavigationActionTypes';

const getImagePrefix = (deviceType = {}) => {
    switch (true) {
        case deviceType.isTablet:
        case deviceType.isDesktop:
            return 'tablet';
        default:
            return 'mobile';
    }
};

const filterData = (data, deviceType = {}) => {
    let retData = null;
    const imagePrefix = getImagePrefix(deviceType);
    const { name: title, imageSrc, targetUrl: links, departments, hoverPanelUrl } = data;
    if (imageSrc && imageSrc.trim().length > 0) {
        const imageIdTrimmed = imageSrc.trim();
        const image = `/${imagePrefix}/images/${imageIdTrimmed}`;
        retData = { title, image, links, departments, hoverPanelUrl };
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
export default function DesktopDepartmentVisualNavReducer(state = [], action) {
    switch (action.type) {
        case types.DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS: {
            if (action.categories) {
                return action.categories;
            }
            if (action.departments) {
                const newState = [];
                _forEach(action.departments, (department) => {
                    const item = getFilterData(department, action);
                    if (item) newState.push(item);
                });
                return newState;
            }

            return state;
        }
        default:
            return state;
    }
}
