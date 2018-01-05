import { expect } from 'chai';
import { SET_MY_STORE } from '../actionTypes/StoreActionTypes';
import * as actions from './StoreAction';

describe('Session Actions', () => {
    let setMyStore;
    describe('setMyStore', () => {
        beforeEach(() => {
            setMyStore = actions.setMyStore();
        });
        it('returns correct action type', () => {
            expect(setMyStore.type).to.equal(SET_MY_STORE);
        });
    });
});
