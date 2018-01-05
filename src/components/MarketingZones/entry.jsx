import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import MarketingZones from './MarketingZones';

				window.MarketingZones = MarketingZones;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    MarketingZones,
				};