import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DisplayApiErrorMessage from '../DisplayApiErrorMessage';

const mockStore = configureStore([]);
const store = mockStore({
    apiErrorMsgs: [
        {
            errorId: 'ADJUSTMENTS_POST_ERROR',
            errorType: 'error',
            errorCode: 'SRV_PROMOCODE_INVALID',
            errorMessage: 'Enter a valid code.',
        },
    ],
});

const stories = [{
    name: 'DisplayApiErrorMessage',
    story: () => (
        <div>
            <Provider store={store}>
                <DisplayApiErrorMessage/>
            </Provider>)
        </div>
    ),
}];

export default stories;
