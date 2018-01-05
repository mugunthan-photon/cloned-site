import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import filter from 'lodash/filter';
import union from 'lodash/union';
import find from 'lodash/find';
import classNames from 'classnames/bind';
import List from 'yoda-core-components/lib/components/List/List';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import Title from 'yoda-core-components/lib/components/Tabs/Title';
import Content from 'yoda-core-components/lib/components/Tabs/Content';
import * as couponAction from '../../actions/CouponAction';
import * as adjustmentAction from '../../actions/AdjustmentAction';
import SiteComponent from '../SiteComponent/SiteComponent';
import CouponCard from '../IRISCouponCard/CouponCard';
import * as styles from './CouponListTheme.css';
import Loading from '../Loading/Loading';

const cx = classNames.bind(styles);

const CouponListTypes = ['Online & In Store', 'In Store Only', 'Online Only'];

/* istanbul ignore next */
export const StoreOnlyType = coupon => coupon.redeemingChannel === 'all' || coupon.redeemingChannel === 'instore';
/* istanbul ignore next */
export const OnlineOnlyType = coupon => coupon.redeemingChannel === 'all' || coupon.redeemingChannel === 'online';

export const produceCouponList = (type, coupons, appliedAdjustments) => {
    /* istanbul ignore next */
    coupons = coupons.map((coupon) => {
        if (coupon.promoCode && coupon.promoCode.length > 0) {
            const appliedAdjustment = find(appliedAdjustments, adjustment =>
                adjustment.value.toUpperCase() === coupon.promoCode.toUpperCase());
            /* istanbul ignore next */
            coupon.id = appliedAdjustment ? parseInt(appliedAdjustment.id, 10) : null;
            /* istanbul ignore next */
            coupon.savings = appliedAdjustment ? parseFloat(appliedAdjustment.amount) : null;
            coupon.couponApplied = (coupon.id !== null);
        } // do it if the code is valid
        return coupon;
    });
    switch (type) {
        case CouponListTypes[0]:
        default:
            return coupons;
        case CouponListTypes[1]:
            return coupons.filter(StoreOnlyType);
        case CouponListTypes[2]:
            return coupons.filter(OnlineOnlyType);
    }
};

export class CouponList extends SiteComponent {
    static defaultProps = {
        coupons: [],
        actions: {},
        automationId: '',
        deviceType: {},
        listType: '',
        status: 0,
        numCoupons: 0,
        skipOfferMerge: false,
        printConfig: false,
        couponType: 'Online & In Store', // prop values should be either of these 'Online & In Store', 'In Store Only', 'Online Only'
    };

    static propTypes = {
        coupons: PropTypes.arrayOf(PropTypes.object).isRequired,
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        automationId: PropTypes.string,
        deviceType: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        listType: PropTypes.string, // NOTE : used by BOF to a) get online Price matched coupons  b) not render header tab
        status: PropTypes.number,
        numCoupons: PropTypes.number,
        skipOfferMerge: PropTypes.bool, // TOF funnel would not merge the offers and hence would look up EXPComAPI if set to true
        printConfig: PropTypes.printConfig, // Print CTA configured showed inside barcode if set to true
        couponType: PropTypes.string,
    };

    constructor() {
        super();
        this.state = {
            activeTabPanelIndex: 0,
            couponApplied: false,
        };
    }

    hydrate() {
        const { skipOfferMerge } = this.props;
        /* istanbul ignore if  */
        if (__SERVER__ && this.props.coupons.length === 0) {
            this.props.actions.getCouponsAction(false, null, skipOfferMerge);
        } else {
            /** IF API Fails try to recover once in the client side */
            /* istanbul ignore else  */
            if (!__SERVER__ && this.props.coupons.length === 0) {
                const marketingCookie = Cookies.load('marketing') || null;
                this.props.actions.getCouponsAction(false, marketingCookie, skipOfferMerge);
            }

            /** IF MARKEING COOKIE is there then make API CAll with marketing Cookie */
            // (Cookies.load('marketing')
            // if (!__SERVER__ && (Cookies.load('marketing'))) {
            //     this.props.actions.getCouponsAction(false, Cookies.load('marketing'), skipOfferMerge);
            // }

            // call the Adjustments only if the Items are there in cart
            /* istanbul ignore else  */
            if (!__SERVER__) {
                if (Cookies.load('DPOrder') || Cookies.load('OrderId')) {
                    this.props.actions.getAdjustments();
                } else {
                    this.props.actions.getCouponsLoaded();
                }
            }
        }
    }

