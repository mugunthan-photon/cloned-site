import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import styles from './GoogleMaps.css';
import * as googleStyle from './GoogleMapsStyle';

const googleAPIkey = '<!-- @yoda_config google_map_key -->';

/**
 * Example of using this Component
 * <GoogleMaps plotPlaces={this.array} center={center} />
 */

class GoogleMaps extends Component {
    static defaultProps = {
        zoom: 10,
        plotPlaces: [],
        mapClass: styles.googleMaps,
        automationId: '',
    };
    static propTypes = {
        center: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
        zoom: PropTypes.number,
        plotPlaces: PropTypes.arrayOf(PropTypes.object),
        mapClass: PropTypes.string,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,
    };

    /* istanbul ignore next */
    static createMapOptions(maps) {
        /* istanbul ignore next */
        return {
            zoomControlOptions: {
                position: maps.ControlPosition.RIGHT_BOTTOM,
                style: maps.ZoomControlStyle.SMALL,
            },
        };
        // next props are exposed at maps
        // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
        // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
        // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
        // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
        // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
        // console.log(this);
    }
    /* istanbul ignore next */
    render() {
        /* istanbul ignore next */
        const { automationId } = this.props;
        /* istanbul ignore next */
        const PlotMarker = props => (
            <div style={googleStyle.plotMarkerStyle}>
                {props.text}
            </div>
        );
        /* istanbul ignore next */
        return (
            <div className={this.props.mapClass} data-automation-id={automationId} >
                <GoogleMap
                    bootstrapURLKeys={{ key: googleAPIkey }}
                    center={this.props.center}
                    zoom={this.props.zoom}
                    options={GoogleMaps.createMapOptions}
                    >
                    {this.props.plotPlaces.map((plot, i) =>
                        <PlotMarker key={plot.id} lat={plot.latitude} lng={plot.longitude} text={i + 1} />,
                    )}
                </GoogleMap>
            </div>
        );
    }
}

export default GoogleMaps;
