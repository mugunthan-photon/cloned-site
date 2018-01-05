import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as HamburgerActionTypes from '../actionTypes/HamburgerActionTypes';
import * as actions from './HamburgerAction';

describe('Hamburger Actions', () => {
    it('returns correct action type', () => {
        const action = actions.getCategories();
        expect(action.type).to.equal(HamburgerActionTypes.SLIDER_CATEGORY_LOAD_REQUEST);
    });
    it('returns correct action type', () => {
        const action = actions.getHoverPanel();
        expect(action.type).to.equal(HamburgerActionTypes.SLIDER_HOVER_LOAD_REQUEST);
    });
});
