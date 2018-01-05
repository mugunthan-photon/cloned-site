import { expect } from 'chai';
import sinon from 'sinon';
import CertonaLoader from './CertonaLoader';


describe('Certona loader testing with schemes', () => {
    let successSpy;
    const initVal = global.__SERVER__;
    before(() => {
        global.__SERVER__ = false;
    });

    beforeEach((done) => {
        const schemes = [];
        const certonaPromise = CertonaLoader.load({
            payload: {
                pageType: 'HOME',
                deviceType: { isDesktop: true },
                attributes: {
                    customerid: 'FefDvRp1hyiUU6t',
                    recommendations: true,
                },
            },
        });
        successSpy = sinon.spy();
        window.certonaRecommendations({ resonance: { schemes } });
        certonaPromise.then(() => {
            successSpy();
            done();
        });
        global.__SERVER__ = initVal;
    });

    it('Should invoke success callback on certonaRecommendations', () => {
        expect(successSpy.calledOnce).equal(true);
    });

    after(() => {
        global.__SERVER__ = initVal;
    });
});


describe('Certona loader testing without schemes', () => {
    let successSpy;
    const initVal = global.__SERVER__;
    before(() => {
        global.__SERVER__ = false;
    });

    beforeEach((done) => {
        const certonaPromise = CertonaLoader.load({
            payload: {
                pageType: 'HOME',
                deviceType: { isDesktop: false },
                attributes: {
                    recommendations: true,
                },
            },
        });
        successSpy = sinon.spy();
        window.certonaRecommendations({ resonance: {} });
        certonaPromise.then(() => {
            successSpy();
            done();
        });
    });

    it('Should invoke success callback on certonaRecommendations', () => {
        expect(successSpy.calledOnce).equal(true);
    });

    after(() => {
        global.__SERVER__ = initVal;
    });
});
