import React, { PropTypes } from 'react';
import List from 'yoda-core-components/lib/components/List/List';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import classNames from 'classnames/bind';
import * as styles from './CartridgeList.css';
import SiteComponent from '../SiteComponent/SiteComponent';

const cx = classNames.bind(styles);

const add = (param1, param2) => param1 + param2;
const subtract = (param1, param2) => param1 - param2;

const calculateScrollPixel = (mountedCartrdigeInfo) => {
    const {
        cartridgePanesDisplayed,
        totalCartridgePanes,
        scrollPixels,
        scrolledPanes,
        cartridgePaneWidth,
        scrollToRight,
        remainingWrapperWidth,
        disableRightArrow,
    } = mountedCartrdigeInfo;

    const operator = scrollToRight ? subtract : add;

    // Calculate remaining(hidden panes) cartridge panes in container to display
    const remainingCartridgesPanes = scrollToRight
        ? ((totalCartridgePanes - cartridgePanesDisplayed) - scrolledPanes)
        : scrolledPanes;

    // Calculate cartridge panes to show. It depends on the remaining panes and container size.
    /* istanbul ignore next */
    const numberOfPanesToMove = (remainingCartridgesPanes >= cartridgePanesDisplayed)
        ? cartridgePanesDisplayed
        : remainingCartridgesPanes;

    // Calculate next scroll position
    let scrollX = numberOfPanesToMove * cartridgePaneWidth;

    // Calculate the total number of panes which are scrolled
    const cartridgePanesScrolled = scrollToRight
        ? (scrolledPanes + numberOfPanesToMove)
        : (scrolledPanes - numberOfPanesToMove);

    // Calculate the total panes which are displaced from its original position
    const migratedCartridgePanes = scrollToRight
        ? add(cartridgePanesScrolled, cartridgePanesDisplayed)
        : cartridgePanesScrolled;

    if (totalCartridgePanes === migratedCartridgePanes || disableRightArrow) {
        scrollX -= remainingWrapperWidth;
    }

    const scrollContentBy = operator(scrollPixels, scrollX);

    return {
        scrollContentBy,
        migratedCartridgePanes,
        cartridgePanesScrolled,
    };
};

export default class CartridgeList extends SiteComponent {
    static propTypes = {
        cartridgeList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        /**
        * Set style that would be appended to list body
        * @type {String}
        */
        listBodyClass: PropTypes.string,

        automationId: PropTypes.string,

        deviceType: PropTypes.objectOf(PropTypes.object).isRequired,

        cartridgeListRenderer: PropTypes.func.isRequired,
    };

    static defaultProps = {
        cartridgeList: [],
        listBodyClass: '',
        automationId: '',
        deviceType: {},
    };

    /* istanbul ignore next */
    constructor(props) {
        super(props);
        this.state = {
            listStyle: {},
            disableLeftArrow: true,
            disableRightArrow: false,
            currentDotIndex: 1,
            isMounted: false,
        };
    }

    scrollStatus = {
        scrollPixels: 0,
        scrolledPanes: 0,
    };

    componentDidMount() {
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
        if (!this.state.isMounted) {
            // eslint-disable-next-line
            this.setState({ isMounted: true });
        }
    }

    // get pagination method will call only for desktop channel
    getPaginationButtons = () => {
        const { disableLeftArrow, disableRightArrow } = this.state;
        const leftArrowClass = cx({ iconClass: true, disabledArrow: disableLeftArrow });
        const rightArrowClass = cx({ iconClass: true, disabledArrow: disableRightArrow });
        return (
            <div>
                <button
                    className={cx('arrow', 'leftArrow')} disabled={disableLeftArrow}
                    onClick={() => this.scrollCartridge(false)}>
                    <Icon
                        iconType="svg" className={'arrow-icon'} width="19.5px" height="29px" viewBox="0 0 20 20"
                        name="arrow-left"
                        pathClassName={leftArrowClass}
                    />
                </button>
                <button
                    className={cx('arrow', 'rightArrow')} disabled={disableRightArrow}
                    onClick={() => this.scrollCartridge(true)}>
                    <Icon
                        iconType="svg" className={'arrow-icon'} width="19.5px" height="29px"
                        viewBox="0 0 20 20"
                        name="arrow-right"
                        pathClassName={rightArrowClass} />
                </button>
            </div>
        );
    }

    displayRightArrow = (wrapper) => {
        this.wrapper = wrapper;
        if (this.props.deviceType.isDesktop && !this.isListMounted && wrapper) {
            const cartridgePaneRecWidth = this.cartridgePane && this.cartridgePane.getBoundingClientRect().width;
            const wrapperWidth = this.wrapper && this.wrapper.getBoundingClientRect().width;
            const cartridgePaneWidth = cartridgePaneRecWidth + (cartridgePaneRecWidth / 10);
            // Calculate number of cartridges displayed in the container
            const totalCartridgePanes = this.props.cartridgeList.length;
            const result = (wrapperWidth / cartridgePaneWidth);
            const cartridgePanesDisplayed = Math.floor(result);
            this.isListMounted = true;
            this.setState({
                disableRightArrow: totalCartridgePanes <= cartridgePanesDisplayed,
            });
        }
    }

