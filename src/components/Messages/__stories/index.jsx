import React from 'react';
import uniqueId from 'lodash/uniqueId';

import Messages from '../Messages';
import { messagesLevels } from '../Messages.config';
import * as styles from './storyBookTheme.css';

const stories = [
    {
        name: 'Messages',
        story: () => (
            <div>
                <Messages messages={[]}/>
                <h4>Page messages [The width will vary based on the resolutions] </h4>
                <div className={styles.pageLayout}>
                    <Messages
                        level={messagesLevels.page}
                        messages={[
                            { id: uniqueId('message_'), type: 'success', title: 'Success' },
                        ]}
                    />
                </div>
                <div className={styles.pageLayout}>
                    <Messages
                        level={messagesLevels.page}
                        messages={[
                            {
                                id: uniqueId('message_'),
                                type: 'information',
                                title: 'Info',
                                body: 'This is the Info Message with body',
                            },
                        ]}
                    />
                </div>
                <div className={styles.pageLayout}>
                    <Messages
                        level={messagesLevels.page}
                        messages={[
                            {
                                id: uniqueId('message_'),
                                type: 'warning',
                                title: 'Warning',
                                body: 'This is the Warning Message with body',
                            },
                            {
                                id: uniqueId('message_'),
                                type: 'error',
                                title: 'This is the Error message',
                            },
                        ]}
                    />
                </div>
                <h4>Section messages</h4>
                <Messages
                    level={messagesLevels.section}
                    messages={[
                        { id: uniqueId('message_'), type: 'success', title: 'Success' },
                        { id: uniqueId('message_'), type: 'information', title: 'Info' },
                        { id: uniqueId('message_'), type: 'warning', title: 'Warning' },
                        { id: uniqueId('message_'), type: 'error', title: 'Error' },
                    ]}
                />
                <h4>Section messages without close button</h4>
                <Messages
                    level={messagesLevels.section}
                    hasClose={false}
                    messages={[
                        { id: uniqueId('message_'), type: 'information', title: 'Info message without close icon' },
                    ]}
                />
                <h4>Inline messages</h4>
                <Messages
                    level={messagesLevels.inline}
                    messages={[
                        { id: uniqueId('message_'), type: 'success', title: 'Success' },
                        { id: uniqueId('message_'), type: 'information', title: 'Info' },
                        { id: uniqueId('message_'), type: 'warning', title: 'Warning' },
                        { id: uniqueId('message_'), type: 'error', title: 'Error' },
                    ]}
                />
                <h4>Popup messages</h4>
                {/* <Messages */}
                {/* level={messagesLevels.popup} */}
                {/* messages={[ */}
                {/* { id: uniqueId('message_'), type: 'success', title: 'Success' }, */}
                {/* ]} */}
                {/* /> */}
            </div>
        ),
    },
];

export default stories;
