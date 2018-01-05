import { expect } from 'chai';
import HamburgerReducer from './HambergurReducer';
import * as types from '../actionTypes/HamburgerActionTypes';

describe('HamburgerReducer', () => {
    it('initialstate', () => {
        expect(
            HamburgerReducer({ name: 'for the home' }, []),
        ).to.deep.equal({ name: 'for the home' });
    });

    it('initialstate empty', () => {
        expect(
            HamburgerReducer(undefined, []),
        ).to.deep.equal({});
    });

    it('SLIDER_CATEGORY_LOAD_SUCCESS', () => {
        const cat = {
            appliances: [{
                name: 'for the home',
                dimensionId: '20000011',
                targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                targetWindow: 'SW',
                id: 'N-bwo3xZ1z0ovtk',
                imageSrc: 'DP0214201717015531M.jpg',
            }],
        };
        const hamb = HamburgerReducer([], {
            categories: cat,
            type: types.SLIDER_CATEGORY_LOAD_SUCCESS,
        });
        expect(hamb).to.deep.equal(cat.appliances);
    });

    it('SLIDER_HOVER_LOAD_SUCCESS', () => {
        const cat = {
            hoverPanelMap: {
                HoverPanelColumn1: {
                    'MORE WAYS TO SHOP': [{
                        name: 'for the home',
                        dimensionId: '20000011',
                        targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                        targetWindow: 'SW',
                        id: 'N-bwo3xZ1z0ovtk',
                        imageSrc: 'DP0214201717015531M.jpg',
                    }],
                },
            },

        };

        const expected = { menu: { 'MORE WAYS TO SHOP': [{ name: 'for the home', dimensionId: '20000011', targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2', targetWindow: 'SW', id: 'N-bwo3xZ1z0ovtk', imageSrc: 'DP0214201717015531M.jpg' }] }, meta: {} };
        const hamb = HamburgerReducer([], {
            categories: cat,
            type: types.SLIDER_HOVER_LOAD_SUCCESS,
        });
        expect(JSON.stringify(hamb)).to.deep.equal(JSON.stringify(expected));
    });
});
