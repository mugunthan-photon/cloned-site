import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ProgressBar from './ProgressBar';

describe('<ProgressBar />', () => {
    let wrapper;
    const points = {
        pointsAway: 200,
        earnedPoints: 300,
        pointsThreshold: 200,
        expiryDate: '02/13/2018',
        dollarThreshold: 10,
    };
    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<ProgressBar points={points} />);
    });

    it('Slider component should exist ', () => {
        expect(wrapper).to.exist;
    });
});

describe('<ProgressBar />', () => {
    let wrapper;
    const points = {
        pointsAway: 195,
        earnedPoints: 5,
        pointsThreshold: 200,
        expiryDate: '02/13/2018',
        dollarThreshold: 10,
    };
    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<ProgressBar points={points} />);
    });

    it('Slider component should exist ', () => {
        expect(wrapper).to.exist;
    });
});

describe('<ProgressBar />', () => {
    let wrapper;
    const points = {
        pointsAway: 15,
        earnedPoints: 185,
        pointsThreshold: 200,
        expiryDate: '02/13/2018',
        dollarThreshold: 10,
    };
    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<ProgressBar points={points} />);
    });

    it('Slider component should exist ', () => {
        expect(wrapper).to.exist;
    });
});
