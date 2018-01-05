import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import { geoErrorType, cookie } from '../../common/Constants';

const getFallbackLatLong = (onSuccess, onError, errorType) => {
    // Check if lat long present in cookie dropped by Akamai
    const userLatLong = Cookies.load(cookie.LATLONG); // E.g. 33.0562,-96.7336
    const latLong = userLatLong && userLatLong.split(',');
    /* istanbul ignore else */
    if (latLong && latLong.length === 2) {
        return onSuccess && onSuccess({ coords: {
            latitude: latLong[0],
            longitude: latLong[1],
        } });
    }
    return onError && onError(errorType);
};

export default class Location {

    static getLatLongAsPromise(additionalParams) {
        return new Promise((resolve) => {
            Location.getLatLong((position) => {
                // On success
                let params = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                if (additionalParams) {
                    params = Object.assign({}, params, additionalParams);
                }
                resolve(params);
            }, (error) => {
                // On error
                resolve(error);
            });
        });
    }

    static getLatLong = (onSuccess, onError) => {
        let timer = null;
        const geoOptions = {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 300000,
        };

        const onLocationError = (errorType) => {
            clearTimeout(timer);
            getFallbackLatLong(onSuccess, onError, errorType);
        };

        const onLocationSuccess = (position) => {
            clearTimeout(timer);
            onSuccess && onSuccess(position);
        };

        /* istanbul ignore next */
        const onTimeout = () => {
            clearTimeout(timer);
            onLocationError(geoErrorType.TIMED_OUT);
        };

        /* istanbul ignore else */
        if (navigator.geolocation) {
            // When location is accesed, prompt appears to let user allow or deny location acccess. If user ignores this
            // prompt or takes a long time to respond to it, it left the application hung till they respond. This was
            // an issue mainly in desktop where prompt goes unnoticed. This timer allows to go ahead with the fallback
            // if location could not determined. Even though, we have added timeout as part of options, that comes in to
            // play only after location is being accessed
            /* istanbul ignore next */
            timer = setTimeout(() => onTimeout(), 4000);

            // Set timeout to handle safari bug that keeps the browser prompt for location
            navigator.geolocation.getCurrentPosition(
                // Onsuccess
                onLocationSuccess,
                // On Error
                onLocationError,
                // Options
                geoOptions,
            );
        } else {
            onLocationError(geoErrorType.NOT_SUPPORTED);
        }
    }
}

