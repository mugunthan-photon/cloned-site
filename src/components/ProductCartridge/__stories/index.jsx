import React from 'react';
import ProductCartridge from '../../ProductCartridge/ProductCartridge';

const stories = [
    {
        name: 'ProductCartridge',
        story: () => (
            <div>
                <ProductCartridge
                    pageType="PRODUCT"
                    automationId="test-automation-product-cartridge"
                    slotId="product4_rr"
                    loader="certona"
                    attributes={{ customerid: '', itemid: '1cca9b9', recommendations: true }}
                    theme="compact"
                />

                <ProductCartridge
                    pageType="PRODUCT"
                    automationId="test-automation-product-cartridge"
                    slotId="product1_rr"
                    loader="certona"
                    attributes={{ customerid: '', itemid: '1cca9b9', recommendations: true }}
                    theme="compact"
                />

                <ProductCartridge
                    pageType="PRODUCT"
                    automationId="test-automation-product-cartridge"
                    slotId="product2_rr"
                    loader="certona"
                    attributes={{ customerid: '', itemid: '1cca9b9', recommendations: true }}
                    theme="compact"
                />
            </div>
        ),
    },
    {
        name: 'SaveForLaterProductCartridge',
        story: () => (
            <div>
                <ProductCartridge
                    pageType="cart"
                    automationId="test-automation-product-cartridge"
                    slotId="saved_items"
                    loader="getAllSaveForLater"
                    attributes={{ customerid: '', recommendations: true }}
                    customRenderProductCard={false}
                />
            </div>
        ),
    },
];

export default stories;
