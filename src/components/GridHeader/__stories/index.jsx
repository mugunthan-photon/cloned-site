import React from 'react';
import GridHeader from '../GridHeader';

console.log('Test yssysysysysysy');
const stories = [
    {
        name: 'GridHeaders',
        story: () => (
            <div>
                <GridHeader headerTitle="title wrap1 line max 21 charac" />
            </div>
        ),
    },
];

export default stories;
