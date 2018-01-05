import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import TimerWrapper from '../TimerWrapper/TimerWrapper';
import * as styles from './GridHeader.css';


const cx = classNames.bind(styles);

const myTheme = {
    timerContainerClass: styles.timerContainer,
    timerWrapperClass: styles.timer,
    timerListItemClass: styles.timerListItem,
    timerNumberClass: styles.timerNumber,
    timerTextClass: styles.timerText,
    timerSuffixClass: styles.timerListItem,
};

const GridHeader = (props) => {
    const backgroundColor = { backgroundColor: props.liveTextBackGroundColor };
    const timerBlockHtml = (<div className={cx('timeLeft')}>
        {/* <div className={cx('timeLeftBlock')}>
                <span className={cx('timerText')} style={liveTextColor} >{props.liveText}</span>
            </div> */}
        <div className={cx('timeRightBlock')}>
            <TimerWrapper
                finishTime={props.timer}
                timerWrapperThemeConfig={myTheme} timerTextColor={props.timerTextColor}
                liveTextLabelColor={props.liveTextColor}
                wrapperBackgroundTheme={props.liveTextBackGroundColor}
                livetextTheme={styles.liveText}
                liveTextLabelClassName={styles.liveTextLabel}
                displayTimer={styles.remainingTime}
                timerSuffix liveTextLabel={props.liveText}
                removeLiveTextOnDays={styles.daysLeft}
                removeTimerZeros timerZone={props.timerZone} />
        </div>
    </div>);

    /**
     * MarketingHtml and timer class Managed.
     */
    let marketingTextHtml = '';
    let timerBlockClass = cx('gridTimerBlock', 'xl12', 'lg12', 'md12', 'sm12');


    if (props.marketingText) {
        marketingTextHtml = (<div className={cx('gridTitleBlock', 'xl8', 'lg7', 'md6', 'sm12')} style={{ color: props.marketingTextColor }} >
            <h3 className={cx('gridTitle')}>{props.marketingText.toUpperCase()}</h3>
        </div>);
        timerBlockClass = cx('gridTimerBlock', 'xl4', 'lg5', 'md6', 'sm12');
    }


    return (
        <div className={cx('gridHeaderContainer', 'row')} >
            {marketingTextHtml}

            {/* Timer Block starts */}
            <div className={timerBlockClass} style={backgroundColor}>
                {timerBlockHtml}
            </div>
            {/* Timer Block Ends */}
        </div>
    );
};


GridHeader.defaultProps = {
    titleColorStyle: '',
    liveText: '',
    liveTextColor: '',
    timerTextColor: '',
    timer: '',
    liveTextBackGroundColor: '',
    timerZone: 'CST',
    marketingText: '',
    marketingTextColor: '',
};

GridHeader.propTypes = {
    liveText: PropTypes.string,
    liveTextColor: PropTypes.string,
    timerTextColor: PropTypes.string,
    liveTextBackGroundColor: PropTypes.string,
    timer: PropTypes.string,
    timerZone: PropTypes.string,
    marketingText: PropTypes.string,
    marketingTextColor: PropTypes.string,
};

export default GridHeader;
