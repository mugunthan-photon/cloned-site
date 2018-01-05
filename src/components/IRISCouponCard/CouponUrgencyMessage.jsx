import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import TimerWrapper from '../TimerWrapper/TimerWrapper';
import * as styles from './CouponUrgencyMessage.css';

const cx = classNames.bind(styles);

class CouponUrgencyMessage extends Component {
    static propTypes = {
        expiryDate: PropTypes.instanceOf(Date),
        liveTextColor: PropTypes.string,
        timerTextColor: PropTypes.string,
        timerZone: PropTypes.string,
    }
    static defaultProps = {
        expiryDate: null,
        liveTextColor: '',
        timerTextColor: '',
        timerZone: '',
    }

    render() {
        const { expiryDate, timerTextColor, liveTextColor, timerZone } = this.props;
        return (<div className={cx('urgencyStatementWrapper')}>
            <TimerWrapper
                finishTime={expiryDate}
                timerTextColor={timerTextColor}
                liveTextLabelColor={liveTextColor}
                timerZone={timerZone}
            />
        </div>);
    }
}

export default CouponUrgencyMessage;
