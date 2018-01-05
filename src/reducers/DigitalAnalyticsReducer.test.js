import { expect } from 'chai';
import DigitalAnalyticsReducer from './DigitalAnalyticsReducer';
import * as AnaltyicsActionTypes from '../actionTypes/AnalyticsActionTypes';

const payload = 'COUPON_APPLIED_SUCCESS';

describe('DigitalAnalyticsReducer', () => {
    it('should return the initial state', () => {
        const reducer = DigitalAnalyticsReducer(undefined, {});
        expect(reducer).to.deep.equal([]);
    });
    it('should return DigitalAnalyticsReducer: UPDATE_ANALYTICS_CLICK_EVENT', () => {
        const reducer = DigitalAnalyticsReducer([], {
            type: AnaltyicsActionTypes.UPDATE_ANALYTICS_CLICK_EVENT,
            payload,
        });
        expect(reducer).to.deep.equal(payload);
    });
    it('should return DigitalAnalyticsReducer: UPDATE_ANALYTICS_CLICK_EVENT', () => {
        const reducer = DigitalAnalyticsReducer([], {
            type: AnaltyicsActionTypes.UPDATE_ANALYTICS_CLICK_EVENT,
            payload: null,
        });
        expect(reducer).to.deep.equal([]);
    });
});
