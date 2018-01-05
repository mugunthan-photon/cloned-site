import * as actionTypes from '../actionTypes/BarcodeStatusActionType';

export default function BarcodeStatusReducer(state = false, action) {
    switch (action.type) {
        case actionTypes.SHOW_BARCODE_REQUEST:
            return action.payload;
        default:
            return state;
    }
}
