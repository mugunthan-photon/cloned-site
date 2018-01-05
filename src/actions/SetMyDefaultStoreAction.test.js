import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import {
    SET_MY_DEFAULT_STORE,
} from '../actionTypes/SetMyDefaultStoreActionTypes';

import * as actions from './SetMyDefaultStoreAction';

describe('FindStores Actions', () => {
    let action;

    describe('findStoresPage', () => {
        beforeEach(() => {
            action = actions.setMyDefaultStore();
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(SET_MY_DEFAULT_STORE);
        });
    });
});

