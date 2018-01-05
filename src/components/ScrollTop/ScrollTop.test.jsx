import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConnectedScrollTop, { ScrollTop } from './ScrollTop';

describe('<ConnectedScrollTop />', () => {
    it('should exists when connected', () => {
        const mockStore = configureStore([]);
        const store = mockStore({ context: { deviceType: { isDesktop: true } } });
        window.requestAnimationFrame = sinon.spy();
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedScrollTop />
            </Provider>,
        );
        expect(wrapper).to.exist;
    });

    it('should scroll to top when clicked', () => {
        const mockStore = configureStore([]);
        const store = mockStore({});
        window.requestAnimationFrame = sinon.spy();
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedScrollTop />
            </Provider>,
        );
        wrapper.find('button').simulate('click');
        expect(wrapper.onScrollToTopClick).to.have.been.called;
    });
});

describe('<ScrollTop />', () => {
    it('should exists', () => {
        const wrapper = shallow(<ScrollTop deviceType={{}}/>);
        wrapper.setState({
            aboveThreshold: true,
        });
        wrapper.setProps({ deviceType: { isMobile: true } });
        expect(wrapper).to.exist;
    });

    it('should hide the scroll top button if the scrolltop position is before the threshold value', () => {
        const wrapper = shallow(<ScrollTop deviceType={{}}/>);
        wrapper.setState({
            aboveThreshold: true,
        });
        wrapper.instance().beforePoint();
        expect(wrapper.state().aboveThreshold).to.be.false;
    });

    it('should show the scroll top button if the scrolltop position is after the threshold value', () => {
        const wrapper = shallow(<ScrollTop deviceType={{}}/>);
        wrapper.setState({
            aboveThreshold: false,
        });
        wrapper.instance().afterPoint();
        expect(wrapper.state().aboveThreshold).to.be.true;
    });
});
