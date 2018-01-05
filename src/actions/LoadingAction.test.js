import { expect } from 'chai';
import * as LoadingActionTypes from '../actionTypes/LoadingActionTypes';
import * as actions from './LoadingAction';

describe('Loading Actions', () => {
    let action;
    describe('Loading actions show loader', () => {
        it('show loader', () => {
            action = actions.showLoader();
            expect(action.type).to.equal(LoadingActionTypes.SHOW_LOADER);
        });
        it('hide loader', () => {
            action = actions.removeLoader();
            expect(action.type).to.equal(LoadingActionTypes.REMOVE_LOADER);
        });
    });
});
