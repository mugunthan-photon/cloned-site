import isEmpty from 'lodash/isEmpty';
import constants from '../../common/Constants';

/* istanbul ignore next */
export default class Utils {
    /**
     * This method returns the OS type from which the site is being accessed
     * @static
     * @returns String OS Type
     * @memberof Utils
     */
    static findMobileOS() {
        let mobileOS = 'unknown';
        if (window && window.navigator) {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            // Windows Phone must come first because its UA also contains "Android"
            if (/windows phone/i.test(userAgent)) {
                mobileOS = 'Windows Phone';
            }

            if (/android/i.test(userAgent)) {
                mobileOS = 'Android';
            }

            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                mobileOS = 'iOS';
            }
        }
        return mobileOS;
    }

    /**
     * This method return the channel info by device type
     * @static
     * @returns Channel Info (mobile, tablet, desktop) lowercase
     * @memberof Utils
     */
    static fetchChannelInfo = (deviceType) => {
        if (deviceType.isDesktop) {
            return 'desktop';
        } else if (deviceType.isTablet) {
            return 'tablet';
        }
        return 'mobile';
    };

    /**
     *
     * Pass in a URL returns only the path
     * E.g. var x = Utils.getPathFromUrl('https://www.google.com/search?source=hp&q=shirts');
     * console.log(x); //prints /search?source=hp&q=shirts&oq=shirts
     * For some reason if the url cannot be parsed, return the original value as is
     * @static
     * @param {any} url
     * @returns
     * @memberof Utils
     */
    static getPathFromUrl(url) {
        const defaultPath = '/';
        if (!url) {
            return defaultPath;
        }

        if (url.indexOf('/') === 0) {
            // Starts with the / and return the path as is
            return url;
        }

        const matches = url.match(/^[^#]*?:\/\/.*?(\/.*)$/);
        if (matches && matches.length === 2) {
            return matches[1] || defaultPath;
        }
        return defaultPath;
    }

    /**
     * Check for savedItems and return true if the length of items is
     * less than 50 else returns false
     * @static
     * @param {any} object
     * @returns
     * @memberof Utils
     */
    static triggerAddSaveItems(stateObj) {
        const savedItems = stateObj.savedItems || {};
        const keys = Object.keys(savedItems);
        return (keys.length < constants.THRESOLD_SAVEDITEMS);
    }

    /**
     * Validates zipcode
     * zipcode should contains 5 numbers
     * @static
     * @param {string}
     * @returns
     */
    static validateZipCode(zipCode) {
        const isZipCodeRegex = /^\d+$/;

        /* istanbul ignore else */
        if (isZipCodeRegex.test(zipCode) && zipCode.length !== 5) {
            return false;
        }
        return true;
    }

    /* This method will put logs in splunk on server side rendering
     * @param logger
     * @param request
     * @param cookie
     */
    static doPostSSRLogs(logger, request, cookie) {
        if (!logger) {
            return;
        }
        const logRequest = {};
        const response = request.response || {};
        logRequest.requestInfo = request.requestInfo;
        logRequest.responseCode = response.status;
        logRequest.traceId = response.headers && response.headers.get('x-trace-id');
        if (!isEmpty(cookie)) {
            logRequest.cookies = {
                DPOrder: cookie.DPOrder,
                DPJSESSIONID: cookie.DPJSESSIONID,
                DPInstance: cookie.DPInstance,
                DPCluster: cookie.DPCluster,
                DPCloudOrigin: cookie['DP-Cloud-Origin'],
                DPCloudCluster: cookie['DP-Cloud-Cluster'],
            };
        }
        const errorInfo = Array.isArray(response.data) ? response.data[0] : response.data;
        if (errorInfo && errorInfo.errorCode) {
            logRequest.errorInfo = errorInfo;
        }
        logger.info(logRequest);
    }
}
