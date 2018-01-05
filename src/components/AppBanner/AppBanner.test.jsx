import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AppBannerConnected, { AppBanner } from './AppBanner';

const { describe, it } = global;

describe('Load AppBanner Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AppBanner />);
    });

    it('Check component for mobile', () => {
        global.window.__SERVER__ = false;
        let props = {
            deviceType: {
                isMobile: true,
                isTablet: true,
            },
            enable: true,
        };
        wrapper = mount(<AppBanner {...props} />);
        expect(wrapper).to.exist;
        global.window.branch = {
            init() {
            },
            setBranchViewData() {
            },
        };
        wrapper.instance().branchIoLoaded();
        expect(global.window.branch.init()).to.have.been.calledOnce;
        expect(global.window.branch.setBranchViewData()).to.have.been.calledOnce;

        global.window.branch = null;
        wrapper.instance().branchIoLoaded();

        global.window.__SERVER__ = true;
        props = {
            deviceType: {
                isMobile: false,
                isTablet: false,
            },
        };
        wrapper = mount(<AppBanner {...props} />);
        const r = wrapper.instance().renderAppBanner();
        expect(r).to.equal(null);
    });

    it('Check render banner', () => {
        let props = {
            deviceType: {
                isMobile: true,
                isTablet: true,
            },
            enable: false,
        };
        wrapper = mount(<AppBanner {...props} />);
        let banner = wrapper.instance().renderAppBanner();
        expect(banner).to.equal(null);
        props = {
            deviceType: {
                isMobile: true,
                isTablet: true,
            },
            enable: true,
        };
        wrapper = mount(<AppBanner {...props} />);
        banner = wrapper.instance().renderAppBanner();
        expect(banner).is.not.null;
    });
});

describe('Connected Component Testing for Tablet', () => {
    global.window.__SERVER__ = false;
    let wrapper;
    let store;
    const props = {
        deviceType: {
            isMobile: true,
            isTablet: true,
        },
        enable: true,
    };
    before(() => {
        const mockStore = configureStore([]);
        store = mockStore({
            context: { deviceType: { isTablet: true, isMobile: true } },
        });
        wrapper = mount(<Provider store={store}>
            <AppBannerConnected />
        </Provider>);
    });
    after(() => {
        wrapper.unmount();
    });

    it('exist', () => {
        expect(wrapper).to.exist;
    });
    it('show component', () => {
        const wrapperBanner = mount(<AppBanner {...props}/>);
        wrapper.update();
        wrapperBanner.instance().renderAppBanner();
        expect(wrapperBanner.find('.branch-journeys-top')).to.have.length(1);
    });
});
