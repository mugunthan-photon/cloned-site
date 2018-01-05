import React from 'react';
import MarketingOptInSection from '../../MarketingOptInSection/MarketingOptInSection';

export default [
    {
        name: 'MarketingOptInSection',
        story: () => (<div>
            <MarketingOptInSection automationId="test-automation-marketing" type="email" placeholder="Email address" buttonType="dark"> SIGN UP </MarketingOptInSection>
            <br />
            <MarketingOptInSection automationId="test-automation-marketing" type="tel" placeholder="Phone Number" buttonType="dark"> SIGN UP </MarketingOptInSection>
        </div>),
    },
];
