import { expect } from 'chai';
import FetchRegionReducer from './FetchRegionReducer';
import * as RegionActionTypes from '../../actionTypes/RegionActionTypes';

describe('FetchRegionReducer', () => {
    it('should return the initial state', () => {
        const reducer = FetchRegionReducer(undefined, {});
        expect(reducer).to.deep.equal({});
    });

    it('should return the store details', () => {
        const reducer = FetchRegionReducer({}, {
            type: RegionActionTypes.JS_UPDATE_PRICING_STATUS,
            payload: {},
        });
        expect(reducer).to.deep.equal({
            isEnabled: {},
        });
    });
    it('should return the store details for ship to store', () => {
        const reducer = FetchRegionReducer({}, {
            type: RegionActionTypes.JS_SET_REGION,
            payload: {},
        });
        expect(reducer).to.deep.equal({
            regionZone: {},
        });
    });

    it('should return the store details for ship to store and set to -1 if sent undefined', () => {
        const reducer = FetchRegionReducer({}, {
            type: RegionActionTypes.JS_SET_REGION,
            payload: undefined,
        });
        expect(reducer).to.deep.equal({
            regionZone: -1,
        });
    });
});
