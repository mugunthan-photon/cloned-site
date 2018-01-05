import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Button from 'yoda-core-components/lib/components/Button/Button';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import * as actions from '../../actions/BarcodeStatusAction';
import BarCode from '../BarCode/Barcode';
import * as styles from './ShowBarCode.css';
import * as Constants from '../../common/Constants';

const cx = classNames.bind(styles);

const showPrintButton = (showPrintButtonGlobal, href) => ((!showPrintButtonGlobal && href) ? <Button
    type="button"
    automationId="at-coupon-shop-link"
    buttonType="Secondary"
    rel="noopener noreferrer"
    onClick={() => { NavigationHelper.navigate(href, true); }}
    className={cx('couponShopBtn')}
    ellipsis
    size="Xl">
    <Icon
        iconType="svg"
        automationId="at-coupon-print-icon"
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        name="print"
        pathClassName={styles.lockBtnIcon}
        className="btnIcon" /> {Constants.CouponPrintLabel}
</Button> : null);

export class ShowBarCode extends Component {

    static propTypes = {
        offerDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
        channelName: PropTypes.string.isRequired,
        termsText: PropTypes.string,
        modalAutoId: PropTypes.string.isRequired,
        printOption: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        printConfig: PropTypes.bool,
        actions: PropTypes.objectOf(PropTypes.object),
        index: PropTypes.number,
        showPrintButtonGlobal: PropTypes.bool,
    };

    static defaultProps = {
        termsText: '',
        printOption: '',
        printConfig: false,
        actions: {},
        index: 0,
        showPrintButtonGlobal: false,
    };

    constructor() {
        super();
        this.state = { isModalOpen: false };
        this.openModal = this.openModal.bind(this);
    }

    closeModal() {
        this.setState({ isModalOpen: false });
        this.props.actions.isBarcodeModalOpen(false);
    }

    openModal(event) {
        event.preventDefault();
        this.props.actions.isBarcodeModalOpen(true);
        this.setState({ isModalOpen: true });
    }

    render() {
        const { printOption, printConfig, modalAutoId, offerDetails, channelName, index, termsText } = this.props;

        // Display Print CTA if configured, although href would always be present double checking.
        let printHtml = '';
        if (printOption.href && printConfig) {
            printHtml = (<Button
                type="button"
                automationId="at-coupon-print-btn"
                buttonType="Secondary"
                size="Xl"
                className={cx('buttonTheme')}
                onClick={() => { NavigationHelper.navigate(printOption.href, true); }}>
                <Icon
                    iconType="svg"
                    automationId="at-coupon-print-icon"
                    width="32px"
                    height="32px"
                    viewBox="0 0 32 32"
                    name="print"
                    pathClassName={styles.lockBtnIcon}
                    className="btnIcon" /> {Constants.CouponPrintLabel}
            </Button>);
        }

        return (
            offerDetails.barCode ? (<div className={cx('coupon', 'couponBarcode')}>
                <Button
                    type="button"
                    automationId="at-show-barcode-btn"
                    buttonType="Secondary"
                    size="Xl"
                    className={cx('couponBarcodeBtn')}
                    ellipsis
                    onClick={this.openModal}>
                    <Icon
                        iconType="svg"
                        automationId="at-show-barcode-icon"
                        width="35px"
                        height="35px"
                        viewBox="0 0 35 35"
                        name="barcode"
                        className={cx('barcodeIcon')} />Show Barcode
                    </Button>
                <ModalBox
                    showModal={this.state.isModalOpen}
                    onClose={() => this.closeModal()}
                    defaultHeader
                    automationId={modalAutoId}
                    modalTheme={cx('appliedModalTheme')}
                    modalContentTheme={cx('appliedModalContentTheme')}
                >
                    <div className={cx('detailsWrapper', 'alignCenter')}>
                        <div className={cx('barcodeDetailsWrapper')}>
                            <BarCode
                                barCodeData={offerDetails}
                                channelName={channelName}
                                index={index} />
                        </div>
                        {printHtml}
                    </div>
                    <div className={cx('couponTnC', 'alignCenter')}>{termsText}</div>
                </ModalBox>
            </div>) : showPrintButton(this.props.showPrintButtonGlobal, printOption.href)
        );
    }

}
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(ShowBarCode);
