import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Banner from 'yoda-core-components/lib/components/Banner/Banner';
import ImagemapBannerResponsive from 'yoda-core-components/lib/components/ImagemapBannerResponsive/ImagemapBannerResponsive';
import VisualNav from 'yoda-core-components/lib/components/VisualNav/VisualNav';
import TimerWrapper from '../TimerWrapper/TimerWrapper';

import * as styles from './MarketingZone.css';

const cx = classNames.bind(styles);

/**
 * MarketingZone
 */

class MarketingZone extends Component {
    /**
    * Supported React properties
    * @type {Object}
    */

    static propTypes = {
        deviceType: PropTypes.string,
        zoneContent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        automationId: PropTypes.string,
        zoneStyleClass: PropTypes.string,
        softRoute: PropTypes.bool,
        timerZone: PropTypes.string,
        displayTimer: PropTypes.bool,
        showPreviewZone: PropTypes.bool,
    };

    static defaultProps = {
        automationId: '',
        deviceType: 'mobile',
        zoneContent: {},
        zoneStyleClass: '',
        softRoute: false,
        timerZone: 'CST',
        displayTimer: false,
        showPreviewZone: false,
    };

    static arrangeVisualNavData(visualNavSlots, deviceType) {
        let newImage = null;
        const newArray = [];
        visualNavSlots.forEach((args) => {
            newImage = MarketingZone.imageWithURL(args, deviceType);
            if (newImage) {
                newArray.push({
                    id: args.departmentId,
                    title: args.h1title,
                    image: newImage,
                    links: args.seoUrl,
                });
            }
        });
        return newArray;
    }

    static imageWithURL(args, deviceType) {
        let newImage = null;
        const img = args.imagePath;
        if (img && img.length) {
            if (args.isDynamic) {
                newImage = `https://s7d9.scene7.com/is/image/JCPenney/${img.split('.')[0]}`;
            } else if (deviceType === 'desktop' || deviceType === 'large' || deviceType === 'extralarge') {
                newImage = `/dotcom/images/${img}`;
            } else {
                newImage = `/${deviceType}/images/${img}`;
            }
        }

        return newImage;
    }

    static paintVisualNavigation(visualNavSlots, deviceType) {
        return <VisualNav direction="Fluid" datasource={MarketingZone.arrangeVisualNavData(visualNavSlots, deviceType)} />;
    }

    static constructLeaf(mapArea) {
        mapArea.map((data) => {
            if (data.link && data.link.indexOf('X2H2') >= 0) {
                data.leaf = false;
            } else {
                data.leaf = true;
            }
            return data;
        });
        return mapArea;
    }


    componentDidMount() {
        this.paintImage = this.paintImage.bind(this);
        this.paintImageMap = this.paintImageMap.bind(this);
        this.getImageMap = this.getImageMap.bind(this);
        this.getImagePath = this.getImagePath.bind(this);
    }

    getImage(imageObject) {
        if (!imageObject.imageSrc || imageObject.imageSrc === '') return null;
        const imagePath = this.getImagePath(imageObject.imageSrc);
        return (
            <Banner
                href={imageObject.imageUrl}
                bannerImageUrl={imagePath}
                altText={imageObject.imageAlt}
                ariaLabel={imageObject.imageAlt}
                softRoute={this.props.softRoute}
                analyticsTag={imageObject.analyticsTag}
            />);
    }

    getImagePath(imageUrl) {
        let imagePath = `/${this.props.deviceType}/images/${imageUrl}`;
        if (this.props.deviceType === 'desktop' || this.props.deviceType === 'large' || this.props.deviceType === 'extralarge') {
            imagePath = `/dotcom/images/${imageUrl}`;
        }
        return imagePath;
    }

    getImageMap(imageMapAreaDetails) {
        const imageUrl = imageMapAreaDetails.imageUrl;
        if (!imageUrl || imageUrl === '') return null;
        const imagePath = this.getImagePath(imageUrl);
        /* istanbul ignore next */
        if (imageMapAreaDetails.imagemapArea.length) {
            return (
                <ImagemapBannerResponsive
                    imageUrl={imagePath}
                    imagemapArea={MarketingZone.constructLeaf(imageMapAreaDetails.imagemapArea)}
                    imageAltText={imageMapAreaDetails.imagemapArea[0].alt}
                    softRoute={this.props.softRoute}
                    analyticsTag={imageMapAreaDetails.imagemapArea[0].analyticsTag}
                />
            );
        }
        return null;
    }

    paintImage() {
        const content = this.props.zoneContent;
        let imageHTML = null;
        /* istanbul ignore next */
        if (content && typeof content.imageBannerDetails !== 'undefined') {
            if (this.props.deviceType === 'mobile') {
                const imageObject = content.imageBannerDetails.mobileImageDetails;
                imageHTML = this.getImage(imageObject);
            } else if (this.props.deviceType === 'tablet') {
                const imageObject = content.imageBannerDetails.tabletImageDetails;
                imageHTML = this.getImage(imageObject);
            } else if (this.props.deviceType === 'desktop') {
                // const imageObject = content.imageBannerDetails.desktopImageDetails;
                let imageObject = content.imageBannerDetails.desktopImageDetails;
                // imageHTML = this.getImage(imageObject);
                if (content.imageBannerDetails.extraLargeImageDetails
                  && content.imageBannerDetails.extraLargeImageDetails.imageSrc) {
                    imageObject = content.imageBannerDetails.extraLargeImageDetails;
                }
                imageHTML = this.getImage(imageObject);
            } else if (this.props.deviceType === 'large') {
                const imageObject = content.imageBannerDetails.largeImageDetails;
                imageHTML = this.getImage(imageObject);
            } else if (this.props.deviceType === 'extralarge') {
                const imageObject = content.imageBannerDetails.extraLargeImageDetails;
                imageHTML = this.getImage(imageObject);
            }
        }
        return imageHTML;
    }

