import { expect } from 'chai';
import SavedItemsReducer from './SavedItemsReducer';
// import * as types from '../actionTypes/SavedItemActionTypes';

describe('SavedItemsReducer', () => {
    it('should return the initial default state', () => {
        const reducer = SavedItemsReducer(undefined, []);
        expect(reducer).to.deep.equals({});
    });

    // it('should return SAVEDITEMS_GET_SUCCESS', () => {
    //     const reducer = SavedItemsReducer({}, {
    //         type: types.SAVEDITEMS_GET_SUCCESS,
    //         savedItemsList: { response: { data: 'saveditem' } },
    //     });
    //     expect(reducer).to.deep.equal({ savedItemsList: 'saveditem' });
    // });

    // it('should return ADD_SAVEDITEMS_SUCCESS', () => {
    //     const reducer = SavedItemsReducer({}, {
    //         type: types.ADD_SAVEDITEMS_SUCCESS,
    //         savedItem: { response: { data: 'account' } },
    //     });
    //     expect(reducer).to.deep.equal({ savedItem: 'account' });
    // });

    // it('should return DELETE_SAVEDITEMS_SUCCESS', () => {
    //     const reducer = SavedItemsReducer({}, {
    //         type: types.DELETE_SAVEDITEMS_SUCCESS,
    //         removedItem: { response: { data: 'account' } },
    //     });
    //     expect(reducer).to.deep.equal({ removedItem: 'account' });
    // });
});
