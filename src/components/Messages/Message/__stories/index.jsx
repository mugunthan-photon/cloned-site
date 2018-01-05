import React from 'react';
import Message from '../Message';
import * as styles from './storyBookTheme.css';

const stories = [
    {
        name: 'Message',
        story: () => (
            <div>
                <Message />

                <h4>Toast Messages [The width will vary based on the resolutions] </h4>
                <div className={styles.pageLayout}>
                    <Message type="success" uiType="toast" title="Success">
                        This is the success Message.
                        This is the success Message.
                    </Message>
                </div>
                <div className={styles.pageLayout}>
                    <Message type="information" uiType="toast" title="This is the Info Message." />
                </div>
                <div className={styles.pageLayout}>
                    <Message type="warning" uiType="toast" title="This is a Warning Message" />
                </div>
                <div className={styles.pageLayout}>
                    <Message type="error" uiType="toast" title="This is an Error Message" />
                </div>

                <h4>Box Messages</h4>
                <Message type="success" uiType="box" title="This is Success Message" />
                <Message type="information" uiType="box" title="This is an Info Message" />
                <Message type="warning" uiType="box" title="This is a Warning Message" />
                <Message type="error" uiType="box" title="This is an Error Message" />

                <h4>No Close Button</h4>
                <Message
                    type="information"
                    uiType="box"
                    title="This is an Info Message No close button added"
                    hasClose={false}
                />

                <h4>Inline Level</h4>
                <Message type="success" uiType="inline" title="This is Success Message" />
                <Message type="information" uiType="inline" title="This is an Info Message" />
                <Message type="warning" uiType="inline" title="This is a Warning Message" />
                <Message type="error" uiType="inline" title="This is an Error Message" />
            </div>
        ),
    },
];

export default stories;
