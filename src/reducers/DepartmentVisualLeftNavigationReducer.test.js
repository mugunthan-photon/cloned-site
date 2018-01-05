import { expect } from 'chai';
import DepartmentVisualLeftNavigationReducer from './DepartmentVisualLeftNavigationReducer';
import * as types from '../actionTypes/DepartmentVisualNavigationActionTypes';

describe('DepartmentVisualLeftNav Reducer', () => {
    it('initialstate', () => {
        expect(
            DepartmentVisualLeftNavigationReducer(undefined, []),
        ).deep.equals([]);
    });

    it('DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_SUCCESS FOR DEPT Page', () => {
        expect(
            DepartmentVisualLeftNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_SUCCESS,
                departments: {
                    data: {
                        x2LeftNavDimensionMap: {
                            SHOP_BEDDING: [{
                                name: 'for the home',
                                dimensionId: '20000011',
                                targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                                targetWindow: 'SW',
                                imageId: 'DP0214201717015531M.tif',
                                pageType: 'X2H2',
                            }],
                        },
                    },
                },
                deviceType: { isTablet: true },
            },
            ),
        ).to.deep.equal({
            SHOP_BEDDING: [{
                name: 'for the home',
                dimensionId: '20000011',
                targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                targetWindow: 'SW',
                imageId: 'DP0214201717015531M.tif',
                pageType: 'X2H2',
            }],
        });
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_CLEAR FOR DEPT Page', () => {
        expect(
            DepartmentVisualLeftNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_LEFT_NAVIGATION_CLEAR,
            },
            { isTablet: true }),
        ).to.deep.equal([]);
    });

    it('DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_SUCCESS FOR DEPT Page', () => {
        expect(
            DepartmentVisualLeftNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_SUCCESS,
                departments: {
                    data: {},
                },
                deviceType: { isTablet: true },
            }),
        ).to.deep.equal([]);
    });

    it('DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_SUCCESS FOR DEPT Page', () => {
        expect(
            DepartmentVisualLeftNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_LEFT_NAVIGATION_GET_SUCCESS,
                departments: {
                    data: {
                        x2LeftNavDimensionMap: {
                            SHOP_BEDDING: [],
                        },
                    },
                },
                deviceType: { isTablet: true },
            },
            ),
        ).to.deep.equal({
            SHOP_BEDDING: [],
        });
    });
});
