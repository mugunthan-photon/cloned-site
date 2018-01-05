import React from 'react';
import DepartmentVisualNav from '../DepartmentVisualNav';

const stories = [{
    name: 'Visual Navigation',
    story: () => (
        <DepartmentVisualNav
            direction="Fluid"
            pageName="department"
            nTypeID="N-bwo3w"
            departmentTitle="Shop Departments"
            automationId="test-automation-deplist"
        />
    ),
}];

export default stories;
