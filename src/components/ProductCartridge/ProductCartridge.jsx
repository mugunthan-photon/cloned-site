import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import List from 'yoda-core-components/lib/components/List/List';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import ProductCard from '../ProductCard/ProductCard';
import config from '../ProductCard/ProductCard.config';
import * as actions from '../../actions/ProductCartridgeAction';
import * as styles from './ProductCartridge.css';
import SiteComponent from '../SiteComponent/SiteComponent';

const cx = classNames.bind(styles);

const add = (param1, param2) => param1 + param2;
const subtract = (param1, param2) => param1 - param2;

const calculateScrollPixel = ({
    productPanesDisplayed,
    totalProductPanes,
    scrollPixels,
    scrolledPanes,
    productPaneWidth,
    scrollToRight,
    remainingWrapperWidth,
    disableRightArrow,
}) => {
    const operator = scrollToRight ? subtract : add;

    // Calculate remaining(hidden panes) product panes in container to display
    const remainingProductsPanes = scrollToRight
        ? ((totalProductPanes - productPanesDisplayed) - scrolledPanes)
        : scrolledPanes;

    // Calculate product panes to show. It depends on the remaining panes and container size.
    /* istanbul ignore next */
    const numberOfPanesToMove = (remainingProductsPanes >= productPanesDisplayed)
        ? productPanesDisplayed
        : remainingProductsPanes;

    // Calculate next scroll position
    let scrollX = numberOfPanesToMove * productPaneWidth;

    // Calculate the total number of panes which are scrolled
    const productPanesScrolled = scrollToRight
        ? (scrolledPanes + numberOfPanesToMove)
        : (scrolledPanes - numberOfPanesToMove);

    // Calculate the total panes which are displaced from its original position
    const migratedProductPanes = scrollToRight
        ? add(productPanesScrolled, productPanesDisplayed)
        : productPanesScrolled;

    if (totalProductPanes === migratedProductPanes || disableRightArrow) {
        scrollX -= remainingWrapperWidth;
    }
    const scrollContentBy = operator(scrollPixels, scrollX);

    return {
        scrollContentBy,
        migratedProductPanes,
        productPanesScrolled,
    };
};

/* istanbul ignore next */
export class ProductCartridge extends SiteComponent {

    static defaultProps = {
        products: [],
        actions: {},
        automationId: '',
        attributes: {},
        customRenderProductCard: false,
        theme: 'compact',
        productPane: null,
        productCatridgeTheme: '',
        forceMobile: false,
    };

    static propTypes = {
        /**
         * An array of objects which consists if product information
        */
        products: PropTypes.arrayOf(PropTypes.object).isRequired,
        /**
         * Consists of actions triggered by component
         * getProductListForCartridgeSlot - Function to get product list. This will be invoked on componentWillMount
        */
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        /**
         * Automation ID for testing
        */
        automationId: PropTypes.string,
        /**
         * Each product cartridge slot requires unique slotId because a page can consists of multiple product cartridge slots.
        */
        slotId: PropTypes.string.isRequired,
        /**
         * host to configure api
        */
        host: PropTypes.string,
        /**
         * Specify the source to fetch product list.
         * Loaders supported by product cartridge
         * 1. Certona
        */
        loader: PropTypes.string.isRequired,
        /**
         * Loader's attributes.
         */
        attributes: PropTypes.objectOf(PropTypes.any),
        /**
         * RegionPricing enabled or not
         */
        enableRegionPricing: PropTypes.bool,
        /**
        * The custom render function for rendering product cards
        */
        renderProductCard: PropTypes.func,
        /**
        * Flag to check if renderProductCard method has to be called.
        */
        customRenderProductCard: PropTypes.bool,
        theme: PropTypes.string,
        /**
         * The product pane object that is needed for scrolling if a custom render method is used.
         */
        productPane: PropTypes.objectOf(PropTypes.object),
        productCatridgeTheme: PropTypes.string,
        /**
         * Flag force mobile for certona.
         */
        forceMobile: PropTypes.bool,
    };

    state = {
        listStyle: {},
        disableLeftArrow: true,
        disableRightArrow: false,
        productCartridgeList: [],
        cartridgeHeader: '',
        currentDotIndex: 1,
    }

    scrollStatus = {
        scrollPixels: 0,
        scrolledPanes: 0,
    };

    hydrate = () => {
        if (!this.props.enableRegionPricing || this.props.loader !== 'certona') {
            this.loadProductListForCartridgeSlot();
        }
    };

