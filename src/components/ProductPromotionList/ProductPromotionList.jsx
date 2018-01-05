import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Required Core components
import { Accordion, AccordionSection } from 'yoda-core-components/lib/components/Accordion';
import Button from 'yoda-core-components/lib/components/Button/Button';
import List from 'yoda-core-components/lib/components/List/List';

// Required Site components
import SiteComponent from '../SiteComponent/SiteComponent';
import * as styles from './ProductPromotionList.css';
import ProductPromotionCard from '../ProductPromotionCard/ProductPromotionCard';
import ProductPromotionListActions from '../../actions/ProductPromotionListActions';

// Timer Components
import GridHeader from '../GridHeader/GridHeader';

// Configs
import disclaimerTheme from './productPromotionDisclaimerTheme';

const defaultTheme = {};
const forceOverlay = true;


export class ProductPromotionList extends SiteComponent {
    static propTypes = {
        productPromotions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        theme: PropTypes.oneOfType([PropTypes.object]),
        pageName: PropTypes.string,
        urlParam: PropTypes.string,
        noOfItemShowInitiallyMobile: PropTypes.number,
        noOfItemShowInitiallyTab: PropTypes.number,
        noOfItemShowInitiallyDesktop: PropTypes.number,
        nType: PropTypes.string,
        isDisclaimerEnabled: PropTypes.bool,
        isTimerEnabled: PropTypes.bool,
    };

    /**
     * @type noOfItemShowInitiallyMobile : no of items to presnt initially for mobile, before load more. Adaptive way.
     * @type noOfItemShowInitiallyTab : no of items to presnt initially for Tablet, before load more. Adaptive way.
     * @type noOfItemShowInitiallyDesktop : no of items to presnt initially for desktop, before load more. Adaptive way.
     * all the three params has nothing to do with number of items to show in a row. No of items to show in a row is decided by CSS
     */

    static defaultProps = {
        productPromotions: [],
        theme: defaultTheme,
        pageName: 'home',
        urlParam: 'homePageGridContent',
        noOfItemShowInitiallyMobile: 8,
        noOfItemShowInitiallyTab: 8,
        noOfItemShowInitiallyDesktop: 8,
        nType: '',
        isDisclaimerEnabled: true,
        isTimerEnabled: false, // default false pass true to showtimer
    };

    /**
     * Device type will be taking from microsite redux store.
     */

    static deviceType = {
        isDesktop: false,
        isMobile: true,
        isTablet: false,
    };

    /* istanbul ignore next */
    state = {
        sourceAdapter: [],
        isLoadMoreEnabled: false,
        loadMoreClicked: false,
        sourceAdapterForSecondSection: [],
    };

    hydrate() {
        const { actions, pageName, urlParam, nType, deviceType, productPromotions } = this.props;
        if (Object.keys(productPromotions).length) {
            this.loadAdapter(productPromotions.massagedData);
        } else {
            actions.getProductPromotionListAction(pageName, urlParam, nType, deviceType);
        }
    }

    /* istanbul ignore next */
    constructor(props) {
        super(props);
        this.loadMoreData = this.loadMoreData.bind(this);
        this.getTimer = this.getTimer.bind(this);
    }


    getTimer() {
        const { liveText, liveTextColor, liveTextBackGroundColor,
            timerTextColor, timer, marketingText, marketingTextColor } = this.props.productPromotions;

        const timerProps = {
            liveText,
            liveTextColor,
            liveTextBackGroundColor,
            timerTextColor,
            timer,
            marketingText,
            marketingTextColor,
            timerZone: this.props.timeZone,
        };
        return <GridHeader {...timerProps} />;
    }

    deviceTypeValue() {
        const { deviceType } = this.props;
        let propertyName = '';
        if (deviceType.isMobile) {
            propertyName = 'noOfItemShowInitiallyMobile';
        } else if (deviceType.isTablet) {
            propertyName = 'noOfItemShowInitiallyTab';
        } else {
            propertyName = 'noOfItemShowInitiallyDesktop';
        }

        return propertyName;
    }

