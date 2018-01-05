import { expect } from 'chai';
import { before } from 'mocha';
import ItemCountReducer from './ItemCountReducer';
import * as types from '../actionTypes/OrderActionTypes';

describe('ItemCountReducer', () => {
    it('initialstate', () => {
        expect(
            ItemCountReducer(undefined, []),
        ).to.deep.equal(0);
    });

    before(() => {
        document.cookie = 'ItemCount=5';
    });
    it('UPDATE_ITEM_COUNT event is called with action payload', () => {
        expect(
            ItemCountReducer([], {
                type: types.UPDATE_ITEM_COUNT,
                payload: '1',
            }),
        ).to.equal('1');
    });

    it('UPDATE_ITEM_COUNT event called', () => {
        document.cookie = 'ItemCount=5';
        expect(
            ItemCountReducer([], {
                type: types.UPDATE_ITEM_COUNT,
            }),
        ).to.equal('5');
    });

    it('Other event called', () => {
        expect(
            ItemCountReducer(0, {
                type: 'TEST_EVENT',
            }),
        ).to.equal(0);
    });

    before(() => {
        document.cookie = 'ItemCount=';
    });

    it('No cookie is present', () => {
        document.cookie = 'ItemCount=';
        expect(
            ItemCountReducer(0, {
                type: types.UPDATE_ITEM_COUNT,
            }),
        ).to.equal(0);
    });

    it('No Item cookie is present but DP_ORDER_INFO', () => {
        document.cookie = 'DP_ORDER_INFO=2|$123|$';
        expect(
            ItemCountReducer([], {
                type: types.UPDATE_ITEM_COUNT,
            }),
        ).to.equal(2);
    });

    it('RESET_ITEM_COUNT event called', () => {
        document.cookie = 'ItemCount=1';
        expect(
            ItemCountReducer(0, {
                type: types.RESET_ITEM_COUNT,
            }),
        ).to.equal(0);
    });
});
