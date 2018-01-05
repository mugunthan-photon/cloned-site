import { expect } from 'chai';
import * as MarketingContentActionTypes from '../actionTypes/MarketingContentActionTypes';
import * as actions from './MarketingContentAction';

describe('MarketingContent Actions', () => {
    let marketingContentAction;
    // describe block for getMarketingContentAction
    describe('getMarketingContentAction', () => {
        beforeEach(() => {
            marketingContentAction = actions.getMarketingContentAction();
        });
        it('returns correct action type', () => {
            expect(marketingContentAction.type).to.equal(MarketingContentActionTypes.MARKETING_CONTENT_GET_REQUEST);
        });
        it('returns no payload', () => {
            expect(marketingContentAction.payload).to.be.an('undefined');
        });
    });
});
