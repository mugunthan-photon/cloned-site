import ClassNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import * as styles from './Tooltip.css';


const cx = ClassNames.bind(styles);

class Tooltip extends Component {
    static propTypes = {
        /**
         * HTML wrapped inside wrapper html
         * @type {[type]}
         */
        isVisible: React.PropTypes.bool.isRequired,
        children: React.PropTypes.oneOfType(PropTypes.string, PropTypes.node, PropTypes.object).isRequired,
        handleTooltipClose: React.PropTypes.func.isRequired,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,
        theme: PropTypes.string,
    };

    static defaultProps = {
        automationId: null,
        theme: '',
    }

    constructor() {
        super();
        this.state = {
            tooltipVisible: true,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible) {
            this.addMouseDownEvent();
        } else {
            this.removeMouseDownEvent();
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isVisible) {
            this.addMouseDownEvent();
        } else {
            this.removeMouseDownEvent();
        }
    }

    handlePageClick(e) {
        this.props.handleTooltipClose(e);
    }

    addMouseDownEvent() {
        document.addEventListener('mousedown', this.handlePageClick);
    }

    removeMouseDownEvent() {
        document.removeEventListener('mousedown', this.handlePageClick);
    }

    render() {
        const { children, isVisible, automationId } = this.props;
        if (isVisible) {
            return (
                <div
                    className={cx('tooltipWrapper', this.props.theme)}>
                    <div className={styles.tooltipInnerWrapper} data-automation-id={automationId}>
                        {children}
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default Tooltip;
