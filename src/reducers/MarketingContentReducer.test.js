import { expect } from 'chai';
import MarketingContentReducer from './MarketingContentReducer';
import * as types from '../actionTypes/MarketingContentActionTypes';

describe('MarketingContentReducer', () => {
    it('initialstate', () => {
        expect(
            MarketingContentReducer(undefined, []),
        ).to.deep.equal([]);
    });

    it('MARKETING_CONTENT_GET_SUCCESS', () => {
        expect(
            MarketingContentReducer([], {
                type: types.MARKETING_CONTENT_GET_SUCCESS,
                homePageContent: {
                    homePageContents: [{
                        gridContents: {
                            title: 'home',
                        },
                    }],
                },
            }),
        ).to.deep.equal({ title: 'home' });
    });
});
