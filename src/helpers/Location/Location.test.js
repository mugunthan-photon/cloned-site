import { expect, assert } from 'chai';
import { Cookies } from 'yoda-core-components/lib/helpers';
import Location from './Location';
import { cookie } from '../../common/Constants';

const position = {};
position.coords = {};
position.coords.latitude = '60.558151';
position.coords.longitude = '22.095773';

describe('Store Utils testing', () => {
    let getUserLocation;
    const expected = { coords: { latitude: '33.0562', longitude: '-96.7336' } };
    const navigator = global.navigator;
    navigator.geolocation = {};
    navigator.geolocation.getCurrentPosition = success => success.call(null, position);

    beforeEach(() => {
        getUserLocation = Location.getLatLongAsPromise();
    });

    afterEach(() => {
        navigator.geolocation.getCurrentPosition = success => success.call(null, position);
    });

    it('Should return null if navigator is undefined', () => {
        expect(getUserLocation).to.deep.equal({});
    });

    it('Should return null if navigator is undefined', () => {
        navigator.geolocation.getCurrentPosition = (success, error) => error.call(null, 'Geolocation not enabled !');
        Location.getLatLongAsPromise();
        expect(getUserLocation).to.deep.equal({});
    });

    it('Check if fallsback', () => {
        Cookies.save(cookie.LATLONG, '33.0562,-96.7336', '', '');
        navigator.geolocation.getCurrentPosition = (success, error) => error.call(null, 'Geolocation not enabled !');
        Location.getLatLong((coord) => {
            expect(coord).not.to.be.null;
            expect(coord).to.deep.equal(expected);
        }, () => {
            assert.fail('Not expected to error out');
        });
    });

    it('Test getLatLong', () => {
        Cookies.save(cookie.LATLONG, '33.0562', '', '');
        navigator.geolocation.getCurrentPosition = (success, error) => error.call(null, 'Geolocation not enabled !');
        Location.getLatLong(() => {
            assert.fail('Expected to error out');
        }, () => {
        });
    });
});
