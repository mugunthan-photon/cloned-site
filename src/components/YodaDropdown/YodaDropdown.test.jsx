import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedYodaDropdown, { YodaDropdown } from './YodaDropdown';

describe('mixed YodaDropdown', () => {
    let dataSource;
    beforeEach(() => {
        dataSource = [
            {
                displayKey: 'Regular',
                value: 1,
            },
            {
                displayKey: 'Slim',
                value: 2,
            },
        ];
    });
    afterEach(() => {
        dataSource = null;
    });
    describe('<ConnectedYodaDropdown /> Testcases', () => {
        it('should exists when connected', () => {
            const mockStore = configureStore([]);
            const store = mockStore({ context: { deviceType: { isMobile: true } } });
            const wrapper = mount(
                <Provider store={store}>
                    <ConnectedYodaDropdown
                        dataSource={dataSource}
                        displayKey="id"
                        valueKey="id"
                    />
                </Provider>,
            );
            expect(wrapper).to.exist;
        });

        it('should exists when connected even the device type is unknown', () => {
            const mockStore = configureStore([]);
            const store = mockStore({});
            const wrapper = mount(
                <Provider store={store}>
                    <ConnectedYodaDropdown
                        dataSource={dataSource}
                        displayKey="id"
                        valueKey="id"
                    />
                </Provider>,
            );
            expect(wrapper).to.exist;
        });
    });
    describe('<YodaDropdown /> Testcases', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(
                <YodaDropdown dataSource={[]}/>,
            );
        });
        it('Connected Smart Components, with connect', () => {
            expect(wrapper).to.exist;
        });
        it('Test with dataSource for desktop', () => {
            wrapper.setProps({ dataSource, deviceType: { isDesktop: true } });
            wrapper.instance().onChange({});
            expect(wrapper).to.exist;
        });
        it('Test with dataSource for mobile', () => {
            wrapper.setProps({ dataSource, deviceType: { isMobile: true }, defaultOptionValue: 1, defaultValue: 1 });
            wrapper.instance().onChange({ currentTarget: { value: 1 } });
            expect(wrapper).to.exist;
        });
        it('Test with dataSource for mobile with no default values', () => {
            wrapper.setProps({ dataSource, deviceType: { isMobile: true } });
            expect(wrapper).to.exist;
        });
        it('Test with dataSource for mobile with one value', () => {
            dataSource = [
                {
                    id: '1',
                    name: 1,
                },
            ];
            wrapper.setProps({ dataSource, deviceType: { isMobile: true } });
            expect(wrapper).to.exist;
        });
        it('Test renderTooltipData func', () => {
            wrapper.setState({ showStepUp: true, showStepDown: true });
            wrapper.instance().renderTooltipData();
            wrapper.setState({ showStepUp: false, showStepDown: false });
            wrapper.instance().renderTooltipData();
            wrapper.instance().onClick();
            expect(wrapper).to.exist;
        });
    });
});
