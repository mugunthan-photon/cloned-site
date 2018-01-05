import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import IconTooltip from './IconTooltip';

				window.IconTooltip = IconTooltip;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    IconTooltip,
				};