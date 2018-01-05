const datasource = {
    image: '//s7d9.scene7.com/is/image/JCPenney/DP0908201617430787M.tif?$gallery$',
    title: 'Liz Claiborne 3/4 Sleeve Crew Neck Pullover Sweater',
    id: 'pp5003521148',
    automationId: 'product-cartridge-product-list',
    customClass: '',
    rating: 4.95,
    reviewCount: 230,
    usage: 'grid',
    badge: {
        text: 'New',
        theme: 'redBadge',
    },
    extendedSize: 'Extended Sizes Available',
    skuSwatch: [
        {
            colorName: 'Ivory',
            swatchImageId: 'DP0316201717084746S.jpg',
            colorizedImageId: 'DP0316201717084696M.tif',
            colorSeqNum: 1,
        },
    ],
    ecoRebate: true,
    showSaveForlater: false,
    protectionPlan: { warrantyId: '12', warrantyName: 'test', warrantyPrice: 20 },
    qty: '10',
    attributes: [
        {
            type: 'TYPE (MONO/PERSONLZ)',
            value: '4 - NAME',
        },
        {
            type: 'THREAD COLOR',
            value: 'A',
        },
        {
            type: 'POSITION / LOCATION',
            value: 'POCKET',
        },
    ],
};

const datasourcenull = {
    image: '//s7d9.scene7.com/is/image/JCPenney/DP0908201617430787M.tif?$gallery$',
    title: 'Liz Claiborne 3/4 Sleeve Crew Neck Pullover Sweater',
    id: 1,
    automationId: 'product-cartridge-product-list',
    customClass: '',
    rating: 4.95,
    reviewCount: 230,
    usage: 'grid',
    badge: null,
    extendedSize: null,
    protectionPlan: { warrantyId: '' },
    attributes: [
        {
            type: 'TYPE (MONO/PERSONLZ)',
            value: '4 - NAME',
        },
        {
            type: 'THREAD COLOR',
            value: 'A',
        },
        {
            type: 'POSITION / LOCATION',
            value: 'POCKET',
        },
    ],
};

const priceDetails = {
    amounts: [
        {
            max: 2350,
            min: 2050,
            type: 'original',
            minPercentOff: 60,
            maxPercentOff: 70,
        },
        {
            max: 2450.90,
            min: 2550,
            type: 'clearance',
            minPercentOff: 50,
            maxPercentOff: 60,
        },
    ],
    manufacturerAdvertised: false,
    marketingLabel: 'SPOTLIGHT DEAL!',
    promotions: [{ message: 'promotion offer pricing details information 50% off' }],
};

export {
    datasource,
    priceDetails,
    datasourcenull,
};
