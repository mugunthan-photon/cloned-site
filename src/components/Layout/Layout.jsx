import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontLoader from 'yoda-core-components/lib/helpers/FontLoader/FontLoader';
import classNames from 'classnames/bind';
import FeatureFlag from 'yoda-core-components/lib/components/FeatureFlag/FeatureFlag';
import * as styles from './Layout.css';
import AppBanner from '../../components/AppBanner/AppBanner';
import Header from '../../components/YodaHeader/Header';
import Footer from '../../components/Footer/Footer';
import YodaFooter from '../../components/YodaFooter/YodaFooter';
import DevToolBar from '../../helpers/DevToolBar/DevToolBar';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';

const cx = classNames.bind(styles);

class Layout extends PureComponent {
    static defaultProps = {
        hideHeader: false,
        hideFooter: false,
        disableWhiteBG: null,
        deviceType: {},
        showOverlay: false,
        isPreview: false,
    }
    static propTypes = {
        children: PropTypes.element.isRequired,
        hideHeader: PropTypes.bool,
        hideFooter: PropTypes.bool,
        disableWhiteBG: PropTypes.bool,
        deviceType: PropTypes.objectOf(PropTypes.object),
        showOverlay: PropTypes.bool,
        isPreview: PropTypes.bool,
    }

    componentDidMount() {
        try {
            const fontsList = [{ fontname: 'Montserrat', weight: '400', style: 'normal' },
                               { fontname: 'Montserrat', weight: '700', style: 'normal' },
                               { fontname: 'Open Sans', weight: '400', style: 'normal' },
                               { fontname: 'Open Sans', weight: '700', style: 'normal' },
                               { fontname: 'Open Sans', weight: '400', style: 'italic' }];
            new FontLoader().callToLoadFonts(fontsList, styles);
        } catch (e) {
          // Log the error
        }
    }

    render() {
        const { deviceType, showOverlay, isPreview } = this.props;
        const footerContent = () => {
            let footerData;
            if (!this.props.hideFooter) {
                footerData = (deviceType.isDesktop ? <YodaFooter expandedFooter /> : <Footer />);
            }
            return footerData;
        };
        /* For the issue MNPDPYODA-2467. In future have to work on make it responsive */
        const lockWidthCss = deviceType.isDesktop ? 'lockWidth' : '';
        const backgroundCss = this.props.disableWhiteBG ? '' : 'whiteBg';
        const mainClass = cx('mainContainer', lockWidthCss, backgroundCss);
        const overlay = showOverlay ? cx('overlay', 'active') : cx('overlay');
        const previewClass = isPreview ? cx('previewActive') : cx('');

        // MNPDPYODA-2467 Ends
        return (<main className={cx(mainClass, previewClass)}>
            <DateTimePicker showDateTimePicker={isPreview} />
            <div className={overlay} />
            <FeatureFlag name="appBanner">
                <div className={styles.noMargin}>
                    <AppBanner/>
                </div>
            </FeatureFlag>
            {!this.props.hideHeader && <Header mountOnServer />}
            <article className={cx('contentContainer', 'containerWidth')}>{this.props.children}</article>
            {footerContent()}
            {/* {!this.props.hideFooter && <YodaFooter expandedFooter />} */}
            <DevToolBar />
        </main>);
    }
}

const mapStateToProps = store => ({
    deviceType: store.context ? store.context.deviceType : { },
    showOverlay: store.showOverlay,
    isPreview: store.context ? store.context.isPreview : false,
});

export default connect(mapStateToProps)(Layout);
