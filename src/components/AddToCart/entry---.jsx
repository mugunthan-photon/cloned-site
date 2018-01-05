import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import AddToCart from './AddToCart';

window.AddToCart = AddToCart;
window.configureStore = configureStore;
window.Provider = Provider;

export default {
    AddToCart,
};