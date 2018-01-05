import { expect } from 'chai';
import OptInReducer from './OptInReducer';
import * as types from '../actionTypes/OrderActionTypes';

describe('OptInReducer', () => {
    it('initialstate', () => {
        expect(
            OptInReducer(undefined, []),
        ).to.deep.equal([]);
    });

    it('OPT_IN_POST_SUCCESS', () => {
        expect(
            OptInReducer([], {
                type: types.OPT_IN_POST_SUCCESS,
                status: { status: 'subscribed' },
            }),
        ).to.deep.equal({ status: 'subscribed' });
    });
});
