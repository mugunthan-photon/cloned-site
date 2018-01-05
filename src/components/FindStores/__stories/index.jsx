import React from 'react';
import { FindStores } from '../FindStores';
import { findStoresDetails, productDetails } from './FindStoresDetails';

findStoresDetails.isSlidePanelOpen = true;
const stories = [
    {
        name: 'FindStores for 1 item in cart',
        story: () => (
            <div>
                <FindStores
                    productDetails={productDetails[0]}
                    findStoresAction={() => {}}
                    selectStoreAction={() => {}}
                    actions={() => {}}
                    findStoresDetails={findStoresDetails} // This will come from redux store
                />
            </div>
        ),
    },
    {
        name: 'FindStores for many items in cart',
        story: () => (
            <div>
                <FindStores
                    productDetails={productDetails}
                    findStoresAction={() => {}}
                    selectStoreAction={() => {}}
                    actions={() => {}}
                    findStoresDetails={findStoresDetails} // This will come from redux store
                />
            </div>
        ),
    },
];

export default stories;
