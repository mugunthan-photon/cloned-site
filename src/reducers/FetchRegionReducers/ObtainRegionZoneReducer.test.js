import { expect } from 'chai';
import ObtainZoneRegionReducer from './ObtainRegionZoneReducer';
import * as OrderActionTypes from '../../actionTypes/OrderActionTypes';

describe('ObtainZoneRegionReducer', () => {
    it('should return the initial state', () => {
        const reducer = ObtainZoneRegionReducer(undefined, {});
        expect(reducer).to.deep.equal({});
    });

    it('should add stores to the state 1', () => {
        const reducer = ObtainZoneRegionReducer({}, {
            type: OrderActionTypes.GET_STORES_GET_SUCCESS,
            stores: { stores: [{ priceRegion: 1 }] },
        });
        expect(reducer).to.deep.equal({
            regionZonefromLocation: 1,
        });
    });

    it('should add stores to the state -1 if priceregion is udnefined', () => {
        const reducer = ObtainZoneRegionReducer({}, {
            type: OrderActionTypes.GET_STORES_GET_SUCCESS,
            stores: { stores: [{ priceRegion: undefined }] },
        });
        expect(reducer).to.deep.equal({
            regionZonefromLocation: -1,
        });
    });

    it('should add stores to the state 2', () => {
        const reducer = ObtainZoneRegionReducer({}, {
            type: OrderActionTypes.GET_STORES_GET_SUCCESS,
            stores: { stores: [] },
        });
        expect(reducer).to.deep.equal({
            regionZonefromLocation: -1,
        });
    });

    it('should set nextPageLink to undefined if no more page are there', () => {
        const reducer = ObtainZoneRegionReducer({ stores: [] }, {
            type: OrderActionTypes.GET_STORES_GET_ERROR,
            payload: {},
        });
        expect(reducer).to.deep.equal({
            regionZonefromLocation: -1,
        });
    });
});
