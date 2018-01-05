import * as RegionActionTypes from '../actionTypes/RegionActionTypes';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';

const getRegion = payload => ({
    type: OrderActionTypes.GET_STORES_GET_REQUEST,
    payload,
});

const setRegion = payload => ({
    type: RegionActionTypes.JS_SET_REGION,
    payload,
});

export default {
    getRegion,
    setRegion,
};
