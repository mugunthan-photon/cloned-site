import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Pricing from './Pricing';

window.Pricing = Pricing;
window.configureStore = configureStore;
window.Provider = Provider;

export default {
    Pricing,
};
