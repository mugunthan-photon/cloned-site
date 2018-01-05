import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MarketingZone from '../MarketingZone/MarketingZone';
import SiteComponent from '../SiteComponent/SiteComponent';
import * as style from './MarketingZones.css';
import * as actions from '../../actions/MarketingZonesAction';

const isHydrated = (zoneData, pageName, zones) => {
    if (!zoneData || !zoneData[pageName] || !zones || !zones.length) return false;

    const pageZoneData = zoneData[pageName];
    return zones.every((zone) => {
        if (!pageZoneData[zone]) {
            return false;
        }
        return true;
    });
};

/*
 This is a container component. It will first fetch all the zoness and store it with redux store.
 Zones are page specific so it stores in the same way. All zones call are parellaly called and mapped wth new object.
 It is done becaus to avoid mutiple iteration and reduce time complexity.

 Three diffrent apporoches to get zones are as follows.

 option 1  @type boolean : allZones, it will fetch all zones respective to current pages and present it sequinatially
 (same order we gets from initial call). Fetching of zones are common for all the options. in this option
 zones are already placed in correct order

 option 2  @type string  :singleZone, It will present only that zone which is passed in singlezone props

 option 3 @type array: presentation, it will present those zones which is in the array.

 */
export class MarketingZones extends SiteComponent {

    static propTypes = {
        /**
         *  @type give all the zone names for the entire page in array
         */
        allZones: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

        actions: PropTypes.objectOf(PropTypes.func),

        marketingZonesData: PropTypes.objectOf(PropTypes.object),

        pageName: PropTypes.string.isRequired,

        /**
         * @type string It will present only that zone which is passed in singlezone props
         */
        singleZone: PropTypes.string,

        /**
         * @type array it will present those zones which is in the array.
         */
        presentation: PropTypes.arrayOf(PropTypes.string),

        deviceTypes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

        nType: PropTypes.string,

        softRoute: PropTypes.bool,

        timerZone: PropTypes.string,

        displayTimer: PropTypes.bool,

        featureflgsZone: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

        showPreviewZone: PropTypes.bool,

    };

    static defaultProps = {
        actions: {},
        marketingZonesData: {},
        allZones: [],
        singleZone: '',
        presentation: [],
        deviceTypes: {},
        nType: '',
        softRoute: false,
        timerZone: 'CST',
        displayTimer: false,
        featureflgsZone: {},
        showPreviewZone: false,
    };

    /**
     *  loaded is a flag to avoid race condition. If a microsite is having two diffrent zone container one is in the top and
     * another somewher in the bottom both the conatainer will endup trigerring the parrlel  aclls for zones. loaded flag
     * will help to avoid such calls
     */
    static loaded = {
        department: false,
        home: false,
    }

    /**
     * after collecting the data this conatiner component will hit the dump component for presentation. <ZoneComponent/>
     * ideally calls <MarketingZone>
     */

    static deviceType = {
        isDesktop: false,
        isMobile: true,
        isTablet: false,
    };

    // static isExpired(oneZone) {
    //     if (typeof oneZone.contentExpiry !== 'undefined') {
    //         const contentDate = new Date(oneZone.contentExpiry);
    //         const date = new Date();
    //         if (date > contentDate) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    hydrate() {
        const { marketingZonesData, allZones, pageName, presentation, nType } = this.props;
        if (!isHydrated(marketingZonesData, pageName, allZones)) {
            this.props.actions.zoneLoad(allZones, pageName, presentation, nType);
        }
    }

    shouldComponentUpdate(nextProps) {
        const pageName = nextProps.pageName;
        const zoneContent = this.props.marketingZonesData[pageName];
        const nextZoneContent = nextProps.marketingZonesData[pageName];
        const zones = zoneContent ? Object.keys(zoneContent) : [];
        const nextZones = nextZoneContent ? Object.keys(nextZoneContent) : [];
        return zones.length !== nextZones.length || nextProps.showPreviewZone !== this.props.showPreviewZone;
    }


    getDeviceType() {
        const { deviceTypes } = this.props;
        let type = null;
        if (deviceTypes.isMobile) {
            type = 'mobile';
        } else if (deviceTypes.isTablet) {
            type = 'tablet';
        } else {
            type = 'desktop';
        }
        return type;
    }

    abstractComponent(content, key) {
        const deviceType = this.getDeviceType();
        const { showPreviewZone, softRoute, timerZone, displayTimer } = this.props;
        return (
            <MarketingZone
                zoneContent={content}
                key={key}
                automationId={`test-automation-${key}`}
                deviceType={deviceType}
                softRoute={softRoute}
                timerZone={timerZone}
                displayTimer={displayTimer}
                showPreviewZone={showPreviewZone}
            />
        );
    }

    /**
     * say we have 5 zones to present. so here it will iterate and will present all the logic
     */
    presentPartialZones() {
        const { marketingZonesData, pageName, presentation } = this.props;
        const pagezones = marketingZonesData[pageName];
        const fullDom = [];
        if (presentation.length) {
            presentation.forEach((onezone) => {
                fullDom.push(this.abstractComponent(pagezones[onezone],
                    `${pageName}-${onezone}`));
            });
        }
        return fullDom;
    }

    renderSpecificZone() {
        const { marketingZonesData, singleZone, pageName } = this.props;
        const fragment = marketingZonesData[pageName][singleZone];
        return this.abstractComponent(fragment, `${pageName}-${singleZone}`);
    }

    render() {
        const { marketingZonesData, pageName, presentation } = this.props;
        let zonePresentation = null;
        if (typeof marketingZonesData[pageName] === 'undefined') {
            return null;
        }

        if (presentation.length) {
            zonePresentation = (
                <div className={style.marketingZonesWrapper}>
                    {this.presentPartialZones()}
                </div>
            );
        } else {
            zonePresentation = (
                <div className={style.marketingZonesWrapper}>
                    {this.renderSpecificZone()}
                </div>
            );
        }

        return zonePresentation;
    }
}

const mapStateToProps = ({ marketingZones, showPreviewZone, context }) => ({
    marketingZonesData: marketingZones,
    deviceTypes: context ? context.deviceType : MarketingZones.deviceType,
    timerZone: context && context.preferences ? context.preferences.timeZone : {},
    displayTimer: context && context.featureFlags ? context.featureFlags.zoneTimer : false,
    featureflgsZone: context && context.featureFlags ? context.featureFlags : {},
    showPreviewZone,
});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketingZones);
