import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import {
    FIND_STORES_PAGE,
    FIND_MORE_STORES_PAGE,
    GET_AND_PRESELECT_STORES,
    FIND_STORES_PAGE_RESET,
} from '../actionTypes/FindAStorePageActionTypes';
import * as actions from './FindAStorePageAction';

describe('FindStores Actions', () => {
    let action;

    describe('findStoresPage', () => {
        beforeEach(() => {
            action = actions.findStoresPage({ test: 123 });
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FIND_STORES_PAGE);
        });

        it('returns a payload', () => {
            expect(action.payload).to.deep.equal({ test: 123 });
        });
    });

    describe('findMoreStoresPage', () => {
        beforeEach(() => {
            action = actions.findMoreStoresPage({ test: 123 });
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FIND_MORE_STORES_PAGE);
        });

        it('returns a payload', () => {
            expect(action.payload).to.deep.equal({ test: 123 });
        });
    });

    describe('getAndPreSelectStores', () => {
        beforeEach(() => {
            action = actions.getAndPreSelectStores({ test: 123 });
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(GET_AND_PRESELECT_STORES);
        });

        it('returns a payload', () => {
            expect(action.payload).to.deep.equal({ test: 123 });
        });
    });

    describe('findStoresPageReset', () => {
        beforeEach(() => {
            action = actions.findStoresPageReset();
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FIND_STORES_PAGE_RESET);
        });
    });
});
