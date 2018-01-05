import * as IrisActionTypes from '../actionTypes/IrisActionTypes';

export default function IrisReducer(state = {}, action) {
    switch (action.type) {
        case IrisActionTypes.IRIS_TEMPLATE_LOAD_SUCCESS:
            return action.irisData;
        default:
            return state;
    }
}
