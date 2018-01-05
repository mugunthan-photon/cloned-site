import { expect } from 'chai';
import ProductPromotionListReducer from './ProductPromotionListReducer';
import * as types from '../actionTypes/ProductPromotionListActionTypes';

describe('ProductPromotionListReducer', () => {
    it('initialstate', () => {
        expect(
            ProductPromotionListReducer(undefined, []),
        ).to.deep.equal([]);
    });

    it('PRODUCT_PROMOTION_LIST_CLEAR', () => {
        expect(
            ProductPromotionListReducer([], { type: types.PRODUCT_PROMOTION_LIST_CLEAR }),
        ).to.deep.equal({});
    });

    it('PRODUCT_PROMOTION_LIST_GET_SUCCESS', () => {
        const mock = { type: types.PRODUCT_PROMOTION_LIST_GET_SUCCESS, departmentDataWithPageName: { deviceType: 'mobile', pageName: 'home', requestDateTime: null, channelName: null, jvmName: null, requestUrl: null, maxAge: 340529, contentExpiry: 'Fri Mar 31 2017 08:55:00 AM', type: 'homePageGridContent', disclaimer: '', gridContents: [{ type: 'ImageBannerWithOverlay', id: null, contentType: 'ImageBannerWithOverlay', desktopImageBannerDetails: { imageSrc: 'boots-for-her.jpg', imageAlt: '01_Worthington-pants_030917', openIn: '_self', windowHeight: '200', windowWidth: '100', link: null, pageURL: '/g/worthington-pants-women/N-bwo3xZ7zZ1z140w7?', dynamicUrl: false }, overlay: 'n', offerId: '01_Worthington-pants_030917' }] } };

        const expected = {
            pageName: 'home',
            requestDateTime: null,
            channelName: null,
            jvmName: null,
            requestUrl: null,
            maxAge: 340529,
            deviceType: 'mobile',
            contentExpiry: 'Fri Mar 31 2017 08:55:00 AM',
            type: 'homePageGridContent',
            disclaimer: '',
            gridContents: null,
            massagedData: [
                {
                    type: 'ImageBannerWithOverlay',
                    id: null,
                    contentType: 'ImageBannerWithOverlay',
                    desktopImageBannerDetails: null,
                    overlay: 'n',
                    offerId: '01_Worthington-pants_030917',
                    imageSrc: '/mobile/images/boots-for-her.jpg',
                    imageAlt: '01_Worthington-pants_030917',
                    openIn: '_self',
                    windowHeight: '200',
                    windowWidth: '100',
                    link: null,
                    pageURL: '/g/worthington-pants-women/N-bwo3xZ7zZ1z140w7?',
                    dynamicUrl: false,
                },
            ],
        };
        expect(
            ProductPromotionListReducer([], mock),
        ).to.deep.equal(expected);
    });
});
