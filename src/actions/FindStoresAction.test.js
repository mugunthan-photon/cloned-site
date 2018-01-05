import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import * as FindStoresActionTypes from '../actionTypes/FindStoresActionTypes';
import * as actions from './FindStoresAction';

describe('FindStores Actions', () => {
    let action;

    describe('findStores', () => {
        beforeEach(() => {
            action = actions.findStores({ test: 123 });
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FindStoresActionTypes.FIND_STORES_REQUEST);
        });

        it('returns a payload', () => {
            expect(action.payload).to.deep.equal({ test: 123 });
        });
    });


    describe('findAllStores', () => {
        beforeEach(() => {
            action = actions.findAllStores({ test: 123 });
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FindStoresActionTypes.FIND_STORES_REQUEST_ACCOUNT);
        });

        it('returns a payload', () => {
            expect(action.payload).to.deep.equal({ test: 123 });
        });
    });

    describe('findMoreStores', () => {
        beforeEach(() => {
            action = actions.findMoreStores({ test: 123 });
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FindStoresActionTypes.FIND_MORE_STORES_REQUEST);
        });

        it('returns a payload', () => {
            expect(action.payload).to.deep.equal({ test: 123 });
        });
    });

    describe('selectStore', () => {
        const params = {
            payload: { test: 123 },
            selectActionCallback: null,
        };
        beforeEach(() => {
            action = actions.selectStore(params);
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FindStoresActionTypes.PUT_SELECTED_STORE_REQUEST);
        });

        it('returns a payload', () => {
            expect(action.params).to.deep.equal(params);
        });
    });

    describe('setAvailableFilter', () => {
        beforeEach(() => {
            action = actions.setAvailableFilter(true);
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FindStoresActionTypes.SET_AVAILABLE_FILTER);
        });

        it('returns a payload', () => {
            expect(action.payload).to.equal(true);
        });
    });

    describe('openSlidePanel', () => {
        beforeEach(() => {
            action = actions.openSlidePanel();
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FindStoresActionTypes.OPEN_FIND_STORES_SLIDE_PANEL);
        });

        it('returns no payload', () => {
            expect(action.payload).to.equal(undefined);
        });
    });

    describe('closeSlidePanel', () => {
        beforeEach(() => {
            action = actions.closeSlidePanel();
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(FindStoresActionTypes.CLOSE_FIND_STORES_SLIDE_PANEL);
        });

        it('returns a payload', () => {
            expect(action.payload).to.equal(undefined);
        });
    });
});
