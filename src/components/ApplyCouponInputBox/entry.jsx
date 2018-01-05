import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import ApplyCouponInputBox from './ApplyCouponInputBox';

				window.ApplyCouponInputBox = ApplyCouponInputBox;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    ApplyCouponInputBox,
				};