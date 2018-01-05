import * as IrisActionTypes from '../actionTypes/IrisActionTypes';

const getIrisTemplateData = params => ({
    type: IrisActionTypes.IRIS_TEMPLATE_LOAD_REQUEST,
    params,
});


export default {
    getIrisTemplateData,
};
