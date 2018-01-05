import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import Input from 'yoda-core-components/lib/components/Input/Input';
import { findStoreErrorMessages, useLocationLabel, geoErrorType, findStoreThemes } from '../../common/Constants';
import Location from '../../helpers/Location/Location';
import * as styles from './LocationFinder.css';
import Utils from '../../helpers/Utils/Utils';

const cx = classNames.bind(styles);

class LocationFinder extends Component {

    static propTypes = {
        onFormSubmit: PropTypes.func.isRequired,
        showAvailable: PropTypes.bool,
        zipCode: PropTypes.number,
        miles: PropTypes.number,
        children: PropTypes.node,
        skus: PropTypes.string,
        restrictMiles: PropTypes.bool,
        theme: PropTypes.string,
        deviceType: PropTypes.objectOf(PropTypes.object),
    }

    static defaultProps = {
        zipCode: '',
        miles: 25,
        children: '',
        showAvailable: true,
        skus: null,
        restrictMiles: false,
        theme: '',
        deviceType: {},
    }

    constructor(props) {
        super(props); /* istanbul ignore next */
        this.getLatLong = this.getLatLong.bind(this);
        this.geoError = this.geoError.bind(this);
        this.getStoresByLatLong = this.getStoresByLatLong.bind(this);
        this.getStoresByZipCode = this.getStoresByZipCode.bind(this);
        this.hideErrorMessage = this.hideErrorMessage.bind(this);
        this.onZipCodeChange = this.onZipCodeChange.bind(this);
        this.onEnterhandler = this.onEnterhandler.bind(this);
        this.onMilesChange = this.onMilesChange.bind(this);
        this.state = {
            zipCode: this.props.zipCode,
            miles: this.props.miles,
            showForm: this.props.theme === findStoreThemes.pdpMajorAppliances ?
                false : !this.props.children,
            invalidZipCode: false,
            locationError: {
                showErrorMessage: false,
                errorMsgTitle: '',
                errorMsg: '',
            },
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            zipCode: nextProps.zipCode,
            locationError: { showErrorMessage: false },
        });
    }

    onZipCodeChange = (value) => {
        this.setState({ zipCode: value });
    }

    onEnterhandler = (value) => {
        // KeyboardEvent.keyCode is in the process of deprecation
        /* istanbul ignore else */
        if ((value.code && value.code === 'Enter') || (value.keyCode && value.keyCode === 13)) {
            this.getStoresByZipCode();
        }
    }

    onMilesChange = (event) => {
        this.setState({ miles: event.target.value });
    }

    getLatLong = () => {
        Location.getLatLong(this.getStoresByLatLong, this.geoError);
    }

    getStoresByLatLong = (position) => {
        const params = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            miles: this.state.miles,
            showAvailable: this.props.showAvailable,
            skus: this.props.skus,
        };
        this.props.onFormSubmit(params);
    }

    getStoresByZipCode = () => {
        const { theme } = this.props;
        let validZipCode = true;
        const isFindOrSelectAStore = (theme === findStoreThemes.findAStorePage)
                || (theme === findStoreThemes.selectAStore);

        /* istanbul ignore else */
        if (isFindOrSelectAStore) {
            this.setState({
                invalidZipCode: false,
            });
        }

        if (!this.state.zipCode) {
            this.geoError(geoErrorType.EMPTY_ZIP_CODE);
        } else {
            const params = {
                zipCode: this.state.zipCode,
                miles: this.state.miles,
                showAvailable: this.props.showAvailable,
                skus: this.props.skus,
            };

            if (isFindOrSelectAStore) {
                validZipCode = Utils.validateZipCode(this.state.zipCode);
                if (!validZipCode) {
                    this.setState({
                        invalidZipCode: true,
                    });
                }
            }
            validZipCode && this.props.onFormSubmit(params);
        }
    }

    toggleForm = (event) => {
        event.preventDefault();
        this.setState({
            showForm: !this.state.showForm,
        });
    }

    hideErrorMessage = () => {
        this.setState({
            locationError: {
                showErrorMessage: false,
            },
        });
    }

    geoError = (errorType) => {
        let errorMsgTitle = '';
        let errorMsg = '';
        switch (errorType) {
            case geoErrorType.EMPTY_ZIP_CODE:
                errorMsgTitle = '';
                errorMsg = findStoreErrorMessages.EMPTY_ZIP_CODE;
                break;
            case geoErrorType.GEO_LOCATE_ERROR:
                errorMsgTitle = findStoreErrorMessages.LOCATION_ERROR_MSG_TITLE;
                errorMsg = findStoreErrorMessages.GEO_LOCATE_ERROR;
                break;
            default:
                errorMsgTitle = findStoreErrorMessages.LOCATION_ERROR_MSG_TITLE;
                errorMsg = findStoreErrorMessages.LOCATION_NOT_ENABLED;
        }

        this.setState({
            locationError: {
                showErrorMessage: true,
                errorMsgTitle,
                errorMsg,
            },
        });
    }

    render() {
        const { theme, deviceType: { isDesktop } } = this.props;
        const { invalidZipCode } = this.state;
        const wrapperClass = cx('storesWrap', theme, {
            desktopStoresWrap: isDesktop,
        });
        return (
            <div className={wrapperClass}>
                <MessageBox
                    type="error"
                    level="section"
                    className={cx('errorMessageWrapper')}
                    title={this.state.locationError.errorMsgTitle}
                    showMessage={this.state.locationError.showErrorMessage}
                    onClose={this.hideErrorMessage}
                    automationId="fs-error-msg"
                >
                    <span data-automation-id="fs-error-msg">{this.state.locationError.errorMsg}</span>
                </MessageBox>
                <div className={cx('availableMsg', 'col12', !this.props.children ? 'hide' : '')}>
                    <div className={cx('left')}>{this.props.children}</div>
                    <Button
                        buttonType="Text"
                        size="Md"
                        onClick={this.toggleForm}
                        automationId={this.state.showForm ? 'fs-cancel-link' : 'fs-change-link'}
                        className={cx('toggleForm', 'right')}>
                        {this.state.showForm ? 'Cancel' : 'Change'}
                    </Button>
                </div>
                <div data-automation-id="find-store-main" className={cx(this.state.showForm ? '' : 'hide')}>
                    <div className={cx('inputContainer', 'tblBlk')}>
                        <div className={cx('tblClm', 'useMyLocationBtn')}>
                            <Button
                                size="Sm"
                                buttonType="Secondary"
                                className={cx('locationBtn', this.locationBtnTheme)}
                                automationId="use-my-location"
                                onClick={this.getLatLong}
                            >
                                <Icon
                                    iconType="svg"
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 40 40"
                                    name="icon-location"
                                />
                                {useLocationLabel}
                            </Button>
                        </div>
                        <div className={cx('separator', 'tblClm')}>
                            <div className={cx('seperatorTextBlock')}>
                                <span className={cx('seperatorText')} data-automation-id="fs-separator">OR</span>
                            </div>
                        </div>
                        <div className={cx('searchWrap', 'tblClm')}>
                            <div className={cx('tblBlk', 'findSearchBlk')}>
                                <div className={cx('tblClm', 'searchText', 'col6')}>
                                    <div className={cx('title')} data-automation-id="fs-search-label">Search By</div>
                                    <div className={cx('searchTextBoxField')}>
                                        <Input
                                            type="text"
                                            name="find store"
                                            theme={styles.locationFinderTextBox}
                                            placeholder="Zip or City, State"
                                            ariaRequired
                                            required
                                            automationId="find-store-zip"
                                            value={this.state.zipCode}
                                            onChange={this.onZipCodeChange}
                                            onKeyUp={this.onEnterhandler}
                                        />
                                    </div>
                                    <MessageBox
                                        type="error"
                                        level="inline"
                                        title={findStoreErrorMessages.ZIP_CODE_ERROR}
                                        showMessage={invalidZipCode}
                                        hasClose={false}
                                        automationId="invalid-zip-code"
                                    />
                                </div>
                                <div className={cx('tblClm', 'selectMiles', 'sm4', 'md4', 'lg4', 'xl3', 'left')}>
                                    <div className={cx('title')} data-automation-id="fs-miles-label">Miles</div>
                                    <div className={cx('milesSelectField')}>
                                        <select
                                            data-automation-id="fs-select-miles"
                                            className={styles.milesSelect}
                                            onChange={this.onMilesChange}
                                            value={this.state.miles}
                                        >
                                            <option value="10">10mi</option>
                                            <option value="15">15mi</option>
                                            <option value="25">25mi</option>
                                            <option value="50">50mi</option>
                                            {this.props.restrictMiles ? null : <option value="75">50+mi</option>}
                                        </select>
                                    </div>
                                </div>
                                <div className={cx('tblClm', 'searchStoreBtnBlock', 'sm2', 'md2', 'lg2', 'xl3')}>
                                    <Button
                                        size="Sm"
                                        buttonType="Tertiary"
                                        className={cx('searchStoreBtn', 'col12', this.locationBtnTheme)}
                                        automationId="search-by-zipcode"
                                        onClick={this.getStoresByZipCode}
                                    >
                                        <Icon
                                            iconType="svg"
                                            className={cx('svgIcon', 'searchIcon')}
                                            width="25px"
                                            height="25px"
                                            viewBox="0 0 25 25"
                                            name="searchicon"
                                            pathClassName={cx('findSearchIcon')}
                                        />
                                        <span
                                            className={cx('visibleXl', 'locationFinderBtnText')}
                                            data-automation-id="search-btn-label"
                                        >
                                            Search
                                            </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LocationFinder;
