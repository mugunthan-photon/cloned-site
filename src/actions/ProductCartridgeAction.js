import * as ProductCartridgeActionTypes from '../actionTypes/ProductCartridgeActionTypes';

const getProductListForCartridgeSlot = (props) => {
    const { pageType, deviceType, slotId, loader, attributes, host, regionZone } = props;
    const payload = { pageType, deviceType, slotId, loader, attributes, host, regionZone };
    let invokeLoader = loader;

    // Each loader should have unique constant name to trigger respective watcher saga
    switch (loader) {
        case 'certona':
            invokeLoader = ProductCartridgeActionTypes.FETCH_DATA_FROM_CERTONA;
            break;
        case 'getAllSaveForLater':
            invokeLoader = ProductCartridgeActionTypes.FETCH_DATA_SAVE_FOR_LATER;
            break;
        default:
            break;
    }

    return {
        type: invokeLoader, payload,
    };
};

/* istanbul ignore next */
const resetProductCartridgeStore = () => ({
    type: ProductCartridgeActionTypes.RESET_PRODUCT_CARTRIDGE_REDUCER,
});

export default {
    getProductListForCartridgeSlot,
    resetProductCartridgeStore,
};
