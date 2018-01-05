import * as HamburgerActionTypes from '../actionTypes/HamburgerActionTypes';

export default function ItemCountReducer(state = {}, action) {
    switch (action.type) {
        case HamburgerActionTypes.SLIDER_CATEGORY_LOAD_SUCCESS: {
            const keys = Object.keys(action.categories);
            const flattenObject = [];
            keys.forEach((key) => {
                flattenObject.push(action.categories[key][0]);
            });
            return flattenObject;
        }
        case HamburgerActionTypes.SLIDER_HOVER_LOAD_SUCCESS: {
            const keys = Object.keys(action.categories.hoverPanelMap);
            let flattenObject = {};
            keys.forEach((key) => {
                flattenObject = Object.assign({}, flattenObject, action.categories.hoverPanelMap[key]);
            });
            return {
                menu: flattenObject,
                meta: {
                    imageSrc: action.categories.imageSrc,
                    title: action.categories.viewAllText,
                    viewAllLink: action.categories.viewAllLink,
                    viewAllTextUrl: action.categories.viewAllTextUrl,
                    departmentName: action.categories.departmentName,
                },
            };
        }
        default:
            return state;
    }
}
