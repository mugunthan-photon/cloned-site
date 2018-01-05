import React from 'react';
import BundleBadge from '../BundleBadge';
import * as styles from './storyBookTheme.css';

// Pass your Custom Theme in Here
const myTheme = {
    bundleBadgeCont: styles.bundleBadge,
    bundleBadgeBtmLft: styles.btmLft,
    bundleBadgeTopLft: styles.topLft,
    bundleBadgeCircle: styles.circle,
    bundleBadgeText: styles.text,
};

const stories = [{
    name: 'Bundle Badge',
    story: () => (
        <BundleBadge text={'Save up to $24.99'} themeConfig={myTheme} />
      ),
}];

export default stories;
