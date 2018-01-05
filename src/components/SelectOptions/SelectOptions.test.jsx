import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import SelectOptions from './SelectOptions';
import mockData from './__stories/mock';

const { sizeRangeOptions, singleOption } = mockData;

const onOptionsChange = sinon.spy();

describe('Test Suite for SelectOptions Component', () => {
    let wrapper;
    describe('Test Suite for multi options', () => {
        beforeEach(() => {
            wrapper = mount(
                <SelectOptions
                    name="size range"
                    datasource={sizeRangeOptions}
                    displayKey="value"
                    valueKey="id"
                    onChange={onOptionsChange}
                    selectedValue={sizeRangeOptions[0].id}
                />,
            );
        });

        it('SelectOptions component should exist', () => {
            expect(wrapper).to.exist;  // eslint-disable-line no-unused-expressions
        });

        it('render all the options from the datasource', () => {
            expect(wrapper.find('option')).to.have.length(sizeRangeOptions.length);
        });

        it('The default value should be displayed', () => {
            expect(wrapper.render().find('select [value]').val()).to.equal(sizeRangeOptions[0].id.toString());
        });

        it('should trigger onChangeHandler method', () => {
            wrapper.find('select').simulate('change', { target: { value: 'Athletic' } });
            wrapper.find('select').simulate('keyDown', { keyCode: 9, key: 'Tab' });
            expect(onOptionsChange).to.have.been.called; // eslint-disable-line no-unused-expressions
        });
    });

    describe('Test Suite for multi options with default Values', () => {
        const defaultOptionValue = 'Select a Size Range';
        beforeEach(() => {
            wrapper = mount(
                <SelectOptions
                    name="size range"
                    datasource={sizeRangeOptions}
                    displayKey="value"
                    valueKey="id"
                    defaultOptionValue={defaultOptionValue}
                    onChange={onOptionsChange}
                />,
            );
        });

        it('SelectOptions component should exist', () => {
            expect(wrapper).to.exist;  // eslint-disable-line no-unused-expressions
        });

        it('render all the options from the datasource along with default option', () => {
            expect(wrapper.find('option')).to.have.length(sizeRangeOptions.length + 1);
        });

        it('The default option should be displayed', () => {
            expect(wrapper.find('select').childAt(0).text()).to.equal('Select a Size Range');
        });
    });

    describe('Test Suite for single option', () => {
        beforeEach(() => {
            wrapper = mount(
                <SelectOptions
                    name="size range"
                    datasource={singleOption}
                    displayKey="value"
                    valueKey="id"
                    onChange={onOptionsChange}
                />,
            );
        });

        it('SelectOptions component should exist', () => {
            expect(wrapper).to.exist;  // eslint-disable-line no-unused-expressions
        });
    });
});
