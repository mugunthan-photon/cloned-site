
import React, { PropTypes } from 'react';
import Banner from 'yoda-core-components/lib/components/Banner/Banner';
import ImagemapBannerResponsive from 'yoda-core-components/lib/components/ImagemapBannerResponsive/ImagemapBannerResponsive';
import SiteComponent from '../SiteComponent/SiteComponent';

class GridPainter extends SiteComponent {

    static propTypes = {
        /**
         * @param gridData @type {array} filtered input expected belowGridContents
         */
        gridData: PropTypes.arrayOf(PropTypes.object),
        deviceType: PropTypes.string,
    }

    static defaultProps = {
        gridData: [],
        deviceType: '',
    }

    static paintImgBanner(imageObject) {
        if (!imageObject.imageSrc || !imageObject.imageSrc.length) return null;
        return (
            <Banner
                href={imageObject.pageURL}
                bannerImageUrl={imageObject.imageSrc}
                altText={imageObject.imageAlt}
                ariaLabel={imageObject.imageAlt}
                softRoute={imageObject.softRoute}
                analyticsTag={imageObject.analyticsTag}
            />);
    }

    static paintImgMap(imageMapAreaDetails) {
        if (!imageMapAreaDetails.image || imageMapAreaDetails.image === '') return null;
        if (imageMapAreaDetails.imagemapArea.length) {
            return (
                <ImagemapBannerResponsive
                    imageUrl={imageMapAreaDetails.image}
                    imagemapArea={imageMapAreaDetails.imagemapArea}
                    imageAltText={imageMapAreaDetails.imagemapArea[0].alt}
                    softRoute={imageMapAreaDetails.softRoute}
                    analyticsTag={imageMapAreaDetails.analyticsTag}

                />
            );
        }
        return null;
    }

    static renderImageMapOrImageBanner(data) {
        if (data) {
            if (data.contentType === 'ImageBanner' && data.desktopImageBannerDetails) {
                return GridPainter.paintImgBanner(data.desktopImageBannerDetails);
            } else if (data.contentType === 'ImageMap' && data.desktopDetails) {
                return GridPainter.paintImgMap(data.desktopDetails);
            }
        }
        return null;
    }

    render() {
        return (GridPainter.renderImageMapOrImageBanner(this.props.data));
    }

}

export default GridPainter;
