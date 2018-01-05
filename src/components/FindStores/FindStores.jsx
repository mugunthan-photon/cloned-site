import React, { PropTypes, Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames/bind';
import SlidePanel from '../SlidePanel/SlidePanel';
import FindStoresTabContainer from './components/FindStoresTabContainer/FindStoresTabContainer';
import FindStoresProductCard from './components/FindStoresProductCard/FindStoresProductCard';
import * as findStoresActions from '../../actions/FindStoresAction';
import styles from './FindStores.css';

const cx = classnames.bind(styles);

/**
 * This component add a slide panel displaying a zipcode form and list of stores if data is present.
 * It receives the following props
 *
 * productDetails (Optional)      : The details of the products for which inventory is being checked.
 * findStoresAction (Required)    : Action which has to be invoked on the submit of location form. This will populate the list of stores in redux store
 * selectStoreAction (Required)   : Action which will be invoked when the select button from the store card is clicked.
 * selectActionCallback (Optional): The callback action that will be invoked after selecting a store.
 * openPanelAnalyticsCallback (Optional)  : A callback to execute analytics event on opening the panel
 *
 * @class FindStores
 * @extends {Component}
 */
export class FindStores extends Component {

    static propTypes = {
        productDetails: PropTypes.objectOf(PropTypes.array),
        defaultStoreId: PropTypes.string,
        findStoresAction: PropTypes.func.isRequired,
        selectStoreAction: PropTypes.func.isRequired,
        setAvailableFilter: PropTypes.func.isRequired,
        findMoreStores: PropTypes.func.isRequired,
        selectActionCallback: PropTypes.func,
        findStoresDetails: PropTypes.objectOf(PropTypes.object),
        context: PropTypes.objectOf(PropTypes.object),
        actions: PropTypes.func.isRequired,
        hideDirections: PropTypes.bool,
        restrictMiles: PropTypes.bool,
        from: PropTypes.string,
        openPanelAnalyticsCallback: PropTypes.func,
        theme: PropTypes.string,
    }

    static defaultProps = {
        productDetails: null,
        defaultStoreId: null,
        selectActionCallback: null,
        findStoresDetails: {},
        context: {},
        from: 'order',
        hideDirections: false,
        restrictMiles: false,
        openPanelAnalyticsCallback: null,
        theme: '',
    }

    constructor() {
        super();
        this.onClosePanel = this.onClosePanel.bind(this);
        this.renderProductCard = this.renderProductCard.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.findStoresDetails.isSlidePanelOpen) {
            if (typeof this.props.openPanelAnalyticsCallback === 'function' &&
                (isEmpty(prevProps.findStoresDetails) ||
                (prevProps.findStoresDetails && !prevProps.findStoresDetails.isSlidePanelOpen))
                ) {
                this.props.openPanelAnalyticsCallback();
            }
        }
    }

    onClosePanel(event) {
        event.preventDefault();
        /**
        For clearing the side panel after pressing closing it.
        */
        if (this.props.from && this.props.from === 'account') {
            this.props.actions.findAllStores();
        }
        this.props.actions.closeSlidePanel();
    }

    renderProductCard() {
        return <FindStoresProductCard product={this.props.productDetails[0]} />;
    }

    render() {
        const {
            findStoresDetails,
            productDetails,
            defaultStoreId,
            selectStoreAction,
            findStoresAction,
            selectActionCallback,
            setAvailableFilter,
            context,
            hideDirections,
            restrictMiles,
            findMoreStores,
            from,
            theme,
        } = this.props;

        return (
            <SlidePanel
                isOpenPanel={findStoresDetails.isSlidePanelOpen}
                onClosePanel={this.onClosePanel}
                panelTitle="Back"
                >
                <section className={cx('FindStoresPage')}>
                    { (productDetails && productDetails.length === 1) ? this.renderProductCard() : null }
                    <FindStoresTabContainer
                        findStoresDetails={findStoresDetails}
                        productDetails={productDetails}
                        defaultStoreId={defaultStoreId}
                        selectStoreAction={selectStoreAction}
                        selectActionCallback={selectActionCallback}
                        findStoresAction={findStoresAction}
                        deviceType={context.deviceType}
                        hideDirections={hideDirections}
                        restrictMiles={restrictMiles}
                        setAvailableFilter={setAvailableFilter}
                        findMoreStores={findMoreStores}
                        from={from}
                        theme={theme}
                    />
                </section>
            </SlidePanel>
        );
    }
}

export const mapStateToProps = ({ findStoresDetails, context }) => ({ findStoresDetails, context });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(findStoresActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindStores);
