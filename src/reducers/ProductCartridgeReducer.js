import * as types from '../actionTypes/ProductCartridgeActionTypes';

const initialState = {
    productCartridgeSlots: {},
    loaders: {},
};

export default function ProductCartridgeReducer(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case types.ADD_PRODUCT_CARTRIDGE_SLOT: {
            const slotData = Object.assign({}, state.productCartridgeSlots, action.slotData);
            return Object.assign({}, state, {
                productCartridgeSlots: slotData,
            });
        }
        case types.ADD_LOADER_TO_LIST:
        case types.ADD_CERTONA_LOADER_TO_LIST: {
            const { loader, pageType } = action.initialData.payload;
            let loaders;
          // If loader already exists then add the pageType else add both loader and pageType
            if (state.loaders[loader]) {
                loaders = Object.assign({}, state.loaders[loader], {
                    [pageType]: action.responseData,
                });
            } else {
                loaders = Object.assign({}, state.loaders, {
                    [loader]: { [pageType]: {} },
                });
            }

            return Object.assign({}, state, {
                loaders,
            });
        }

        case types.RESET_PRODUCT_CARTRIDGE_REDUCER: {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
}
