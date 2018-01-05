import React from 'react';
import SelectOptions from '../SelectOptions';
import mockData from './mock';

const { sizeRangeOptions, singleOption } = mockData;

const stories = [{
    name: 'SelectOptions',
    story: () => (<div>
        <h4>Multi Option Select</h4>
        <SelectOptions
            name="size range"
            datasource={sizeRangeOptions}
            displayKey="value"
            valueKey="id"
            onChange={() => { console.log('option Changed'); }}
        />
        <h4>Single Option Select</h4>
        <SelectOptions
            name="size range"
            datasource={singleOption}
            displayKey="value"
            valueKey="id"
            onChange={() => { console.log('option Changed'); }}
        />
    </div>),
}];

export default stories;