    couponCardRenderer(variant = 'Default') {
        /* istanbul ignore next */
        return dataItem => (
            <div className={cx('couponListContentBlock')}>
                <CouponCard
                    couponData={dataItem}
                    deviceType={this.props.deviceType}
                    couponVariant={variant}
                    printConfig={this.props.printConfig}
                    {...this.props} />
            </div>
        );
    }

    renderTabPanel(couponData) {
        // return CouponListTypes.map((type) => {
        const couponList = produceCouponList(this.props.couponType, couponData, this.props.appliedAdjustments);
            /*  we remove apple/remoe status for EXPComAPI, so we don't need sort. Keep here if we need this future in the future
            // sort the couponlist by applied coupon ,best coupon and un applied coupons
            let sortedCouponList = couponList;
            if (!this.state.couponApplied) {
                 // sort the couponlist by applied coupon ,best coupon and un applied coupons
                const appliedCouponList = filter(couponList, { couponApplied: true });
                const nonAppliedList = filter(couponList, { couponApplied: false });
                sortedCouponList = union({}, appliedCouponList, nonAppliedList);
            }
            */
        return (
            <div>
                <div className={cx('title')}><Title>{`${this.props.couponType}`}</Title></div>
                <Content>
                    <List
                        datasource={couponList}
                        spacing="None"
                        direction="Vertical"
                        itemSpacing="None"
                        childRenderer={this.couponCardRenderer()}
                        automationId="at-coupon-card-renderer"
                        listBodyClass={cx('couponListBody')}
                        listStyleClass={cx('couponListBlock')}
                        itemStyleClass={cx('listAnimation', 'couponListItem', 'xl3', 'lg4', 'md6', 'sm12')} />
                </Content>
            </div>
        );
        // });
    }

    renderListOnly(couponData) {
        const couponList = produceCouponList(this.props.listType, couponData, this.props.appliedAdjustments);
        // sort the couponlist by applied coupon ,best coupon and un applied coupons
        const appliedCouponList = filter(couponList, { couponApplied: true });
        const bestCouponList = filter(couponList, { bestCoupon: true });
        const nonBestCouponNonAppliedList = filter(couponList, { bestCoupon: false, couponApplied: false });
        const sortedCouponList = union({}, appliedCouponList, bestCouponList, nonBestCouponNonAppliedList);

        return (
            <Content>
                <List
                    datasource={sortedCouponList}
                    direction="Vertical"
                    childRenderer={this.couponCardRenderer('Small')}
                    automationId="at-coupon-list"
                    />
            </Content>
        );
    }

    renderCouponList(couponData) {
        let componentToRender;
        switch (this.props.status) {
            case 200:
                componentToRender = (
                    <div>
                        {
                            this.props.numCoupons > 0
                                ? this.renderTabPanel(couponData)
                                : (<h3>No Coupons to view at this time</h3>) // TODO :: To Log error no data with API Success Scenario
                        }
                        <Loading />
                    </div>
                );
                break;

            case 500:
                /** TODO:: Logging Api Failures and any additional hooks , like retrying or
                         * redirecting to OOPS Page will be added in here
                         * returning null for now
                         * */
                componentToRender = null;
                break;
            case 0:
            default:
                /** You will never see loader because of server side rendering,
                 * if client call happens then loader will be shown
                 * */
                componentToRender = <Loading />;
                break;
        } // end of switch

        return componentToRender;
    }

    render() {
        const couponData = this.props.coupons;

        if (this.props.listType !== '') {
            return (
                <div>
                    {this.renderListOnly(couponData)}
                </div>
            );
        }

        return this.renderCouponList(couponData);
    }
}

const mapStateToProps = ({ coupons, appliedAdjustments, context }) => ({
    coupons: coupons.data,
    deviceType: context ? context.deviceType : {},
    status: coupons.status,
    numCoupons: coupons.numCoupons,
    appliedAdjustments,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...adjustmentAction, ...couponAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponList);
