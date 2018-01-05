import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import SiteComponent from './SiteComponent';


// Mock component to test.
class MockComponent extends SiteComponent {

    hydrate = () => {
        console.log('component will mount called in here');
    }

    render() {
        return <p>Hello</p>;
    }
}
// End of Mock component.

// Mock component to test.
class BadMockComponent extends SiteComponent {

    render() {
        return <p>Hello</p>;
    }
}
// End of Mock component.

describe('<SiteComponent /> Test Cases', () => {
    it('mountonserver and isServer false', () => {
        const originalVal = global.__SERVER__;
        global.__SERVER__ = true;
        const mockedComponent = mount(<MockComponent mountOnServer />);
        expect(mockedComponent).to.exist;
        global.__SERVER__ = originalVal;
    });
    it('isServer and no mount on server', () => {
        __SERVER__ = true;
        const mockedComponent = mount(<MockComponent />);
        expect(mockedComponent).to.exist;
    });
    it('isServer and mount on server', () => {
        __SERVER__ = true;
        const mockedComponent = mount(<MockComponent mountOnServer />);
        expect(mockedComponent).to.exist;
    });
    it('isServer and mount on server', () => {
        __SERVER__ = true;
        const mockedComponent = mount(<BadMockComponent mountOnServer />);
        expect(mockedComponent).to.exist;
    });
});
