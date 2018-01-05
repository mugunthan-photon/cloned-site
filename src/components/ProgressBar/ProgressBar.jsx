import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './ProgressBar.css';

const cx = classNames.bind(styles);
class ProgressBar extends Component {
    static propTypes = {
        points: PropTypes.objectOf(PropTypes.object).isRequired,
        automationId: PropTypes.string,
    };

    static defaultProps = {
        automationId: null,
    }

    render() {
        const points = this.props.points;
        let position = '';
        let leftPosition = {};
        let msg = false;
        let thresHold = false;
        if (points.earnedPoints < 175) {
            position = Math.round(((points.earnedPoints / 200) * 100).toFixed(2));
            leftPosition = {
                left: (position < 10) ? 4 : `${(position - 8)}%`,
            };
            thresHold = true;
        } else if (points.earnedPoints > 174 && points.earnedPoints < 200) {
            leftPosition = {
                right: `${(points.pointsAway + 15)}px`,
            };
            msg = true;
        } else {
            leftPosition = {
                right: '5px',
            };
        }

        const earnedPoints = points.earnedPoints < 10 ? 10 : points.earnedPoints;
        return (
            <div>
                <div className={cx('certsRewardsSlider')}>
                    <p className={cx('certsRewardsSliderText')}>Points
                    </p>
                    <div className={cx('rewardsInfo')}>
                        <p className={cx('rewardsInfoText')}>${points.dollarThreshold}</p>
                        <p className={cx('rewardsInfoText')}>reward</p>
                    </div>
                    <div className={cx('certsRewardsProgress')}>
                        <span style={leftPosition} className={cx('certsRewardsPonitsSpan')}>
                            {points.earnedPoints} {msg && <span>of 200</span>}
                        </span>
                        {thresHold && <span className={cx('certsRewardsPonitsTotalSpan')}>
                            {points.pointsThreshold}
                        </span>}
                        <progress className={cx('certsRewardsProgressBar')} value={earnedPoints} max={points.pointsThreshold} data-automation-id={this.props.automationId}/>
                    </div>
                    <p className={cx('certsRewardsSliderPointText')}>{points.pointsAway} points away from your next <span>${points.dollarThreshold} reward </span></p>
                </div>
            </div>
        );
    }
}

export default ProgressBar;
