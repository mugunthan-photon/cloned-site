import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import Loading from './Loading';

				window.Loading = Loading;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    Loading,
				};