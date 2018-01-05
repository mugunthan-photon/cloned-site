import React, { PropTypes, Component } from 'react';
import StoreLocator from '../StoreLocator/StoreLocator';
import * as styles from './FindStoresMapView.css';
import StoreDetailsCard from '../StoreDetailsCard/StoreDetailsCard';

/**
 * This component renders map view of the stores. It includes StoreLocator component to render the Google map
 * and StoreDetailsCard to display the store details of the selected pin.
 *
 * @class FindStoresMapView
 * @extends {Component}
 */
export class FindStoresMapView extends Component {

    static propTypes = {
        stores: PropTypes.arrayOf(PropTypes.object),
        center: PropTypes.objectOf(PropTypes.object),
        selectStoreAction: PropTypes.func.isRequired,
        selectActionCallback: PropTypes.func,
        productDetails: PropTypes.objectOf(PropTypes.object),
        deviceType: PropTypes.objectOf(PropTypes.object),
        hideDirections: PropTypes.bool,
        theme: PropTypes.string,
        from: PropTypes.string.isRequired,
        defaultStoreId: PropTypes.string,
    }

    static defaultProps = {
        stores: [],
        center: {},
        deviceType: {},
        productDetails: null,
        selectActionCallback: null,
        isMobile: false,
        hideDirections: false,
        theme: '',
        defaultStoreId: null,
    }

    constructor(props) {
        super(props); /* istanbul ignore next */
        this.state = {
            center: props.center,
            data: props.stores[0],
        };
        this.clickStore = this.clickStore.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            center: nextProps.center,
            data: nextProps.stores[0],
        };
    }

    clickStore = (touchedStore) => {
        this.setState({ center: touchedStore.plot, data: touchedStore.plot });
    }

    render() {
        return (
            <div>
                <div className={styles.mapsWrapper}>
                    <StoreLocator
                        plotPlaces={this.props.stores}
                        center={this.state.center}
                        automationId="at-store-map-view"
                        zoom={10}
                        clickStore={this.clickStore}
                    />
                </div>
                <StoreDetailsCard
                    store={this.state.data}
                    selectStoreAction={this.props.selectStoreAction}
                    selectActionCallback={this.props.selectActionCallback}
                    productDetails={this.props.productDetails}
                    deviceType={this.props.deviceType}
                    hideDirections={this.props.hideDirections}
                    theme={this.props.theme}
                    from={this.props.from}
                    isDefaultStore={this.props.defaultStoreId === this.state.data.id}
                    isExpanded
                />
            </div>
        );
    }
}
export default FindStoresMapView;
