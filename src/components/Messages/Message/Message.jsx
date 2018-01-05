import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import values from 'lodash/values';
import noop from 'lodash/noop';

import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import * as styles from './Message.css';
import { uiTypes } from './Message.config';
import { messageTypes } from '../Messages.config';

const cx = classNames.bind(styles);

export default class Message extends PureComponent {

    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.oneOf(values(messageTypes)),
        uiType: PropTypes.oneOf(values(uiTypes)),
        title: PropTypes.string,
        children: PropTypes.element,
        hasClose: PropTypes.bool,
        onClose: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        id: '',
        type: messageTypes.information,
        uiType: uiTypes.box,
        title: '',
        children: null,
        hasClose: true,
        onClose: noop,
        className: '',
    };

    /**
     * Renders the basic outer skeleton required to render the message box
     * @return {ReactComponent}
     */
    render() {
        const { id, type, uiType, title, children, className, hasClose } = this.props;

        return (
            <div id={id} className={cx('message', (`${type}Message`), type)}>
                <div className={cx('messageBlock', uiType, className)}>
                    <div className={cx('sm10', 'md11', 'lg11', 'xl11', 'messageGrid')}>
                        <div className={cx('messageIcon')}>
                            <Icon iconType="svg" width="40px" height="40px" viewBox="0 0 40 40" name={type}/>
                        </div>
                        <div className={cx('messageContent')}>
                            {title && (
                                <p className={cx('messageTitle')}>{title}</p>
                            )}
                            {children && (
                                <div className={cx('messageText')}>
                                    {children}
                                </div>
                            )}
                        </div>
                    </div>
                    {hasClose && (
                        <div className={cx('sm2', 'md1', 'lg1', 'xl1')}>
                            <span className={cx('close')}>
                                <button onClick={this.props.onClose}>
                                    <Icon
                                        iconType="svg"
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 25 25"
                                        name="close"
                                    />
                                </button>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
