import React from 'react';
import CouponCard from '../CouponCard';

import mockData from './Mock1.json';


const stories = [
    {
        name: 'IRIS Coupon Card',
        story: () => (
            <div>

                <h4><u>Single Tier</u></h4>
                <CouponCard
                    couponData={mockData[5]}
                    />

                <br />
                <h4><u>Multiple Coupons</u></h4>
                <CouponCard
                    couponData={mockData[2]}
                    multiTier
                    />

                <br />
                <h4><u>Multiple Tier - Print Buttton Check</u></h4>
                <CouponCard
                    couponData={mockData[15]}
                    multiTier
                    />

                <br />
                <h4><u>Multitier - Common Print Buttton Check</u></h4>
                <CouponCard
                    couponData={mockData[16]}
                    />

                <br />

                <h4><u>Multitier - No Print Buttton Check</u></h4>
                <CouponCard
                    couponData={mockData[17]}
                    />

                <br />

                <h4><u>Print Buttton Check</u></h4>
                <CouponCard
                    couponData={mockData[18]}
                    />

                <br />

                <h4><u>No Print Buttton Check</u></h4>
                <CouponCard
                    couponData={mockData[19]}
                    />

                <br />

                <h4><u>Best Coupons</u></h4>
                <CouponCard
                    couponData={mockData[0]}
                    />

                <br />

                <h4><u>Applied Coupon</u></h4>
                <CouponCard
                    couponData={mockData[1]}
                    />

                <h4><u>Single Tier with coupon variant</u></h4>
                <div>
                    <CouponCard
                        couponData={mockData[5]}
                        couponVariant="Small"
                        />
                </div>

                <h4><u>Best Coupons with coupon variant small</u></h4>
                <CouponCard
                    couponData={mockData[0]}
                    couponVariant="Small"
                    />


                <h4><u>Applied Coupon</u></h4>
                <CouponCard
                    couponData={mockData[1]}
                    couponVariant="Small"
                    />

                <br />

                <h4><u>IRIS Applied Coupon</u></h4>
                <CouponCard
                    couponData={mockData[20]}
                    couponVariant="Small"
                    />

                <br />

            </div>
        ),
    },
];

export default stories;

                // <br />
                // <h4> Multi Tier </h4>
                // <CouponCard
                //     couponType="List"
                //     className="multipleCoupons"
                // />

                // <br />
                // <h4> Best Coupon / Greatest Savings </h4>
                // <CouponCard
                //     couponType="List"
                //     className="greatSavingsCoupon"
                // />

                // <br />
                // <h4> Applied List </h4>
                // <CouponCard
                //     couponType="List"
                //     className="couponApplied"
                // />
