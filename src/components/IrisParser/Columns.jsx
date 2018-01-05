import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './Columns.css';

const cx = classNames.bind(styles);

/**
 * Columns supports rendering of
 * @prop Tag: div, section, article .....
 */
class Columns extends Component {

    static defaultProps = {
        tag: 'div',
        children: {},
        className: '',
    };

    static propTypes = {
        tag: PropTypes.string,
        children: React.PropTypes.node,
        className: React.PropTypes.string,
    };

    render() {
        const { tag, className } = this.props;
        const Tag = tag;
        const cssClassMap = cx(`colSpan-${className}`);
        return (
            <Tag className={cssClassMap}>
                {this.props.children}
            </Tag>
        );
    }
}

export default Columns;