    // scrollCartridge will call when user tapping on page navigation.
    scrollCartridge = (scrollToRight) => {
        const wrapperWidth = this.wrapper.getBoundingClientRect().width;
        const cartridgePaneWidth = this.cartridgePane.getBoundingClientRect().width +
            (this.cartridgePane.getBoundingClientRect().width / 10);
        const { scrollPixels, scrolledPanes } = this.scrollStatus;

        // Calculate number of cartridges displayed in the container
        const totalCartridgePanes = this.props.cartridgeList.length;
        const result = (wrapperWidth / cartridgePaneWidth);
        const cartridgePanesDisplayed = Math.floor(result);
        const remainingWrapperWidth = (result - cartridgePanesDisplayed).toFixed(2) * cartridgePaneWidth;

        const mountedCartrdigeInfo = {
            cartridgePanesDisplayed,
            totalCartridgePanes,
            scrollPixels,
            scrolledPanes,
            cartridgePaneWidth,
            scrollToRight,
            remainingWrapperWidth,
            disableRightArrow: this.state.disableRightArrow,
        };

        const {
          scrollContentBy,
            cartridgePanesScrolled,
            migratedCartridgePanes,
        } = calculateScrollPixel(mountedCartrdigeInfo);

        this.scrollStatus.scrollPixels = scrollContentBy;
        this.scrollStatus.scrolledPanes = cartridgePanesScrolled;

        this.setState({
            disableLeftArrow: (migratedCartridgePanes === 0),
            disableRightArrow: (migratedCartridgePanes === totalCartridgePanes),
            listStyle: {
                transform: `translate(${scrollContentBy}px)`,
            },
        });
    };

    getDots = () => {
        const { cartridgeList } = this.props;
        const pane = this.props.cartridgePane || this.cartridgePane;
        const wrapperWidth = this.wrapper ? this.wrapper.getBoundingClientRect().width : 0;
        const productPaneWidth = pane ? pane.getBoundingClientRect().width : 0;

        const totalProductPanes = cartridgeList.length;
        const result = (wrapperWidth / productPaneWidth);
        const productPanesDisplayed = Math.floor(result);
        const numberOfDots = Math.ceil(totalProductPanes / productPanesDisplayed);
        const generateDots = () => {
            const listDots = [];
            for (let i = 1; i <= numberOfDots; i += 1) {
                let checkStatus = false;
                if (this.state.currentDotIndex === i) {
                    checkStatus = true;
                }
                listDots.push(<span>
                    <input type="radio" checked={checkStatus} />
                    <label htmlFor="cartridge">Go to item </label>
                </span>);
            }
            return listDots.length > 1 ? listDots : [];
        };

        return (
            <nav className={cx('carousel')} >
                {generateDots()}
            </nav>
        );
    }

    /* istanbul ignore next */
    delayedExec = (after, fn) => {
        /* istanbul ignore next */
        this.timer && clearTimeout(this.timer);
        /* istanbul ignore next */
        this.timer = setTimeout(fn, after);
    };

    updateDotsPosition = () => {
        const { cartridgeList } = this.props;
        const pane = this.props.cartridgePane || this.cartridgePane;
        const wrapperWidth = this.wrapper ? this.wrapper.getBoundingClientRect().width : 0;
        const productPaneWidth = pane ? pane.getBoundingClientRect().width : 0;


        // Calculate number of products displayed in the container
        const totalProductPanes = cartridgeList.length;
        const result = (wrapperWidth / productPaneWidth);
        const productPanesDisplayed = Math.floor(result);
        const dots = Math.ceil(totalProductPanes / productPanesDisplayed);

        /* istanbul ignore else */
        if (!__SERVER__) {
            const seletor = cx('listStyleClass');
            // const element = document.querySelector(`.${seletor}`).parentNode;
            // const element = this.cartridgeElement.querySelector(`.${seletor}`).parentNode;
            const elementDOMObj = document.getElementById(this.props.slotId);
            /* istanbul ignore next */
            const element = elementDOMObj ? elementDOMObj.querySelector(`.${seletor}`).parentNode : 0;
            const scrollLeft = element.scrollLeft;
            const maxScrollWidth = (dots - 1) * productPanesDisplayed * productPaneWidth;
            const minscroll = maxScrollWidth / dots;
            let currentPaneSlot = Math.ceil(scrollLeft / minscroll);
            /* istanbul ignore next */
            if (currentPaneSlot <= 0) {
                currentPaneSlot = 1;
            }
            /* istanbul ignore next */
            if (currentPaneSlot > dots) {
                currentPaneSlot = dots;
            }
            this.setState({
                currentDotIndex: currentPaneSlot,
            });
        }
    }


    listenScrollEvent = () => {
        /* istanbul ignore next */
        this.delayedExec(100, () => {
            this.updateDotsPosition();
        });
    }

    render() {
        // fetching cartridgelist from component.
        const {
            cartridgeList,
            automationId,
            deviceType,
        } = this.props;

        // fetching current liststyle from state.
        const { listStyle } = this.state;

        // setting style for desktop channel
        const listBodyClass = deviceType.isDesktop ? 'desktopBodyClass' : 'mobileBodyClass';
        return (
            <section className={styles.catridgeBlock}>
                <div
                    className={styles.catridgeListBlock}
                    id={this.props.slotId}
                >
                    <div className={styles.wrapper} ref={(wrapper) => { this.displayRightArrow(wrapper); }}>
                        {deviceType.isDesktop && this.getPaginationButtons()}
                        <List
                            datasource={cartridgeList}
                            listBodyClass={cx(listBodyClass)}
                            listStyleClass={cx('listStyleClass')}
                            itemStyleClass={cx('itemStyleClass', 'xl3', 'lg3', 'md6', 'sm10')}
                            childRenderer={dataItem => this.props.cartridgeListRenderer(dataItem, this)}
                            automationId={automationId}
                            listStyle={listStyle}
                            spacing="None"
                            onScroll={!deviceType.isDesktop ? this.listenScrollEvent : null} />
                    </div>
                </div>
                {this.state.isMounted && !deviceType.isDesktop && this.getDots()}
            </section>);
    }
}
