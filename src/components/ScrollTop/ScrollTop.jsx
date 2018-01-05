import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'yoda-core-components/lib/components/Button/Button';
import PointCross from 'yoda-core-components/lib/components/PointCross/PointCross';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import classNames from 'classnames/bind';
import styles from './ScrollTop.css';

const cx = classNames.bind(styles);

export class ScrollTop extends PureComponent {
    static propTypes = {
        stickyClass: PropTypes.string,
        deviceType: PropTypes.oneOfType([PropTypes.object]),
        bottomOffset: PropTypes.number,
        topOffset: PropTypes.number,
    }

    /*
     * @params
     * ratio: At which part of the screen the 'scrollTop' button should be presented.
     * eg: 2: half part of screen, 3: 1/3 part of the screen, 4: quarter part of the screen.
     * scrollPoint: Point in pixels at which the 'scrollTop' button should be presented. Default is window height.
     * stickyClass: user defined class for stickTop button.
     * Note: ratio is given priority than the scrollPoint(if both props are given).
     */
    static defaultProps = {
        stickyClass: '',
        deviceType: {
            isMobile: false,
            isTablet: false,
            isDesktop: false,
        },
        bottomOffset: -600,
        topOffset: 0,
    }

    constructor() {
        super();
        this.state = {
            aboveThreshold: false,
        };
    }

    onScrollToTopClick = () => {
        window.scrollTo(0, 1);
    }

    getIcon() {
        if (this.props.deviceType.isMobile) {
            return (<Icon iconType="svg" width="48px" height="48px" viewBox="0 0 55 55" name="back-to-top-lg" pathClassName={cx('backTop')} />);
        }
        return (<Icon iconType="svg" width="55px" height="55px" viewBox="0 0 55 55" name="back-to-top-lg" pathClassName={cx('backTop')} />);
    }

    beforePoint = () => {
        const { aboveThreshold } = this.state;
        (aboveThreshold) && this.setState({
            aboveThreshold: false,
        });
    }

    afterPoint = () => {
        const { aboveThreshold } = this.state;
        (!aboveThreshold) && this.setState({
            aboveThreshold: true,
        });
    }

    render() {
        const { aboveThreshold } = this.state;
        const { stickyClass, topOffset, bottomOffset } = this.props;
        return (
            <PointCross
                topOffset={topOffset}
                bottomOffset={bottomOffset}
                beforePoint={this.beforePoint}
                afterPoint={this.afterPoint}>
                <Button onClick={this.onScrollToTopClick} className={cx((stickyClass || 'scrollTop'), aboveThreshold ? 'slideIn' : 'slideOut')}>
                    <div className={cx('wrapper')}>
                        {this.getIcon()}
                    </div>
                </Button>
            </PointCross>
        );
    }
}

const mapStateToProps = store => ({
    deviceType: store.context ? store.context.deviceType : {},
});

export default connect(mapStateToProps)(ScrollTop);
