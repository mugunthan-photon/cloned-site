import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TimerHelper } from 'yoda-core-components/lib/components/Timer/Timer';
import TimerWrapper from './TimerWrapper';

const finishTime = new Date(new Date(Date.now() + (1000 * 60 * 60 * 24 * 10)).getTime() + (20 * 60 * 1000));

TimerHelper.getTimeRemaining(finishTime);

describe('Test Suite for <TimerWrapper/> ', () => {
    it('Check wrapper to exist', () => {
        const finishTime1 = new Date();
        finishTime1.setHours(new Date().getHours() + 1);
        TimerHelper.getTimeRemaining(finishTime1);

        const wrapper = shallow(<TimerWrapper />);
        wrapper.setProps({
            wrapperBackgroundTheme: '',
            timerTextColor: '',
            liveTextLabel: '',
            liveTextLabelColor: '',
            finishTime: new Date(),
            wrapperClassName: '',
            timerParentWrapper: '',
            livetextTheme: '',
            displayTimer: '',
            timerZone: 'CST',
            timerWrapperThemeConfig: [],
            timerSuffix: false,
            removeTimerZeros: false,
        });
        wrapper.setState({ isOfferExpired: true });
        expect(wrapper).to.exist;
        const instance = wrapper.instance();
        instance.expiredOffer();
    });
    it('Check wrapper to exist', () => {
        const wrapper = shallow(<TimerWrapper />);
        wrapper.setProps({
            wrapperBackgroundTheme: '',
            timerTextColor: '',
            liveTextLabel: '',
            liveTextLabelColor: '',
            finishTime: new Date(new Date(Date.now() + (1000 * 60 * 60 * 24 * 10)).getTime() + (20 * 60 * 1000)),
            wrapperClassName: 'wrapperClassName',
            timerParentWrapper: 'timerParentWrapper',
            livetextTheme: '#ffff',
            displayTimer: '',
            timerZone: 'CST',
            timerWrapperThemeConfig: [],
            timerSuffix: false,
            removeTimerZeros: false,
            removeLiveTextOnDays: true,
        });
        wrapper.setState({ isOfferExpired: true });
        TimerHelper.getTimeRemaining(
            new Date(new Date(Date.now() + (1000 * 60 * 60 * 24 * 10)).getTime() + (20 * 60 * 1000)));
        expect(wrapper).to.exist;
        const instance = wrapper.instance();
        instance.checkForTimerUpdate();
        instance.renderTimer();
    });

    it('Less than 10 mins', () => {
        const today = new Date(new Date(new Date().getTime() + 300000));
        const finDate = `${today.toDateString()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        const wrapper = shallow(<TimerWrapper />);
        wrapper.setProps({
            wrapperBackgroundTheme: '',
            timerTextColor: '',
            liveTextLabel: '',
            liveTextLabelColor: '',
            finishTime: finDate,
            wrapperClassName: 'wrapperClassName',
            timerParentWrapper: 'timerParentWrapper',
            livetextTheme: '#ffff',
            displayTimer: '',
            timerZone: '(IST)',
            timerWrapperThemeConfig: [],
            timerSuffix: false,
            removeTimerZeros: false,
            removeLiveTextOnDays: true,
        });
        wrapper.setState({ isOfferExpired: true });
        TimerHelper.getTimeRemaining(finDate);
        expect(wrapper).to.exist;
        const instance = wrapper.instance();
        instance.checkForTimerUpdate();
        instance.renderTimer();
    });
});
