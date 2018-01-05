import { expect } from 'chai';
import * as PromotionalBannerActionTypes from '../actionTypes/PromotionalBannerActionTypes';
import * as actions from './PromotionalBannerAction';

describe('MarketingContent Actions', () => {
    let sitePromoAction;
    // describe block for getMarketingContentAction
    describe('getMarketingContentAction', () => {
        beforeEach(() => {
            sitePromoAction = actions.getOfferDetailsAction();
        });
        it('returns correct action type', () => {
            expect(sitePromoAction.type).to
            .equal(PromotionalBannerActionTypes.PROMOTIONALBANNERDATA_GET_REQUEST);
        });
        it('returns no payload', () => {
            expect(sitePromoAction.payload).to.be.an('undefined');
        });
    });
});
