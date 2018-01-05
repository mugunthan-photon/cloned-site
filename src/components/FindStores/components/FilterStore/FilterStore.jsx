import React, { Component, PropTypes } from 'react';
import List from 'yoda-core-components/lib/components/List/List';
import Button from 'yoda-core-components/lib/components/Button/Button';
import CheckBox from 'yoda-core-components/lib/components/CheckBox/CheckBox';
import classNames from 'classnames/bind';
import Constants from '../../../../common/Constants';
import Filters from './FilterOptions';
import styles from './FilterStore.css';
import YodaTooltip from '../../../YodaTooltip/YodaTooltip';

const cx = classNames.bind(styles);

class FilterStore extends Component {
    /**
     * PropTypes to Indicate types of each Props for the entire component
     * Supported React properties
     * @type {Object}
     */
    static defaultProps = {
        selectedFilters: new Set(),
        deviceType: {},
        stores: [],
    }

    static propTypes = {
        onFilterChange: PropTypes.func.isRequired,
        selectedFilters: PropTypes.objectOf(PropTypes.object),
        deviceType: PropTypes.objectOf(PropTypes.object),
       // stores: PropTypes.objectOf(PropTypes.array),
    }

    constructor() {
        super();
        this.state = {
            displayFilters: false,
        };
    }

    toggleFilters = () => {
        this.setState({
            displayFilters: !this.state.displayFilters,
        });
    }

    filterListRenderer = (filter, index) => {
        const { label, value } = filter;
        const { selectedFilters, onFilterChange } = this.props;
        const checkboxConfig = {
            id: `filterServiceOption${index}`,
            value,
            defaultChecked: !(Array.isArray(selectedFilters) && selectedFilters.indexOf(filter.value) < 0),
        };
        return (
            <CheckBox
                label={<span className={styles.filterLabel}>{label}</span>}
                labelClass={cx('facetText')}
                onChange={e => onFilterChange(e, filter.value)}
                config={checkboxConfig}
            />
        );
    }

    filterStoreButton = () => (
        <Button
            buttonType={'Text'}
            className={styles.filterTitle}
            onClick={this.toggleFilters}
        >
            {Constants.findStores.filterHeader}
        </Button>
        );

    renderFilterList = () => {
        let filterListView;
        const { displayFilters } = this.state;
        const { deviceType: { isMobile } } = this.props;
        // Need to verify. Commented the code to fix the the defect 2143
        // const { deviceType: { isMobile }, stores } = this.props;
        // const disabledFilters = cx('disabledFilters', {
        //     mobileView: isMobile,
        // });
        /* if (!stores.length) {
            filterListView = (
                <div className={disabledFilters}>
                    <span className={cx('disabledFilterTitle')}>
                        {Constants.findStores.filterHeader}
                        <span className={cx('arrow-down')}/>
                    </span>
                </div>
            );
        } else */
        if (isMobile) {
            filterListView = (
                <div className={cx('mobileFilterStoreBlock')}>
                    <div className={cx('buttonWrap')}>
                        <span className={cx(displayFilters ? 'arrow-up' : 'arrow-down')}/>
                        {this.filterStoreButton()}
                    </div>
                    {displayFilters ? this.renderTooltipData() : null}
                </div>
            );
        } else {
            filterListView = (
                <div className={cx('filterStoreBlock')}>
                    <span className={cx(displayFilters ? 'arrow-up' : 'arrow-down')}/>
                    <YodaTooltip
                        tooltipContentClass={styles.tooltipView}
                        renderTooltipContents={this.renderTooltipData()}
                        disableHideOnContentClick
                        callBackFun={this.toggleFilters}
                    >
                        <span className={styles.filterTitle}>
                            {Constants.findStores.filterHeader}
                        </span>
                    </YodaTooltip>
                </div>
            );
        }
        return filterListView;
    }

    renderTooltipData = () => (
        <div className={cx('listWrapper')}>
            <List
                datasource={Filters} childRenderer={this.filterListRenderer}
                direction="Vertical"
                itemStyleClass={styles.storeListItem}
                automationId="filter-list"
                />
        </div>
    )

    render() {
        return (
            <div data-automation-id="store-filter-section" className={cx('filterServiceWrapper')}>
                {this.renderFilterList()}
            </div>
        );
    }
}

export default FilterStore;
