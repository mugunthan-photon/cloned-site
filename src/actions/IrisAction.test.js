import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as IrisActionTypes from '../actionTypes/IrisActionTypes';
import * as actions from './IrisAction';

describe('Iris Actions', () => {
    it('returns correct action type', () => {
        const action = actions.getIrisTemplateData();
        expect(action.type).to.equal(IrisActionTypes.IRIS_TEMPLATE_LOAD_REQUEST);
    });
});
