import React from 'react';
import classNames from 'classnames/bind';
import TimerWrapper from '../../TimerWrapper/TimerWrapper';
import * as styles from './storybookTheme.css';


const cx = classNames.bind(styles);

const finishTime = new Date(new Date());
finishTime.setHours(new Date().getHours() + 1);

const myTheme = {
    timerContainerClass: styles.timerContainers,
    timerWrapperClass: styles.timer,
    timerListItemClass: styles.timerListItem,
    timerNumberClass: styles.timerNumber,
    timerTextClass: styles.timerText,
    timerSuffixClass: cx('timerListItem', 'timerSuffix'),
    timerDigitClass: styles.timerDigit,
    timerAnimateClass: styles.timerAnimateClass,
};

const stories = [{
    name: 'TimerWrapper',
    story: () => (
        <div>
            <TimerWrapper liveTextLabelColor={'#C4D92E'} wrapperBackgroundTheme={'#3765A1'} liveTextLabel={'Ends in'} timerTextColor={'#000000'}/>
            <h4> <i><u>Timer with LiveTextLabelColor</u></i> </h4>
            <TimerWrapper liveTextLabelColor={'#FFFF00'} wrapperBackgroundTheme={'#384048'} liveTextLabel={'Starts At'} removeTimerZeros/>
            <h4> <i><u>Timer that uses themeConfig and colorConfiguration</u></i> </h4>
            <TimerWrapper
                colorConfig={{
                    textColor: '#ffffff',
                    suffixColor: '#ffffff',
                    digitBoxbgColor: '#ffffff',
                }}
                digitSplit
                endTime={finishTime}
                timerWrapperThemeConfig={myTheme}
                liveTextLabel={'HURRY! COUPON CODE 48GOSHOP ENDS IN'}
                displayTimer={styles.displayTimer}
                timerParentWrapper={styles.timerParentWrapper}
                liveTextLabelClassName={styles.liveTextLabelClassName}
                wrapperClassName={styles.wrapperClassName}
                timerSuffix
                animate
                timerAnimateClass={myTheme.timerAnimateClass}
            />
            <h4> <i><u>Timer with default values</u></i> </h4>
            <TimerWrapper liveTextLabel={'Starts At'}/>
        </div>
    ),
}];

export default stories;
