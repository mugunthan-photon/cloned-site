import React, { Component, PropTypes } from 'react';
import Button from 'yoda-core-components/lib/components/Button/Button';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Utils from '../../helpers/Utils/Utils';
import * as styles from './SeoBlock.css';

const cx = classNames.bind(styles);

export class SeoBlock extends Component {

    static defaultProps = {
        seoTitleTags: {},
        featureFlags: {},
        preferences: {},
        deviceType: {},
    };

    static propTypes = {
        seoTitleTags: PropTypes.objectOf(PropTypes.object),
        featureFlags: PropTypes.objectOf(PropTypes.object),
        preferences: PropTypes.objectOf(PropTypes.object),
        deviceType: PropTypes.objectOf(PropTypes.object),
    };

    constructor() {
        super();
        this.state = {
            showHideCopyText: 'seoContentHeight',
            copyTextButtonName: 'Show More',
        };
        this.toggleCopyText = this.toggleCopyText.bind(this);
    }

    setMetaData() {
        const metaTags = this.props.seoTitleTags;
        let noIndexNoFollow = {};

        const canonicalDomainMap = this.props.preferences.canonicalmap || 'www.jcpenney.com';
        if (metaTags && metaTags.noIndexNoFollowRequired) {
            noIndexNoFollow = {
                name: 'robots',
                content: 'noindex, nofollow',
            };
        }
        let canonicalURL = metaTags.canonicalURL;
        let alternateURL = '';
        const mobhost = 'm.jcpenney.com';

        try {
            let protocol = 'http://';
            let canonicalFromAPI = '';
            /* istanbul ignore next */
            canonicalFromAPI = Utils.getPathFromUrl(canonicalURL);
            /* istanbul ignore next */
            if (this.props.featureFlags.HTTPS_FOR_SEO_ENABLED) {
                protocol = 'https://';
            }
            canonicalURL = `${protocol}${canonicalDomainMap}${canonicalFromAPI}`;
            alternateURL = `${protocol}${mobhost}${canonicalFromAPI}`;
        } catch (error) {
            /* istanbul ignore next */
            console.log('SEO regularexpression failed');
        }
        return (
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{metaTags.seoMetaTitle}</title>
                    <meta name="description" content={metaTags.seoMetaDescription} />
                    <meta name="keywords" content={metaTags.seoMetaKeyword} />
                    <link rel="canonical" href={canonicalURL} />
                    {this.props.deviceType.isDesktop ? <link rel="alternate" href={alternateURL} /> : null}
                    <meta {...noIndexNoFollow} />
                </Helmet>
            </div>
        );
    }
    setCopyText = () => {
        if (!this.props.featureFlags.Home_SEOBlockEnabled) {
            return null;
        }
        const metaTags = this.props.seoTitleTags;
        if (metaTags.copyText) {
            return (
                <section className={cx('rowBlock', 'bgWhite')}>
                    <div className={cx('row')}>
                        <div className={cx('col12')}>
                            <div className={cx('seoContent')}>
                                <div className={cx(this.state.showHideCopyText)}>
                                    { /* eslint-disable react/no-danger */}
                                    <div dangerouslySetInnerHTML={{ __html: metaTags.copyText }} />
                                </div>
                                <Button
                                    type="button" automationId="seoToggleBtn" className={cx('seoToggleBtn')}
                                    buttonType="Text" size="Sm" onClick={this.toggleCopyText}>
                                    {this.state.copyTextButtonName}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }

        return null;
    }

    toggleCopyText() {
        if (this.state.showHideCopyText === 'seoContentHeight') {
            this.setState({ showHideCopyText: '', copyTextButtonName: 'Show Less' });
        } else {
            this.setState({ showHideCopyText: 'seoContentHeight', copyTextButtonName: 'Show More' });
        }
    }

    render() {
        return (
            <div>
                {this.setMetaData()}
                {this.setCopyText()}
            </div>
        );
    }

}

const mapStateToProps = store => ({
    featureFlags: store.context ? store.context.featureFlags : {},
    preferences: store.context ? store.context.preferences : {},
    deviceType: store.context ? store.context.deviceType : {},
});

export default connect(mapStateToProps)(SeoBlock);
