import React, { Component, PropTypes } from 'react';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import * as styles from './Slider.css';

class Slider extends Component {
    static propTypes = {
        /**
         * HTML wrapped inside Modal html
         * @type {[type]}
         */
        children: PropTypes.element.isRequired,
        /**
         * Accepts string "LEFT" and "RIGHT"
         */
        direction: PropTypes.string,
        /**
         * Title for the Slider comopnent
         */
        title: PropTypes.string,
        /**
         * Element to be used for the Navigation icon
         */
        customIcon: PropTypes.node,
        /**
         * To toggle the slider
         */
        toggleSlider: PropTypes.bool,

        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        automationId: PropTypes.string,
        closeMenuClick: PropTypes.func,
    };

    static defaultProps = {
        direction: 'LEFT',
        title: '',
        customIcon: '',
        toggleSlider: false,
        automationId: '',
        closeMenuClick: null,
    };

    static clearSliderLockOnPageLoad() {
        if (!__SERVER__) {
            /* istanbul ignore next */
            if (document.body.classList.contains('Slider-scrollLock')) {
                document.body.classList.remove('Slider-scrollLock');
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            slideOpen: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.menuClick = this.menuClick.bind(this);
        // remove scroll lock to body
        Slider.clearSliderLockOnPageLoad();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.toggleSlider !== nextProps.toggleSlider) {
            this.toggleSlideState(!this.state.slideOpen);
        }
    }


    toggleMenu = () => {
        if (this.state.slideOpen) {
            this.props.closeMenuClick();
        }
        this.toggleSlideState(!this.state.slideOpen);
    }

    closeMenu = () => {
        this.toggleSlideState(false);
    }

    toggleSlideState = (menuOpenStatus) => {
        if (menuOpenStatus) {
            document.body.classList.add('Slider-scrollLock');
        } else {
            document.body.classList.remove('Slider-scrollLock');
        }
        this.setState({
            slideOpen: menuOpenStatus,
        });
    }

    menuClick(ev) {
        this.menuOpen = true;
        ev.stopPropagation();
    }

    render() {
        const { children, direction, title, customIcon, automationId } = this.props;

        let slideToggle = styles.verticalSlide;
        let wrapperClass = styles.menuWrapper;
        const toggleMenu = (this.props.customIcon) ? (<button onClick={this.toggleMenu}>{customIcon}</button>)
            : (<button data-automation-id="jcp-menu" className={styles.menuLink} onClick={this.toggleMenu}>
                <span className={styles.menuText}>Shop</span>
            </button>);

        if (this.state.slideOpen) {
            slideToggle = `${styles.verticalSlide} ${styles.visible}`;
        }

        if (direction === 'RIGHT') {
            wrapperClass = `${styles.menuWrapper} ${styles.rightAlign}`;
        }

        return (
            <div className={styles.sliderWrapper} data-automation-id={automationId}>
                <div className={styles.iconWrapper} data-automation-id="button-menu">
                    {toggleMenu}
                </div>
                <a tabIndex="-1" className={slideToggle} onClick={this.closeMenu}>
                    {/* eslint-disable jsx-a11y/no-static-element-interactions */ }
                    <div tabIndex="-1" className={wrapperClass} onClick={this.menuClick}>
                        <button
                            onClick={this.toggleMenu} className={styles.menuWrapperClose}
                            data-automation-id="slider-button-close"
                        >
                            <span data-automation-id="hamburger-menu-title">{title}</span>
                            <i data-automation-id="hamburger-menu-close-icon" className={styles.menuCloseIcon}>
                                <Icon iconType="svg" width="22px" height="22px" viewBox="0 0 20 20" name="plus"/>
                            </i>
                        </button>

                        <div className={styles.slideChildWrapper} data-automation-id="slider-data">
                            {children}
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default Slider;
