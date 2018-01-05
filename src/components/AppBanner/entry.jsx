import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import AppBanner from './AppBanner';

				window.AppBanner = AppBanner;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    AppBanner,
				};