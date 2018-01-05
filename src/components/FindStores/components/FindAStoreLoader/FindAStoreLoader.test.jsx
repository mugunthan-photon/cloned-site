import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FindAStoreLoader } from './FindAStoreLoader';

describe('<FindStoresLocationForm />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<FindAStoreLoader displayLoader={false}/>);
    });

    // it('Should not render loader', () => {
    //     expect(wrapper.find('Loader').length).to.equal(0);
    // });

    it('Should render Loader', () => {
        wrapper.setProps({
            displayLoader: true,
        });
        expect(wrapper.find('Loader').length).to.equal(1);
    });
});
