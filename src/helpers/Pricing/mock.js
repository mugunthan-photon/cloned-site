export default {
    id: 'pp5004140045',
    amounts: [
        {
            max: 170,
            min: 110,
            type: 'ORIGINAL',
            minPercentOff: 0,
            maxPercentOff: 0,
        },
        {
            max: 84.99,
            min: 54.99,
            type: 'SALE',
            minPercentOff: 50,
            maxPercentOff: 50,
        },
    ],
};

export const outputData = {
    defaults: '$54.99 - $84.99',
    original: '$110 - $170',
    originalType: 'original',
    percentOff: '50% off',
    type: 'SALE',
};

export const outputDataDefault = {
    defaults: null,
    original: '$110 - $170',
    originalType: 'original',
    percentOff: null,
    type: null,
};
