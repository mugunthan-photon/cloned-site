import { expect } from 'chai';
import DepartmentsReducer from './DepartmentsReducer';
import * as types from '../actionTypes/DepartmentActionTypes';

describe('DepartmentsReducer Reducer', () => {
    it('initialstate', () => {
        expect(
            DepartmentsReducer(undefined, []),
        ).deep.equals([]);
    });

    it('DEPARTMENTS_GET_SUCCESS', () => {
        expect(
            DepartmentsReducer([], {
                type: types.DEPARTMENTS_GET_SUCCESS,
                departments: {
                    data: {
                        groups: [
                            {
                                categories: [
                                    {
                                        id: 1,
                                        name: 'Light',
                                        image: 'img_light',
                                        links: 'product/department/',
                                    },
                                ],
                            },
                        ],
                    },
                },
            }),
        ).deep.equals([{
            id: 1,
            title: 'Light',
            image: undefined,
            links: 'product/department/',
        }]);
    });
});

