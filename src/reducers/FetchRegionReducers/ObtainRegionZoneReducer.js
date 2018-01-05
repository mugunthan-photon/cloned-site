import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import * as OrderActionTypes from '../../actionTypes/OrderActionTypes';
import { cookie } from '../../common/Constants';

const defaultPriceZone = -1;

export default function ObtainRegionZoneReducer(state = {}, action) {
    switch (action.type) {
        case OrderActionTypes.GET_STORES_GET_SUCCESS: //eslint-disable-line
            let zone = null;
            if (action.stores && action.stores.stores && action.stores.stores.length > 0) {
                zone = action.stores.stores[0].priceRegion || defaultPriceZone;
                zone !== -1 && Cookies.save(cookie.PRICE_ZONE, zone, 1);
            } else {
                zone = defaultPriceZone;
                Cookies.remove(cookie.PRICE_ZONE);
            }

            return Object.assign({}, {
                regionZonefromLocation: zone,
            });

        case OrderActionTypes.GET_STORES_GET_ERROR:
            // Not dropping the cookie for defaultPricezone because
            // API failure could be temporary and hence not persisting the error
            // scenario to cookie
            return Object.assign({}, {
                regionZonefromLocation: defaultPriceZone,
            });

        default:
            return state;
    }
}
