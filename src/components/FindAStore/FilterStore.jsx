import React, { Component, PropTypes } from 'react';
import Button from 'yoda-core-components/lib/components/Button/Button';
import List from 'yoda-core-components/lib/components/List/List';
import Filters from './Filters';
import Checkbox from './Checkbox';
import styles from './FindAStore.css';

/**
 *
 *
 * FilterStore component for list the filters in the find a store section which are
 * Usage of this component
 * <FilterStore onDoneCallback=parent callback function />
 */
/* istanbul ignore next */
class FilterStore extends Component {

    /**
     * PropTypes to Indicate types of each Props for the entire component
     * Supported React properties
     * @type {Object}
     */
     /* istanbul ignore next */
    static defaultProps = {
        selectedFacets: new Set(),
        /* istanbul ignore next */
        clearFacets: () => {},
        /* istanbul ignore next */
    }

    static propTypes = {
        /**
         * Callback function to be called on done
         */
        onDoneCallback: PropTypes.func.isRequired,
        onFilterChange: PropTypes.func.isRequired,
        selectedFacets: PropTypes.objectOf,
        clearFacets: PropTypes.func,
    }
    /* istanbul ignore next */
    constructor() {
        super();

        this.resetFilters = this.resetFilters.bind(this);
        this.filterDoneCall = this.filterDoneCall.bind(this);
    }
    /* istanbul ignore next */
    toggleCheckbox = (index, selectedOption) => {
        this.props.onFilterChange(selectedOption);
    }
    /* istanbul ignore next */
    resetFilters() {
        this.props.clearFacets();
    }
    /* istanbul ignore next */
    filterDoneCall() {
        if (this.props.onDoneCallback) {
            this.props.onDoneCallback();
        }
    }

    /* istanbul ignore next */
    render() {
        const filterListRenderer = (filter, index) =>
            <Checkbox
                checkIndex={index}
                label={filter.label}
                value={filter.value}
                isChecked={this.props.selectedFacets.has(filter.value)}
                handleCheckboxChange={this.toggleCheckbox}
                customInput={styles.listInput}
                customStyle={styles.listCheck}
                automationId="filter-checkboxes"
            />;
        return (
            <div data-automation-id="store-filter-section" className={styles.filterModalWrapper}>
                <div>
                    <div className={styles.resetdiv}>
                        <Button
                            size="lg"
                            className={styles.resetBtn}
                            onClick={this.resetFilters}
                            automationId="filter-button-reset"
                        >
                            RESET
                        </Button>
                    </div>
                    <div className={styles.doneBlock}>
                        <Button
                            size="lg"
                            className={styles.doneBtn}
                            automationId="filter-button-done"
                            onClick={this.filterDoneCall}
                        >
                            DONE
                        </Button>
                    </div>
                </div>
                <div>
                    <h3 className={styles.filterTitle}>Filter Store Services</h3>
                </div>
                <ul>
                    <List
                        datasource={Filters} childRenderer={filterListRenderer}
                        direction="Vertical" itemStyleClass={styles.storeListItem}
                        automationId="filter-list"
                    />
                </ul>
            </div>
        );
    }
}

export default FilterStore;
