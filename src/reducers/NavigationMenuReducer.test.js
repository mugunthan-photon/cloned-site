import { expect } from 'chai';
import * as types from '../actionTypes/NavigationMenuActionTypes';
import * as departmentsTypes from '../actionTypes/DepartmentActionTypes';
import NavigationMenuReducer from './NavigationMenuReducer';
import navMockData from '../components/NavigationMenu/__stories/mock';

describe('Navigation Reducer', () => {
    const action = {};
    const categories = navMockData.groups[0].categories;
    it('handles unknown type', () => {
        expect(NavigationMenuReducer([], action)).to.eql([]);
    });
    it.skip('NAVIGATION_MENU_GET_SUCCESS', () => {
        action.type = types.NAVIGATION_MENU_GET_SUCCESS;
        action.navigationMenuList = categories;
        expect(NavigationMenuReducer([], action)).to.have.lengthOf(categories.length);
    });
    it('DEPARTMENTS_GET_SUCCESS', () => {
        const jsonObj = {
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
        };
        action.type = departmentsTypes.DEPARTMENTS_GET_SUCCESS;
        action.departments = jsonObj;
        const reducer = NavigationMenuReducer(undefined, action);
        expect(reducer.groups).deep.equals(jsonObj.data.groups);
        const action1 = {};
        const reducer1 = NavigationMenuReducer(undefined, action1);
        action.type = types.NAVIGATION_MENU_NOT_PRESENT;
        expect(reducer1).to.have.lengthOf(0);
    });
    it('NAVIGATION_MENU_ACTIVE_ONCLICK', () => {
        action.type = types.NAVIGATION_MENU_ACTIVE_ONCLICK;
        action.payload = categories[1];
        expect(NavigationMenuReducer([], action)).to.have.lengthOf(categories[1].groups.length);
    });
    it('NAVIGATION_MENU_ACTIVE_GET_SUCCESS', () => {
        action.type = types.NAVIGATION_MENU_ACTIVE_GET_SUCCESS;
        action.categories = categories[1];
        expect(NavigationMenuReducer([], action)).to.have.deep.property('[0].name', 'SHOP BEDDING');
    });
    it('NAVIGATION_MENU_PREVIOUS_ONCLICK', () => {
        action.type = types.NAVIGATION_MENU_PREVIOUS_ONCLICK;
        action.payload = categories;
        expect(NavigationMenuReducer([], action)).to.have.deep.property('[1].groups')
            .that.is.an('array')
            .with.deep.property('[0].name', 'SHOP BEDDING');
    });
});
