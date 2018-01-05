import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ProductVideo from './ProductVideo';


describe('<ProductVideo />', () => {
    let wrapper;
    const videoProp = {
        deviceType: { isDesktop: true },
        videoId: '4864364180001',
        setParentState: () => {},
    };

    beforeEach(() => {
        wrapper = shallow(<ProductVideo {...videoProp} />);
    });

    it('Should render play video icon', () => {
        expect(wrapper.find('div.video').length).to.equal(1);
    });

    it('Play video on click of "Play Icon"', () => {
        const setParentStateSpy = sinon.spy();
        wrapper.setProps({ setParentState: setParentStateSpy, playVideo: true });
        wrapper.find('div.video button').simulate('click');
        expect(setParentStateSpy.callCount).to.equal(1);
        wrapper.setProps({ renderVideo: true });
        expect(wrapper.find('VideoPlayer').length).to.equal(1);
        wrapper.setProps({ playVideo: false });
        expect(wrapper.find('VideoPlayer').length).to.equal(0);
    });

    it('Should not render play video icon', () => {
        wrapper.setProps({ deviceType: { isDesktop: false } });
        expect(wrapper.find('div.video').length).to.equal(0);
    });
});

