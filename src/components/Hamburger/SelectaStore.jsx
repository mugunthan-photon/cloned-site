import React, { PropTypes } from 'react';
import FindAStorePage from '../FindAStorePage/FindAStorePage';
import { findStores } from '../../common/Constants';

const SelectaStore = ({ isGeoStore }) => <FindAStorePage
    theme="selectAStore"
    title={isGeoStore ? findStores.selectAStorePageTitle : findStores.changeMyStorePageTitle}/>;

SelectaStore.defaultProps = {
    isGeoStore: false,
};

SelectaStore.propTypes = {
    isGeoStore: PropTypes.boolean,
};

export default SelectaStore;
