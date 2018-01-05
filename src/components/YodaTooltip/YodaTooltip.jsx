import classNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import config from './YodaTooltip.config';
import * as styles from './YodaTooltip.css';

const cx = classNames.bind(styles);
/**
 * tooltip placement
 *
 * TOPLEFT -> render tooltip on top of the required element positioned at left
 * BOTTOMRIGHT -> render tooltip at the bottom of the required element positioned at right
 * TOPRIGHT -> render tooltip on top of the required element positioned at right
 * BOTTOMLEFT -> render tooltip at the bottom of the required element positioned at left
 *
 * */
class YodaTooltip extends Component {
    static propTypes = {
        /*
          Tooltip element on which we wants to get tooltip
        */
        children: PropTypes.oneOfType(PropTypes.string, PropTypes.node, PropTypes.object),
        /**
         * Set style that would be appended to tooltip body and element
         * @type {String}
         */
        tooltipBodyClassName: PropTypes.string,
        tooltipTextClass: PropTypes.string,
        /* callback function to display tooltip data that we wants to display inside tooltip */
        renderTooltipContents: PropTypes.oneOfType(PropTypes.fun, PropTypes.object),
        /* set style that would be appended to tooltip */
        tooltipContentClass: PropTypes.string,
        /* Tolltip direction */
        direction: PropTypes.oneOf([
            config.direction.BOTTOMRIGHT,
            config.direction.BOTTOMLEFT,
            config.direction.TOPRIGHT,
            config.direction.TOPLEFT,
            config.direction.RIGHT,
            config.direction.RIGHTALIGN,
            config.direction.LEFTALIGN,
        ]),
        tooltipPlacement: PropTypes.oneOf([
            config.tooltipPlacement.RIGHT,
            config.tooltipPlacement.LEFT,
            config.tooltipPlacement.MIDDLE,
        ]),
        triggerEventName: PropTypes.oneOf([
            config.triggerEventName.CLICK,
            config.triggerEventName.MOUSEOVER,
        ]),
        callBackFun: PropTypes.oneOfType(PropTypes.fun, PropTypes.object),
    //    stayInView: PropTypes.bool,
        theme: PropTypes.string,
        /* By default onclick of tooltip conent Tooltip will get hidden - Send false to disable this feature */
        disableHideOnContentClick: PropTypes.bool,
        tabbable: PropTypes.bool,
    }
    static defaultProps = {
        placement: 'topright',
        children: 'tooltip',
        tooltipBodyClassName: '',
        tooltipTextClass: '',
        renderTooltipContents: '',
        tooltipContentClass: 'tooltip',
        direction: 'Bottomright',
        tooltipPlacement: 'Right',
        triggerEventName: config.triggerEventName.CLICK,
        callBackFun: () => {},
        // stayInView: false,
        theme: '',
        disableHideOnContentClick: false,
        tabbable: false,
    }
    constructor() {
        super();
        this.state = {
            tooltipPosition: '',
            isOpen: false,
        };
        this.getPosition = this.getPosition.bind(this);
        this.onClickTooltip = this.onClickTooltip.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
    }

    componentWillUnmount() {
        this.removeOutsideClickListener();
    }
    onClickTooltip(event) {
        event.nativeEvent.preventDefault();
        if (this.props.triggerEventName !== event.type) return;
        // event.nativeEvent.stopImmediatePropagation();
        const position = this.getPosition();
        this.setState({
            tooltipPosition: position,
        });
        this.toggleTooltip(!this.state.isOpen);

        /* if (!this.props.stayInView) {
            this.toggleTooltip(this.state.isOpen);
        } else {
            this.toggleTooltip(!this.state.isOpen);
        } */
    }
    getPosition() {
        let placement;
        if (this.tooltip) {
            const position = this.tooltip.getBoundingClientRect();
            const popupTop = position.top;
            const popupLeft = position.left;
            const popupWidth = position.width;
            const popupHeight = position.height;
            // const popupParentWidth = position.width;
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            const topBoundary = popupTop - popupHeight;
            const leftBound = popupLeft - popupWidth;
            const bottomBoundary = popupTop + popupHeight;
            const leftBoundary = (popupLeft > 0);
            const rightBoundary = ((popupLeft + popupWidth) < windowWidth);
            if (bottomBoundary < windowHeight) {
              // leftBoundary>0
                if (leftBoundary && rightBoundary) {
                    placement = 'bottom';
                }
            } else if (topBoundary > 0) {
              /* istanbul ignore next */
                if (leftBoundary && rightBoundary) {
                    placement = 'top';
                }
            } else if (leftBound > 0) {
                placement = 'left';
            } else {
                placement = 'right';
            }
        }
        return placement;
    }

    addOutsideClickListener = () => {
        if (!__SERVER__) {
            document.addEventListener('click', this.toggleTooltip, false);
        }
    }

    removeOutsideClickListener = () => {
        if (!__SERVER__) {
            document.removeEventListener('click', this.toggleTooltip, false);
        }
    }

    toggleTooltip(value) {
        let placeValue = false;
        if (typeof value === 'boolean') {
            placeValue = value;
        }
        if (this.props.triggerEventName === config.triggerEventName.CLICK) {
            placeValue ? this.addOutsideClickListener() : this.removeOutsideClickListener();
        }
        this.setState({
            isOpen: placeValue,
        }, () => {
            this.props.callBackFun(this.state.isOpen);
        });
    }

    render() {
        const { children, tooltipBodyClassName, theme, tooltipTextClass, renderTooltipContents,
          tooltipPlacement, direction, tooltipContentClass, triggerEventName,
          disableHideOnContentClick, tabbable } = this.props;
        const tooltipClassNames = cx('TooltipWrapper', tooltipBodyClassName);
        const tooltipClassname = cx(tooltipTextClass, 'tooltip');
        const tooltipContentsClassName = cx('tooltip-text', theme, tooltipContentClass, direction, tooltipPlacement);
        let additionalContentEvents = {};
        if (disableHideOnContentClick) {
            additionalContentEvents = {
                onMouseOver: this.removeOutsideClickListener,
                onMouseLeave: this.addOutsideClickListener,
            };
        }
        const tabbableProps = !tabbable ? { tabIndex: -1 } : {};
        const handlerProps =
                triggerEventName === config.triggerEventName.MOUSEOVER ?
                {
                    onMouseOver: this.onClickTooltip,
                    onMouseLeave: () => this.toggleTooltip(),
                }
                :
                {
                    onClick: this.onClickTooltip,
                };
        return (
            <div
                className={tooltipClassNames} ref={(node) => { this.tooltip = node; }} onMouseDown={this.getPosition}>
                <button
                    type="button"
                    className={tooltipClassname}
                    {...handlerProps}
                    {...tabbableProps}
                    >
                    {children}
                </button>
                <div
                    style={(this.state.isOpen) ? { visibility: 'visible' } : { visibility: 'hidden' }}
                    className={tooltipContentsClassName}
                    {...additionalContentEvents}
                >
                    {renderTooltipContents}
                </div>
            </div>
        );
    }
}
export default YodaTooltip;
