import sinon from 'sinon';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';

import Storage from './Storage';

describe('Storage', () => {
    describe('load functionality', () => {
        it('secure', () => {
            sinon.spy(LocalStorage, 'getData');
            Storage.ssl = true;
            Storage.load('a', 'b');
            expect(LocalStorage.getData.calledOnce).to.be.true;
            LocalStorage.getData.restore();
        });

        it('non-secure', () => {
            sinon.spy(Cookies, 'load');
            Storage.ssl = false;
            Storage.load('a', 'b');
            expect(Cookies.load.calledOnce).to.be.true;
            Cookies.load.restore();
        });
    });

    describe('save functionality', () => {
        it('secure', () => {
            sinon.spy(LocalStorage, 'setData');
            Storage.ssl = true;
            Storage.save('a', 'b', true);
            expect(LocalStorage.setData.calledOnce).to.be.true;
            LocalStorage.setData.restore();
        });

        it('non-secure', () => {
            sinon.spy(Cookies, 'save');
            Storage.ssl = false;
            Storage.save('a', 'b', true);
            expect(Cookies.save.calledOnce).to.be.true;
            Cookies.save.restore();
        });
    });

    describe('remove functionality', () => {
        it('secure', () => {
            sinon.spy(LocalStorage, 'removeData');
            Storage.ssl = true;
            Storage.remove('a');
            expect(LocalStorage.removeData.calledOnce).to.be.true;
            LocalStorage.removeData.restore();
        });

        it('non-secure', () => {
            sinon.spy(Cookies, 'remove');
            Storage.ssl = false;
            Storage.remove('a');
            expect(Cookies.remove.calledOnce).to.be.true;
            Cookies.remove.restore();
        });
    });
});
