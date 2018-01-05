import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PureComponent, PropTypes } from 'react';
import Location from '../../helpers/Location/Location';
import * as orderActions from '../../actions/OrderAction';
import * as actions from '../../actions/RegionZoneActions';
import { cookie } from '../../common/Constants';

/*
    ** Fetaure is driven by FeatureFlag: enableRegionPricing
    ** Defaults to "default" pricing if flag is disabled
    ** Consumer component should read to context for featureFlag status and plan
    for the filler until region gets resolved.

    Regional pricing is determined by lat/long and it persisted for one day now. Meaning
    region pricing would not change for a day till user clears his/her cookie.

    Store does not impact region. It is the actual user lat long

    We fallback to Akamai lat long in case user location could not be accessed
*/

export class FetchRegion extends PureComponent {

    static defaultProps = {
        regionZonefromLocation: null,
    };

    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        enableRegionPricing: PropTypes.bool.isRequired,
        regionZonefromLocation: PropTypes.number, //eslint-disable-line
    };

    componentDidMount() {
        if (this.props.enableRegionPricing) {
            this.fetchRegionZone();
        } else {
            this.resetRegion();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props.actions.setRegion(nextProps.regionZonefromLocation.regionZonefromLocation);
    }

    setRegion = (region) => {
        this.props.actions.setRegion(region);
    }

    loadRegion = (position) => {
        this.props.actions.getRegion(position);
    }

    resetRegion = () => {
        this.props.actions.setRegion(-1);
        Cookies.remove(cookie.PRICE_ZONE);
    }

    successCb = (position) => {
        const pos = {
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
        };
        this.loadRegion(pos);
    };

    errorCb = (err) => { //eslint-disable-line
        this.resetRegion();
    };

    fetchRegionZone = () => {
        const regionExists = Cookies.load(cookie.PRICE_ZONE);
        if (regionExists) {
            this.setRegion(regionExists);
            return;
        }

        Location.getLatLong(this.successCb, this.errorCb);
    };

    render() {
        return null;
    }
}

const mapStateToProps = store => ({
    enableRegionPricing: store.context && store.context.featureFlags ?
    store.context.featureFlags.enableRegionPricing : null,
    regionZonefromLocation: store.regionZonefromLocation,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions, ...orderActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FetchRegion);
