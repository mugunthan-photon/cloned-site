import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { findStores } from '../../../../common/Constants';
import styles from './StoreLocator.css';

/**
 * This component a Google map with the location of the stores passed as pins. The pin can be touched
 * and the store details will be displayed in the StoreDetailsCard component.
 *
 * @class StoreLocator
 * @extends {Component}
 */
class StoreLocator extends Component {
    static defaultProps = {
        zoom: 10,
        plotPlaces: [],
        mapClass: styles.googleMaps,
        automationId: '',
    };
    static propTypes = {
        center: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number])).isRequired,
        zoom: PropTypes.number,
        plotPlaces: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number])).isRequired,
        mapClass: PropTypes.string,
        automationId: PropTypes.string,
        clickStore: PropTypes.func.isRequired,
    };

    static createMapOptions(maps) {
        return {
            zoomControlOptions: {
                position: maps.ControlPosition.RIGHT_BOTTOM,
                style: maps.ZoomControlStyle.SMALL,
            },
        };
    }

    constructor() {
        super();
        this.onChildClick = this.onChildClick.bind(this);
    }

    onChildClick(key, childProps) {
        this.props.clickStore(childProps);
    }

    render() {
        const { automationId } = this.props;
        const center = [];
        center.push(this.props.center.latitude);
        center.push(this.props.center.longitude);
        const PlotMarker = props => (
            <span>
                {props.lat === center[0] && props.lng === center[1] ?
                    <div
                        className={styles.plotSelectedMarkerStyle}
                        data-automation-id={`{at-map-selected-store-${props.plot.id}}`}
                    /> :
                    <div className={styles.plotMarkerStyle} data-automation-id={`{at-map-stores-${props.plot.id}}`} />
                }
            </span>
        );

        return (
            <div className={`${this.props.mapClass} ${styles.googleWrapper}`} data-automation-id={automationId}>
                <GoogleMap
                    bootstrapURLKeys={{ key: findStores.GOOGLE_API_KEY }}
                    center={center}
                    zoom={this.props.zoom}
                    options={StoreLocator.createMapOptions}
                    onChildClick={this.onChildClick}
                    resetBoundsOnResize
                >
                    {this.props.plotPlaces.map(plot =>
                        <PlotMarker
                            key={plot.id}
                            lat={plot.latitude}
                            lng={plot.longitude}
                            plot={plot}
                            center={center}
                        />,
                    )}
                </GoogleMap>
            </div>
        );
    }
}

export default StoreLocator;
