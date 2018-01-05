import React from 'react';
import { Provider } from 'react-redux';
import cartridgeListResponse from './mock';
import CartridgeList from '../../CartridgeList/CartridgeList';

const initialProperties = {
    cartridgeList: cartridgeListResponse,
    deviceType: { isMobile: true },
    automationId: 'product-hotdeals-cartridge-list',
};
const stories = [
    {
        name: 'CartridgeList',
        story: () => (
            <div>
                <Provider>
                    <CartridgeList {...initialProperties}/>
                </Provider>
            </div>
        ),
    },
];

export default stories;
