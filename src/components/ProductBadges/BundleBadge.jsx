import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import config from '../ProductCard/ProductCard.config';
import * as styles from './BundleBadge.css';

const cx = classNames.bind(styles);

class BundleBadge extends PureComponent {
    static defaultProps = {
        text: '',
        themeConfig: {},
        cardType: '',
    };

    static propTypes = {
        text: PropTypes.string.isRequired,
        themeConfig: PropTypes.oneOfType([PropTypes.object]),
        cardType: PropTypes.string,
    };

    static getThemeConfig(themeConfig) {
        return Object.assign({}, {
            bundleBadgeCont: styles.bundleBadge,
            bundleBadgeBtmLft: styles.btmLft,
            bundleBadgeTopLft: styles.topLft,
            bundleBadgeCircle: styles.circle,
            bundleBadgeText: styles.text,
        }, themeConfig);
    }

    render() {
        const { text, cardType } = this.props;
        if (text) {
            const themeConfig = BundleBadge.getThemeConfig(this.props.themeConfig);
            const viewType = cardType && (cardType === config.cardTypes.LIST ? styles.list : styles.grid);

            return (
                <div className={cx(themeConfig.bundleBadgeCont, viewType)}>
                    <div className={cx(themeConfig.bundleBadgeBtmLft)} />
                    <div className={cx(themeConfig.bundleBadgeTopLft)} />
                    <div className={cx(themeConfig.bundleBadgeCircle)} />
                    <span className={cx(themeConfig.bundleBadgeText)}>{text.toLowerCase()}</span>
                </div>
            );
        }
        return null;
    }
}

export default BundleBadge;
