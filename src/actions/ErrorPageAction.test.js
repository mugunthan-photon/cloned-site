import { expect } from 'chai';
import * as actionTypes from '../actionTypes/ErrorPageActionTypes';
import * as actions from './ErrorPageAction';

describe('ErrorPageAction', () => {
    const ERROR_PAGE_STATUS_MOCK = 'ERROR_PAGE_STATUS_MOCK';
    const ERROR_PAGE_MESSAGE_MOCK = 'ERROR_PAGE_MESSAGE_MOCK';

    describe(actionTypes.SHOW_ERROR_PAGE, () => {
        it('should emit show error page event', () => {
            const action = actions.showErrorPage(ERROR_PAGE_STATUS_MOCK, ERROR_PAGE_MESSAGE_MOCK);

            expect(action.type).to.equal(actionTypes.SHOW_ERROR_PAGE);
            expect(action.payload.status).to.equal(ERROR_PAGE_STATUS_MOCK);
            expect(action.payload.message).to.equal(ERROR_PAGE_MESSAGE_MOCK);
        });
    });
    describe(actionTypes.REMOVE_ERROR_PAGE, () => {
        it('should emit remove error page event', () => {
            const action = actions.removeErrorPage();

            expect(action.type).to.equal(actionTypes.REMOVE_ERROR_PAGE);
        });
    });
});
