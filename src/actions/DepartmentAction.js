import * as DepartmentActionTypes from '../actionTypes/DepartmentActionTypes';

const getDepartmentsAction = () => ({
    type: DepartmentActionTypes.DEPARTMENTS_GET_REQUEST,
});

export default {
    getDepartmentsAction,
};