    loadProductListForCartridgeSlot(regionZone) {
        //  Todo clean when certona link works for desktop
        const sendProps = { ...this.props };
        if (regionZone) {
            sendProps.regionZone = regionZone;
        }
        // Force Mobile for certona if forceMobile is true, to allow work on desktop.
        const forceMobileObj = {
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        };
        sendProps.deviceType = sendProps.forceMobile ? forceMobileObj : sendProps.deviceType;
        this.props.actions.getProductListForCartridgeSlot(sendProps);
    }

    componentDidMount() {
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { regionZone: previousRegionZone, loader, enableRegionPricing } = this.props;
        const { regionZone: newRegionZone } = nextProps;
        const previousRegionZoneValue = (previousRegionZone === undefined) ? null : previousRegionZone;
        const newRegionZoneValue = (newRegionZone === undefined) ? null : newRegionZone;
        if (enableRegionPricing && previousRegionZoneValue !== newRegionZoneValue && loader === 'certona') {
            this.loadProductListForCartridgeSlot(newRegionZoneValue);
        }
        this.setProductList(nextProps);
    }

    componentWillUnmount() {
        this.props.actions.resetProductCartridgeStore();
    }

    setProductList = (props) => {
        const { productCartridgeSlots, slotId } = props;
        const productCartridgeDetails = productCartridgeSlots && productCartridgeSlots[slotId];

        if (productCartridgeDetails && productCartridgeDetails.items) {
            this.setState({
                productCartridgeList: productCartridgeDetails.items,
                cartridgeHeader: productCartridgeDetails.header,
            });
        }
    }

    getPaginationButtons = () => {
        const { disableLeftArrow, disableRightArrow } = this.state;
        const leftArrowClass = cx({ iconClass: true, disabledArrow: disableLeftArrow });
        const rightArrowClass = cx({ iconClass: true, disabledArrow: disableRightArrow });
        return (
            <div>
                <button
                    className={cx('arrow', 'leftArrow')} disabled={disableLeftArrow}
                    onClick={() => this.scrollCartridge(false)}
                >
                    <Icon
                        iconType="svg" className={'arrow-icon'} width="19.5px" height="29px" viewBox="0 0 20 20"
                        name="arrow-left"
                        pathClassName={leftArrowClass}
                    />
                </button>
                <button
                    className={cx('arrow', 'rightArrow')} disabled={disableRightArrow}
                    onClick={() => this.scrollCartridge(true)}
                >
                    <Icon
                        iconType="svg" className={'arrow-icon'} width="19.5px" height="29px"
                        viewBox="0 0 20 20"
                        name="arrow-right"
                        pathClassName={rightArrowClass}
                    />
                </button>
            </div>
        );
    }

