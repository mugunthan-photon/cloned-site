import { expect } from 'chai';
import * as SavedItemsTypes from '../actionTypes/SavedItemActionTypes';
import * as actions from './SavedItemAction';

const param = [{ product: { id: 1231231231231 }, itemId: 45645645645, quantity: 2 }];
describe('Saved Item Actions', () => {
    let action;
    describe('getSavedItems', () => {
        it('returns getSavedItems', () => {
            action = actions.getSavedItems(param);
            expect(action.type).to.equal(SavedItemsTypes.SAVEDITEMS_GET_REQUEST);
        });
    });
    describe('addItem', () => {
        it('returns addItem', () => {
            action = actions.addItem(param);
            expect(action.type).to.equal(SavedItemsTypes.ADD_SAVEDITEMS);
        });
    });

    describe('removeItem', () => {
        it('returns removeItem', () => {
            action = actions.removeItem(param);
            expect(action.type).to.equal(SavedItemsTypes.DELETE_SAVEDITEMS);
        });
    });

    describe('resetStatus', () => {
        it('returns resetStatus', () => {
            action = actions.resetStatus(param);
            expect(action.type).to.equal(SavedItemsTypes.SAVEDITEMS_RESET_STATUS);
        });
    });
});
