import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import CouponCard from './CouponCard';

				window.CouponCard = CouponCard;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    CouponCard,
				};