import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import * as CouponsActionTypes from '../actionTypes/CouponActionTypes';
import * as actions from './CouponAction';

describe('Coupon Actions', () => {
    let action;

    // describe block for getMarketingContentAction
    describe('getMarketingContentAction', () => {
        beforeEach(() => {
            action = actions.getCouponsAction();
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(CouponsActionTypes.COUPONS_GET_REQUEST);
        });

        it('returns no payload', () => {
            expect(action.payload).to.be.an('undefined');
        });
    });

    describe('getCouponsLoaded', () => {
        beforeEach(() => {
            action = actions.getCouponsLoaded();
        });

        it('returns correct action type', () => {
            expect(action.type).to.equal(CouponsActionTypes.COUPONS_LOADED);
        });

        it('Payload to have coupon name', () => {
            expect(action.payload.pageName).to.eq('coupon');
        });
    });
});
