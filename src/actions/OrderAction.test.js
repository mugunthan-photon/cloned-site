import { expect } from 'chai';
import * as VendorActionTypes from '../actionTypes/VendorActionTypes';
import * as actions from './OrderAction';

describe('Order Actions', () => {
    let orderAction;
    // describe block for getActiveMenuOnClickAction
    describe('getLatLongAction', () => {
        beforeEach(() => {
            orderAction = actions.getLatLong();
        });
        it('returns correct action type', () => {
            expect(orderAction.type).to.equal(VendorActionTypes.GET_LAT_LONG_GET_REQUEST);
        });
    });
});
