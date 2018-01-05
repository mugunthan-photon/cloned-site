import { expect } from 'chai';
import { mount } from 'enzyme';
import { beforeEach, describe, it } from 'mocha';
import React from 'react';
import VideoPlayer from './VideoPlayer';


describe('<VideoPlayer />', () => {
    let wrapper;
    let wrapperInstance;
    global.window.videojs = () => ({ play: () => {}, ready: () => {}, getPlayers: () => ({ videoId1234: {} }) });

    beforeEach(() => {
        wrapper = mount(
            <VideoPlayer />,
        );
        wrapperInstance = wrapper.instance();
    });

    it('ProductCard component should exist ', () => {
        wrapperInstance.playVideo();
        wrapper.find('VideoPlayer').props().onEnd();
        expect(wrapper).to.exist;
    });
});
