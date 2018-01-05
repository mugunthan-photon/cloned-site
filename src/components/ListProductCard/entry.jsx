import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ProductCard from './ProductCard';

window.ProductCard = ProductCard;
window.configureStore = configureStore;
window.Provider = Provider;

export default {
    ProductCard,
};
