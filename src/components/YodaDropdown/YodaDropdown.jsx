import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import YodaToolTip from '../YodaTooltip/YodaTooltip';
import * as styles from './YodaDropdown.css';

const cx = classNames.bind(styles);

export class YodaDropdown extends PureComponent {

    static defaultProps = {
        dataSource: [],
        onChange: () => {},
        automationId: 'dropdown',
        defaultValue: null,
        deviceType: {
            isMobile: false,
            isTablet: false,
            isDesktop: true,
        },
        forceDesktop: false,
        // ------desktop experience-----------
        theme: null,
        labelTheme: null, // customized label experience
        dropdownTheme: null, // customized dropdown/tooltip experience
        // -------mobile/tablet experience----------
        id: '', // unique id to each select on page
        mobileTheme: 'selectBlock',
        name: '', // needed for form submission
        defaultOptionValue: null, // default/highlight value
        defaultOptionName: 'select', // default/highlight label
    }

    static propTypes = {
        dataSource: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired, //eslint-disable-line
        onChange: PropTypes.func,
        theme: PropTypes.string,
        dropdownTheme: PropTypes.string,
        mobileTheme: PropTypes.string,
        labelTheme: PropTypes.string,
        automationId: PropTypes.string,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        deviceType: PropTypes.oneOfType([PropTypes.object]),
        id: PropTypes.string,
        name: PropTypes.string,
        defaultOptionValue: PropTypes.string,
        defaultOptionName: PropTypes.string,
        forceDesktop: PropTypes.bool,
    }

    constructor() {
        super();
        this.state = {
            values: null,
            flipped: false,
        };
    }

    onClick = () => {
        this.setState({
            flipped: !this.state.flipped,
        });
    }

    onChange = (dataItem) => {
        const { forceDesktop, deviceType } = this.props;
        const renderDesktopMode = forceDesktop || deviceType.isDesktop;
        if (renderDesktopMode) {
            this.props.onChange(dataItem.value);
        } else {
            this.props.onChange(dataItem.currentTarget.value);
        }
    }

    listItemRenderer = () => {
        const { dataSource } = this.props;
        return dataSource.map(dataItem =>
        (<li><span key={dataItem["displayKey"]} data-automation-id="select-options" onClick={this.onChange.bind(this, dataItem)} className={cx('options', this.props.optionsTheme)}>{dataItem["displayKey"]}</span></li>)); //eslint-disable-line
    }

    renderTooltipData = () => (
        <div>
            <ul>
                {this.listItemRenderer()}
            </ul>
        </div>
    );

    renderDropdownOptions() {
        const { dataSource, defaultOptionValue, defaultOptionName } = this.props;
        const dropdownOptions = [];
        // Renders default value if present.
        if (defaultOptionValue) {
            dropdownOptions.push(<option value={defaultOptionValue}>{defaultOptionName}</option>);
        }
        dataSource.map(dataItem => (
            dropdownOptions.push(
                <option value={dataItem.value} key={dataItem.value}>
                    {dataItem.displayKey}
                </option>)
        ));
        return dropdownOptions;
    }

    renderSelectDropdown() {
        const { id, name, automationId, defaultValue } = this.props;
        const selectedValue = (defaultValue !== null) ? `${defaultValue}` : '';
        const className = (selectedValue === '') ? cx('selectOption') : cx('selectOption', 'optionNotSelected');
        /* istanbul ignore next */
        return (
            <select
                className={className}
                name={name}
                id={id}
                data-automation-id={automationId}
                value={selectedValue}
                onChange={e => this.onChange(e)}
            >
                {this.renderDropdownOptions()}
            </select>
        );
    }

    renderSingleSelectOption() {
        const { dataSource, automationId } = this.props;
        const value = dataSource[0].displayKey;
        return (<span aria-label={value} data-automation-id={automationId}>{value}</span>);
    }

    render() {
        const { automationId, deviceType, dataSource, forceDesktop, defaultValue, mobileTheme } = this.props;
        const renderDesktopMode = forceDesktop || deviceType.isDesktop;
        const selectedValue = (defaultValue !== null) ? `${defaultValue}` : '';
        if (renderDesktopMode) {
            return (
                <div className={cx('wrapper', this.props.theme, { active: this.state.flipped })} data-automation-id={automationId}>
                    <YodaToolTip
                        renderTooltipContents={this.renderTooltipData()}
                        direction={null}
                        tooltipPlacement={'Right'}
                        triggerEventName={'click'}
                        theme={cx('dropdown', this.props.dropdownTheme)}
                        onClick={this.onClick}
                        callBackFun={this.onClick}
                    >
                        <div>
                            <span className={cx('defaultDisplay', this.props.labelTheme)}>{selectedValue}</span>
                            <Icon iconType="svg" classNames="icon" viewBox="0 0 24 24" width="36px" height="36px" automationId="collapse-right" name="icon-triangle-down" pathClassName={cx('rightIcon')}/>
                        </div>
                    </YodaToolTip>
                </div>
            );
        }
        return (
            <span className={dataSource.length > 1 ? mobileTheme : 'singleSelOptBlock'}>
                {dataSource.length === 1 ? this.renderSingleSelectOption() : this.renderSelectDropdown() }
            </span>
        );
    }
}

const mapStateToProps = store => ({
    deviceType: store.context ? store.context.deviceType : {},
});

export default connect(mapStateToProps)(YodaDropdown);
