import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { beforeEach, describe, it } from 'mocha';
import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { datasource, datasourcenull, priceDetails } from './mock';
import ProductCard from './SavedListProductCard';


describe('<ListProductCard />', () => {
    let wrapper;
    let wrapperInstance;
    const SKUList = [
        {
            type: 'TYPE (MONO/PERSONLZ)',
            value: '4 - NAME',
        },
        {
            type: 'THREAD COLOR',
            value: 'A',
        },
        {
            type: 'POSITION / LOCATION',
            value: 'POCKET',
        },
    ];

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(
            <ProductCard {...datasource} price={priceDetails} SKUList={SKUList} cardType={'list'}/>,
        );
        wrapperInstance = wrapper.instance();
    });

    it('ProductCard component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('Should trigger renderCard on mount', () => {
        const renderCardSpy = sinon.spy(wrapperInstance, 'renderCard');
        wrapper.update();
        expect(renderCardSpy.calledOnce).to.equal(true);
    });

    it('Detailed usage', () => {
        // Todo: Check for Detailed related dom is rendering or not. Currently 'Detailed' card is not used
        wrapper.setProps({ usage: 'Detailed' });
        expect(wrapper.props().usage).to.equal('Detailed');
    });

    // it('No Image Found usage', () => {
    //     const loadImageNotAvailableSpy = sinon.spy(wrapperInstance, 'loadImageNotAvailable');
    //     wrapper.update();
    //     expect(wrapper.state().imageError).to.equal(false);
    //     loadImageNotAvailableSpy();
    //     expect(wrapper.state().imageError).to.equal(true);
    //     loadImageNotAvailableSpy();
    //     expect(wrapper.state().imageError).to.equal(true);
    // });

    it('Open ecorebate modal status', () => {
        wrapper.update();
        expect(wrapper.state().openRebatesModal).to.equal(false);
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.state().openRebatesModal).to.equal(true);
    });

    it('check modal box exist in product card', () => {
        wrapper.update();
        expect(wrapper.state().openRebatesModal).to.equal(false);
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.state().openRebatesModal).to.equal(true);
    });

    it('close EcoRebates modal', () => {
        wrapper.find('button').at(0).simulate('click');
        wrapper.find(ModalBox).find('button').first().simulate('click');
        expect(wrapper.state().openRebatesModal).to.equal(false);
        wrapper.find('.linkStyle').at(0).prop('onClick').call();
        wrapper.update();
    });
});

describe('<ListProductCard /> with null results', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(
            <ProductCard {...datasourcenull} price={null} cardType={'list'} />,
        );
        wrapperInstance = wrapper.instance();
    });

    it('ProductCard component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('Should trigger renderCard on mount', () => {
        const renderCardSpy = sinon.spy(wrapperInstance, 'renderCard');
        wrapper.update();
        expect(renderCardSpy.calledOnce).to.equal(true);
    });

    it('Detailed usage', () => {
        // Todo: Check for Detailed related dom is rendering or not. Currently 'Detailed' card is not used
        wrapper.setProps({ usage: 'Detailed' });
        expect(wrapper.props().usage).to.equal('Detailed');
    });
});


describe('<ListProductCard /> with multiple skuSwatch', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const store = mockStore({ savedItemStatus: true, savedItems: {}, context: { deviceType: { isMobile: true } } });

    beforeEach(() => {
        datasource.skuSwatch = [
            {
                colorName: 'Ivory',
                swatchImageId: 'DP0316201717084746S.jpg',
                colorizedImageId: 'DP0316201717084696M.tif',
                colorSeqNum: 1,
            },
            {
                colorName: 'Blue',
                swatchImageId: 'DP0316201717084746S.jpg',
                colorizedImageId: 'DP0316201717084696M.tif',
                colorSeqNum: 2,
            },
        ];
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(
            <Provider store={store}>
                <ProductCard
                    {...datasource} price={null} reviewCount="10"
                    badge={{ text: '', type: 'bundle' }}
                    showSaveForlater
                    cardType={'list'} />
            </Provider>,
        );
    });

    it('ProductCard component should exist ', () => {
        expect(wrapper).to.exist;
        wrapper.find('.ratingWrapper').at(0).simulate('click');
    });
});
