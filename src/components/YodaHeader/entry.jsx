import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import YodaHeader from './Header';

window.YodaHeader = YodaHeader;
window.configureStore = configureStore;
window.Provider = Provider;

export default {
    YodaHeader,
};
