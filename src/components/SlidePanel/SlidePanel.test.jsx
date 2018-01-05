import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import SlidePanel from './SlidePanel';

describe('Test Suite for <SlidePanel /> ', () => {
    let wrapper;
    let falseWrapper;
    let isCallBackExecuted = false;

    const onClosePanel = () => {
        isCallBackExecuted = true;
    };

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(
            <SlidePanel isOpenPanel onClosePanel={onClosePanel} >
                <h1>Child component</h1>
            </SlidePanel>,
        );
        falseWrapper = mount(<SlidePanel isOpenPanel={false} onClosePanel={onClosePanel} />);
    });

    it('SlidePanel component should exist is openPanel true ', () => {
        expect(wrapper).to.have.length(1);
        expect(wrapper.props().isOpenPanel).to.equal(true);
        wrapper.update();
        expect(document.body.classList.contains('slide-panel-open')).to.be.true;
        wrapper.unmount();
        expect(document.body.classList.contains('slide-panel-open')).to.be.false;
    });

    it('SlidePanel component should exist is openPanel false ', () => {
        expect(falseWrapper).to.have.length(1);
        expect(falseWrapper.props().isOpenPanel).to.equal(false);
        falseWrapper.update();
        expect(document.body.classList.contains('slide-panel-open')).to.be.false;
    });

    it('SlidePanel back button click should execute OnClosePanel callback', () => {
        wrapper.find('[data-automation-id="at-slide-back-button"]').simulate('click');
        expect(isCallBackExecuted).to.equal(true);
    });
});
