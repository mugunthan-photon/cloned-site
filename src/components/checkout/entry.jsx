import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ShippingThresholdHeader from './ShippingThreshold/ShippingThresholdHeader';
import ShippingThresholdSummary from './ShippingThreshold/ShippingThresholdSummary';

window.ShippingThresholdHeader = ShippingThresholdHeader;
window.ShippingThresholdSummary = ShippingThresholdSummary;
window.configureStore = configureStore;
window.Provider = Provider;

export default {
    ShippingThresholdHeader,
    ShippingThresholdSummary,
};