    loadAdapter(overrideData) {
        let dataAdapter = [];
        let enabled = false;
        let data = this.props.productPromotions.massagedData;
        if (overrideData) {
            data = overrideData;
        }
        if (data && data.length) {
            if (this.props.deviceType.isDesktop) {
                this.setState({ sourceAdapter: data, isLoadMoreEnabled: false });
            } else if (!this.state.isLoadMoreEnabled) {
                dataAdapter = data.slice(0, this.props[this.deviceTypeValue()]);
                enabled = true;
                this.setState({ sourceAdapter: dataAdapter, isLoadMoreEnabled: enabled });
            } else {
                dataAdapter = data.slice(this.props[this.deviceTypeValue()], data.length);
                enabled = true;
                this.setState({ sourceAdapterForSecondSection: dataAdapter, isLoadMoreEnabled: enabled });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.sourceAdapter !== nextProps.productPromotions.massagedData && !this.state.isLoadMoreEnabled) {
            this.loadAdapter(nextProps.productPromotions.massagedData);
        }
    }

    loadMoreData() {
        const { actions } = this.props;
        actions.trackEventProductPromotionLoadMoreAction();
        this.loadAdapter(false);
        this.setState({ loadMoreClicked: true });
    }

    showPaginationText() {
        const totalSize = this.props.productPromotions.massagedData.length;
        const currentTotalItems = this.state.loadMoreClicked ? totalSize : this.props[this.deviceTypeValue()];
        return <span className={styles.paginationInfo}> Showing {currentTotalItems} of {totalSize} </span>;
    }

    loadMoreButton() {
        if (this.state.loadMoreClicked) return null; // Dont render the button after we display all records
        let loadMoreButtonToShow = null;
        /* istanbul ignore next */
        if (this.props.productPromotions.massagedData.length <= this.props[this.deviceTypeValue()]) {
            loadMoreButtonToShow = null;
        } else {
            loadMoreButtonToShow = (
                <div>
                    <Button type="button" onClick={this.loadMoreData} isDisabled={this.state.loadMoreClicked} className={styles.loadMore} automationId="load-more-button" buttonType="Secondary" >Load More</Button>
                    {this.showPaginationText()}
                </div>
            );
        }
        return loadMoreButtonToShow;
    }

    productPromotionCardRendererLoadMore = (productPromotionCard, currentIndex) => {
        const currentIndexBeforeAndAfterClick =
            this.state.loadMoreClicked ? this.state.sourceAdapter.length + currentIndex : currentIndex;
        return this.productPromotionCardRender(productPromotionCard, currentIndexBeforeAndAfterClick);
    };

    productPromotionCardRenderer = (productPromotionCard, currentIndex) => (
        this.productPromotionCardRender(productPromotionCard, currentIndex)
    );

    productPromotionCardRender(productPromotionCard, currentIndex) {
        return (
            <ProductPromotionCard
                {...productPromotionCard}
                deviceType={this.props.deviceType}
                isOverlay={forceOverlay}
                currentIndex={currentIndex} />
        );
    }

    paintSectionAfterClickLoadMore() {
        let partials = null;
        if (!this.state.sourceAdapterForSecondSection.length) {
            partials = null;
        }
        partials = (<div className={styles.marginTopReduce11}><List
            direction={'Fluid'}
            datasource={this.state.sourceAdapterForSecondSection}
            childRenderer={this.productPromotionCardRendererLoadMore}
            automationId={'product-promotional-list'}
            listStyleClass={styles.prodPromotionListBlock}
            itemStyleClass={styles.prodPromtionListItem}
            /></div>);
        return partials;
    }

    loadDisclaimer() {
        let disclimerHtml = null;
        const isAutoCollapsible = true;
        if (this.props.productPromotions && this.props.productPromotions.disclaimer) {
            disclimerHtml = (
                <Accordion isAutoCollapsible={isAutoCollapsible} themeConfig={disclaimerTheme} automationId="disclaimer-accordian">
                    <AccordionSection title="Disclaimer" index={0} automationId="disclaimer-accordian-tab" iconConfig={{ theme: styles.iconToggleAccordion, viewBox: '0 0 24 24', width: '34px', height: '34px' }}>
                        <section className={styles.disclaimer}>
                            <p>{this.props.productPromotions.disclaimer}</p>
                        </section>
                    </AccordionSection>
                </Accordion>
            );
        }
        return disclimerHtml;
    }

    render() {
        const { productPromotions, pageName, isDisclaimerEnabled, isTimerEnabled } = this.props;
        let timerBlock = '';
        if (productPromotions.timerEnabled && isTimerEnabled) {
            timerBlock = this.getTimer();
        }

        if (!Object.keys(productPromotions).length || productPromotions.pageName !== pageName) {
            return null;
        }
        return (
            <section className={styles.productPromotionList}>
                {timerBlock}
                <List
                    direction={'Fluid'}
                    datasource={this.state.sourceAdapter}
                    childRenderer={this.productPromotionCardRenderer}
                    automationId={'product-promotional-list'}
                    itemStyleClass={styles.prodPromtionListItem}
                    listStyleClass={styles.prodPromotionListBlock}
                    />
                {this.paintSectionAfterClickLoadMore()}
                {!this.props.deviceType.isDesktop ? this.loadMoreButton() : null}
                {isDisclaimerEnabled ? this.loadDisclaimer() : null}
            </section>
        );
    }
}

const mapStateToProps = ({ productPromotions, context }) => ({
    productPromotions,
    deviceType: context ? context.deviceType : ProductPromotionList.deviceType,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ProductPromotionListActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPromotionList);
