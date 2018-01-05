import { expect } from 'chai';
import * as NavigationMenuActionTypes from '../actionTypes/NavigationMenuActionTypes';
import * as actions from './NavigationMenuAction';
import navMockdata from '../components/NavigationMenu/__stories/mock';

describe('NavigationMenu Actions', () => {
    let navigationMenuAction;
    // describe block for getActiveMenuOnClickAction
    describe('getActiveMenuOnClickAction', () => {
        beforeEach(() => {
            navigationMenuAction = actions.getActiveMenuOnClickAction(navMockdata.groups[0].categories[0]);
        });
        it('returns correct action type', () => {
            expect(navigationMenuAction.type).to.equal(NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_ONCLICK);
        });
        it('returns no payload', () => {
            expect(navigationMenuAction.payload.name).to.be.equal('for the home');
        });
    });
    // describe block for getActiveMenuAction
    describe('getActiveMenuAction', () => {
        beforeEach(() => {
            navigationMenuAction = actions.getActiveMenuAction(navMockdata.groups[0].categories[0].id);
        });
        it('returns correct action type', () => {
            expect(navigationMenuAction.type).to
            .equal(NavigationMenuActionTypes.NAVIGATION_MENU_ACTIVE_ONCLICK_GET_REQUEST);
        });
        it('returns no payload', () => {
            expect(navigationMenuAction.payload).to.be.equal('N-bwo3v');
        });
    });
    // describe block for getPreviousMenuAction
    describe('getPreviousMenuAction', () => {
        beforeEach(() => {
            navigationMenuAction = actions.getPreviousMenuAction(navMockdata.groups[0].categories[1]);
        });
        it('returns correct action type', () => {
            expect(navigationMenuAction.type).to.equal(NavigationMenuActionTypes.NAVIGATION_MENU_PREVIOUS_ONCLICK);
        });
        it('returns no payload', () => {
            expect(navigationMenuAction.payload.name).to.be.equal('bed & bath');
        });
    });
});
