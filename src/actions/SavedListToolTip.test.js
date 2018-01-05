import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as SavedListActionTypes from '../actionTypes/SavedListToolTip';
import * as actions from './SavedListToolTip';

describe('Savedlist tooltip', () => {
    describe('moveToListEventSuccess', () => {
        const action = actions.moveToListEventSuccess();

        it('returns correct action type', () => {
            expect(action.type).to.equal(SavedListActionTypes.MOVE_SITE_ITEMS_EVENT_ANALYTICS);
        });
    });

    describe('createListError', () => {
        const action = actions.createListError();

        it('returns correct action type', () => {
            expect(action.type).to.equal(SavedListActionTypes.SITE_MOVETOLIST_ERROR_EVENT);
        });
    });

    describe('addToListEventSuccess', () => {
        const action = actions.addToListEventSuccess();

        it('returns correct action type', () => {
            expect(action.type).to.equal(SavedListActionTypes.ADD_SITE_TO_LIST_EVENT);
        });
    });

    // describe('addToListSuccess', () => {
    //     const payload = [{ product: { id: 1231231231231 }, itemId: 45645645645, quantity: 2 }];
    //     const action = actions.addToList('1234', '7812ehj', '785871mbkj', payload);

    //     it('returns correct action type', () => {
    //         console.log('action.typeaction.typeaction.type', action);
    //         expect(action.type).to.equal(SavedListActionTypes.ADD_SITE_ITEM_TO_LIST_SUCCESS);
    //     });
    // });
});
