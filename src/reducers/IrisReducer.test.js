import { expect } from 'chai';
import IrisReducer from './IrisReducer';
import * as types from '../actionTypes/IrisActionTypes';

describe('LatLongReducer', () => {
    it('initialstate', () => {
        expect(
            IrisReducer({}, []),
        ).to.deep.equal({});
    });

    it('initialstate default', () => {
        expect(
            IrisReducer(undefined, []),
        ).to.deep.equal({});
    });

    it('GET_LAT_LONG_GET_SUCCESS', () => {
        expect(
            IrisReducer([], {
                type: types.IRIS_TEMPLATE_LOAD_SUCCESS,
                irisData: { content: {} },
            }),
        ).to.deep.equal({ content: {} });
    });
});
