import * as types from '../actionTypes/DepartmentActionTypes';
/* istanbul ignore next */
export default function DepartmentsReducer(state = [], action) {
    const getDepartments = (groups, defaultState) => {
        /* istanbul ignore next */
        if (groups && groups.length > 0) {
            return groups[0].categories.map(({ id, name, image, links }) => ({
                id,
                title: name,
                image: image.url,
                links,
            }));
        }
        /* istanbul ignore next */
        return defaultState;
    };
    /* istanbul ignore next */
    switch (action.type) {
        case types.DEPARTMENTS_GET_SUCCESS:
            return getDepartments(action.departments.data.groups, state);
        default:
            return state;
    }
}
