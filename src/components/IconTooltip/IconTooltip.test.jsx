import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import IconTooltip from './IconTooltip';

const message = 'Please Enter valid value';
const icon = 'iconpath';

describe(' Test Suite for IconTooltip component ', () => {
    let wrapper;
    describe('initalValue', () => {
        beforeEach(() => {
            wrapper = shallow(<IconTooltip
                message={message}
                icon={icon}
            />);
        });
        afterEach(() => {
            wrapper.unmount();
        });
        it('renders ', () => {
            expect(wrapper.find('YodaTooltip').length).to.equal(1);
            expect(wrapper.find('Icon').length).to.equal(1);
        });
        it('send Icon Name', () => {
            const IconProps = wrapper.find('Icon').props();
            expect(IconProps.name).to.equal(icon);
        });
        it('send Message / Tooltip content', () => {
            const YodaTooltipProps = wrapper.find('YodaTooltip').props();
            expect(YodaTooltipProps.renderTooltipContents).to.equal(message);
        });
    });
});
