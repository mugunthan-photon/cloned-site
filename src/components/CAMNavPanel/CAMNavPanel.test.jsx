import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import CAMNavPanel from './CAMNavPanel';


const navList = ['Rewards Home',
    'Benefits',
    'Special Offers',
    'View History',
    'Rewards Settings',
    'Link your JCP Credit Card',
    'FAQs',
    'Customer Service',
    'Rewards Terms & Conditions',
    'Shop Now',
];
const onClick = sinon.spy();
const navItemClick = sinon.spy();
const actions = {
    onClick,
    navItemClick,
};
describe('NavPanel', () => {
    const wrapper = mount(
        <CAMNavPanel
            navList={navList}
            actions={actions}
            onClick={onClick}
            route={{ path: '/rewards/dashboard' }}
             />,
        );

    it('should render CAMNavPanel section', () => {
        expect(wrapper.find('ul')).to.have.length(1);
    });


    it('should click nav item', () => {
        wrapper.find('button').at(0).simulate('click', { target: { value: 1 } });
    });

    mount(
        <CAMNavPanel
            navList={navList}
            actions={actions}
            onClick={onClick}
             />,
        );
});
