import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import _map from 'lodash/map';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';

/* istanbul ignore next */
class DevToolBar extends PureComponent {
    static defaultProps = {
        context: null,
    };

    static propTypes = {
        context: PropTypes.objectOf,
    };

    constructor() {
        super();
        this.state = {
            devCookie: {
                cluster: '',
                testpool: '',
                yodaExperience: '',
                svcImplVer: '',
            },
            display: false,
        };
    }

    componentDidMount() {
        this.refreshState();
        this.setDevToolBar();
    }

    setDevToolBar() {
        try {
            const jcpTester = (location.search.indexOf('jcptester=true') !== -1);
            const jcpTesterCookie = Cookies.load('jcptester') || '';
            if (jcpTester || jcpTesterCookie === 'true') {
                Cookies.save('jcptester', true);
                this.setState({ display: true });
            }
        } catch (error) {
            console.log('Error ', error);
        }
    }

    refreshState = () => {
        this.setState({ devCookie: {
            cluster: Cookies.load('DPCluster'),
            testpool: Cookies.load('testpool'),
            yodaExperience: Cookies.load('yoda-experience'),
            svcImplVer: Cookies.load('SCVIMPLVER'),
        } });
    }

    switchCluster = () => {
        const { cluster } = this.state.devCookie;
        const newCluster = prompt('Please provide new cluster', cluster); // eslint-disable-line
        if (newCluster) {
            Cookies.save('DPCluster', newCluster);
        }
    }

    switchTestpool = () => {
        const { testpool } = this.state.devCookie;
        const newCluster = prompt('Please provide new testpool', testpool); // eslint-disable-line
        if (newCluster) {
            Cookies.save('testpool', newCluster);
        }
    }

    switchYodaExperience = () => {
        const { yodaExperience } = this.state.devCookie;
        const newCluster = prompt('Please provide new yodaExperience', yodaExperience); // eslint-disable-line
        if (newCluster) {
            Cookies.save('yoda-experience', newCluster);
        }
    }

    switchSVCImplVer = () => {
        const { svcImplVer } = this.state.devCookie;
        const newSvcImplVer = prompt('Please provide new svcImplVer', svcImplVer); // eslint-disable-line
        if (newSvcImplVer) {
            Cookies.save('SCVIMPLVER', newSvcImplVer);
        }
    }

    debugInfo = () => {
        const { debug } = this.props.context;
        const debugData = [];
        _map(debug, (value, key) => {
            debugData.push(
                <div>
                    <span>{key} - </span><span> {value.toString()} </span>
                </div>,
            );
        });

        return debugData;
    }

    render() {
        if (!this.state.display) {
            return null;
        }

        const { cluster, testpool, yodaExperience, svcImplVer } = this.state.devCookie;
        const { __RELEASEVERSION__, responseTimeStamp } = this.props.context;

        return (
            <div>
                <hr />
                <div><span>Developer Toolbar</span><span /></div>
                <hr />
                <div><span>Release Version - </span>{__RELEASEVERSION__}<span /></div>
                <div><span>Response TimeStamp - </span><span>{responseTimeStamp}</span></div>
                <hr />
                <div><span>Cluster - </span><span>{cluster}</span> - <span><a href="" onClick={this.switchCluster}>Switch</a></span></div>
                <div><span>Testpool - </span><span>{testpool}</span> - <span><a href="" onClick={this.switchTestpool}>Switch</a></span></div>
                <div><span>Yoda Experience - </span><span>{yodaExperience}</span> - <span><a href="" onClick={this.switchYodaExperience}>Switch</a></span></div>
                <div><span>svcImplVer - </span><span>{svcImplVer}</span> - <span><a href="" onClick={this.switchSVCImplVer}>Switch</a></span></div>
                <hr />
                {this.debugInfo()}
            </div>);
    }
}

const mapStateToProps = store => ({
    context: store.context,
});

export default connect(mapStateToProps)(DevToolBar);
