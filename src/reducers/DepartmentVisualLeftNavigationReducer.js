import * as types from '../actionTypes/DepartmentVisualNavigationActionTypes';

export default function DepartmentVisualLeftNavigationReducer(state = [], action) {
    switch (action.type) {
        case types.DEPARTMENT_VISUAL_LEFT_NAVIGATION_CLEAR:
            return [];
        case types.DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_SUCCESS:
            if (action.departments.data && action.departments.data.x2LeftNavDimensionMap) {
                const navMap = {};
                Object.keys(action.departments.data.x2LeftNavDimensionMap).forEach((key) => {
                    const newState = [];
                    action.departments.data.x2LeftNavDimensionMap[key].forEach((data) => {
                        if (data) newState.push(data);
                    });
                    navMap[key] = newState;
                });
                return navMap;
            }
            return state;
        default:
            return state;
    }
}
