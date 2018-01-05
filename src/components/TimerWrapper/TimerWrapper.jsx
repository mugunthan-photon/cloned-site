import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import Timer, { TimerHelper } from 'yoda-core-components/lib/components/Timer/Timer';
import * as styles from './TimerWrapper.css';

const cx = classNames.bind(styles);

class TimerWrapper extends Component {
    static propTypes = {
        wrapperBackgroundTheme: PropTypes.string,
        timerTextColor: PropTypes.string,
        liveTextLabel: PropTypes.string,
        liveTextLabelColor: PropTypes.string,
        wrapperClassName: PropTypes.string,
        timerParentWrapper: PropTypes.string,
        livetextTheme: PropTypes.string,
        displayTimer: PropTypes.string,
        finishTime: PropTypes.instanceOf(Date),
        timerZone: PropTypes.string,
        timerWrapperThemeConfig: PropTypes.objectOf([PropTypes.object, PropTypes.array]),
        timerSuffix: PropTypes.bool,
        removeTimerZeros: PropTypes.bool,
        liveTextLabelClassName: PropTypes.string,
        timerTextConfig: PropTypes.shape({
            h: PropTypes.string,
            m: PropTypes.string,
            s: PropTypes.string,
        }),
        text: PropTypes.oneOf(['on', 'off']),
        removeLiveTextOnDays: PropTypes.string,
        colorConfig: PropTypes.shape({
            textColor: PropTypes.string,
            suffixColor: PropTypes.string,
            digitBoxbgColor: PropTypes.string,
        }),
        digitSplit: PropTypes.bool,
        animate: PropTypes.bool,
    };

    static defaultProps = {
        wrapperBackgroundTheme: '',
        timerTextColor: '',
        liveTextLabel: '',
        livetextLabelClass: '',
        liveTextLabelColor: '',
        finishTime: null,
        wrapperClassName: '',
        timerParentWrapper: '',
        livetextTheme: '',
        displayTimer: '',
        timerZone: 'CST',
        timerWrapperThemeConfig: [],
        timerSuffix: false,
        removeTimerZeros: false,
        timerTextConfig: {
            h: 'hours',
            m: 'mins',
            s: 'secs',
        },
        text: 'on',
        removeLiveTextOnDays: '',
        liveTextLabelClassName: '',
        digitSplit: false,
        colorConfig: {
            textColor: '',
            suffixColor: '',
            digitBoxbgColor: '',
        },
        animate: false,
    };

    static getThemeConfig(timerWrapperThemeConfig) {
        return Object.assign({}, {
            timerContainerClass: cx('timerContainer'),
            timerWrapperClass: cx('timer'),
            timerListItemClass: cx('timerListItem'),
            timerNumberClass: cx('timerNumber'),
            timerTextClass: cx('timerText'),
            timerSuffixClass: cx('timerListItem'),
        }, timerWrapperThemeConfig);
    }

    constructor(props) {
        super(props);
        this.expiredOffer = this.expiredOffer.bind(this);
        this.checkForTimerUpdate = this.checkForTimerUpdate.bind(this);
        this.state = {
            isOfferExpired: false,
        };
        this.timerWrapperThemeConfig = TimerWrapper.getThemeConfig(props.timerWrapperThemeConfig);
        this.checkForTimerUpdate();
    }

    expiredOffer() {
        this.setState({
            isOfferExpired: true,
        });
    }

    checkForTimerUpdate() {
        const timeRemaining = TimerHelper.getTimeRemaining(`${this.props.finishTime} ${this.props.timerZone}`);
        if (timeRemaining.hours === 0 && timeRemaining.minutes <= 10) {
            setTimeout(() => {
                this.forceUpdate();
            }, (timeRemaining.min * 60 * 1000), this);
        }
    }

    renderTimer() {
        const timeRemaining = TimerHelper.getTimeRemaining(`${this.props.finishTime} ${this.props.timerZone}`);
        const displayTime = timeRemaining.days === 0 && timeRemaining.total > 0;
        const displayTimerWithTime = displayTime ? cx('displayTimerWithTime') : '';
        const { animate, colorConfig, digitSplit, removeTimerZeros, timerSuffix, text, timerTextConfig,
                finishTime, timerZone, displayTimer, liveTextLabelColor } = this.props;
        return (<div className={cx('display-timer', displayTimer, displayTimerWithTime)} style={{ color: liveTextLabelColor }}>
            { displayTime ?
                <Timer
                    endTime={`${finishTime} ${timerZone}`}
                    themeConfig={this.timerWrapperThemeConfig}
                    timerTextConfig={timerTextConfig}
                    text={text}
                    suffix={timerSuffix}
                    completeCallback={this.expiredOffer}
                    removeZeros={removeTimerZeros}
                    digitSplit={digitSplit}
                    timerTextColor={this.props.liveTextLabelColor}
                    colorConfig={colorConfig}
                    animate={animate}/>
                : `${timeRemaining.days + 1} DAYS LEFT!`
                        }
        </div>);
    }

    render() {
      // prop extraction
        const { wrapperBackgroundTheme, timerTextColor, liveTextLabel, wrapperClassName,
            timerParentWrapper, livetextTheme, removeLiveTextOnDays, liveTextLabelClassName } = this.props;

        // Time remaining calculation with helper
        const timeRemaining = TimerHelper.getTimeRemaining(`${this.props.finishTime} ${this.props.timerZone}`);

        const timer = timeRemaining.days === 0 && timeRemaining.total > 0;
        const liveTextTimer = timer ? cx('liveTextTimer') : '';
        const timeParentWrapper = timer ? cx('timeParentWrapper') : '';

        const offerExpiredClass = this.state.isOfferExpired || timeRemaining.total ? cx('timer-expiredclass') : '';

        // Theming with classes
        const themeObject = {
            WrapperClass: cx('timer-wrapper', wrapperClassName, offerExpiredClass),
            Timerparent: cx('timerparent-wrapper', timerParentWrapper, timeParentWrapper),
            LivetextClassName: cx('livetext', livetextTheme, liveTextTimer),
            liveTextLabelClassName: cx('liveTextLabel', liveTextLabelClassName),
        };

        // livetext html
        let liveTextHtml = ((liveTextLabel.trim() !== '' && liveTextLabel) ? (<span
            className={themeObject.liveTextLabelClassName}
            style={{ color: timerTextColor }}>{ liveTextLabel }</span>) : null);

        if (removeLiveTextOnDays && timeRemaining.days > 0) {
            liveTextHtml = (<span className={cx(removeLiveTextOnDays)}>
                { liveTextLabel }</span>);
        }


        return (
            <div
                className={themeObject.WrapperClass}
                style={{ backgroundColor: wrapperBackgroundTheme, color: timerTextColor }}> {
                this.state.isOfferExpired || timeRemaining.total < 0 ? 'Offer has expired' :
                <div className={themeObject.Timerparent}>
                    <div className={themeObject.LivetextClassName} style={{ color: timerTextColor }}>
                        {liveTextHtml} {this.props.finishTime ? this.renderTimer() : ''}
                    </div>

                </div>
                }
            </div>
        );
    }
}

export default TimerWrapper;
