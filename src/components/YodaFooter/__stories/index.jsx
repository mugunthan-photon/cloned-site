import React from 'react';
import YodaFooter from '../../YodaFooter/YodaFooter';

const stories = [
    {
        name: 'Expanded Footer',
        story: () => (
            <div>
                <h2>Expanded Footer</h2>
                <YodaFooter expandedFooter />
                <br/><br/>
                <h2>Condensed view</h2>
                <YodaFooter condensedFooter />
                <br/><br/>
                <h2>Alternate Condensed View</h2>
                <YodaFooter AlternatecondensedFooter />
                <br/><br/>
                <h2>Ultra Condensed View</h2>
                <YodaFooter UltraCondensedFooter/>
            </div>
        ),
    },
];

export default stories;
