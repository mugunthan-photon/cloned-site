import { expect } from 'chai';
import * as types from '../actionTypes/SavedListToolTip';
import reducer from './SavedListToolTip';

describe('MTLToolTipReducer', () => {
    const action = {
        list: {},
    };
    let MTLToolTip;

    it('handles unknown type', () => {
        action.type = 'test';
        expect(reducer(undefined, action)).to.an('object');
    });

    it('GET_SITE_LIST_SUCCESS', () => {
        action.type = types.GET_SITE_LIST_SUCCESS;
        action.listItems = {};
        action.listItems.data = {};
        MTLToolTip = reducer({}, action);
        expect(MTLToolTip).to.be.an('object');
    });

    it('GET_SITE_LIST_SUCCESS_WITH_ID', () => {
        action.type = types.SITE_GETLIST_BASEDON_ID_SUCCESS;
        action.products = {};
        MTLToolTip = reducer({}, action);
        expect(MTLToolTip).to.be.an('object');
    });

    it('CREATENEW_SITE_LIST_SUCCESS', () => {
        action.type = types.CREATENEW_SITE_LIST_SUCCESS;
        action.list = {};
        MTLToolTip = reducer({}, action);
        expect(MTLToolTip).to.be.an('object');
    });

    it('MOVETO_SITE_NEWPRODUCT_LIST_SUCCESS', () => {
        action.type = types.MOVETO_SITE_NEWPRODUCT_LIST_SUCCESS;
        action.movedToListResponse = {};
        MTLToolTip = reducer({}, action);
        expect(MTLToolTip).to.be.an('object');
    });


    it('GET_SITE_LIST_ERROR', () => {
        action.type = types.GET_SITE_LIST_ERROR;
        MTLToolTip = reducer({}, action);
        expect(MTLToolTip).to.be.an('object');
    });

    it('GET_SITE_LIST', () => {
        action.type = types.GET_SITE_LIST;
        MTLToolTip = reducer({}, action);
        expect(MTLToolTip).to.be.an('object');
    });
    it('ADD_SITE_ITEM_TO_LIST_SUCCESS', () => {
        action.type = types.ADD_SITE_ITEM_TO_LIST_SUCCESS;
        MTLToolTip = reducer({}, action);
        expect(MTLToolTip).to.be.an('object');
    });
});
