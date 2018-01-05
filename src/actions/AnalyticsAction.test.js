import { expect } from 'chai';
import * as AnalyticsActionTypes from '../actionTypes/AnalyticsActionTypes';
import * as actions from './AnalyticsAction';

describe('Analytics Actions', () => {
    let analyticsAction;
    const navObj = {
        id: 'N-bwo3v',
        name: 'for the home',
    };
    // describe block for triggerNavigationClick
    describe('triggerNavigationClick', () => {
        beforeEach(() => {
            analyticsAction = actions.triggerNavigationClick(navObj);
        });
        it('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.NAVIGATION_CLICK);
        });
        it('returns no payload', () => {
            expect(analyticsAction.navClick).to.equal(navObj);
        });
    });

    // describe block for triggerFormError
    describe('triggerFormError', () => {
        beforeEach(() => {
            analyticsAction = actions.triggerFormError([{ errorDescription: 'Enter email address' }]);
        });
        it('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.FORM_ERROR);
        });
        it('returns no payload', () => {
            expect(analyticsAction.errorDetails).to.be.an('array');
        });
    });

    // describe block for triggerFormError
    describe('selectStoreData', () => {
        beforeEach(() => {
            analyticsAction = actions.selectStoreData();
        });
        it('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.ANALYTICS_SELECT_STORE);
        });
    });

    // describe block for triggerFormError
    describe('openModelEvent', () => {
        beforeEach(() => {
            analyticsAction = actions.openModelEvent({ name: 'test-modal' });
        });
        it('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.ANALYTICS_OPEN_MODAL);
        });
    });
    // describe block for storeSearchData
    describe('storeSearchData', () => {
        const payload = {
            address: '',
        };
        beforeEach(() => {
            analyticsAction = actions.storeSearchData(payload);
        });
        it('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.ANALYTICS_STORE_SEARCH);
        });
        it('returns no payload', () => {
            expect(analyticsAction.payload).to.be.an('object');
        });
    });
    // describe block for triggerFormError
    describe('videoLoadedData', () => {
        const payload = {
            eventName: '',
            video: '',
            product: '',
        };
        beforeEach(() => {
            analyticsAction = actions.videoLoadedData(payload);
        });
        it('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.ANALYTICS_VIDEO_LOADED);
        });
        it('returns no payload', () => {
            expect(analyticsAction.payload).to.be.an('object');
        });
    });
    // describe block for triggerFormError
    describe('openModelEvent', () => {
        beforeEach(() => {
            analyticsAction = actions.openModelEvent([{ name: 'store - modal' }]);
        });
        it.skip('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.ANALYTICS_OPEN_MODAL);
        });
        it.skip('returns name', () => {
            expect(analyticsAction.name).to.be.an('string');
        });
    });

    // describe block for bopisChangeZip
    describe('bopisChangeZip', () => {
        const payload = {
            address: '',
        };
        beforeEach(() => {
            analyticsAction = actions.bopisChangeZip(payload);
        });
        it('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.BOPIS_CHANGE_ZIP);
        });
        it('returns no payload', () => {
            expect(analyticsAction.payload).to.be.an('object');
        });
    });

    // describe block for comparelinkclick
    describe('comparelinkclick', () => {
        const payload = {};
        beforeEach(() => {
            analyticsAction = actions.compareProductsClick(payload);
        });
        it('returns correct action type', () => {
            expect(analyticsAction.type).to.equal(AnalyticsActionTypes.COMPARE_PRODUCTS_CLICK);
        });
        it('returns no payload', () => {
            expect(analyticsAction.payload).to.be.an('object');
        });
    });


    it('updateAnalyticsClickAction returns correct action type', () => {
        const payload = 'REMOVE_ITEM';
        const action = actions.updateAnalyticsClickAction(payload);
        expect(action.type).to.equal(AnalyticsActionTypes.UPDATE_ANALYTICS_CLICK_EVENT);
    });
});
