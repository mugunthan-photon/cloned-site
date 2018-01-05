import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import Checkbox from 'yoda-core-components/lib/components/CheckBox/CheckBox';
import LocationFinder from '../../../LocationFinder/LocationFinder';
import styles from './FindStoresLocationForm.css';
import { findStoreThemes, findStores } from '../../../../common/Constants';

const cx = classNames.bind(styles);

/**
 * This component includes the LocationFinder component with show available checkbox when
 * the product details are passed.
 *
 * @class FindStoresLocationForm
 * @extends {Component}
 */
class FindStoresLocationForm extends Component {

    static propTypes = {
        findStoresDetails: PropTypes.objectOf(PropTypes.object),
        findStoresAction: PropTypes.func.isRequired,
        setAvailableFilterAction: PropTypes.func.isRequired,
        isShowAvailableFilter: PropTypes.bool,
        productSku: PropTypes.string,
        restrictMiles: PropTypes.bool,
        theme: PropTypes.string,
        deviceType: PropTypes.objectOf(PropTypes.object),
    };

    static defaultProps = {
        findStoresDetails: {},
        isShowAvailableFilter: false,
        productSku: null,
        restrictMiles: false,
        theme: '',
        deviceType: {},
    }

    constructor(props) {
        super(props); // istanbul ignore next
        this.onToggleShowAvailableStores = this.onToggleShowAvailableStores.bind(this);
        // The available checkbox should be checked by default unless user has changed it
        if (this.props.findStoresDetails.showAvailable === undefined) {
            this.props.setAvailableFilterAction(true);
        }
    }

    onToggleShowAvailableStores = () => {
        const { findStoresAction, findStoresDetails, setAvailableFilterAction, productSku } = this.props;
        if (findStoresDetails.zipCode) {
            const payload = {
                showAvailable: !findStoresDetails.showAvailable,
                zipCode: findStoresDetails.zipCode,
                miles: findStoresDetails.miles,
                skus: productSku,
            };
            findStoresAction(payload);
        } else {
            // Just set the filter for the call that will be made
            setAvailableFilterAction(!findStoresDetails.showAvailable);
        }
    };

    renderTotalStoresForPage = () => {
        const { findStoresDetails: {
            zipCode,
            miles,
            count,
        }, deviceType: { isMobile } } = this.props;
        const displayTotalStores = (miles && zipCode);

        const totalStores = isMobile && displayTotalStores ? (<span className={cx('storeMsgWrapper')} data-automation-id="at-store-msg">
            <strong>{`${count} stores `}</strong>
            <span>
                within
                <strong> {`${miles > 50 ? '50+' : miles}mi`} </strong>
                of
                <strong> {zipCode}</strong>
            </span>
        </span>) : null;

        return totalStores;
    }

    render() {
        const { findStoresDetails: {
            showAvailable,
            zipCode,
            miles,
            count,
        }, isShowAvailableFilter, productSku, restrictMiles, theme, deviceType } = this.props;
        const isFindAStorePage = theme === findStoreThemes.findAStorePage;
        const isSelectAStore = theme === findStoreThemes.selectAStore;
        const isFindOrSelectAStore = isFindAStorePage || isSelectAStore;
        const checkboxConfig = {
            checked: showAvailable,
            id: 'showAvlStores',
            name: 'storelist-checkbox',
            'data-automation-id': 'change-store-show-available',
        };
        const optionsBlockClass = cx('col12', {
            optionsBlock: !isFindOrSelectAStore,
        });
        const checkboxLabel = <span className={styles.labelWrapper}>Show available only</span>;
        const storeCountMessage = isFindAStorePage ?
                            this.renderTotalStoresForPage() :
                            count && miles && zipCode && (
                                <span className={cx('storeMsgWrapper')} data-automation-id="at-store-msg">
                                    <strong>{`${count} stores `}</strong>
                                     within
                                     <strong> {`${miles > 50 ? '50+' : miles}mi`} </strong>
                                     of
                                     <strong> {zipCode}</strong>
                                </span>
                            );
        const hideFormFormForLargeAppliances = zipCode && theme === findStoreThemes.pdpMajorAppliances;
        return (
            <div className={cx('container', theme)}>
                <section className={optionsBlockClass}>
                    <div className={cx('infoText')}>
                        <LocationFinder
                            onFormSubmit={this.props.findStoresAction}
                            showAvailable={showAvailable}
                            zipCode={zipCode === findStores.INVALID_INPUT ? '' : zipCode}
                            miles={miles}
                            skus={productSku}
                            deviceType={deviceType}
                            restrictMiles={restrictMiles}
                            theme={theme}
                            hideFormFormForLargeAppliances={hideFormFormForLargeAppliances}
                        >
                            { storeCountMessage }
                        </LocationFinder>
                    </div>
                    { isShowAvailableFilter ?
                        <div className={cx('checkBoxText')}>
                            <Checkbox
                                label={checkboxLabel}
                                config={checkboxConfig}
                                onClick={this.onToggleShowAvailableStores}
                            />
                        </div> : null }
                </section>
            </div>
        );
    }
}

export default FindStoresLocationForm;
