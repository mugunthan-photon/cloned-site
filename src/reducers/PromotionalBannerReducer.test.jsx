import { expect } from 'chai';
import PromotionalBannerReducer from './PromotionalBannerReducer';
import * as types from '../actionTypes/PromotionalBannerActionTypes';

const mockData = {
    data: {
        requestDateTime: null,
        channelName: null,
        jvmName: null,
        requestUrl: null,
        maxAge: 2000,
        delay: 1,
        small: [
            {
                promoText: 'Free Shipping Banner Mobile1',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Mobile2',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Mobile3',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Mobile4',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Mobile5',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Mobile6',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Mobile7',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
        ],
        medium: [
            {
                promoText: 'Free Shipping Banner Tablet1',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Tablet2',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Tablet3',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Tablet4',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Tablet5',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Tablet6',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
        ],
        large: [
            {
                promoText: 'Free Shipping Banner Desktop1',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Desktop2',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Desktop3',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Desktop4',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
            {
                promoText: 'Free Shipping Banner Desktop5',
                targetUrl: 'www.jcpenney.com',
                targetWindow: 'SW',
            },
        ],
        contentExpiry: 'Thu Jul 07 2017 16:03:23 GMT+0530 (IST)',
    },
};

describe('PromotionalBannerReducer Reducer', () => {
    it('should return the initial default state', () => {
        const reducer = PromotionalBannerReducer(undefined, { });
        expect(reducer).to.deep.equals([]);
    });
    it('default', () => {
        const reducer = PromotionalBannerReducer(undefined, { type: 'NO_MATCH' });
        expect(reducer).to.deep.equals([]);
    });
    it('should cover if path', () => {
        const wrapper = PromotionalBannerReducer([], {
            type: types.PROMOTIONALBANNERDATA_GET_SUCCESS,
            promotionalBannerData: {
                data: mockData.data,
            },
        });
        expect(wrapper).to.deep.equal(mockData.data);
    });
    it('PROMOTIONALBANNERDATA_GET_SUCCESS, offerdetails object is present', () => {
        expect(
            PromotionalBannerReducer([], {
                type: types.PROMOTIONALBANNERDATA_GET_SUCCESS,
                promotionalBannerData: {
                    promotionalBannerData: [{
                        data: mockData,
                    }],
                },
            }),
        ).deep.equals([]);
    });
});
