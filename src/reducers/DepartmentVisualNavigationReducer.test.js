import { expect } from 'chai';
import DepartmentVisualNavigationReducer, { filterData } from './DepartmentVisualNavigationReducer';
import * as types from '../actionTypes/DepartmentVisualNavigationActionTypes';

describe('DepartmentVisualNav Reducer', () => {
    it('initialstate', () => {
        expect(
            DepartmentVisualNavigationReducer(undefined, []),
        ).deep.equals([]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS', () => {
        expect(
            DepartmentVisualNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS,
                departments: {
                    data: {
                        topNavigationMap: [
                            [
                                {
                                    name: 'for the home',
                                    dimensionId: '20000011',
                                    seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                                    targetWindow: 'SW',
                                    imageId: 'DP0214201717015531M.tif',
                                    pageType: 'X2H2',
                                },
                            ],
                        ],
                    },
                },

            }),
        ).to.deep.equal([{
            title: 'for the home',
            isInternalUrl: true,
            image: '/mobile/images/DP0214201717015531M.tif',
            links: '/g/home-store/N-bwo3v?pageType=X2H2',
        }]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS', () => {
        expect(
            DepartmentVisualNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS,
                departments: {
                    data: {
                        topNavigationMap: [
                            [
                                {
                                    name: 'for the home',
                                    dimensionId: '20000011',
                                    seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                                    targetWindow: 'SW',
                                    imageId: 'DP0214201717015531M.tif',
                                    pageType: 'XGN',
                                },
                            ],
                        ],
                    },
                },

            }),
        ).to.deep.equal([{
            title: 'for the home',
            isInternalUrl: false,
            image: '/mobile/images/DP0214201717015531M.tif',
            links: '/g/home-store/N-bwo3v?pageType=X2H2',
        }]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS FOR DEPT Page', () => {
        expect(
            DepartmentVisualNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS,
                departments: {
                    data: {
                        x2LeftNavDimensionMap: {
                            SHOP_BEDDING: [{
                                name: 'for the home',
                                dimensionId: '20000011',
                                seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
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
        ).to.deep.equal([{
            title: 'for the home',
            isInternalUrl: true,
            image: '/tablet/images/DP0214201717015531M.tif',
            links: '/g/home-store/N-bwo3v?pageType=X2H2',
        }]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS FOR DEPT Page desktop', () => {
        expect(
            DepartmentVisualNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS,
                departments: {
                    data: {
                        x2LeftNavDimensionMap: {
                            SHOP_BEDDING: [{
                                name: 'for the home',
                                dimensionId: '20000011',
                                seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                                targetWindow: 'SW',
                                imageId: 'DP0214201717015531M.tif',
                                pageType: 'X2H2',
                            }],
                        },
                    },
                },
                deviceType: { isDesktop: true },
            },
            ),
        ).to.deep.equal([{
            title: 'for the home',
            isInternalUrl: true,
            image: '/dotcom/images/DP0214201717015531M.tif',
            links: '/g/home-store/N-bwo3v?pageType=X2H2',
        }]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_CLEAR FOR DEPT Page', () => {
        expect(
            DepartmentVisualNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_CLEAR,
            },
            { isTablet: true }),
        ).to.deep.equal([]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS without image URL', () => {
        expect(
            DepartmentVisualNavigationReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_GET_SUCCESS,
                departments: {
                    data: {
                        x2LeftNavDimensionMap: {
                            SHOP_BEDDING: [{
                                name: 'for the home',
                                dimensionId: '20000011',
                                seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                                imageId: '',
                                targetWindow: 'SW',
                                pageType: 'X2H2',
                            }],
                        },
                    },
                },

            }),
        ).to.deep.equal([]);
    });


    it('filterData without imageurl', () => {
        const data = {
            name: 'for the home',
            dimensionId: '20000011',
            seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
            targetWindow: 'SW',
            imageId: '',
            pageType: 'X2H2',
        };

        expect(filterData(data)).to.be.null;
    });

    it('filterData with imageurl', () => {
        const data = {
            name: 'for the home',
            dimensionId: '20000011',
            seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
            targetWindow: 'SW',
            imageId: 'sample.jpg',
            pageType: 'X2H2',
        };

        expect(filterData(data)).to.be.not.null;
    });

    it('filterData with mobile imageurl', () => {
        const data = {
            name: 'for the home',
            dimensionId: '20000011',
            seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
            targetWindow: 'SW',
            imageId: 'sample.jpg',
            pageType: 'X2H2',
        };

        expect(filterData(data, { isMobile: true, isTablet: false }).image).to.contain('/mobile/');
    });

    it('filterData with mobile imageurl', () => {
        const data = {
            name: 'for the home',
            dimensionId: '20000011',
            seoUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
            targetWindow: 'SW',
            imageId: 'sample.jpg',
            pageType: 'X2H2',
        };

        expect(filterData(data, { isMobile: false, isTablet: true }).image).to.contain('/tablet/');
    });
});
