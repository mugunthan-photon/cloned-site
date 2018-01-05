import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { beforeEach, describe, it } from 'mocha';
import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { datasource, datasourcenull, priceDetails } from './__stories/mock';
import ProductCard from './ProductCard';


describe('<ListProductCard />', () => {
    let wrapper;
    let wrapperInstance;
    global.window.videojs = () => ({ play: () => {}, ready: () => {}, getPlayers: () => ({ videoId1234: {} }) });

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(
            <ProductCard {...datasource} price={priceDetails}/>,
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

    it('No Image Found usage', () => {
        const loadImageNotAvailableSpy = sinon.spy(wrapperInstance, 'loadImageNotAvailable');
        wrapper.update();
        expect(wrapper.state().imageError).to.equal(false);
        loadImageNotAvailableSpy();
        expect(wrapper.state().imageError).to.equal(true);
        loadImageNotAvailableSpy();
        expect(wrapper.state().imageError).to.equal(true);
    });

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
    });

    it('ProductCard no Alt Image check exist ', () => {
        wrapper.setState({ swatchImageSrc: '', imageSrc: 'http://scene7' });
        wrapper.setProps({ altImageUrl: 'http://scene7', isDesktop: true });
        const loadImageNotAvailableSpy = sinon.spy(wrapperInstance, 'loadImageNotAvailable');
        wrapper.update();
        expect(wrapper.state().imageError).to.equal(false);
        loadImageNotAvailableSpy();
        expect(wrapper.state().imageError).to.equal(true);
        loadImageNotAvailableSpy();
        expect(wrapper.state().imageError).to.equal(true);
    });
});

describe('<ListProductCard /> with null results', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(
            <ProductCard {...datasourcenull} price={null}/>,
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
                    upperBadge={{ text: 'save up to $200', type: 'bundle' }} showSaveForlater />
            </Provider>,
        );
    });

    it('ProductCard component should exist ', () => {
        expect(wrapper).to.exist;
    });
});

describe('<ListProductCard />', () => {
    let wrapper;
    const deviceType = {
        isDesktop: true,
    };
    beforeEach(() => {
        wrapper = mount(
            <ProductCard {...datasource} price={priceDetails} deviceType={deviceType} videoId={'id1'} productUrl="/p"/>,
        );
    });

    it('ProductCard onClick', () => {
        wrapper.setState({ imageSrc: 'https://scene7' });
        wrapper.find('a').at(0).props().onClick();
        wrapper.find('a').at(1).props().onClick();
        wrapper.find('a').at(2).props().onClick();
        expect(wrapper).to.exist;
    });

    it('ProductCard component should exist ', () => {
        wrapper.instance().imageMouseOver('');
        wrapper.instance().imageMouseOver('http://scene7');
        wrapper.instance().showSwatchImage('');
        wrapper.instance().showSwatchImage('http://scene7');
        wrapper.setProps({ altImageUrl: '' });
        wrapper.instance().imageMouseLeave('http://scene7');
        wrapper.setProps({ altImageUrl: 'http://scene7' });
        wrapper.instance().imageMouseLeave('http://scene7');
        wrapper.instance().showAllSwatchs(false);
        expect(wrapper).to.exist;
    });

    it('ProductCard component should exist ', () => {
        wrapper.setState({ skuSwatch: ['0', '1', '2'], showAllSwatchs: true });
        wrapper.find('button').at(1).props().onClick({ stopPropagation: () => {}, preventDefault: () => {} });
        wrapper.find('button').at(2).props().onClick({ stopPropagation: () => {}, preventDefault: () => {} });
        wrapper.find('img').at(0).props().onMouseOver({ stopPropagation: () => {}, preventDefault: () => {} });
        wrapper.find('img').at(1).props().onMouseOver({ stopPropagation: () => {}, preventDefault: () => {} });
        wrapper.find('img').at(2).props().onMouseOver({ stopPropagation: () => {}, preventDefault: () => {} });
        wrapper.setProps({ cardType: 'list' });
        expect(wrapper).to.exist;
    });

    it('ProductCard component should exist ', () => {
        wrapper.setState({ skuSwatch: ['0', '1', '2', '3', '4'], showAllSwatchs: true });
        wrapper.setProps({ availabilityStatus: [{ icon: 'mouse', storeName: 'stone briar mall stone' },
                { icon: 'cross' }, { icon: 'warning' }, { icon: 'none' }] });
        expect(wrapper).to.exist;
    });

    it('ProductCard component should exist ', () => {
        const skuSwatch = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
            {}, {}, {}, {}, {}, {}, {}];
        wrapper = mount(
            <ProductCard deviceType={deviceType} productUrl="/p" skuSwatch={skuSwatch}/>,
        );
        wrapper.find('button').at(0).props().onClick();
        wrapper.setState({ showAllSwatchs: true });
        wrapper.find('a').at(1).props().onClick();
        wrapper.find('button').at(0).props().onClick({ stopPropagation: () => {}, preventDefault: () => {} });
        wrapper.setProps({ skuSwatch: [], isDesktop: false });
        expect(wrapper).to.exist;
    });

    it('ProductCard component should exist ', () => {
        wrapper = mount(
            <ProductCard deviceType={deviceType} />,
        );
        wrapper.instance().onVideoEnd();
        wrapper.setProps({ videoId: '1234', upperBadge: { text: 'save up to $200', type: 'bundle' } });
        wrapper.setState({ playVideo: false });
        wrapper.find('button').at(0).props().onClick();
        wrapper.setState({ playVideo: true });
        wrapper.setProps({ videoId: null });
        expect(wrapper).to.exist;
    });

    it('ProductCard component should swatchImageSrc exist ', () => {
        wrapper.setState({ swatchImageSrc: '' });
        wrapper.setProps({ altImageUrl: 'http://scene7' });
        wrapper.instance().imageMouseLeave('http://scene7');
        expect(wrapper).to.exist;
    });
});
