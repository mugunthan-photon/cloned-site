import { expect } from 'chai';
import DesktopDepartmentVisualNavReducer from './DesktopDepartmentVisualNavReducer';
import * as types from '../actionTypes/DepartmentVisualNavigationActionTypes';

describe('DepartmentVisualNav Reducer', () => {
    const dept = [{
        key: 'departments',
        categories: [
            {
                id: '100240023',
                name: 'rugs',
                targetUrl: '/g/rugs/N-bwo3vD1nohp3',
                targetWindow: 'SW',
                pageType: 'XGN',
            }, {
                id: '100240019',
                name: 'furniture',
                targetUrl: '/g/furniture-store/N-bwo3vD1nohoz?pageType=X2H2',
                targetWindow: 'SW',
                pageType: 'X2H2',
            }, {
                id: '100240132',
                name: 'mattresses',
                targetUrl: '/g/mattresses/N-bwo3vD1nohs4',
                targetWindow: 'SW',
                pageType: 'XGN',
            }, {
                id: '100240016',
                name: 'kitchen & dining',
                targetUrl: '/g/kitchen-dining/N-bwo3vD1nohow?pageType=X2H2',
                targetWindow: 'SW',
                pageType: 'X2H2',
            }, {
                id: '2842930842',
                name: 'window treatments',
                targetUrl: '/g/window/N-1b0lvh6?pageType=X2H2',
                targetWindow: 'SW',
                pageType: 'X2H2',
            }, {
                id: '100240022',
                name: 'home decor',
                targetUrl: '/g/home-decor/N-bwo3vD1nohp2?pageType=X2H2',
                targetWindow: 'SW',
                pageType: 'X2H2',
            }, {
                id: '20000012',
                name: 'bed & bath',
                targetUrl: '/g/bed-and-bath/N-bwo3w?pageType=X2H2',
                targetWindow: 'SW',
                pageType: 'X2H2',
            }, {
                id: '2846220841',
                name: 'appliances',
                targetUrl: '/g/appliances/N-1b2ke21?pageType=X2H2',
                targetWindow: 'SW',
                pageType: 'X2H2',
            },
        ],
    }];
    it('initialstate', () => {
        expect(
            DesktopDepartmentVisualNavReducer(undefined, []),
        ).deep.equals([]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS', () => {
        expect(
            DesktopDepartmentVisualNavReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS,
                departments: [{
                    name: 'for the home',
                    dimensionId: '20000011',
                    targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                    targetWindow: 'SW',
                    imageSrc: 'DP0214201717015531M.tif',
                    pageType: 'X2H2',
                    hoverPanelUrl: '/v1/j/hoverpanel/N-bwo3v',
                    departments: dept,
                }],
            }),
        ).to.deep.equal([{
            title: 'for the home',
            isInternalUrl: true,
            image: '/mobile/images/DP0214201717015531M.tif',
            links: '/g/home-store/N-bwo3v?pageType=X2H2',
            hoverPanelUrl: '/v1/j/hoverpanel/N-bwo3v',
            departments: dept,
        }]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS DESKTOP', () => {
        expect(
            DesktopDepartmentVisualNavReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS,
                departments: [{
                    name: 'for the home',
                    dimensionId: '20000011',
                    targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                    targetWindow: 'SW',
                    imageSrc: 'DP0214201717015531M.tif',
                    hoverPanelUrl: '/v1/j/hoverpanel/N-bwo3v',
                    pageType: 'X2H2',
                    departments: dept,
                }],
                deviceType: {
                    isDesktop: true,
                    isMobile: false,
                    isTablet: false,
                },
            }),
        ).to.deep.equal([{
            title: 'for the home',
            isInternalUrl: true,
            image: '/tablet/images/DP0214201717015531M.tif',
            links: '/g/home-store/N-bwo3v?pageType=X2H2',
            hoverPanelUrl: '/v1/j/hoverpanel/N-bwo3v',
            departments: dept,
        }]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS DESKTOP', () => {
        expect(
            DesktopDepartmentVisualNavReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS,
                departments: [{
                    name: 'for the home',
                    dimensionId: '20000011',
                    targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                    targetWindow: 'SW',
                    imageSrc: 'DP0214201717015531M.tif',
                    hoverPanelUrl: '/v1/j/hoverpanel/N-bwo3v',
                    pageType: 'X2H2',
                    departments: dept,
                }],
                deviceType: {
                    isDesktop: false,
                    isMobile: false,
                    isTablet: true,
                },
            }),
        ).to.deep.equal([{
            title: 'for the home',
            isInternalUrl: true,
            image: '/tablet/images/DP0214201717015531M.tif',
            links: '/g/home-store/N-bwo3v?pageType=X2H2',
            hoverPanelUrl: '/v1/j/hoverpanel/N-bwo3v',
            departments: dept,
        }]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS NO IMAGE', () => {
        expect(
            DesktopDepartmentVisualNavReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS,
                departments: [{
                    name: 'for the home',
                    dimensionId: '20000011',
                    targetUrl: '/g/home-store/N-bwo3v?pageType=X2H2',
                    targetWindow: 'SW',
                    pageType: 'X2H2',
                    departments: dept,
                }],
                deviceType: {
                    isDesktop: false,
                    isMobile: false,
                    isTablet: true,
                },
            }),
        ).to.deep.equal([]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS NO PAYLOAD', () => {
        expect(
            DesktopDepartmentVisualNavReducer([], {
                type: types.DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS,
            }),
        ).to.deep.equal([]);
    });

    it('DEPARTMENT_VISUAL_NAVIGATION_DESKTOP_GET_SUCCESS NO ACTION', () => {
        expect(
            DesktopDepartmentVisualNavReducer([], {
                type: 'DUMMY',
            }),
        ).to.deep.equal([]);
    });
});
