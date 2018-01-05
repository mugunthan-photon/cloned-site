import { expect } from 'chai';
import MarketingZonesReducer from './MarketingZonesReducer';
import * as MarketingZonesActionTypes from '../actionTypes/MarketingZonesActionTypes';

describe('MarketingZonesReducer', () => {
    it('initialstate', () => {
        expect(
            MarketingZonesReducer(undefined, []),
        ).to.deep.equal({});
    });

    it('ZONE_DATA_GET_ALL_SUCCESS', () => {
        expect(
            MarketingZonesReducer([], {
                type: MarketingZonesActionTypes.ZONE_DATA_GET_ALL_SUCCESS,
                completeZoneData: {
                    zoneName: { x: 'Zone-B' },
                },
            }),
        ).to.deep.equal({ zoneName: { x: 'Zone-B' } });
    });

    it('ZONE_DATA_GET_ALL_SUCCESS, completeZoneData undefined', () => {
        expect(
            MarketingZonesReducer([], {
                type: MarketingZonesActionTypes.ZONE_DATA_GET_ALL_SUCCESS,
            }),
        ).to.deep.equal({});
    });

    it('ZONE_DATA_GET_ALL_SUCCESS, tempkeystore undefined', () => {
        expect(
            MarketingZonesReducer([], {
                type: MarketingZonesActionTypes.ZONE_DATA_GET_ALL_SUCCESS,
                completeZoneData: {},
            }),
        ).to.deep.equal({});
    });

    it('ZONE_DATA_GET_ALL_SUCCESS, with zone name', () => {
        expect(
            MarketingZonesReducer([], {
                type: MarketingZonesActionTypes.ZONE_DATA_GET_ALL_SUCCESS,
                completeZoneData: {
                    zoneName: { zone: 'Zone-B' },
                },
            }),
        ).to.deep.equal({ zoneName: { zone: 'Zone-B' } });
    });

    it('ZONE_DATA_GET_ALL_SUCCESS, compare with state', () => {
        expect(
            MarketingZonesReducer({
                ZoneB: {},
            }, {
                type: MarketingZonesActionTypes.ZONE_DATA_GET_ALL_SUCCESS,
                completeZoneData: {
                    ZoneB: {},
                },
            }),
        ).to.deep.equal({ ZoneB: {} });
    });
});