    paintImageMap() {
        const content = this.props.zoneContent;
        let imageMapHTML = null;
        if (content && typeof content.imageMapDetails !== 'undefined') {
            if (this.props.deviceType === 'mobile') {
                const imageMapAreaDetails = content.imageMapDetails.mobileMapDetails;
                imageMapHTML = this.getImageMap(imageMapAreaDetails);
            } else if (this.props.deviceType === 'tablet') {
                const imageMapAreaDetails = content.imageMapDetails.tabletMapDetails;
                imageMapHTML = this.getImageMap(imageMapAreaDetails);
            } else if (this.props.deviceType === 'desktop') {
                // const imageMapAreaDetails = content.imageMapDetails.desktopMapDetails;
                let imageMapAreaDetails = content.imageMapDetails.desktopMapDetails;
                if (content.imageMapDetails.extraLargeMapDetails &&
                  content.imageMapDetails.extraLargeMapDetails.imageUrl) {
                    imageMapAreaDetails = content.imageMapDetails.extraLargeMapDetails;
                }
                imageMapHTML = this.getImageMap(imageMapAreaDetails);
            } else if (this.props.deviceType === 'large') {
                const imageMapAreaDetails = content.imageMapDetails.largeMapDetails;
                imageMapHTML = this.getImageMap(imageMapAreaDetails);
            } else if (this.props.deviceType === 'extralarge') {
                const imageMapAreaDetails = content.imageMapDetails.extraLargeMapDetails;
                imageMapHTML = this.getImageMap(imageMapAreaDetails);
            }
        }
        return imageMapHTML;
    }

    displayTimer() {
        const { zoneContent, timerZone, displayTimer } = this.props;

        const timerTextConfig = {
            h: 'hours',
            m: 'mins',
            s: 'secs',
        };

        const colorConfig = {
            textColor: zoneContent.liveTextLabelColor || '#ffffff',
            suffixColor: '#ffffff',
            digitBoxbgColor: '#ffffff',
        };

        const myTheme = {
            timerContainerClass: styles.timerContainers,
            timerWrapperClass: styles.timer,
            timerListItemClass: styles.timerListItem,
            timerNumberClass: styles.timerNumber,
            timerTextClass: styles.timerText,
            timerSuffixClass: cx('timerListItem', 'timerSuffix'),
            timerDigitClass: styles.timerDigit,
            timerAnimateClass: cx('timerAnimateClass'),
        };

        return (zoneContent.timerEnabled && displayTimer ?
            <TimerWrapper
                liveTextLabel={zoneContent.liveText}
                finishTime={zoneContent.timer}
                timerTextColor={zoneContent.liveTextColor}
                liveTextLabelColor={zoneContent.timerTextColor}
                wrapperBackgroundTheme={zoneContent.liveTextBackGroundColor}
                timerZone={timerZone}
                wrapperClassName={cx('timer-WrapperClass')}
                timerParentWrapper={cx('timer-ParentWrapper')}
                livetextTheme={cx('timer-FontDetails')}
                liveTextLabelClassName={cx('timer-liveTextLabelClassName')}
                displayTimer={cx('displayTimer')}
                timerTextConfig={timerTextConfig}
                timerWrapperThemeConfig={myTheme}
                colorConfig={colorConfig}
                digitSplit
                timerSuffix
                animate
        /> : null);
    }

    render() {
        const { automationId, zoneContent, showPreviewZone } = this.props;
        const content = this.props.zoneContent;
        const zoneTimerStyle = zoneContent.timerEnabled ? 'zoneTimer' : '';
        const isPreviewStyle = showPreviewZone ? 'zonePreview' : '';
        const zoneStyleClasses = cx('marketingZone', this.props.zoneStyleClass, zoneTimerStyle, isPreviewStyle);
        let zone = null;

        /* note : conditions will get replaced with ContentType api response, JAYADEV */

        if (content && content.imageBannerDetails !== null && typeof content.imageBannerDetails !== 'undefined') {
            zone = this.paintImage();
        } else if (content && content.imageMapDetails !== null && typeof content.imageMapDetails !== 'undefined') {
            zone = this.paintImageMap();
        } else if (content && content.visualNavDetails !== null && typeof content.visualNavDetails !== 'undefined') {
            zone = MarketingZone.paintVisualNavigation(this.props.zoneContent.visualNavDetails.visNavSlots,
                this.props.deviceType);
        }
        if (zone) {
            return (
                <div className={zoneStyleClasses} data-automation-id={automationId}>
                    {showPreviewZone && <span className={cx('zonePreviewContent')}>{content.type}</span>}
                    {this.displayTimer()}
                    {zone}
                </div>
            );
        }

        return null;
    }
}

export default MarketingZone;
