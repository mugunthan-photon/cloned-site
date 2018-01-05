import { expect } from 'chai';
import Utils from './Utils';

describe('User: Test suite for isUserLoggedIn()', () => {
    it('If slash missing then should return as /', () => {
        const path = Utils.getPathFromUrl('http://www.google.com');
        expect(path).to.be.eq('/');
    });

    it('Just hostname then should return as /', () => {
        const path = Utils.getPathFromUrl('http://www.google.com/');
        expect(path).to.be.eq('/');
    });

    it('What if http was missing', () => {
        const path = Utils.getPathFromUrl('www.google.com');
        expect(path).to.be.eq('/');
    });

    it('What if http was missing', () => {
        const path = Utils.getPathFromUrl(null);
        expect(path).to.be.eq('/');
    });

    it('if https should return the path', () => {
        const path = Utils.getPathFromUrl('https://www.google.com');
        expect(path).to.be.eq('/');
    });

    it('should return the path', () => {
        const path = Utils.getPathFromUrl('https://www.google.com/s/shirts');
        expect(path).to.be.eq('/s/shirts');
    });

    it('should return the path if path is invalid', () => {
        const path = Utils.getPathFromUrl('https//www.google.com/s/shirts');
        expect(path).to.be.eq('/');
    });

    it('should return the path even if hostname is missing', () => {
        const path = Utils.getPathFromUrl('/g/appliances/N-1b2ke21?pageType=X2H2');
        expect(path).to.be.eq('/g/appliances/N-1b2ke21?pageType=X2H2');
    });

    it('should return the path and query string', () => {
        const path = Utils.getPathFromUrl('https://www.google.com/s/shirts?s=shirts&cd=i09');
        expect(path).to.be.eq('/s/shirts?s=shirts&cd=i09');
    });

    it('should return true if the savedItems are less than 50', () => {
        const state = {
            savedItems: { test: 'test' },
        };
        const triggerSaveItem = Utils.triggerAddSaveItems(state);
        expect(triggerSaveItem).to.be.true;
    });

    it('should return true if the savedItems are empty', () => {
        const state = {
            savedItems: {},
        };
        const triggerSaveItem = Utils.triggerAddSaveItems(state);
        expect(triggerSaveItem).to.be.true;
    });

    it('should return true if the savedItems are not defined', () => {
        const state = {};
        const triggerSaveItem = Utils.triggerAddSaveItems(state);
        expect(triggerSaveItem).to.be.true;
    });
});
