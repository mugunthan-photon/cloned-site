import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import EcoRebates from './EcoRebates';


describe('<EcoRebates /> - Product Card', () => {
    let wrapper;
    const ecoProps = {
        skuId: 11234,
        ecoRebate: true,
    };
    const initialState = { openRebatesModal: false };

    beforeEach(() => {
        wrapper = shallow(<EcoRebates {...ecoProps} />);
    });

    it('Should render "Rebates Available" link', () => {
        expect(wrapper.find('span.link').length).to.equal(1);
    });

    it('Should render Model on click of rebate link', () => {
        wrapper.find('Button').simulate('click', { preventDefault: () => {}, stopPropagation: () => {} });
        expect(wrapper.state().openRebatesModal).to.equal(true);
        expect(wrapper.find('[modalTheme="rebateModalBlock"]').length).to.equal(1);
        wrapper.instance().closeRebatesModal();
    });

    it('Should not render "Rebates Available" link', () => {
        wrapper.setProps({ ecoRebate: false });
        expect(wrapper.find('span.link').length).to.equal(0);
        expect(wrapper.instance().state).to.deep.equal(initialState);
    });
});
