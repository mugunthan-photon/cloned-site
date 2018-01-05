import React from 'react';
import BreadCrumbNav from '../BreadCrumbNav';
import BreadCrumbMockData from '../__stories/mock';

const stories = [
    {
        name: 'Breadcrumb',
        story: () => (
            <div>
                <BreadCrumbNav breadCrumbs={BreadCrumbMockData} nTypeId="N-bwo3v" />

            </div>
        ),
    },
];

export default stories;
