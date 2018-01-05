import React from 'react';
import CouponAppliedModal from '../CouponAppliedModal';
import { termsText } from '../../../../test/mockData/CouponsData';

const stories = [{
    name: 'CouponAppliedModal',
    story: () => (
        <div>
            <CouponAppliedModal
                savings="10"
                currency="USD"
                message={termsText}
                onClose={() => false}
            />
        </div>
    ),
}];

export default stories;