    getDots = () => {
        const { productCartridgeList } = this.state;
        const pane = this.props.productPane || this.productPane;
        const wrapperWidth = this.wrapper ? this.wrapper.getBoundingClientRect().width : 0;
        const productPaneWidth = pane ? pane.getBoundingClientRect().width : 0;

        const totalProductPanes = productCartridgeList.length;
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

    scrollCartridge = (scrollToRight) => {
        const { productCartridgeList } = this.state;
        const pane = this.props.productPane || this.productPane;
        const wrapperWidth = this.wrapper.getBoundingClientRect().width;
        const productPaneWidth = pane.getBoundingClientRect().width +
            (pane.getBoundingClientRect().width / 10);
        const { scrollPixels, scrolledPanes } = this.scrollStatus;

        // Calculate number of products displayed in the container
        const totalProductPanes = productCartridgeList.length;
        const result = (wrapperWidth / productPaneWidth);
        const productPanesDisplayed = Math.floor(result);
        const remainingWrapperWidth = (result - productPanesDisplayed).toFixed(2) * productPaneWidth;

        const mountedCartrdigeInfo = {
            productPanesDisplayed,
            totalProductPanes,
            scrollPixels,
            scrolledPanes,
            productPaneWidth,
            scrollToRight,
            remainingWrapperWidth,
            disableRightArrow: this.state.disableRightArrow,
        };

        const {
          scrollContentBy,
            productPanesScrolled,
            migratedProductPanes,
        } = calculateScrollPixel(mountedCartrdigeInfo);

        this.scrollStatus.scrollPixels = scrollContentBy;
        this.scrollStatus.scrolledPanes = productPanesScrolled;

        this.setState({
            disableLeftArrow: (migratedProductPanes === 0),
            disableRightArrow: (migratedProductPanes === totalProductPanes),
            listStyle: {
                transform: `translate(${scrollContentBy}px)`,
            },
        });
    };

    defaultProductCardRenderer = (dataItem) => {
        const { slotId } = this.props;
        const { linkURL } = dataItem;
        /* istanbul ignore next */
        const linkUrlWithSlotId = (slotId && linkURL) ?
            linkURL.concat(`&rrplacementtype=${this.props.slotId}`) : linkURL;
        return (
            <a
                href={linkUrlWithSlotId}
                className={cx('linkColor', 'productPanelLinkBlock')}
                data-automation-id="reczone-link"
                ref={(productPane) => { this.productPane = productPane; }}
            >
                <ProductCard
                    customClass={cx('productCard', 'productCatridge')}
                    imageUrl={dataItem.imageURL}
                    title={dataItem.name}
                    price={dataItem.priceDetails}
                    key={dataItem.id}
                    cardType={config.cardTypes.GRID}
                    rating={Number(dataItem.rating)}
                    reviewCount={dataItem.reviews}
                    cardTheme={'cartridge'}
                    skuId={dataItem.skuId}
                    skuSwatch={dataItem.skuSwatch}
                    automationId="product-cartridge-product-list"
                />
            </a>
        );
    }

    productCardRenderer = (dataItem) => {
        const { customRenderProductCard, renderProductCard } = this.props;
        if (customRenderProductCard) {
            return renderProductCard(dataItem);
        }

        return this.defaultProductCardRenderer(dataItem);
    }

    disableRightArrowOnLoad = (wrapper) => {
        this.wrapper = wrapper;
        if (this.props.deviceType.isDesktop && !this.initialLoad && wrapper) {
            const pane = this.props.productPane || this.productPane;
            const wrapperWidth = this.wrapper.getBoundingClientRect().width;
            // Calculate the total productPanesWidth
            const productPanesWidth = (this.state.productCartridgeList.length * pane.getBoundingClientRect().width);
            this.initialLoad = true;
            if (productPanesWidth < wrapperWidth) this.setState({ disableRightArrow: true });
        }
    }
    /* istanbul ignore next */
    delayedExec = (after, fn) => {
        /* istanbul ignore next */
        this.timer && clearTimeout(this.timer);
        /* istanbul ignore next */
        this.timer = setTimeout(fn, after);
    };

    updateDotsPosition = () => {
        const { productCartridgeList } = this.state;
        const pane = this.props.productPane || this.productPane;
        const wrapperWidth = this.wrapper ? this.wrapper.getBoundingClientRect().width : 0;
        const productPaneWidth = pane ? pane.getBoundingClientRect().width : 0;


        // Calculate number of products displayed in the container
        const totalProductPanes = productCartridgeList.length;
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
        //  const { automationId } = this.props;
        const { deviceType, theme, productCatridgeTheme } = this.props;
        const listBodyClass = deviceType.isDesktop ? 'desktopBodyClass' : 'mobileBodyClass';
        const { productCartridgeList, listStyle, cartridgeHeader } = this.state;
        if (productCartridgeList.length) {
            return (
                <section className={cx('productCartridge', productCatridgeTheme)}>
                    <div className={styles.wrapper} ref={(wrapper) => { this.disableRightArrowOnLoad(wrapper); }}>
                        {deviceType.isDesktop ? this.getPaginationButtons() : ''}
                        <h5 data-automation-id="product-catridge-title" className={styles.productCartridgeTitle}>{cartridgeHeader}</h5>
                        <div
                            className={styles.prodCatridgeListBlock}
                            id={this.props.slotId}
                        >
                            <List
                                datasource={productCartridgeList}
                                listBodyClass={cx(listBodyClass)}
                                listStyleClass={cx('listStyleClass')}
                                itemStyleClass={cx('itemStyleClass', 'xl3', 'lg3', 'md6', 'sm10', theme)}
                                childRenderer={this.productCardRenderer}
                                automationId="product-cartridge-list"
                                listStyle={listStyle}
                                spacing="None"
                                onScroll={!deviceType.isDesktop ? this.listenScrollEvent : null}
                            />
                        </div>
                        {!deviceType.isDesktop ? this.getDots() : null}
                    </div>
                </section>
            );
        }
        return null;
    }
}

const mapStateToProps = ({ productCartridge, context, regionalPricing }) => ({
    productCartridgeSlots: productCartridge ? productCartridge.productCartridgeSlots : null,
    deviceType: context ? context.deviceType : { isDesktop: true },
    enableRegionPricing: context && context.featureFlags ?
      context.featureFlags.enableRegionPricing : null,
    regionZone: regionalPricing ? (regionalPricing.regionZone) : null,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartridge);
