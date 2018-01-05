import { expect } from 'chai';
import * as actionTypes from '../actionTypes/DepartmentVisualNavigationActionTypes';
import * as actions from './DepartmentVisualNavigationAction';

describe('DepartmentVisualNavigationAction', () => {
    let action;
    // describe block for getMarketingContentAction
    describe('getDesktopDepartmentVisualNavigationAction', () => {
        beforeEach(() => {
            action = actions.getDesktopDepartmentVisualNavigationAction();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(actionTypes.DESKTOP_DEPARTMENT_VISUAL_NAVIGATION_GET_REQUEST);
        });
        it('returns no payload', () => {
            expect(action.payload).to.be.an('undefined');
        });
    });
});

describe('getDesktopCategoriesVisualNavigationAction', () => {
    let action;
    // describe block for getMarketingContentAction
    describe('getDesktopCategoriesVisualNavigationAction', () => {
        beforeEach(() => {
            action = actions.getDesktopCategoriesVisualNavigationAction();
        });
        it('returns correct action type', () => {
            expect(action.type).to.equal(actionTypes.DESKTOP_CATEGORIES_VISUAL_NAVIGATION_GET_REQUEST);
        });
        it('returns no payload', () => {
            expect(action.payload).to.be.an('undefined');
        });
    });
});
