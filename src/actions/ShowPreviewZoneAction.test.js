import { expect } from 'chai';
import * as ShowPreviewZoneActionTypes from '../actionTypes/ShowPreviewZoneActionTypes';
import * as actions from './ShowPreviewZoneAction';

describe('Show Preview Zone Actions', () => {
    let action;
    describe('Show Preview Zone actions', () => {
        it('show preview zone', () => {
            action = actions.showPreviewZone();
            expect(action.type).to.equal(ShowPreviewZoneActionTypes.SHOW_PREVIEW_ZONE);
        });
        it('hide preview zone', () => {
            action = actions.hidePreviewZone();
            expect(action.type).to.equal(ShowPreviewZoneActionTypes.HIDE_PREVIEW_ZONE);
        });
    });
});
