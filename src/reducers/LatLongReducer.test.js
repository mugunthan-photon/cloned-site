import { expect } from 'chai';
import LatLongReducer from './LatLongReducer';
import * as types from '../actionTypes/OrderActionTypes';

describe('LatLongReducer', () => {
    it('initialstate', () => {
        expect(
            LatLongReducer({ lat: 60.558151, lng: 22.095773 }, []),
        ).to.deep.equal({ lat: 60.558151, lng: 22.095773 });
    });

    it('initialstate default', () => {
        expect(
            LatLongReducer(undefined, []),
        ).to.deep.equal({ lat: 60.558151, lng: 22.095773 });
    });

    it('GET_LAT_LONG_GET_SUCCESS', () => {
        expect(
            LatLongReducer([], {
                type: types.GET_LAT_LONG_GET_SUCCESS,
                latLong: { lat: 60.558151, lng: 22.095773 },
            }),
        ).to.deep.equal({ lat: 60.558151, lng: 22.095773 });
    });
});
