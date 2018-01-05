import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import MarketingZone from './MarketingZone';

				window.MarketingZone = MarketingZone;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    MarketingZone,
				};