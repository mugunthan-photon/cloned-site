import { expect } from 'chai';
import { describe, it } from 'mocha';
import CouponsReducer from './CouponsReducer';
import * as CouponsActionTypes from '../actionTypes/CouponActionTypes';

describe('CouponsReducer Reducer', () => {
    it('initialstate', () => {
        expect(
            CouponsReducer(undefined, []),
        ).deep.equals([]);
    });

    it('COUPONS_GET_SUCCESS', () => {
        expect(
            CouponsReducer([], {
                type: CouponsActionTypes.COUPONS_GET_SUCCESS,
                coupons: [{
                    id: 'ONLINEORSTORECOUPONS',
                    coupons: [{
                        name: 'BIGDEAL9 - 1',
                        channel: {
                            name: 'IN STORE AND ONLINE',
                            type: 'ONLINE_AND_IN_STORE',
                        },
                        offers: [{
                            offerItems: [
                                {
                                    key: 'offer1',
                                    name: 'EXTRA 20% OFF',
                                    description: '*20% with your JCPenney credit card, 15% with any method of payment',
                                    barcode: 'MC4557940002000000095120',
                                },
                                {
                                    key: 'offer2',
                                    name: 'OR EXTRA 15% OFF',
                                    description: '',
                                    barcode: 'MC4557930002000000095115',
                                },
                            ],
                            links: [
                                {
                                    label: 'shop sales',
                                    href: '/g/sales-deals/N-1b0cnoo?cm_re=CPN-_-0403-_-BIGDEAL9-STR-OL_SS',
                                },
                                {
                                    label: 'print',
                                    href: 'https://e.jcpenney.com/pub/sf/ResponseForm?_ri_=X0Gzc2X%3DWQpglLjHJlYQGnr7WzgSRMzbMvzdErHkpCAzebWLk5azfVXMtX%3DWQpglLjHJlYQGnmE6YPNjpzeJagzcNXnNuosj5D9tza&_ei_=Enf1JtjiQB5rHk3joYsrNIM',
                                },
                            ],
                        }],
                    }],
                }],
            })).to.deep.equals(
            [
                {
                    id: 'ONLINEORSTORECOUPONS',
                    coupons: [
                        {
                            name: 'BIGDEAL9 - 1',
                            channel: {
                                name: 'IN STORE AND ONLINE',
                                type: 'ONLINE_AND_IN_STORE',
                            },
                            offers: [
                                {
                                    offerItems: [
                                        {
                                            key: 'offer1',
                                            name: 'EXTRA 20% OFF',
                                            description: '*20% with your JCPenney credit card, 15% with any method of payment',
                                            barcode: 'MC4557940002000000095120',
                                        },
                                        {
                                            key: 'offer2',
                                            name: 'OR EXTRA 15% OFF',
                                            description: '',
                                            barcode: 'MC4557930002000000095115',
                                        },
                                    ],
                                    links: [
                                        {
                                            label: 'shop sales',
                                            href: '/g/sales-deals/N-1b0cnoo?cm_re=CPN-_-0403-_-BIGDEAL9-STR-OL_SS',
                                        },
                                        {
                                            label: 'print',
                                            href: 'https://e.jcpenney.com/pub/sf/ResponseForm?_ri_=X0Gzc2X%3DWQpglLjHJlYQGnr7WzgSRMzbMvzdErHkpCAzebWLk5azfVXMtX%3DWQpglLjHJlYQGnmE6YPNjpzeJagzcNXnNuosj5D9tza&_ei_=Enf1JtjiQB5rHk3joYsrNIM',
                                        },
                                    ],
                                },
                            ],
                        }],
                }]);
    });

    it('should return state on passing no available type: COUPONS_GET_NOPRESENT', () => {
        const reducer = CouponsReducer([], {
            type: CouponsActionTypes.COUPONS_GET_NOPRESENT,
        });

        expect(reducer.length).equal(0);
    });
});
