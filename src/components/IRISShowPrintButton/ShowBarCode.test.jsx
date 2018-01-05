import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ShowBarCodeConnect, { ShowBarCode } from './ShowBarCode';
import { termsText, unmergeCouponData } from '../../../test/mockData/CouponsData';


describe('Test Suite for ShowBarCode', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        actions: { isBarcodeModalOpen: sinon.spy() },
    });
    const wrapper = mount(
        <Provider store={store}>
            <ShowBarCodeConnect
                offerDetails={unmergeCouponData[1].offers[0]}
                termsText={termsText}
                modalAutoId="barCodeModal"
            />
        </Provider>,
    );

    window.print = () => { };
    window.print = sinon.spy(window.print);

    it('ShowBarCode component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('To check if the print button works', () => {
        expect(window.print).to.have.been.calledOnce;
    });

    it('print Option Configured', () => {
        const printMock = { href: 'https://e.jcpenney.com', label: 'print' };
        const printWrapper = mount(
            <Provider store={store}>
                <ShowBarCodeConnect
                    offerDetails={unmergeCouponData[1].offers[0]}
                    termsText={termsText}
                    modalAutoId="barCodeModal"
                    printOption={printMock}
                    printConfig
                />
            </Provider>,
        );
        printWrapper.find('.couponBarcodeBtn').simulate('click');
        printWrapper.find('ModalBox').find('Button').simulate('click');
        expect(printWrapper).to.exist;
    });

    it('print Option Configured, no href', () => {
        const printMock = { href: null, label: 'print' };
        const printWrapper = mount(
            <Provider store={store}>
                <ShowBarCodeConnect
                    offerDetails={unmergeCouponData[1].offers[0]}
                    termsText={termsText}
                    modalAutoId="barCodeModal"
                    printOption={printMock}
                    printConfig
                />
            </Provider>,
        );
        expect(printWrapper).to.exist;
    });

    it('Test for checking handle Print button is called', () => {
        const printMock = { href: 'https://localhost:3000/', label: 'print' };
        const data = {
            bodyCopy: 'select apparel, shoes, accessories, fine jewelry & home',
            headLine: 'EXTRA 30% OFF',
        };
        const test = shallow(
            <ShowBarCode
                offerDetails={data}
                termsText={termsText}
                modalAutoId="barCodeModal"
                printOption={printMock}
                printConfig
            />);
        expect(test.find('Button').length).to.equal(1);
        test.find('Button').props().onClick();
        expect(test).to.exist;
    });

    it('Test for checking not to handle Print button', () => {
        const printMock = { href: 'https://localhost:3000/', label: 'print' };
        const data = {
            bodyCopy: 'select apparel, shoes, accessories, fine jewelry & home',
            headLine: 'EXTRA 30% OFF',
        };
        const test = shallow(
            <ShowBarCode
                offerDetails={data}
                termsText={termsText}
                modalAutoId="barCodeModal"
                printOption={printMock}
                printConfig
                showPrintButtonGlobal
            />);
        expect(test.find('Button').length).to.equal(0);
    });
});
