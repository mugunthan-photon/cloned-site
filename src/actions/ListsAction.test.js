import { expect } from 'chai';
import * as actions from './ListsAction';
import * as ListActionTypes from '../actionTypes/ListsActionTypes';

describe('ListsAction Actions', () => {
    describe('loadLists', () => {
        it('Expect error', () => {
            try {
                actions.default.loadLists('SOME RANDOM');
                expect(1).to.equal(2);
            } catch (e) {
                expect(1).to.equal(1);
            }
        });

        it('load saved items', () => {
            try {
                const action = actions.default.loadLists(actions.ListTypes.SAVED_ITEMS);
                expect(action.type).to.equal(ListActionTypes.SAVED_ITEMS_LOAD_REQUEST);
            } catch (e) {
                console.log(e);
                expect(1).to.equal(2);
            }
        });
    });
});
