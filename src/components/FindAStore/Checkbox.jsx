import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './FindAStore.css';
/**
 *
 *
 * Checkbox component
 * Usage of this component
 *   <Checkbox
 *       checkIndex=index of checkbox
 *       label=label text to display next to checkbox
 *       value=value on select of checkbox
 *       isChecked=checked status
 *       handleCheckboxChange=callback function
 *   />;
 */

const cx = classNames.bind(styles);

class Checkbox extends Component {

    static defaultProps = {
        customStyle: PropTypes.string,
        customInput: PropTypes.string,
        automationId: '',
    };

    static propTypes = {
        checkIndex: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        isChecked: PropTypes.bool.isRequired,
        handleCheckboxChange: PropTypes.func.isRequired,
        customStyle: PropTypes.string,
        customInput: PropTypes.string,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,
    };

     /* istanbul ignore next */
     /* eslint-disable no-useless-constructor */
    constructor(props) {
        super(props);
    }

    /* istanbul ignore next */
    toggleCheckboxChange = () => {
        const { handleCheckboxChange, checkIndex, value, label } = this.props;
        handleCheckboxChange(checkIndex, { value, label });
    }
    /* istanbul ignore next */
    render() {
        const { label, value, isChecked, customStyle, customInput, automationId } = this.props;
        /* istanbul ignore next */
        return (
            <div className={cx('checkbox', customStyle)} data-automation-id={automationId} >
                {
                    <input
                        type="checkbox"
                        value={value}
                        checked={isChecked}
                        id={label}
                        onChange={this.toggleCheckboxChange}
                        className={cx(customInput)}
                        data-automation-id="input-checkbox"
                    />
                }
                <label htmlFor={label} data-automation-id="label" className={cx('customInputLabel')}>{label}</label>
            </div>
        );
    }
}

export default Checkbox;
