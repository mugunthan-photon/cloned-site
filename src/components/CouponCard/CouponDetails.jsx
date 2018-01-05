import React, { Component, PropTypes } from 'react';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
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
    };

    static defaultProps = {
        disclaimer: 'data',
        couponVariant: 'Default',
    };

    constructor() {
        super();
        this.state = { showDetails: false };
        this.showCouponDetails = this.showCouponDetails.bind(this);
    }

    showCouponDetails() {
        this.setState({
            showDetails: !this.state.showDetails,
        });
    }
    /* Icons will be rendered here */
    renderIcon() {
        return this.state.showDetails ? (
            <Icon
                iconType="svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                name="icon-triangle-up"/>
      ) : (
          <Icon
              iconType="svg"
              automationId="show-details-icon"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              name="triangle-down"
              pathClassName={styles.arrowIcon}
              className="btnIcon"/>
          );
    }

    render() {
        return (
            <div className={styles.detailsContainer}>
                {
                  this.props.disclaimer ? // Show Details Button will appear only when disclaimer is configured
                      <Button
                          automationId="at-show-hide-details"
                          buttonType="Text"
                          className={styles.showHideDtlBtn}
                          size="Md"
                          onClick={this.showCouponDetails}>
                          {this.state.showDetails ?
                              Constants.couponToggleDetails.COUPONS_HIDE_DETAILS
                              : Constants.couponToggleDetails.COUPONS_SHOW_DETAILS }
                          {
                            this.renderIcon()
                          }
                      </Button> : null
                }
                <div className={styles.detailsWrapper}>
                    <div
                        data-automation-id="at-coupon-details-disclaimer-test"
                        className={cx('detailsData', this.state.showDetails ? 'active' : undefined)}>
                        {this.props.disclaimer}</div>
                </div>
            </div>
        );
    }
}
export default CouponDetails;
