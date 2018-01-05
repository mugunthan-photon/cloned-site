
import * as MarketingZonesActionTypes from '../actionTypes/MarketingZonesActionTypes';

const zoneLoad = (allzones, pageName, presentation, nType) => {
    const zonegetobj = {
        type: MarketingZonesActionTypes.ZONE_DATA_GET_REQUEST,
        allzones,
        pageName,
        presentation,
        nType,
    };
    return zonegetobj;
};

export default {
    zoneLoad,
};
