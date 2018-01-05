import React from 'react';
import SocialShare from '../SocialShare';

const prouctImage = {
    altText: 'Hamper with Bench',
    type: 'PRIMARY',
    url: 'https://s7d9.scene7.com/is/image/JCPenney/DP0105201517005711M',
};
const location = {
    query: {
        urlState: '/g/bathroom-accessories/N-bwo3wDgkxetv',
    },
};
const stories = [
    {
        name: 'Social Share',
        story: () => (
            <SocialShare
                message="The Foundry Big & Tall Supply Co. Long Sleeve Flannel Shirt-Big"
                location={location}
                productImage={prouctImage}
                dataAutomationId="pdp-socialshare" />
        ),
    },
];

export default stories;
