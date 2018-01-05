import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import ScriptLoader from 'yoda-core-components/lib/helpers/ScriptLoader/ScriptLoader';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import Storage from '../../helpers/Storage/Storage';
/**
 * IMPORTANT: This Loader is not exported and kept private to be consumed by ProductCartridge component ONLY,
 * DO NOT ADD THIS TO index.jsx and export
 * This component is responsible for loading the certona, initialize,
 * load recommendations based on page type
 *
 * Design Notes:
 * CertonaLoader is one of the provider, this can be swapped out to something different later and ProductCartridge component would
 * abstract the details
 */
class CertonaLoader {
    static load(
        props,
    ) {
        const { pageType, deviceType, attributes } = props.payload;

        // Method for getting channel info for url tagging
        const fetchChannelInfo = () => {
            if (deviceType.isDesktop) {
                return 'DESKTOP';
            } else if (deviceType.isTablet) {
                return 'TABLET';
            }
            return 'MOBILE';
        };

        const channel = fetchChannelInfo(deviceType);

        window.certona = attributes || {};
        window.certona.pagetype = pageType;
        window.certona.devicetype = channel;

        // Setting Customer ID
        /* istanbul ignore else */
        if (!window.certona.customerid) {
            window.certona.customerid = Cookies.load('cmvid') || LocalStorage.getData('DP_VISITOR_ID') || '';
        }

        // Setting preferred Store
        /* istanbul ignore else */
        if (!window.certona.preferredstore) {
            const storeId = Storage.load('userStore', true);
            /* istanbul ignore next */
            if (storeId) {
                window.certona.preferredstore = storeId;
            }
        }

        /* istanbul ignore next */
        const onCertonaLibOnLoad = () => {
            // Trigger certona api call
            window.callCertona && window.callCertona();
        };

        const jqueryLibProps = {
            src: '//code.jquery.com/jquery-3.1.1.min.js',
            async: false,
        };

        const resonanceUrl = deviceType.isDesktop
            ? '//edge1.certona.net/cd/c50f7c7c/jcpenney.com/scripts/resonance.js'
            : '//edge1.certona.net/cd/c50f7c7c/m.jcpenney.com/scripts/resonance.js';

        const certonaLibProps = {
            src: resonanceUrl,
            async: false,
            onSuccess: onCertonaLibOnLoad,
        };

        ScriptLoader.load(jqueryLibProps);
        ScriptLoader.load(certonaLibProps);

        return new Promise((resolve) => {
            window.certonaRecommendations = (response) => {
                let schemes = [];
                if (response && response.resonance && response.resonance.schemes) {
                    schemes = response.resonance.schemes;
                }
                resolve({ schemes });
            };
        });
    }
}

export default CertonaLoader;
