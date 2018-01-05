import { takeLatest, put, call } from 'redux-saga/effects';
import HomePageContentApi from 'yoda-interfaces/lib/Content/ContentApi';
import * as MarketingContentActionTypes from '../actionTypes/MarketingContentActionTypes';

function* marketingContentSaga() {
    try {
        const homePageContentData = yield call(HomePageContentApi.getMarketingContent);
        const homePageContent = homePageContentData.data;
        yield [
            put({ type: MarketingContentActionTypes.MARKETING_CONTENT_GET_SUCCESS, homePageContent }),
        ];
    } catch (error) {
        yield put({ type: MarketingContentActionTypes.MARKETING_CONTENT_GET_ERROR, error });
    }
}

export default function* watchMarketingContentRequest() {
    yield takeLatest(MarketingContentActionTypes.MARKETING_CONTENT_GET_REQUEST, marketingContentSaga);
}
