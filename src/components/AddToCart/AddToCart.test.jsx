import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import noop from 'lodash/noop';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddToCart from './AddToCart';


describe('<AddToCart />', () => {
    const actions = {
        addItemToCart: sinon.spy(),
        addToCartButton: sinon.spy(),
    };
    const mockStore = configureStore([]);

    const productDetails = { data: [
        {
            skuId: '51315070075',
            ppId: 'pp5002960883',
            quantity: 2,
        }],
    };
    it('Should call addTOCartButton method upon click', () => {
        const store = mockStore({
            addToCart: {
                isAddToCartSuccess: false,
                isUpdateCartSuccess: false,
            },
            selectedQuantity: 1,
        });
        const wrapper = mount(
            <Provider store={store}>
                <AddToCart
                    productDetails={productDetails}
                    actions={actions}
            />
            </Provider>,
        );

        wrapper.find('Button').props().onClick({ preventDefault: noop });
        wrapper.update();
        expect(wrapper.find('.interstitial')).to.have.length(0);
        expect(actions.addItemToCart.called).to.equal(false);
        // wrapper.instance().closeCartModal();
    });
});
