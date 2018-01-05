import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import values from 'lodash/values';
import noop from 'lodash/noop';

import * as styles from './Messages.css';
import { messagesLevels, levelUiMapping } from './Messages.config';
import Message from './Message/Message';
import MessagePopup from './MessagePopup/MessagePopup';
import * as messagesActions from '../../actions/MessagesAction';

const cx = classNames.bind(styles);

export class Messages extends Component {

    static propTypes = {
        id: PropTypes.string,
        level: PropTypes.oneOf(values(messagesLevels)),
        messages: PropTypes.oneOfType([PropTypes.array]),
        className: PropTypes.string,
        hasClose: PropTypes.bool,
        onClose: PropTypes.func,
        actions: PropTypes.oneOfType([PropTypes.object]),
    };

    static defaultProps = {
        id: '',
        level: messagesLevels.section,
        messages: [],
        className: '',
        hasClose: true,
        onClose: noop,
        actions: {},
    };

    /**
     * Function to trigger onClose callback function registered
     * by app components
     */
    closeMessage(id) {
        if (this.props.onClose !== noop) {
            this.props.onClose(id);
        } else {
            this.props.actions.removeMessage({ id });
        }
        document.body.style.overflow = 'auto';
    }

    /**
     * Renders the basic outer skeleton required to render the message
     * @return {ReactComponent}
     */
    render() {
        const { id, level, messages, hasClose, className } = this.props;

        let renderedMessages;
        switch (level) {
            case messagesLevels.page:
            case messagesLevels.inline:
            case messagesLevels.section: {
                renderedMessages = messages.map(({ id: messageId, type, title, body }) => {
                    const closeMessage = this.closeMessage.bind(this, messageId); // eslint-disable-line
                    return (
                        <Message
                            key={messageId || title}
                            type={type}
                            uiType={levelUiMapping[level]}
                            title={title}
                            onClose={closeMessage}
                            hasClose={hasClose}
                        >
                            {body}
                        </Message>
                    );
                });
                break;
            }
            case messagesLevels.popup: {
                renderedMessages = messages.map(({ id: messageId, type, title, body }) => {
                    const closeMessage = this.closeMessage.bind(this, messageId); // eslint-disable-line
                    return (
                        <MessagePopup
                            key={messageId || title}
                            type={type}
                            title={title}
                            onClose={closeMessage}
                        >
                            {body}
                        </MessagePopup>
                    );
                });
                break;
            }
            default: {
                // do nothing
            }
        }

        return (
            <div id={id} className={cx('messages', level, className)}>
                { renderedMessages }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(messagesActions, dispatch),
});

export default connect(null, mapDispatchToProps)(Messages);
