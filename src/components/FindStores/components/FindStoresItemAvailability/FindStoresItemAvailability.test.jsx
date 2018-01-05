import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import FindStoresItemAvailability from './FindStoresItemAvailability';

const itemDetails1 = [
    {
        inventory: {
            pickUpStatus: 'AVAILABLE',
            imageURL: 'temp.png',
        },
    },
    {
        inventory: {
            pickUpStatus: 'UNAVAILABLE',
            imageURL: 'temp1.png',
        },
    },
];

const itemDetails2 = [
    {
        inventory: {
            pickUpStatus: 'UNAVAILABLE',
            imageURL: 'temp2.png',
        },
    },
];

describe('<FindStoresItemAvailability />', () => {
    let wrapper;

    describe('Rendered with no product details', () => {
        beforeEach(() => {
            wrapper = shallow(
                <FindStoresItemAvailability itemDetails={null}/>,
            );
        });

        it('FindStoresItemAvailability component should exist ', () => {
            expect(wrapper.find('div.container')).to.have.length(0);
        });
    });

    describe('Rendered with available product details', () => {
        beforeEach(() => {
            wrapper = mount(
                <FindStoresItemAvailability itemDetails={itemDetails1}/>,
            );
        });

        it('Available product images should be rendered ', () => {
            expect(wrapper.find('div.imageContainer')).to.have.length(1);
        });
    });

    describe('Rendered with unavailable product details', () => {
        beforeEach(() => {
            wrapper = mount(
                <FindStoresItemAvailability itemDetails={itemDetails2}/>,
            );
        });

        it('No product images should be rendered ', () => {
            expect(wrapper.find('div.container')).to.have.length(0);
        });
    });
});
