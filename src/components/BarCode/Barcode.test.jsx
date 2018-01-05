import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import Barcode from './Barcode';
import GenerateBarCode from './GenerateBarcode';
import { unmergeCouponData } from '../../../test/mockData/CouponsData';

const img = '<svg width="237px" height="72px" x="0px" y="0px" viewBox="0 0 237 72" xmlns="http://www.w3.org/2000/svg" version="1.1" style="transform: translate(0px, 0px);"><rect x="0" y="0" width="237" height="72" style="fill:#ffffff;"></rect><g transform="translate(10, 10)" style="fill:#000000;"><rect x="0" y="0" width="2" height="80"></rect><rect x="3" y="0" width="1" height="80"></rect><rect x="6" y="0" width="1" height="80"></rect><rect x="11" y="0" width="1" height="80"></rect><rect x="13" y="0" width="3" height="80"></rect><rect x="17" y="0" width="2" height="80"></rect><rect x="22" y="0" width="1" height="80"></rect><rect x="26" y="0" width="1" height="80"></rect><rect x="30" y="0" width="2" height="80"></rect><rect x="33" y="0" width="3" height="80"></rect><rect x="37" y="0" width="1" height="80"></rect><rect x="40" y="0" width="2" height="80"></rect><rect x="44" y="0" width="2" height="80"></rect><rect x="48" y="0" width="1" height="80"></rect><rect x="50" y="0" width="3" height="80"></rect><rect x="55" y="0" width="2" height="80"></rect><rect x="58" y="0" width="3" height="80"></rect><rect x="63" y="0" width="1" height="80"></rect><rect x="66" y="0" width="1" height="80"></rect><rect x="69" y="0" width="3" height="80"></rect><rect x="74" y="0" width="2" height="80"></rect><rect x="77" y="0" width="2" height="80"></rect><rect x="81" y="0" width="1" height="80"></rect><rect x="83" y="0" width="3" height="80"></rect><rect x="88" y="0" width="2" height="80"></rect><rect x="91" y="0" width="3" height="80"></rect><rect x="96" y="0" width="1" height="80"></rect><rect x="99" y="0" width="1" height="80"></rect><rect x="102" y="0" width="3" height="80"></rect><rect x="107" y="0" width="2" height="80"></rect><rect x="110" y="0" width="1" height="80"></rect><rect x="113" y="0" width="3" height="80"></rect><rect x="118" y="0" width="2" height="80"></rect><rect x="121" y="0" width="2" height="80"></rect><rect x="125" y="0" width="3" height="80"></rect><rect x="130" y="0" width="1" height="80"></rect><rect x="132" y="0" width="1" height="80"></rect><rect x="135" y="0" width="3" height="80"></rect><rect x="139" y="0" width="2" height="80"></rect><rect x="143" y="0" width="1" height="80"></rect><rect x="146" y="0" width="3" height="80"></rect><rect x="150" y="0" width="2" height="80"></rect><rect x="154" y="0" width="1" height="80"></rect><rect x="157" y="0" width="3" height="80"></rect><rect x="161" y="0" width="2" height="80"></rect><rect x="165" y="0" width="1" height="80"></rect><rect x="168" y="0" width="3" height="80"></rect><rect x="172" y="0" width="2" height="80"></rect><rect x="176" y="0" width="2" height="80"></rect><rect x="180" y="0" width="3" height="80"></rect><rect x="184" y="0" width="1" height="80"></rect><rect x="187" y="0" width="1" height="80"></rect><rect x="190" y="0" width="3" height="80"></rect><rect x="195" y="0" width="2" height="80"></rect><rect x="198" y="0" width="1" height="80"></rect><rect x="201" y="0" width="3" height="80"></rect><rect x="205" y="0" width="2" height="80"></rect><rect x="209" y="0" width="1" height="80"></rect><rect x="212" y="0" width="3" height="80"></rect><rect x="216" y="0" width="2" height="80"></rect><rect x="220" y="0" width="1" height="80"></rect><rect x="223" y="0" width="3" height="80"></rect><rect x="227" y="0" width="2" height="80"></rect><rect x="231" y="0" width="1" height="80"></rect><rect x="234" y="0" width="3" height="80"></rect><rect x="238" y="0" width="2" height="80"></rect><rect x="242" y="0" width="3" height="80"></rect><rect x="246" y="0" width="2" height="80"></rect><rect x="249" y="0" width="3" height="80"></rect><rect x="253" y="0" width="1" height="80"></rect><rect x="256" y="0" width="3" height="80"></rect><rect x="260" y="0" width="2" height="80"></rect><rect x="264" y="0" width="3" height="80"></rect><rect x="269" y="0" width="1" height="80"></rect><rect x="271" y="0" width="2" height="80"></rect><rect x="275" y="0" width="2" height="80"></rect><rect x="279" y="0" width="1" height="80"></rect><rect x="284" y="0" width="1" height="80"></rect><rect x="286" y="0" width="2" height="80"></rect><rect x="291" y="0" width="3" height="80"></rect><rect x="295" y="0" width="1" height="80"></rect><rect x="297" y="0" width="2" height="80"></rect><text style="font: 20px monospace" text-anchor="middle" x="149.5" y="102">MC8351351120000610000709</text></g></svg>';
const JsBarcode = sinon.stub(GenerateBarCode.prototype, 'componentDidMount', function setRef() {
    this.reference = img;
});

describe(' Test suits for Barcode ', () => {
    const wrapper = mount(
        <Barcode barCodeData={unmergeCouponData[1].offers[0]} test={JsBarcode} />,
    );

    it('Barcode component must exist', () => {
        expect(wrapper).to.exist;
    });

    it('Barcode component should pass orderId prop', () => {
        wrapper.setProps({
            barCodeData: unmergeCouponData[1].offers[0],
        });
        expect(wrapper.props().barCodeData).to.equal(unmergeCouponData[1].offers[0]);
    });
    it('Generate barcode by setting cookie value', () => {
        Cookies.save('marketing', 'cpc', '', '');
        const marketing = mount(<Barcode barCodeData={unmergeCouponData[1].offers[0]} test={JsBarcode} />);
        expect(marketing).to.exist;
    });
});
