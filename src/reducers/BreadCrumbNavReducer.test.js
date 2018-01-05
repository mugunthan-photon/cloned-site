import { expect } from 'chai';
import BreadCrumbNavReducer from './BreadCrumbNavReducer';
import * as types from '../actionTypes/BreadCrumbNavActionTypes';


const mockData = {
    breadcrumbs: [
        {
            breadCrumbLabel: 'jcpenney',
            navigationState: '/',
            h1Title: null,
            url: null,
            id: '30000001',
        },
        {
            breadCrumbLabel: 'bed & bath',
            navigationState: '/g/bed-and-bath/N-bwo3w?pageType=X2H2',
            h1Title: null,
            url: null,
            id: '20000012',
        },
    ],
};

describe('BreadCrumbNav Reducer', () => {
    it('should return the initial default state', () => {
        const reducer = BreadCrumbNavReducer(undefined, {});
        expect(reducer).to.deep.equals([]);
    });
    it('default', () => {
        const reducer = BreadCrumbNavReducer(undefined, { type: 'NO_MATCH' });
        expect(reducer).to.deep.equals([]);
    });
    it('should return default state', () => {
        const reducer = BreadCrumbNavReducer([], {
            type: types.BREADCRUMBNAV_GET_SUCCESS,
            breadCrumbs: mockData,
        });
        expect(reducer).to.deep.equal(mockData);
    });
    it('Make sure action is derived', () => {
        expect(types.BREADCRUMBNAV_CLEAR).is.not.null;
    });
    it('should return the initial default state', () => {
        const reducer = BreadCrumbNavReducer(undefined, { type: types.BREADCRUMBNAV_CLEAR });
        expect(reducer).to.deep.equals([]);
    });
});
