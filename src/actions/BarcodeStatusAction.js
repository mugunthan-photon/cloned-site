import * as BarcodeStatusActionType from '../actionTypes/BarcodeStatusActionType';

const isBarcodeModalOpen = payload => ({
    type: BarcodeStatusActionType.SHOW_BARCODE_REQUEST,
    payload,
});

export default {
    isBarcodeModalOpen,
};
