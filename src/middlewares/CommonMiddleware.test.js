import { after, before } from 'mocha';
import sinon from 'sinon';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import CommonMiddleware from './CommonMiddleware';
import * as AnalyticsActionTypes from '../actionTypes/AnalyticsActionTypes';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';
import * as MoveListActionTypes from '../actionTypes/SavedListToolTip';

describe('CommonMiddleware Test Cases', () => {
    let storeObj;
    let nextfunc;
    let nextObj;
    let actionFunc;

    before(() => {
        storeObj = {};
        nextfunc = CommonMiddleware(storeObj);
        nextObj = (results) => {
            console.log(results);
        };
        actionFunc = nextfunc(nextObj);
        global.__SERVER__ = false; // eslint-disable-line
    });

    it('Check FORM_ERROR case ', () => {
        const action = { type: AnalyticsActionTypes.FORM_ERROR, errorDetails: [{ errorDescription: 'Enter phone number' }] };
        actionFunc(action);
    });
    it('Check ANALYTICS_OPEN_MODAL case ', () => {
        const action = { type: AnalyticsActionTypes.ANALYTICS_OPEN_MODAL, name: 'store - modal' };
        actionFunc(action);
    });
    it('Check NAVIGATION_CLICK with reload case ', () => {
        const action = { type: AnalyticsActionTypes.NAVIGATION_CLICK, navClick: { linkName: 'coupons', isReload: false } };
        actionFunc(action);
    });
    it('Check NAVIGATION_CLICK without reload case ', () => {
        const action = { type: AnalyticsActionTypes.NAVIGATION_CLICK, navClick: { linkName: 'coupons', isReload: true } };
        actionFunc(action);
    });
    it('Check ANALYTICS_CHANGE_STORE case ', () => {
        const action = { type: AnalyticsActionTypes.ANALYTICS_CHANGE_STORE };
        actionFunc(action);
    });
    it('Check ANALYTICS_SELECT_STORE case ', () => {
        const action = { type: AnalyticsActionTypes.ANALYTICS_SELECT_STORE };
        actionFunc(action);
    });
    it('Check GET_STORE_BY_STORE_ID_SUCCESS case ', () => {
        const action = { type: OrderActionTypes.GET_STORE_BY_STORE_ID_SUCCESS };
        actionFunc(action);
    });
    it('Check GET_STORES_GET_REQUEST case ', () => {
        const action = { type: OrderActionTypes.GET_STORES_GET_REQUEST, payload: { address: 'dallas' } };
        actionFunc(action);
    });
    it('Check ANALYTICS_STORE_SEARCH case ', () => {
        const action = { type: AnalyticsActionTypes.ANALYTICS_STORE_SEARCH, payload: { address: '75024' } };
        actionFunc(action);
    });
    it('Check GET_STORES_GET_REQUEST without payload ', () => {
        const action = { type: OrderActionTypes.GET_STORES_GET_REQUEST, payload: {} };
        actionFunc(action);
    });
    it('Check with exception ', () => {
        const action = { type: AnalyticsActionTypes.FORM_ERROR };
        console.log(actionFunc(action));
    });
    it('Move items to list ', () => {
        const action = { type: MoveListActionTypes.MOVE_SITE_ITEMS_EVENT_ANALYTICS };
        console.log(actionFunc(action));
    });
    it('CREATE_SITE_LIST_CLICK_EVENT case ', () => {
        const action = { type: MoveListActionTypes.CREATE_SITE_LIST_CLICK_EVENT };
        console.log(actionFunc(action));
    });
    it('Add to list analytics ', () => {
        const action = { type: MoveListActionTypes.ADD_SITE_TO_LIST_EVENT, analyticsData: {} };
        console.log(actionFunc(action));
    });
    it('Add to list error analytics ', () => {
        const action = { type: MoveListActionTypes.ADD_SITE_TO_LIST_ERROR_EVENT, errorData: {} };
        console.log(actionFunc(action));
    });
    it('Create list error analytics ', () => {
        const action = { type: MoveListActionTypes.SITE_MOVETOLIST_ERROR_EVENT, errorData: {} };
        actionFunc(action);
    });
    it('Check ANALYTICS_VIDEO_LOADED case ', () => {
        const test = sinon.stub(Cookies, 'load', () => ('coupons'));
        const action = { type: AnalyticsActionTypes.ANALYTICS_VIDEO_LOADED, payload: { eventName: 'dallas', video: '', product: '' } };
        actionFunc(action);
        test.restore();
    });
    it('Check __SERVER__ as false ', () => {
        global.__SERVER__ = true; // eslint-disable-line
        const action = { type: AnalyticsActionTypes.FORM_ERROR };
        console.log(actionFunc(action));
    });
    after(() => {
        storeObj = undefined;
        nextfunc = undefined;
        nextObj = undefined;
        actionFunc = undefined;
    });
});
