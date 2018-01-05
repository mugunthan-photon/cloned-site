import analytics from 'yoda-core-components/lib/helpers/Analytics/Analytics';
import BaseActionFilter from 'yoda-core-components/lib/helpers/Analytics/BaseActionFilter';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import isEmpty from 'lodash/isEmpty';
import * as AnalyticsActionTypes from '../actionTypes/AnalyticsActionTypes';
import * as OrderActionTypes from '../actionTypes/OrderActionTypes';
import * as MoveListActionTypes from '../actionTypes/SavedListToolTip';
import * as addToCartActionTypes from '../actionTypes/AddToCartActionTypes';

const baseActionFilter = new BaseActionFilter();
/* istanbul ignore next */
if (!__SERVER__) {
    let ensightenUrl = '<!-- @yoda_config ensighten_dev_url -->';
    if (window.location.hostname === 'm.jcpenney.com' || window.location.hostname === 'www.jcpenney.com') {
        ensightenUrl = '<!-- @yoda_config ensighten_prod_url -->';
    }
    const config = {
        jqueryUrl: '<!-- @yoda_config jquery_url -->',
        ensightenUrl,
    };
    analytics.init(config);
}

/**
 * This function will used only for redux middleware only to track tagging based on action request
 */
const CommonMiddleware = store => next => action => { // eslint-disable-line
    if (!__SERVER__) {
        let digitalData = null;
        let analyticsEventName = null;

        /**
         * component can trigger an action only for tagging
         * action should contain analytics object as mandatory
         * @param analytics.type - {string}  - tagging key
         * @param analytics.JCPDL - {Object}  - required additional details for tagging event
         */
        try {
            switch (action.type) {
                case AnalyticsActionTypes.FORM_ERROR:
                    digitalData = baseActionFilter.getFormErrorDL(action.errorDetails);
                    analyticsEventName = 'formError';
                    break;

                case AnalyticsActionTypes.NAVIGATION_CLICK:
                    digitalData = baseActionFilter.getNavigationDL(action.navClick);
                    analyticsEventName = digitalData ? 'navigationClick' : null;
                    break;

                case AnalyticsActionTypes.ANALYTICS_SELECT_STORE:
                    digitalData = baseActionFilter.selectStoreData();
                    analyticsEventName = 'selectStore';
                    break;

                case OrderActionTypes.GET_STORE_BY_STORE_ID_SUCCESS:
                    digitalData = baseActionFilter.selectStoreData();
                    analyticsEventName = 'selectStore';
                    break;

                case OrderActionTypes.GET_STORES_GET_REQUEST:
                    if (action.payload && action.payload.address) {
                        digitalData = baseActionFilter.storeSearchData(action.payload);
                        analyticsEventName = 'storeSearch';
                    }
                    break;

                case AnalyticsActionTypes.ANALYTICS_STORE_SEARCH:
                    if (action.payload && action.payload.address) {
                        digitalData = baseActionFilter.storeSearchData(action.payload);
                        analyticsEventName = 'storeSearch';
                    }
                    break;

                case AnalyticsActionTypes.ANALYTICS_VIDEO_LOADED:
                    digitalData = baseActionFilter.videoLoadedData(action.payload);
                    analyticsEventName = action.payload.eventName;
                    break;

                case AnalyticsActionTypes.ANALYTICS_OPEN_MODAL:
                    digitalData = baseActionFilter.openModelData(action.name);
                    analyticsEventName = 'openModal';
                    break;
                case MoveListActionTypes.MOVE_SITE_ITEMS_EVENT_ANALYTICS:
                    digitalData = {};
                    analyticsEventName = 'moveItemBetweenList';
                    break;

                case MoveListActionTypes.CREATE_SITE_LIST_CLICK_EVENT:
                    digitalData = {};
                    analyticsEventName = 'createNewList';
                    break;

                case MoveListActionTypes.ADD_SITE_TO_LIST_EVENT:
                    digitalData = action.analyticsData || action.payload;
                    analyticsEventName = 'saveProduct';
                    break;

                case MoveListActionTypes.SITE_MOVETOLIST_ERROR_EVENT:
                    digitalData = { error: action.payload };
                    analyticsEventName = 'formError';
                    break;

                case MoveListActionTypes.ADD_SITE_TO_LIST_ERROR_EVENT:
                    digitalData = action.errorData;
                    analyticsEventName = 'formError';
                    break;
                case addToCartActionTypes.MYLIST_CART_ADD_ANALYTICS:
                    digitalData = action.analyticsData;
                    analyticsEventName = 'cartAdd';
                    break;


                default:
                    break;
            }

            if (analyticsEventName || digitalData) {
                analytics.track(analyticsEventName, digitalData);
            }

            if (!action.navClick) {
                const pendingNavigationClickData = baseActionFilter.getPendingNavigationDL();
                if (pendingNavigationClickData && !isEmpty(window.digitalData)) {
                    analytics.track('navigationClick', pendingNavigationClickData);
                    Cookies.remove('navigationClickDigitalData');
                }
            }
        } catch (error) {
            // @TODO - LOGGER should add here
        }
    }
    return next(action);
};

export default CommonMiddleware;
