import React from 'react';
import { YodaDropdown } from '../YodaDropdown';

const dataSource = [
    {
        displayKey: 'Regular',
        value: 1,
    },
    {
        displayKey: 'Slim',
        value: 2,
    },
];

const stories = [
    {
        name: 'YodaDropdown',
        story: () => (
            <div>
                <div>
                    Dropdown view L & XL : <YodaDropdown
                        dataSource={dataSource}
                        defaultValue="Select"
                    />
                </div>
                <div>
                    Dropdown view S & M : &nbsp;
                    <YodaDropdown
                        defaultValue="Select"
                        dataSource={dataSource}
                        deviceType={{ isMobile: true }}
                        />
                </div>
            </div>
        ),
    },
];
export default stories;
