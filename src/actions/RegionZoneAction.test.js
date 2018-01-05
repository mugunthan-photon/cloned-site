import { expect } from 'chai';
import * as RegionActionTypes from '../actionTypes/RegionActionTypes';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';
import * as actions from './RegionZoneActions';

describe('ZoneInfoActions', () => {
    let LoaderAction;

    it('getRegionZone', () => {
        LoaderAction = actions.getRegion();
        expect(LoaderAction.type).to.equal(OrderActionTypes.GET_STORES_GET_REQUEST);
    });

    it('setRegionZone', () => {
        LoaderAction = actions.setRegion();
        expect(LoaderAction.type).to.equal(RegionActionTypes.JS_SET_REGION);
    });
});
