import React from 'react';
import List from 'yoda-core-components/lib/components/List/List';
import YodaTooltip from '../YodaTooltip';

const stories = [
    {
        name: 'YodaTooltip',
        story: () => {
            const listArr = [
                {
                    text: 'My Account',
                    id: 1,
                    key: 1,
                },
                {
                    text: 'My Orders',
                    originalPrice: '44',
                    id: 2,
                    key: 2,
                },
                {
                    text: 'My Rewards',
                    originalPrice: '44',
                    id: 3,
                    key: 3,
                },
                {
                    text: 'My Lists',
                    originalPrice: '44',
                    id: 3,
                    key: 3,
                },
                {
                    text: 'Account Settings',
                    originalPrice: '44',
                    id: 3,
                    key: 3,
                },
                {
                    text: 'Notifications',
                    originalPrice: '44',
                    id: 3,
                    key: 3,
                },
                {
                    text: 'Sign Out',
                    originalPrice: '44',
                    id: 3,
                    key: 3,
                },
            ];

            const listItemRenderer = dataItem => <span key={dataItem.id}>{dataItem.text}</span>;
            const renderTooltipData = () => (
                <List direction="Vertical" datasource={listArr} childRenderer={listItemRenderer} automationId="tooltip-automation-content" />
            );

            return (
                <YodaTooltip renderTooltipContents={renderTooltipData()} direction={'Bottomright'} tooltipPlacement={'Right'} triggerEventName={'click'}>
                    <div>{'Click On the tooltip text to get tooltip'}</div>
                </YodaTooltip>
            );
        },
    },
];

export default stories;
