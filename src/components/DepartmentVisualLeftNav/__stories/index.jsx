import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DepartmentVisualLeftNav from '../DepartmentVisualLeftNav';
import LeftVisualNavMenuResponse from './mock';

const mockStore = configureStore([]);

const store = mockStore({
    departmentsVisualLeftNavigation: LeftVisualNavMenuResponse.LeftVisualNavMenuResponse,
});

const stories = [
    {
        name: 'DepartmentVisualLeftNav',
        story: () => (
            <Provider store={store}>
                <DepartmentVisualLeftNav
                    direction="Fluid"
                    nTypeID="N-bwo3w"
                    departmentTitle="Shop Departments"
                    automationId="test-automation-deplist"
                    deviceType="tablet"
                    softRoute
                    analyticsTag="TestTag"
                />
            </Provider>
        ),
    },
];

export default stories;

