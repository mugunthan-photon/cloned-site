import React, { Component, PropTypes } from 'react';
import Button from 'yoda-core-components/lib/components/Button/Button';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import classNames from 'classnames/bind';
import * as styles from './CouponCard.css';
import * as Constants from '../../common/Constants';

const cx = classNames.bind(styles);

class CouponDetails extends Component {
    static propTypes = {
        disclaimer: PropTypes.oneOfType(
            [
                PropTypes.object,
                PropTypes.array,
                PropTypes.string,
                PropTypes.boolean,
            ],
        ),
        offerDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    static defaultProps = {
        disclaimer: 'data',
        couponVariant: 'Default',
        offerDetails: [],
    };

    constructor() {
        super();
        this.state = { showDetails: false };
        this.showCouponDetails = this.showCouponDetails.bind(this);
        this.renderOfferDetails = this.renderOfferDetails.bind(this);
    }

    showCouponDetails() {
        this.setState({
            showDetails: !this.state.showDetails,
        });
    }
    /* renderOfferDetails() {
        const couponData = this.props.couponData;
        return couponData.offers.forEach((offerItem, index) => {
            (<div data-automation-id={`at-coupon-count-${index}`} key={index += 1}>
                <h4 data-automation-id={'at-coupon-name'} className={cx('couponCode')}>{offerItem.headLine}</h4>
                <p data-automation-id={'at-coupon-description'} className={cx('couponCodeDetails')}>{offerItem.bodyCopy}</p>
            </div>);
        });
    } */
    renderOfferDetails() {
        const couponInfoHtml = [];
        let key = 0;
        const offers = this.props.offerDetails;
        offers.forEach((offerItem) => {
            const { bodyCopy, headLine } = offerItem;

            /** {Pushing Coupon Info HTml in Here} */
            couponInfoHtml.push(
                <div data-automation-id={`at-coupon-count-${key}`} key={key += 1}>
                    <h4 data-automation-id={'at-coupon-name'} className={cx('couponCode')}>{`*${headLine}`}</h4>
                    <p data-automation-id={'at-coupon-description'} className={cx('couponCodeDetails')}>{bodyCopy}</p>
                </div>,
            );
        });
        return couponInfoHtml;
    }
    render() {
        return (
            <div className={cx('detailsContainer')} >
                {
                  this.props.disclaimer ? // Show Details Button will appear only when disclaimer is configured
                      <Button
                          automationId="at-show-hide-details"
                          buttonType="Text"
                          className={cx('showHideDtlBtn')}
                          size="Md"
                          onClick={this.showCouponDetails}>{Constants.couponToggleDetails.IRIS_COUPON_DETAILS}
                      </Button> : null
                }
                <ModalBox
                    showModal={this.state.showDetails}
                    onClose={this.showCouponDetails}
                    defaultHeader
                    modalOverlayTheme={cx('modalOverlayTheme')}
                    automationId="at-cpn-serial-modal"
                    modalContentTheme={cx('ModalContentTheme')}
                >{this.renderOfferDetails()}
                    { /* eslint-disable react/no-danger */}
                    <div dangerouslySetInnerHTML={{ __html: this.props.disclaimer }}/></ModalBox>
            </div>
        );
    }
}
export default CouponDetails;
