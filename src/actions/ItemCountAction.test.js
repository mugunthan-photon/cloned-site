import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';
import * as actions from './ItemCountAction';

describe('Item Count Actions', () => {
    describe('updateItemCountAction', () => {
        const action = actions.updateItemCountAction();

        it('returns correct action type', () => {
            expect(action.type).to.equal(OrderActionTypes.UPDATE_ITEM_COUNT);
        });
    });

    describe('resetItemCountAction', () => {
        const action = actions.resetItemCountAction();

        it('returns correct action type', () => {
            expect(action.type).to.equal(OrderActionTypes.RESET_ITEM_COUNT);
        });
    });
});
