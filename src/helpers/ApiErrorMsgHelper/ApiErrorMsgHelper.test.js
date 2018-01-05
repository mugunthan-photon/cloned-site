import { expect } from 'chai';
import ApiErrorMsgHelper from './ApiErrorMsgHelper';

describe('ApiErrorMsgHelper: Test suite for addApiResponseErrorToStore()', () => {
    let result;

    it('ApiErrorMsgHelper - 1', () => {
        result = ApiErrorMsgHelper.addApiResponseErrorToStore(
            'ADJUSTMENTS_POST_ERROR',
            {
                status: 500,
                statusText: 'Internal Server Error',
                data: [
                    {
                        errorCode: 'SRV_PROMOCODE_INVALID',
                        errorMessage: 'Enter a valid code.',
                    },
                ],
            },
        );
        expect(result).to.be.a('object');
    });

    it('ApiErrorMsgHelper - 2', () => {
        result = ApiErrorMsgHelper.addApiResponseErrorToStore(
            'ADJUSTMENTS_POST_ERROR',
            {
                status: 500,
                statusText: 'Internal Server Error',
                data: [
                    {
                        errorCode: null,
                        errorMessage: null,
                    },
                ],
            },
        );
        expect(result).to.be.a('object');
    });

    it('ApiErrorMsgHelper - 3', () => {
        result = ApiErrorMsgHelper.addApiResponseErrorToStore(
            'ADJUSTMENTS_POST_ERROR',
            {
                status: 500,
                statusText: 'Internal Server Error',
                data: [],
            },
        );
        expect(result).to.be.a('object');
    });

    it('ApiErrorMsgHelper - 4', () => {
        result = ApiErrorMsgHelper.removeErrorMsgFromStore('ADJUSTMENTS_POST_ERROR');
        expect(result).to.be.a('object');
    });
});
