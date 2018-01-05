import { expect } from 'chai';
import * as OverlayActionTypes from '../actionTypes/OverlayActionTypes';
import * as actions from './OverlayAction';

describe('Overlay Actions', () => {
    let action;
    describe('Overlay actions show overlay', () => {
        it('show overlay', () => {
            action = actions.showOverlay();
            expect(action.type).to.equal(OverlayActionTypes.OVERLAY_SHOW);
        });
        it('hide loader', () => {
            action = actions.removeOverlay();
            expect(action.type).to.equal(OverlayActionTypes.OVERLAY_REMOVE);
        });
    });
});
