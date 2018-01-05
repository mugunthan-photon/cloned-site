
import React, { PropTypes } from 'react';
import List from 'yoda-core-components/lib/components/List/List';
import SiteComponent from '../SiteComponent/SiteComponent';
import GridPainter from './GridPainter';

const renderImageMapOrImageBanner = data => (
    <GridPainter data={data} />
);

class BelowGrid extends SiteComponent {

    static propTypes = {
        /**
         * @param gridData @type {array} pass the response from Op Code homePageBelowGridContent
         */
        gridData: PropTypes.arrayOf(PropTypes.object),
        deviceType: PropTypes.string,
        softRoute: PropTypes.bool,
    };

    static defaultProps = {
        gridData: [],
        deviceType: '',
        softRoute: false,
    };

    /* istanbul ignore next */
    constructor(props) {
        super(props);
        this.state = {
            composedDataWithImage: [],
        };
    }

    componentWillReceiveProps() {
        this.setState({ composedDataWithImage: this.constructWithImageUrl() });
    }

    constructWithImageUrl() {
        const gridContentsWithImage = [];
        let oneContent = null;
        if (this.props.gridData.length) {
            this.props.gridData[0].belowGridContents.forEach((data) => {
                oneContent = data;
                if (oneContent.desktopImageBannerDetails) {
                    oneContent.desktopImageBannerDetails.softRoute = this.props.softRoute;
                    oneContent.desktopImageBannerDetails.imageSrc =
                        `/${this.props.deviceType}/images/${oneContent.desktopImageBannerDetails.imageSrc}`;
                } else if (oneContent.desktopDetails) {
                    oneContent.desktopDetails.softRoute = this.props.softRoute;
                    oneContent.desktopDetails.image =
                        `/${this.props.deviceType}/images/${oneContent.desktopDetails.image}`;
                }
                gridContentsWithImage.push(Object.assign({}, oneContent));
            });
        }
        return gridContentsWithImage;
    }

    render() {
        return (<List
            direction={'Fluid'}
            datasource={this.state.composedDataWithImage}
            childRenderer={renderImageMapOrImageBanner}
            automationId={'below-grid'}
        />);
    }

}

export default BelowGrid;
