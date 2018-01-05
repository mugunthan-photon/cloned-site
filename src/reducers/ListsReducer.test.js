import { expect } from 'chai';
import * as types from '../actionTypes/ListsActionTypes';
import ListsReducer from './ListsReducer';
// import navMockData from '../components/NavigationMenu/__stories/mock';

describe('Lists Reducer', () => {
    const action = {};
    it('handles unknown type', () => {
        expect(ListsReducer([], action)).to.eql([]);
    });
    it('SAVED_ITEMS_SUCCESS', () => {
        action.type = types.SAVED_ITEMS_LOAD_SUCCESS;
        action.savedItems = ['pp2', 'pp3'];
        expect(ListsReducer([], action)).to.have.property('savedItems');
    });
});
