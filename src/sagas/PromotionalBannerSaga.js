import { put, takeLatest, call } from 'redux-saga/effects';
import PromotionalBannerApi from 'yoda-interfaces/lib/PromotionalBanner/PromotionalBannerApi';
import * as PromotionalBannerActionTypes from '../actionTypes/PromotionalBannerActionTypes';

function* PromotionalBannerSaga() {
    try {
        const url = window.location.href;

        const getURLParameterBykey = (key, getUrl, removeSplChars) => { // TODO - this will moved to Util function later
            let name = key;
            name = name.replace(/[[\]]/g, '\\$&');
            const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
            let results = regex.exec(url);
            if (!results) return '';
            if (!results[2]) return '';
            results = decodeURIComponent(results[2]);
            return (removeSplChars ? results.replace(/['+\s]/g, '') : results.replace(/\+/g, ' ')) || '';
        };

        const getppId = (getUrl) => {
            const regExp = /[?](.*?)[/]/;
            const reverseURL = getUrl.split('').reverse().join('');
            const matches = regExp.exec(reverseURL);
            const ppId = matches[1].split('').reverse().join('');
            return ppId || '';
        };
        const getNidByKey = (key, getUrl) => {
            const extract = getUrl.match(/N-(.*)[?]/) || getUrl.match(/N-(.*)[/]/) || getUrl.match(/N-(.*)/);
            const nId = extract && extract.length > 0 ? extract[1] : '';
            return nId ? `N-${nId}` : '';
        };
        const ntypeId = () => (
             getNidByKey('N-', url)
        );

        // const paramsSearch = {
        //     Ntt: getURLParameterBykey('Ntt', url),
        // };

        const paramsSearch = () => ({
            Ntt: getURLParameterBykey('Ntt', url),
        });

        const paramsPDP = () => ({
            ppId: getppId(url),
            brand: getURLParameterBykey('brand', url),
            pTmplType: getURLParameterBykey('pTmplType', url),
        });

        // const paramsPDP = {
        //     ppId: getppId(url),
        //     brand: getURLParameterBykey('brand', url),
        //     pTmplType: getURLParameterBykey('pTmplType', url),
        // };
        const getPageType = () => {
            let pageType = '';
            if (url.indexOf('/g/') > 0) {
                pageType = 'departments';
            } else if (url.indexOf('/p/') > 0) {
                pageType = 'pdp';
            } else if (url.indexOf('/s/') > 0) {
                pageType = 'search';
            }
            return pageType;
            // pageType = url.indexOf('/g/');
            // const pageType = url.split('/')[3];
            // return pageType;
        };

        let promotionalBannerData = 0;
        const pageType = getPageType();
        switch (pageType) {
            case 'departments':
                console.log('Department');

                promotionalBannerData =
                yield call(PromotionalBannerApi.getPromotionalBannerDataForAllPages, ntypeId(), '');
                break;
            case 'search':
                console.log('Search');

                promotionalBannerData =
                yield call(PromotionalBannerApi.getPromotionalBannerDataForAllPages,
                            ntypeId(), paramsSearch());
                break;
            case 'pdp':
                console.log('PDP');

                promotionalBannerData =
                yield call(PromotionalBannerApi.getPromotionalBannerDataForAllPages, '', paramsPDP());
                break;
            default:
                console.log('default');
                promotionalBannerData =
                yield call(PromotionalBannerApi.getPromotionalBannerDataForAllPages, ntypeId(), '');
        }
        yield [
            put({ type: PromotionalBannerActionTypes.PROMOTIONALBANNERDATA_GET_SUCCESS, promotionalBannerData }),
        ];
    } catch (error) {
        yield put({ type: 'PROMOTIONALBANNERDATA_GET_ERROR', error });
    }
}

export default function* watchPromotionalBannerActionRequest() {
    yield takeLatest(PromotionalBannerActionTypes.PROMOTIONALBANNERDATA_GET_REQUEST, PromotionalBannerSaga);
}
