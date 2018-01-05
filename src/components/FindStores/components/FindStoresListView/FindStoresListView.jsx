import React, { PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import className from 'classnames/bind';
import List from 'yoda-core-components/lib/components/List/List';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import config from 'yoda-core-components/lib/components/List/List.config';
import StoreDetailsCard from '../StoreDetailsCard/StoreDetailsCard';
import { findStores } from '../../../../common/Constants';
import * as styles from './FindStoresListView.css';

const cx = className.bind(styles);

/**
 * This component renders the stores in a list view with store details
 *
 * @param {any} { selectStoreAction, selectActionCallback, productDetails, zipCode, stores }
 */
function FindStoresListView({
    selectStoreAction,
    selectActionCallback,
    productDetails,
    zipCode,
    stores,
    from,
    defaultStoreId,
    deviceType,
    hideDirections }) {
    const storeViewRenderer = store => (
        <StoreDetailsCard
            store={store}
            productDetails={productDetails}
            selectStoreAction={selectStoreAction}
            selectActionCallback={selectActionCallback}
            deviceType={deviceType}
            isDefaultStore={defaultStoreId === store.id}
            from={from}
            hideDirections={hideDirections}
        />
    );

    /**
     * Renders the error message when no stores are having inventory or no stores are found for a zipcode
     */
    const renderErrorMessage = () => {
        const errorMessage = isEmpty(productDetails) ? findStores.noStoresMessage : findStores.noSDPUStoresMessage;
        return (
            <div className={cx('errorMsgWrapper')} data-automation-id="at-no-sdpu-stores-msg">
                <MessageBox
                    type="error"
                    level="section"
                    title={zipCode === findStores.INVALID_INPUT ? findStores.invalidInputMsg : errorMessage}
                    hasClose={false}
                />
            </div>
        );
    };

    const renderSelectStoreList = () => (
        <div>
            <List
                direction={config.direction.VERTICAL}
                spacing={config.spacing.NONE}
                itemSpacing={config.spacing.NONE}
                datasource={stores}
                childRenderer={storeViewRenderer}
                automationId="at-change-stores-list"
            />
        </div>
    );

    return ((zipCode || zipCode === findStores.INVALID_INPUT) && isEmpty(stores)) ?
            renderErrorMessage() :
            renderSelectStoreList();
}

FindStoresListView.propTypes = {
    stores: PropTypes.arrayOf(PropTypes.object).isRequired,
    zipCode: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    selectStoreAction: PropTypes.func.isRequired,
    selectActionCallback: PropTypes.func,
    deviceType: PropTypes.objectOf(PropTypes.object),
    hideDirections: PropTypes.bool,
    defaultStoreId: PropTypes.string,
    from: PropTypes.string.isRequired,
};

FindStoresListView.defaultProps = {
    zipCode: null,
    selectActionCallback: null,
    deviceType: {},
    hideDirections: false,
    defaultStoreId: null,
};

export default FindStoresListView;
