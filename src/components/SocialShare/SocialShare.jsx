import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Button from 'yoda-core-components/lib/components/Button/Button';
import SiteComponent from '../SiteComponent/SiteComponent';

import * as styles from './SocialShare.css';
// import ProductConstants, { productDimensions } from '../../helpers/ProductConstants';

const cx = classNames.bind(styles);
const wwwHost = 'http://www.jcpenney.com';
let url = '';
let isDesktop = false;
const tweetHashTags = [
    'jcpenney',
    'soworthit',
];

/* istanbul ignore next */
class SocialShare extends SiteComponent {
    static propTypes = {
        message: PropTypes.string.isRequired,
        dataAutomationId: PropTypes.string.isRequired,
        location: PropTypes.oneOfType([PropTypes.object]),
        productImage: PropTypes.oneOfType([PropTypes.object]),
    };
    static defaultProps = {
        message: '',
        dataAutomationId: '',
        location: {},
        productImageUrl: {},
    };

    buildDesktopUrl() {
        return `${wwwHost}${location.pathname}${this.props.query}`;
    }

    hydrate() {
        url = encodeURI(this.buildDesktopUrl());
        if (this.props.deviceType) {
            isDesktop = this.props.deviceType.isDesktop;
        }
    }

    render() {
        const { dataAutomationId, productImage } = this.props;
        const message = encodeURI(this.props.message);
        const productImageUrl = productImage && productImage.url ? productImage.url : '';

        return (
            <div className={cx('socialShare')}>
                {/* Sharingbutton Facebook */}
                <Button
                    buttonType="Link"
                    className={cx('share-icon')}
                >
                    <a
                        href={`https://facebook.com/sharer/sharer.php?u=${url}`}
                        target="_blank"
                        aria-label=""
                        rel="noopener noreferrer"
                        data-automation-id={`${dataAutomationId}-facebook`}
                        className={cx('share-icon', 'facebookIcon')}
                        onClick={this.props.facebookCB}
                    >
                        <Icon
                            iconType="svg"
                            pathClassName={cx('iconPath')}
                            className={cx('svg-icon')}
                            width="18px"
                            height="18px"
                            viewBox="0 0 20 20"
                            name="icon-facebook-line"
                        />
                    </a>
                </Button>
                {/* Sharingbutton Twitter */}
                <Button
                    buttonType="Link"
                    className={cx('share-icon')}
                >
                    <a
                        href={`https://twitter.com/intent/tweet/?text=${message}&url=${url}&hashtags=${tweetHashTags.join(',')}`}
                        target="_blank"
                        aria-label=""
                        rel="noopener noreferrer"
                        data-automation-id={`${dataAutomationId}-twitter`}
                        className={cx('share-icon')}
                        onClick={this.props.twitterCB}
                    >
                        <Icon
                            iconType="svg"
                            pathClassName={cx('iconPath')}
                            className={cx('svg-icon')}
                            width="18px"
                            height="18px"
                            viewBox="0 0 20 20"
                            name="icon-twitter-line"
                        />
                    </a>
                </Button>
                {/* Sharingbutton Pinterest */}
                <Button
                    buttonType="Link"
                    className={cx('share-icon')}
                >
                    <a
                        href={`https://pinterest.com/pin/create/button/?url=${url}&amp;media=${productImageUrl}&amp;description=${message}`}
                        target="_blank"
                        aria-label=""
                        rel="noopener noreferrer"
                        data-automation-id={`${dataAutomationId}-pinterest`}
                        className={cx('share-icon')}
                        onClick={this.props.pinterestCB}
                    >
                        <Icon
                            iconType="svg"
                            pathClassName={cx('iconPath')}
                            className={cx('svg-icon')}
                            width="18px"
                            height="18px"
                            viewBox="0 0 20 20"
                            name="icon-pinterest-line"
                        />
                    </a>
                </Button>
                {isDesktop ? (
                    <span className={cx('printIcon')}>
                        {/* Sharingbutton Print */}
                        <a
                            href="javascript:window.print()"
                            data-automation-id={`${dataAutomationId}-print`}
                            className={cx('share-icon', 'printIcon')}
                            onClick={this.props.printCB}
                        >
                            <Icon
                                iconType="svg"
                                pathClassName={cx('iconPath')}
                                className={cx('svg-icon')}
                                width="18px"
                                height="18px"
                                viewBox="0 0 20 20"
                                name="print"
                            />
                        </a>
                    </span>
                ) : ''}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    deviceType: store.context ? store.context.deviceType : {},
});

export default connect(mapStateToProps)(SocialShare);
