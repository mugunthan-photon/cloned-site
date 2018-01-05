import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import FetchRegionConnected, { FetchRegion } from './FetchRegion';
import { cookie } from '../../common/Constants';
// import { galleryDetails } from '../../../test/mock';
// import * as actions from '../../actions/RegionZoneActions';

const position = {};
position.coords = {};
position.coords.latitude = '60.558151';
position.coords.longitude = '22.095773';

describe('<FetchRegion Testcases - Full Render/>', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const store = mockStore(Object.assign({}, {
        context: {
            featureFlags: {
                enableRegionPricing: true,
            },
        },
        actions: {
            setRegion: sinon.spy(),
            updateRegion: sinon.spy(),
            getStoresAction: sinon.spy(),
        },
    }));

    const navigator = global.navigator;
    navigator.geolocation = {};
    navigator.geolocation.getCurrentPosition = success => success.call(null, position);


    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <FetchRegionConnected />
            </Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
    });

    it('Connected Smart Components, with connect', () => {
        expect(wrapper).to.exist;
        const fetchRegionZone = sinon.spy();
        expect(fetchRegionZone).to.have.been.called;
    });

    it('Check if error is handled', () => {
        const errorCb = sinon.spy();
        navigator.geolocation.getCurrentPosition = (success, error) => error.call(null, 'Geolocation failed !');
        expect(errorCb).to.have.been.called;
    });

    it('Check if error is handled', () => {
        const errorCb = sinon.spy();
        navigator.geolocation.getCurrentPosition = (success, error) => error.call(null, 'Geolocation not enabled !');
        expect(errorCb).to.have.been.called;
    });

    it('Check if success is handled', () => {
        const successCb = sinon.spy();
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
        expect(successCb).to.have.been.called;
    });

    it('Check if success while cookie set', () => {
        const successCb = sinon.spy();
        Cookies.save(cookie.PRICE_ZONE, '1', '', '');
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
        expect(successCb).to.have.been.called;
    });

    // it('Check if error is handled when geo location is disabled', () => {
        // expect(wrapper).to.exist;
        // const fetchRegionZone = sinon.spy();
        // expect(fetchRegionZone).to.have.been.called;
        // navigator.geolocation = null;
        // const errorCb = sinon.spy();
        // navigator.geolocation.getCurrentPosition = (success, error) => error.call(null, 'Geolocation not enabled !');
        // expect(actions.updateRegion('default')).to.have.been.called;
        // Cookies.remove('DP-ZONE-CLUSTR');
    // });
});


describe('<FetchRegion Testcases - Full Render/>', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const store = mockStore(Object.assign({}, {
        context: {
            featureFlags: {
                enableRegionPricing: true,
            },
        },
        actions: {
            setRegion: sinon.spy(),
            updateRegion: sinon.spy(),
            getStoresAction: sinon.spy(),
        },
    }));

    beforeEach(() => {
        const navigator = global.navigator;
        navigator.geolocation = {};
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);

        wrapper = mount(
            <Provider store={store}>
                <FetchRegionConnected />
            </Provider>,
        );
    });

    afterEach(() => {
        wrapper.unmount();
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
    });

    it('Connected Smart Components, with connect', () => {
        expect(wrapper).to.exist;
    });
});

describe('<FetchRegion Testcases - Full Render/>', () => {
    let wrapper;
    const mockStore = configureStore([]);
    const store = mockStore(Object.assign({}, {
        context: {
            featureFlags: {
                enableRegionPricing: true,
            },
        },
        actions: {
            setRegion: sinon.spy(),
            updateRegion: sinon.spy(),
            getStoresAction: sinon.spy(),
        },
    }));

    beforeEach(() => {
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
        wrapper = mount(
            <Provider store={store}>
                <FetchRegionConnected />
            </Provider>,
        );
    });

    it('Connected Smart Components, with connect', () => {
        expect(wrapper).to.exist;
    });
});


describe('<FetchRegion Testcases - Shallow Render/>', () => {
    let wrapper;
    beforeEach(() => {
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
        const actions = {
            setRegion: sinon.spy(),
            updateRegion: sinon.spy(),
            getStoresAction: sinon.spy(),
            getRegion: sinon.spy(),
        };
        wrapper = shallow(
            <FetchRegion actions={actions}/>,
            { lifecycleExperimental: true },
        );
    });

    it('Shalow Components', () => {
        expect(wrapper).to.exist;
        wrapper.instance().successCb(position);
    });

    it('Shalow Components', () => {
        wrapper.setProps({ regionZonefromLocation: -1 });
        expect(wrapper).to.exist;
        wrapper.instance().errorCb({});
    });
});
