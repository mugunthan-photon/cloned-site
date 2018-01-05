import { expect } from 'chai';
import LoadingReducer from './LoadingReducer';
import * as types from '../actionTypes/LoadingActionTypes';

describe('Loading Reducer', () => {
    it('should return the initial default state', () => {
        const reducer = LoadingReducer(undefined, {});
        expect(reducer).to.equals(false);
    });
    it('True State', () => {
        const reducer = LoadingReducer(true, { type: types.SHOW_LOADER });
        expect(reducer).to.equals(true);
    });
    it('False State', () => {
        const reducer = LoadingReducer(false, { type: types.REMOVE_LOADER });
        expect(reducer).to.equals(false);
    });
});
