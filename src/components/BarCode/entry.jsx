import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import BarCode from './Barcode';

window.BarCode = BarCode;
window.configureStore = configureStore;
window.Provider = Provider;

export default {
    BarCode,
};
