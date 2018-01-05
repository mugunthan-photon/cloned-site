import React, { Component, PropTypes } from 'react';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import List from 'yoda-core-components/lib/components/List/List';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import Storage from '../../helpers/Storage/Storage';
import * as styles from './StoreCard.css';

export default class StoreCard extends Component {
    /**
     * Supported React properties
     * @type {Object}
     */
    static defaultProps = {
        dataConfig: {},
        index: 0,
        activeIndex: -1,
        activeStore: -1,
        automationId: '',
    };

    static propTypes = {
        /**
         * dataConfig is  used to pass values for the storeCard component
         * dataConfig as props
         * dataConfig object should contain : title,listNumber
         * fullAddress,city,state,href,
         * storePhoneNumber,storeDistance,storeLoactionLink,timings,hourContent (as array with days and time)
         * and storeServicesList (as array)
         * @type {object}
         */
        dataConfig: PropTypes.objectOf,
        index: PropTypes.number,
        setStoreCallback: PropTypes.func.isRequired,
        activeIndex: PropTypes.number,
        activeStore: PropTypes.number,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,
    };

    static isAvailableToday(timings) {
        let today = null;
        let day = 0;
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        today = days[new Date().getDay()];

        if (timings && timings.length) {
            do {
                if (timings[day].days.indexOf(today) !== -1) {
                    return {
                        isOpen: 'true',
                        timings: timings[day].time,
                    };
                }

                day += 1;
            } while (day <= timings.length - 1);
        }
        return true;
    }

    constructor() {
        super();
        this.state = {
            isStoreDetailsBlockOpen: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.setStore = this.setStore.bind(this);
    }

    setStore() {
        /**
         * Storing following information in the user Cookies
         * Current implementation in m.jcpenney.com involves cookie storage and retrieving
         * Would be changed in future with the actual implementation of post call
         */

            // Storing the store name in the cookie
        const configData = this.props.dataConfig;

        if (configData) {
            LocalStorage.setData('defaultStore', configData, true);

            // Storing the store id
            if (configData.id) {
                Storage.save('userStore', configData.id, true);
                Cookies.save('userStore', configData.id);
            }

            if (configData.id && configData.name && configData.distance) {
                const storeFrom = Cookies.load('isGeoStore') || 'false';
                Cookies.save('userStoreInfo', encodeURI(`${configData.id}|${configData.name}|${configData.distance}|${storeFrom}`));
                Cookies.remove('isGeoStore');
            }
        }
        // Calling the callback to the parent of this component
        this.props.setStoreCallback(this.props.index, this.props.dataConfig.id);
    }

    /**
     * @callback function for the onClick props
     * updating the isStoreDetailsBlockOpen state to toggle the storesDetailBlock
     */
    handleClick(eve) {
        this.setState(prevState => ({
            isStoreDetailsBlockOpen: !prevState.isStoreDetailsBlockOpen,
        }));
        eve.preventDefault();
    }

    render() {
        const { dataConfig, activeStore, activeIndex, automationId } = this.props;
        /* istanbul ignore next */
        const myStore = (activeStore === dataConfig.id || this.props.index === activeIndex) ? (
            <span className={styles.myStore}>
                <span className={styles.myStoreIcon}>
                    <Icon
                        iconType="svg"
                        width="22px"
                        height="22px"
                        viewBox="0 0 20 20"
                        name="check-line"
                    />
                </span>
                My Store
            </span>
        ) : (
            <Button
                automationId="store-set-store"
                type="button" onClick={this.setStore}
                className={styles.storeButton}
            >SET AS MY STORE</Button>
        );

        const storeAvailability = StoreCard.isAvailableToday(dataConfig.timings);
        const hourContentItemRenderer = dataItem => (
            <span
                data-automation-id="store-set-hour"
                key={dataItem.id}
            >{dataItem.days} {dataItem.time}</span>
        );

        const storeServicesItemRenderer = dataItem => <p>{dataItem}</p>;

        /* storeDetailText updates text based on isStoreDetailsBlockOpen state */
        const storeDetailText = (this.state.isStoreDetailsBlockOpen) ? 'Hide Store Services -' : 'Show Store Services +';

        /* storesDetailBlock updates blocks based on isStoreDetailsBlockOpen state */
        const storesDetailBlock = (this.state.isStoreDetailsBlockOpen) ? (
            <div className={styles.row}>
                <div className={styles.storesDetailBlock}>
                    <hr className={styles.hrStyle}/>
                    <div className={styles.storeHoursDetail}>
                        <h6 className={styles.storeCardTitle}> Store Hours </h6>
                        <List
                            datasource={dataConfig.timings} itemStyleClass={styles.hourContentListItem}
                            listStyleClass={styles.hourContentList} childRenderer={hourContentItemRenderer}
                            direction="Vertical"
                            automationId="store-hours" itemSpacing="None" spacing="None"
                        />
                    </div>
                    <div className={styles.storeServicesDetail}>
                        <h6 className={styles.storeCardTitle}> Store Services </h6>
                        <List
                            datasource={dataConfig.services} itemStyleClass={styles.storeServicesListItem}
                            listStyleClass={styles.storeServicesList} childRenderer={storeServicesItemRenderer}
                            direction="Vertical"
                            automationId="store-service" itemSpacing="None" spacing="None"
                        />
                    </div>
                </div>
            </div>
        ) : null;

        const gMapUrl = 'http://maps.google.com/?saddr=Current%20Location&daddr=';

        return (
            <div className={styles.storeCard} data-automation-id={automationId}>
                <div className={styles.row}>
                    <div className={styles.listNumber}> {this.props.index} </div>
                    <div className={styles.addressBlock}>
                        <address className={styles.address}>
                            <div data-automation-id="store-card-title" className={styles.addresstitle}>
                                <h4
                                    data-automation-id="store-card-name"
                                    className={styles.storeName}
                                >{dataConfig.name}</h4>
                            </div>
                            <div data-automation-id="store-card-street"> {dataConfig.street} </div>
                            <div data-automation-id="store-card-city"> {dataConfig.city}
                                , {dataConfig.state}{dataConfig.zip} </div>
                            <a
                                data-automation-id="store-card-phno"
                                className={styles.storePhone}
                                href={`tel:${dataConfig.href}`}
                            >{dataConfig.phone}</a>
                        </address>
                    </div>

                    <div className={styles.storeDetailsBlock}>
                        <div className={styles.storeDistance}>
                            <div data-automation-id="store-card-distance">{dataConfig.distance} mi</div>
                        </div>
                        <div className={styles.storeDirectionBlock}>
                            <span className={styles.getStoreDirection}>
                                <a
                                    href={`${gMapUrl}${dataConfig.street}+{dataConfig.zip}`}
                                    data-automation-id="store-card-directions"
                                    className={styles.anchorText}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Get Directions</a>
                            </span>
                        </div>
                        <div className={styles.storeTimings}>
                            { storeAvailability.isOpen ? (
                                <div>
                                    <div data-automation-id="store-card-isopen-text"> Open Today</div>
                                    <div
                                        data-automation-id="store-card-isopen-time"
                                        className={styles.timing}
                                    >{storeAvailability.timings}</div>
                                </div>
                            ) : null }
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.storeButtonWrapper} data-automation-id="">
                        {myStore}
                    </div>
                    <div className={styles.storeService}>
                        <a
                            data-automation-id="show-store-service"
                            href="" onClick={this.handleClick}
                            className={styles.anchorText}
                        >{storeDetailText}</a>
                    </div>
                </div>
                {storesDetailBlock}
            </div>
        );
    }
}
