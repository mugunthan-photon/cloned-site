import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
    let tooltipWrapper;
    let handleTooltipCloseSpy;

    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        handleTooltipCloseSpy = sinon.spy();
        const tooltipProps = {
            isVisible: false,
            children: React.createElement('div'),
            handleTooltipClose: handleTooltipCloseSpy,
            automationId: '',
        };
        tooltipWrapper = mount(<Tooltip {...tooltipProps} />);
    });

    it('Tooltip component should exist ', () => {
        expect(tooltipWrapper).to.exist;
    });

    it('should invoke componentWillUpdate on update', () => {
        const componentWillUpdateSpy = sinon.spy(Tooltip.prototype, 'componentWillUpdate');
        tooltipWrapper.setProps({ isVisible: true });
        expect(tooltipWrapper.props().isVisible).to.equal(true);
        expect(componentWillUpdateSpy.callCount).to.equal(1);
        componentWillUpdateSpy.restore();
    });

    it('should invoke handlePageClick on mousedown', () => {
        const tooltipWrapperInstance = tooltipWrapper.instance();
        const handlePageClickSpy = sinon.spy(tooltipWrapperInstance, 'handlePageClick');
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('mousedown', false, true);
        document.dispatchEvent(evt);
        // console.log(handlePageClickSpy.callCount);
        expect(handlePageClickSpy).to.have.been.called;
    });

    it('should remove mousedown event', () => {
        const componentWillUpdateSpy = sinon.spy(Tooltip.prototype, 'componentWillUpdate');
        tooltipWrapper.setProps({ isVisible: false });
        expect(tooltipWrapper.props().isVisible).to.equal(false);
        expect(componentWillUpdateSpy.callCount).to.equal(1);
        componentWillUpdateSpy.restore();
    });
});
