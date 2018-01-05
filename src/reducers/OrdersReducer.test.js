import { expect } from 'chai';
import OrdersReducer from './OrdersReducer';
import * as types from '../actionTypes/OrderActionTypes';

describe('OrdersReducer Reducer', () => {
    it('initialstate', () => {
        expect(
            OrdersReducer(undefined, []),
        ).deep.equals([]);
    });

    it('GET_STORES_GET_SUCCESS, stores object is present', () => {
        expect(
            OrdersReducer([], {
                type: types.GET_STORES_GET_SUCCESS,
                stores: {
                    patchPayload: true,
                    stores: [{
                        orderId: 1,
                    }],
                },
            }),
        ).deep.equals([{ orderId: 1 }]);
    });

    it('GET_STORES_GET_SUCCESS, stores object is missing', () => {
        expect(
            OrdersReducer([], {
                type: types.GET_STORES_GET_SUCCESS,
            }),
        ).to.deep.equal({ status: ' We couldn\'t find a store there. Make sure you entered the correct ZIP or City and State.' });
    });

    it('GET_STORES_GET_SUCCESS, patchPayload flag is missing', () => {
        expect(
            OrdersReducer([], {
                type: types.GET_STORES_GET_SUCCESS,
                stores: {
                    stores: [{
                        orderId: 1,
                    }],
                },
            }),
        ).to.deep.equal([{ orderId: 1 }]);
    });

    it('GET_STORES_GET_SUCCESS, patchPayload flag is false', () => {
        expect(
            OrdersReducer([], {
                type: types.GET_STORES_GET_SUCCESS,
                stores: {
                    patchPayload: false,
                    stores: [{
                        orderId: 1,
                    }],
                },
            }),
        ).to.deep.equal([{ orderId: 1 }]);
    });

    it('CLEAR_STORE', () => {
        expect(
            OrdersReducer([], {
                type: types.CLEAR_STORE,
            }),
        ).to.deep.equal([]);
    });
});
