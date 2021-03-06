const Constants = {
    createAccountErrorMessages: {
        EMPTY_INPUT_ERROR: 'Please enter valid password',
        NON_ALLOWED_SPECIALS_ERROR: 'Not all special characters are allowed',
        MISC_CHARS_ERROR: 'Password cannot have name, email, spaces, jcp or jcpenney, 3+ consecutive characters',
        MINIMUM_REQ_NOT_MET_ERROR: 'Password does not meet requirements',
    },
    cookie: { // Cookie names
        LATLONG: '_userLoc',
        PRICE_ZONE: 'UPZ',
    },
    findStoreErrorMessages: {
        LOCATION_ERROR_MSG_TITLE: 'Location services error',
        LOCATION_NOT_ENABLED: 'Please turn on location services in your settings',
        GEO_LOCATE_ERROR: 'There was an error with location services, please enter your location',
        EMPTY_ZIP_CODE: 'Please enter a valid zipcode or choose use my location',
        ZIP_CODE_ERROR: 'Zip code must be 5 digits',
    },
    geoErrorType: {
        GEO_LOCATE_ERROR: 'geoLocateError',
        GEO_UNAVAILABLE: 'geoUnavailable',
        EMPTY_ZIP_CODE: 'emptyZipCode',
        NOT_SUPPORTED: 'browserNotSupported',
        TIMED_OUT: 'timeout',
    },
    useLocationLabel: 'Use My Location',
    couponBodyCopy: 'Show coupon to sales associate',
    couponErrorMessages: {
        COUPON_CODE_MISSING: 'Please enter a valid code.',
        INPUT_BOX_PLACEHOLDER: 'Enter promo code...',
        CODE_DOES_NOT_EXIST: 'Code does not exist.',
        COUPON_REQUEST_ERROR: 'Oops! There is an error on our end. Please try to apply the coupon again.',
        COUPON_CODE_EXPIRED: 'Oh no! The code you typed in has already expired. Please apply an eligible coupon.',
        SRV_COUPON_EXPIRED_ERR: 'Oh no! The code you typed in has already expired. Please apply an eligible coupon.',
        SERIAL_NUMBER_REQUIRED: 'Serial Number Required.',
        SERIAL_NUMBER_REQ_MESSAGE: 'This code requires a serial number. Please type in the serial number shown on your coupon or reward.',
        COUPON_NO_CART_ITEMS: 'We can apply this coupon code once you add an item to your bag.',
        IRIS_COUPON_NO_CART_ITEMS: 'Oops! We cannot apply this coupon because your cart is empty. We can apply this coupon code once you add an item to your bag.',
    },
    CONTINUE_SHOPPING_LABEL: 'Continue Shopping',
    IRIS_CONTINUE_SHOPPING_LABEL: 'Shop Sales',
    COUPONS_APPLIED_LABEL: 'Coupon Applied',
    COUPONS_UPDATE_LABEL: 'Coupon Updated',
    REWARDS_APPLIED_LABEL: 'Reward Applied',
    CHECKOUT_LABEL: 'Checkout',
    SERIAL_APPLY_LABEL: 'Apply Number',
    COUPONS_NO_CODE_REQUIRED: 'NO CODE NECESSARY',
    couponToggleDetails: {
        COUPONS_SHOW_DETAILS: 'Show Details',
        COUPONS_HIDE_DETAILS: 'Hide Details',
        IRIS_COUPON_DETAILS: 'see details',
    },
    COUPON_EMPTYCART_LABEL: 'Cannot Apply Coupon',
    IRIS_COUPON_EMPTYCART_LABEL: 'Your Cart is Empty',
    CouponCategory: {
        all: 'online & in store',
        inStore: 'in store only',
        onlineOnly: 'online only',
    },
    CouponTypes: {
        APPLIED: 'Applied',
        SERIAL: 'Serial',
        BARCODE: 'Barcode',
    },
    couponPrintCheck: ['print', 'print coupon'],
    adjustmentType: {
        COUPON: 'COUPON',
        REWARD: 'REWARDSCERT',
        FREESHIP: 'CouponSHFree',
        ASSOC_DISCOUNT: 'ASSOCIATEDISCOUNT',
    },
    CouponRedeemingChannel: {
        ALL: 'all',
        IN_STORE: 'instore',
        ONLINE_ONLY: 'online',
    },
    CouponFindStoreLabel: 'find a store',
    CouponPrintLabel: 'Print',
    IRISCouponPrintLabel: 'Print Barcode',
    CouponAppledMethod: {
        INPUT_COUPON: 'manual',
        SELECT_COUPON: 'selected from list',
    },
    findStores: {
        order: {
            detailsButton: 'Select',
        },
        account: {
            detailsButton: 'Set My Store',
        },
        orderMessage: 'Same day pickup items ordered after 3 PM will be available the next day',
        noStoresMessage: 'We\'re sorry...we couldn\'t find any jcp stores that match your search',
        noSDPUStoresMessage: 'We\'re sorry…there were no JCP stores with the item(s) available for Same Day Pickup within the miles selected.',
        invalidInputMsg: 'Please enter valid city, state or ZIP code',
        INVALID_INPUT: 'INVALID_INPUT',
        LINK: 'Link',
        STORES_COUNT: 'X-Total-Count',
        // GOOGLE_API_KEY: 'AIzaSyAfusq-fyrNuqnEnMKl55b-63b70r8Uc5k', // Old key
        GOOGLE_API_KEY: 'AIzaSyCXssOmw3AgN0U-STMPbASl28ymrK4We2U',
        filterHeader: 'Filter by Services',
        noStorePageTitle: 'No matches available.',
        noStorePageContent: 'We\'re sorry but we couldn\'t find any JCPenney stores that matched your search.',
        invalidInputContent: "We couldn't find a store there. Please make sure that you entered correct Zip or City of State",
        defaultTitle: 'Enter a City, State or Zip Code to find the closest JCPenney store.',
        findAStorePageTitle: 'Find A Store',
        selectAStorePageTitle: 'Select A Store',
        changeMyStorePageTitle: 'Change My Store',
    },
    searchMaps: {
        GOOGLE_MAPS_URL: 'https://www.google.com/maps/dir/?api=1&destination=',
        APPLE_MAPS_URL: 'https://maps.apple.com?address=',
    },
    GENERIC_API_ERROR_MESSAGE: 'There was an error while processing your request. Please try again after some time.',
    COUPON_TYPEAHEAD_TRIGGER_LENGTH: 3,
    IN_STORE_ONLY_COUPONS: 'INSTOREONLYCOUPONS',
    ACCESS_TOKEN: 'Access_Token',
    REFRESH_TOKEN: 'Refresh_Token',
    ACCOUNT_ID: 'ACCOUNT_ID',
    DP_USER_STATE: 'DP_USER_STATE',
    DP_FIRST_NAME: 'DP_FIRST_NAME',
    DP_USER_NAME: 'DP_USER_NAME',
    DP_REWARDS_STATUS: 'DP_REWARDS_STATUS',
    DP_REWARDS_CERTS: 'DP_REWARDS_CERTS',
    DP_SAVED_ITEMS_COUNT: 'DP_SAVED_ITEMS_COUNT',
    DP_SAVED_ITEMS: 'DP_SAVED_ITEMS',
    DP_CHECKOUT_SAVED_ITEMS: 'DP_CHECKOUT_SAVED_ITEMS',
    DP_CHECKOUT_SAVED_ITEMS_PAYLOAD: 'DP_CHECKOUT_SAVED_ITEMS_PAYLOAD',
    DP_USER_TOKEN: 'DP_USER_TOKEN',
    DP_SAVED_ITEMS_PAYLOAD: 'DP_SAVED_ITEMS_PAYLOAD',
    DP_VISITOR_ID: 'DP_VISITOR_ID',
    DP_USER_DEFAULT_STORE: 'DP_USER_DEFAULT_STORE',
    DP_SFL_ID: 'DP_SFL_ID',
    TOKEN_API_STATUS: 'TOKEN_API_STATUS',
    DEFAULT_CURRENCY: 'USD',
    ITEM_COUNT: 'ItemCount',
    DESKTOP_ITEM_COUNT: 'DP_ORDER_INFO',
    analytics: {
        COUPON_APPLIED_SUCCESS: 'COUPON_APPLIED_SUCCESS',
        SELECT_STORE_SUCCESS: 'SELECT_STORE_SUCCESS',
    },
    branchio: {
        BRANCHIO_TEST_KEY: 'key_test_mlBoOH9ybO7NGpeCWvvNTegaBtev2hgv',
        BRANCHIO_LIVE_KEY: 'key_live_ekymMOXuhN0OGkfD1ytRmhmluEozYgdl',
    },
    OK_LABEL: 'Ok',
    CART_PAGE_URL: '/cart',
    CHECKOUT_PAGE_URL: '/checkout',
    CART_YODA_EXPERIENCE: 'OFF',
    CLASSIC_CART_PAGE_URL: '/c/index.html#/',
    // Constants for error message handling. Don't remove them.
    SET_SERVICE_ERROR: 'SET_SERVICE_ERROR',
    CLEAR_SERVICE_ERROR: 'CLEAR_SERVICE_ERROR',
    GENERIC_API_ERROR: 'GENERIC_API_ERROR',
    INITIATE_CHECKOUT_AGAIN: 'INITIATE_CHECKOUT_AGAIN',
    SRV_ITEM_NOT_FOUND: 'SRV_ORD_ERR_ITM_NF',
    SRV_COMMERCE_ITEMNOTFOUND: 'SRV_COMMERCE_ITEMNOTFOUND',
    SRV_PROMOTION_NOTFOUND: 'SRV_PROMOTION_NOTFOUND',
    findStoreThemes: {
        findAStorePage: 'findAStorePage',
        gallery: 'gallery',
        selectAStore: 'selectAStore',
        pdpMajorAppliances: 'pdpMajorAppliances',
    },
    SRV_PRODUCT_NOTFOUND: 'SRV_PRODUCT_NOTFOUND',
    SRV_REFRESH_TOKEN_EXPIRED: 'SRV_REFRESH_TOKEN_EXPIRED',
    GUEST_USER: 'GUEST_USER',
    APPLIANCE_MESSAGE_TITLE: 'Major Appliances are available for purchase nationwide. You can place an order on jcp.com, in an area store(see below), or call 1-844-JCP-APPL(1-844-527-2775)',
    productCompare: {
        maxProducts: 'Maximum (4) items selected',
        compareNow: 'Compare Now >',
    },
    THRESOLD_SAVEDITEMS: 50,
};

export default Constants;
