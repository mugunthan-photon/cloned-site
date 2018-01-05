import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import HotDeals from './HotDeals';

				window.HotDeals = HotDeals;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    HotDeals,
				};