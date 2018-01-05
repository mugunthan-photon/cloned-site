import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import _isEmpty from 'lodash/isEmpty';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import Loader from 'yoda-core-components/lib/components/Loader/Loader';
import * as savedItemActions from '../../actions/SavedItemAction';
import config from '../ProductCard/ProductCard.config';
import * as analyticsActions from '../../actions/AnalyticsAction';
import saveForLaterConfig from './SaveForLater.config';
import * as styles from './SaveForLater.css';

const cx = classNames.bind(styles);

export class SaveForLater extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        savedItemStatus: PropTypes.oneOfType([PropTypes.object]), // eslint-disable-line
        deviceType: PropTypes.oneOfType([PropTypes.object]),
        cardType: PropTypes.string,
        ppId: PropTypes.string,
        skuId: PropTypes.string,
        isFirstProduct: PropTypes.bool,
        savedItems: PropTypes.oneOfType([PropTypes.array]),
    };

    static defaultProps = {
        actions: {},
        savedItemStatus: null,
        cardType: config.cardTypes.GRID,
        ppId: null,
        skuId: null,
        savedItems: {},
        isFirstProduct: false,
        deviceType: {
            isMobile: false,
            isTablet: false,
            isDesktop: false,
        },
    };

    constructor() {
        super();
        this.state = {
            overlayText: null,
            isSaved: false,
            isInProgress: false,
        };
        this.saveorDeleteItem = this.saveorDeleteItem.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onLeave = this.onLeave.bind(this);
    }

    componentWillMount() {
        /* istanbul ignore next */
        if (!__SERVER__ && _isEmpty(this.props.savedItems) && !Cookies.load('FSFL') && this.props.isFirstProduct) {
            Cookies.save('FSFL', 'yes');
            this.setState({
                overlayText: 'Love something to discover more like it',
            });
            setTimeout(() => {
                this.resetLabel();
            }, 5000);
        }
    }

    componentWillReceiveProps(nextProps) {
        const savedItemStatus = (nextProps.savedItemStatus || []).find(obj => (obj.ppId === this.props.ppId));
        if (savedItemStatus) {
            if (savedItemStatus.isSuccess) {
                if (savedItemStatus.action === 'add') {
                    const addedText = () => (
                        <div>
                            <div className={cx('success')}><Icon iconType="svg" automationId="save-for-later-automation-with-fil-success" width="32px" height="32px" viewBox="0 0 32 32" name="sfl-success" key="success" />Added</div>
                            <a className={cx('link')} href={saveForLaterConfig.url.SAVEDLISTFAV}>View My Favorites</a>
                        </div>
                    );

                    this.setState({
                        isSaved: true,
                        overlayText: addedText(),
                    });
                } else if (savedItemStatus.action === 'remove') {
                    this.setState({
                        isSaved: false,
                        overlayText: 'Removed',
                    });
                }
            } else {
                const errorMessage = savedItemStatus.errorMessage || 'Item could not be saved/removed';
                this.props.actions.triggerFormError([{
                    errorDescription: errorMessage.toLowerCase(),
                }]);
                this.setState({
                    overlayText: (<div>
                        <div><Icon iconType="svg" automationId="save-for-later-automation-with-fil-error" width="32px" height="32px" viewBox="0 0 32 32" name="sfl-error" key="error" /></div>
                        <div className={cx('error')}>{errorMessage}</div>
                    </div>),
                });
            }
            setTimeout(() => {
                this.props.actions.resetStatus(this.props.ppId);
                this.resetLabel();
            }, 3000);
        }

        if (nextProps.savedItems && (!savedItemStatus || _isEmpty(savedItemStatus))) {
            const isSaved = nextProps.savedItems[this.props.ppId];
            /* istanbul ignore next */
            if (isSaved) {
                this.setState({
                    isSaved: true,
                });
            } else if (this.state.isSaved) {
                this.setState({
                    isSaved: false,
                });
            }
        }
    }

    onHover() {
        if (this.state.isInProgress === false) {
            const fav = (this.props.savedItems || {})[this.props.ppId];
            const overlayText = fav ? 'Remove Favorite' : 'Favorite';
            this.setState({
                overlayText,
            });
        }
    }

    onLeave() {
        if (this.state.isInProgress === false) {
            this.setState({
                overlayText: null,
            });
        }
    }

    saveorDeleteItem(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (this.state.isInProgress === false) {
            this.setState({
                overlayText: (<Loader automationId="test-automation-sfl-loader" />),
                isInProgress: true,
            });
            const fav = (this.props.savedItems || {})[this.props.ppId];
            if (fav) {
                this.deleteItem(fav.id);
            } else {
                this.saveItem();
            }
        }
    }

    saveItem() {
        this.props.actions.addItem(
            [
                {
                    product: {
                        id: this.props.ppId,
                    },
                    itemId: this.props.skuId,
                    quantity: 1,
                },
            ],
        );
    }

    deleteItem(id) {
        this.props.actions.removeItem(
            {
                ppId: this.props.ppId,
                id,
            },
        );
    }

    resetLabel() {
        this.setState({
            isInProgress: false,
            overlayText: null,
        });
    }

    render() {
        const displayText = this.state.overlayText;
        let isSaved = this.state.isSaved;
        /* istanbul ignore next */
        const extraMargin = this.props.cardType === config.cardTypes.GRID ? 'extraMargin' : '';
        if (this.props.savedItems) {
            const isSavedin = this.props.savedItems[this.props.ppId];
            if (isSavedin) {
                isSaved = true;
            }
        }

        const tooltip = () => {
            if (displayText) {
                const tooltipClass = this.props.cardType === config.cardTypes.LIST ? 'saveTooltipRight' : 'saveTooltipBottom';
                return (
                    <div className={cx(tooltipClass)} ><div className={cx('tooltipContent')}>{displayText}</div></div>
                );
            }

            return '';
        };
        const sflButtonKey = `saveForLater${this.props.ppId}${this.props.cardType}`;
        const savedIconKey = `saved${this.props.ppId}${this.props.cardType}`;
        const unsavedIconKey = `unsaved${this.props.ppId}${this.props.cardType}`;
        return (
            <div className={styles.saveForLater}>
                { this.props.deviceType.isDesktop ? (
                    <button
                        onClick={e => this.saveorDeleteItem(e)}
                        className={cx('sflButtonStyle', extraMargin)}
                        onMouseOver={() => this.onHover()}
                        onMouseLeave={() => this.onLeave()}
                        data-automation-id="save-for-later-btn"
                        key={sflButtonKey}>
                        { isSaved ?
                        (<Icon iconType="svg" automationId="save-for-later-automation-with-fil" width="35px" height="35px" viewBox="0 0 35 35" name="heartfill" key={savedIconKey} />) :
                        (<Icon iconType="svg" automationId="save-for-later-automation" width="35px" height="35px" viewBox="0 0 35 35" name="heart" key={unsavedIconKey} />)}
                    </button>
                ) : (
                    <button
                        onClick={e => this.saveorDeleteItem(e)}
                        className={cx('sflButtonStyle', extraMargin)}
                        data-automation-id="save-for-later-btn"
                        key={sflButtonKey}>
                        { isSaved ?
                        (<Icon iconType="svg" automationId="save-for-later-automation-with-fil" width="35px" height="35px" viewBox="0 0 35 35" name="heartfill" key={savedIconKey} />) :
                        (<Icon iconType="svg" automationId="save-for-later-automation" width="35px" height="35px" viewBox="0 0 35 35" name="heart" key={unsavedIconKey} />)}
                    </button>
                )}
                {tooltip()}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    savedItemStatus: store.savedItemStatus,
    savedItems: store.savedItems,
    deviceType: store.context ? store.context.deviceType : {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...savedItemActions, ...analyticsActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveForLater);
