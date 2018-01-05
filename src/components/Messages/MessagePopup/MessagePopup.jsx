import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';
import values from 'lodash/values';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Button from 'yoda-core-components/lib/components/Button/Button';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';

import * as styles from './MessagePopup.css';
import { messageTypes } from '../Messages.config';

const cx = classNames.bind(styles);

export default class MessagePopup extends PureComponent {

    static propTypes = {
        type: PropTypes.oneOf(values(messageTypes)),
        title: PropTypes.string,
        children: PropTypes.element,
        onClose: PropTypes.func,
        className: PropTypes.string,
    }

    static defaultProps = {
        type: messageTypes.information,
        title: '',
        children: null,
        onClose: noop,
        className: '',
    }

    render() {
        const { type, title, children, className } = this.props;
        return (
            <div className={cx('message-popup', type, className)}>
                <ModalBox
                    showModal
                    onClose={this.props.onClose}
                    defaultHeader
                    automationId="message-dialog"
                >
                    <div className={cx('message-content')}>
                        <div>
                            <Icon
                                iconType="svg"
                                automationId="apply-coupon-dialog-icon"
                                width="52px"
                                height="52px"
                                viewBox="0 0 52 52"
                                name={type}
                            />
                        </div>
                        <div className={cx('message-title')}>
                            {title}
                        </div>
                        <div className={cx('message-body')}>
                            { children }
                            <Button
                                type="button"
                                buttonType="Primary"
                                size="Lg"
                                onClick={this.props.onClose}>
                                OK
                            </Button>
                        </div>
                    </div>
                </ModalBox>
            </div>
        );
    }
}
