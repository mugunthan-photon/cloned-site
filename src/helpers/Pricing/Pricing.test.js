import { expect } from 'chai';
import Pricing, { getPriceFormat } from './Pricing';
import inputData, { outputData, outputDataDefault } from './mock';


describe('Pricing: price formatter utility testing ', () => {
    it('Should return null', () => {
        expect(Pricing.getPrice()).to.equal(null);
    });

    it('Should return formatted data', () => {
        const formattedData = Pricing.getPrice(inputData);
        expect(formattedData).to.deep.equal(outputData);
    });

    it('Should return default output data if any of the amount is undefined', () => {
        const sampleInput1 = Object.assign({}, inputData);
        const sampleInput2 = Object.assign({}, inputData);
        const sampleOutput2 = {
            defaults: '$110 - $170',
            original: '',
            originalType: '',
            percentOff: '',
            type: '',
        };
        const sampleInput3 = {
            id: 'pp5004140045',
            amounts: [
                {
                    max: 30,
                    min: 20,
                    type: 'original',
                    minPercentOff: 0,
                    maxPercentOff: 0,
                },
                {
                    max: 30,
                    min: 20,
                    type: 'DEFAULT',
                    minPercentOff: 0,
                    maxPercentOff: 0,
                },
            ],
        };
        const sampleOutput3 = {
            defaults: '$20 - $30',
            original: '',
            originalType: '',
            percentOff: '',
            type: '',
        };
        sampleInput1.amounts = sampleInput1.amounts.slice(0, 1);
        sampleInput2.amounts[0].type = 'default';
        sampleInput2.amounts = [undefined, sampleInput2.amounts[0]];
        const formattedDataForInput1 = Pricing.getPrice(sampleInput1);
        const formattedDataForInput2 = Pricing.getPrice(sampleInput2);
        const formattedDataForInput3 = Pricing.getPrice(sampleInput3);
        expect(formattedDataForInput1).to.deep.equal(outputDataDefault);
        expect(formattedDataForInput2).to.deep.equal(sampleOutput2);
        expect(formattedDataForInput3).to.deep.equal(sampleOutput3);
    });
});


describe('Pricing: getPriceFormat function testing', () => {
    it('Pricing - Testing formatter with equal min and max values', () => {
        const formattedCurrency = getPriceFormat(50, 50, true);
        expect(formattedCurrency).to.equal('$50');
    });

    it('Pricing - Testing formatter with unequal min and max values', () => {
        const formattedCurrency = getPriceFormat(40, 50, true);
        expect(formattedCurrency).to.equal('$40 - $50');
    });

    it('Discount - Testing formatter with equal min and max values', () => {
        const formattedCurrency = getPriceFormat(50, 50, false);
        expect(formattedCurrency).to.equal('50% off');
    });

    it('Discount - Testing formatter with unequal min and max values', () => {
        const formattedCurrency = getPriceFormat(40, 50, false);
        expect(formattedCurrency).to.equal('40 - 50% off');
    });
});
