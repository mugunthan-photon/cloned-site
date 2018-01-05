import * as types from '../actionTypes/OrderActionTypes';

export default function OrdersReducer(state = [], action) {
    let compiledState = null;
    const container = action.stores;

    switch (action.type) {

        case types.GET_STORES_GET_SUCCESS:
            if (container && container.stores.length > 0) {
                if (container.patchPayload && container.patchPayload === true) {
                    compiledState = [...state].concat(container.stores);
                } else {
                    compiledState = container.stores;
                }
            } else {
                compiledState = { status: " We couldn't find a store there. Make sure you entered the correct ZIP or City and State." };
            }

            return compiledState;
        /* istanbul ignore next */
        case types.GET_STORES_GET_ERROR:
            compiledState = { status: " We couldn't find a store there. Make sure you entered the correct ZIP or City and State." };
            return compiledState;

        case types.CLEAR_STORE:
            return [];

        default:
            return state;
    }
}
