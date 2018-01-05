import React from 'react';
import FindAStorePage from '../FindAStorePage';

const stories = [
    {
        name: 'Find a Store Page',
        story: () => (
            <div>
                {/* <FindAStorePage /> */}
                <FindAStorePage theme="findAStorePage" selectStoreAction={() => { console.log('multiSelectStore'); }}/>
            </div>
),
    },
];
export default stories;
