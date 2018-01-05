import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import FindStoresLocationForm from './FindStoresLocationForm';
import { findStoresDetails } from '../../../../../test/mockData/FindStoresDetails';
import { findStoreThemes } from '../../../../common/Constants';

describe('<FindStoresLocationForm />', () => {
    const findStoresAction = sinon.spy(() => {});
    const setAvailableFilterAction = sinon.spy();
    const zipCode = findStoresDetails.zipCode;

    describe('FindStoresLocation initial load', () => {
        findStoresDetails.showAvailable = undefined;
        const wrapper = mount(
            <FindStoresLocationForm
                findStoresDetails={findStoresDetails}
                findStoresAction={findStoresAction}
                setAvailableFilterAction={setAvailableFilterAction}
                isShowAvailableFilter
            />,
        );

        it('Component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('Get available stores should be called on checkbox click ', () => {
            findStoresDetails.zipCode = undefined;
            wrapper.find('input[type="checkbox"]').simulate('click');
            expect(setAvailableFilterAction).to.have.been.calledOnce;
        });
    });

    describe('FindStoresLocation after user search', () => {
        findStoresDetails.showAvailable = true;
        const wrapper = mount(
            <FindStoresLocationForm
                findStoresDetails={findStoresDetails}
                findStoresAction={findStoresAction}
                setAvailableFilterAction={setAvailableFilterAction}
                isShowAvailableFilter
            />,
        );

        it('Component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('Get available stores should be called on checkbox click ', () => {
            findStoresDetails.zipCode = zipCode;
            wrapper.find('input[type="checkbox"]').simulate('click');
            expect(findStoresAction).to.have.been.calledOnce;
        });

        it('Find stores action should be called on zip forum submit ', () => {
            wrapper.find('button.searchStoreBtn').simulate('click');
            expect(findStoresAction).to.have.been.calledOnce;
        });
    });

    describe('FindStoresLocation initial load', () => {
        findStoresDetails.showAvailable = undefined;
        const wrapper = mount(
            <FindStoresLocationForm
                findStoresDetails={findStoresDetails}
                findStoresAction={findStoresAction}
                setAvailableFilterAction={setAvailableFilterAction}
                theme={findStoreThemes.findAStorePage}
                deviceType={{ isMobile: true }}
                isShowAvailableFilter
            />,
        );

        it('Component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('Should render storeMsgWrapper', () => {
            expect(wrapper.find('span.storeMsgWrapper').length).to.equal(1);
        });

        it('Mile more than 50', () => {
            wrapper.setProps({ findStoresDetails: Object.assign({}, findStoresDetails, { miles: 100 }) });
            expect(wrapper.find('span.storeMsgWrapper').text()).to.equal('40 stores within 50+mi of 12345');
        });
    });
});
