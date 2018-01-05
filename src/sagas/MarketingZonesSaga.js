import { call, put, takeEvery } from 'redux-saga/effects';
import CategoriesApi from 'yoda-interfaces/lib/Content/ContentApi';
import * as MarketingZonesActionTypes from '../actionTypes/MarketingZonesActionTypes';

function* zoneSaga(paramObj) {
    try {
        let zoneData = [];
        const zoneYield = [];
        let completeZoneData;
        const composeZoneData = {};
        const organizeZonePage = {};

        /**
         * this call is to pull all the zone names. It will be removed once microsite intro pages sstart store the same.
         */
        zoneData = paramObj.presentation.length ? paramObj.allzones : yield call(CategoriesApi.getZoneOrders);

        /**
         * call all the zones parellaly
         */
        zoneData.forEach((onedata) => {
            zoneYield.push(call(CategoriesApi.getZoneContent, paramObj.pageName, onedata, paramObj.nType ? paramObj.nType : ''));
        });
        completeZoneData = yield [...zoneYield];

        /**
         * creating object with zone names. so that we have one to one mapping and can avoid iterations.
         */
        completeZoneData.forEach((onezonedata) => {
            if (onezonedata && onezonedata.type) { // If API failed we would like gracefully handle and let client side retry if it was rendered server
                composeZoneData[onezonedata.type] = onezonedata;
            }
        });

        organizeZonePage[paramObj.pageName] = composeZoneData;
        completeZoneData = Object.assign({}, organizeZonePage);
        yield [
            put({ type: MarketingZonesActionTypes.ZONE_DATA_GET_ALL_SUCCESS, completeZoneData }),
        ];
    } catch (error) {
        yield put({ type: 'ZONE_DATA_GET_ERROR', error });
    }
}

export default function* watchZoneActionsRequest() {
    yield takeEvery(MarketingZonesActionTypes.ZONE_DATA_GET_REQUEST, zoneSaga);
}
