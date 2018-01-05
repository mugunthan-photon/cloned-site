import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './SelectOptions.css';

const cx = classNames.bind(styles);

class SelectOptions extends Component {

    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        automationId: PropTypes.string,
        datasource: PropTypes.arrayOf(PropTypes.object).isRequired,
        defaultOptionValue: PropTypes.string,
        selectedValue: PropTypes.string,
        onChange: PropTypes.func,
        selectOptionsTheme: PropTypes.string,
        displayKey: PropTypes.string.isRequired,
        valueKey: PropTypes.string.isRequired,
    }

    static defaultProps = {
        id: '',
        name: '',
        automationId: '',
        defaultOptionValue: null,
        selectedValue: '',
        onChange: null,
        selectOptionsTheme: '',
    }

    optionsOnChange(e) {
        this.props.onChange(e);
    }

    renderDropdownOptions() {
        const { datasource, displayKey, valueKey } = this.props;
        let dropdownOptions = '';
        dropdownOptions = datasource.map(dataItem => (
            <option value={dataItem[valueKey]} key={dataItem[valueKey]}>
                {dataItem[displayKey]}
            </option>
        ));
        return dropdownOptions;
    }

    renderDefaultOptions() {
        const { defaultOptionValue, name } = this.props;
        let defaultOptions = '';
        if (defaultOptionValue) {
            defaultOptions = (
                <option value={name}>{defaultOptionValue}</option>
            );
        }
        return defaultOptions;
    }

    renderSelectDropdown() {
        const { id, name, automationId, selectedValue } = this.props;
        const className = selectedValue === '' ? cx('selectOption') : cx('selectOption', 'optionNotSelected');
        return (
            <select
                className={className}
                name={name}
                id={id}
                data-automation-id={automationId}
                value={selectedValue}
                onChange={e => this.optionsOnChange(e)}
            >
                {this.renderDefaultOptions()}
                {this.renderDropdownOptions()}
            </select>
        );
    }

    renderSingleSelectOption() {
        const { displayKey, datasource, automationId } = this.props;
        const value = datasource[0][displayKey];
        return (<span aria-label={value} data-automation-id={automationId}>{value}</span>);
    }

    render() {
        const { datasource, selectOptionsTheme } = this.props;
        const className = datasource.length > 1 ? cx('selectBlock', selectOptionsTheme) : cx('singleSelOptBlock', selectOptionsTheme);
        return (
            <div className={className}>
                {datasource.length === 1 ? this.renderSingleSelectOption() : this.renderSelectDropdown() }
            </div>
        );
    }
}

export default SelectOptions;
