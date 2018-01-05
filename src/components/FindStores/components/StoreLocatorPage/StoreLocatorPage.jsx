import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { findStores } from '../../../../common/Constants';
import styles from './StoreLocatorPage.css';

const cx = classNames.bind(styles);
/**
 * This component a Google map with the location of the stores passed as pins. The pin can be touched
 * and the store details will be displayed in the StoreDetailsCard component.
 *
 * @class StoreLocator
 * @extends {Component}
 */
export class StoreLocatorPage extends Component {
    static defaultProps = {
        zoom: 10,
        plotPlaces: [],
        mapClass: styles.googleMaps,
        automationId: '',
        storeDetails: {},
        userLatLong: '',
    };
    static propTypes = {
        zoom: PropTypes.number,
        plotPlaces: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number])).isRequired,
        mapClass: PropTypes.string,
        automationId: PropTypes.string,
        storeDetails: PropTypes.objectOf(PropTypes.object),
        userLatLong: PropTypes.string,
    };

    /* istanbul ignore next */
    static createMapOptions(maps) {
        return {
            zoomControlOptions: {
                position: maps.ControlPosition.RIGHT_BOTTOM,
                style: maps.ZoomControlStyle.SMALL,
            },
        };
    }

    render() {
        const { automationId, storeDetails, plotPlaces: storePlots, userLatLong } = this.props;
        let center = [39.8283459, -98.5794797];
        const plotPlaces = storePlots.slice(0);
        if (userLatLong) {
            const userLocation = userLatLong.split(',');
            plotPlaces.push({
                latitude: userLocation[0],
                longitude: userLocation[1],
                userLatLng: true,
            });
        }
        if (plotPlaces.length) {
            center = (storeDetails.latitude && storeDetails.longitude) ?
                [storeDetails.latitude, storeDetails.longitude] :
                [plotPlaces[0].latitude, plotPlaces[0].longitude];
        }

        const PlotMarker = (props) => {
            let marker;
            const pinText = (
                <span className={styles.pinText}>
                    {props.text}
                </span>
            );

            if (props.lat === storeDetails.latitude && props.lng === storeDetails.longitude) {
                marker = (
                    <div
                        className={cx('plotMarker', 'plotSelectedMarkerStyle')}
                        data-automation-id={`{at-map-selected-store-${props.plot.id}}`}
                        >
                        {pinText}
                    </div>
                );
            } else if (props.plot.userLatLng) {
                marker = (
                    <div
                        className={cx('plotMarker', 'plotUserLocationStyle')}
                        data-automation-id={`{at-map-selected-store-${props.plot.id}}`}
                    />
                    );
            } else {
                marker = (
                    <div className={cx('plotMarker', 'plotMarkerStyle')} data-automation-id={`{at-map-stores-${props.plot.id}}`} >
                        {pinText}
                    </div>
                    );
            }
            return marker;
        };

        return (
            <div className={`${this.props.mapClass} ${styles.googleWrapper}`} data-automation-id={automationId}>
                <GoogleMap
                    bootstrapURLKeys={{ key: findStores.GOOGLE_API_KEY }}
                    center={center}
                    zoom={this.props.zoom}
                    options={StoreLocatorPage.createMapOptions}
                    resetBoundsOnResize
                >
                    {plotPlaces.map((plot, index) =>
                        <PlotMarker
                            key={plot.id}
                            lat={plot.latitude}
                            lng={plot.longitude}
                            plot={plot}
                            center={center}
                            text={index + 1}
                        />,
                    )}
                </GoogleMap>
            </div>
        );
    }
}

const mapStateToProps = ({ selectedStore: { storeDetails } }) => ({
    storeDetails: storeDetails || {},
});

export default connect(mapStateToProps)(StoreLocatorPage);
