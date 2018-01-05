import React from 'react';
import BarCode from '../Barcode';
import { offerData } from '../../../../test/mockData/CouponsData';

const stories = [{
    name: 'BarCode',
    story: () => (
        <div>
            <BarCode
                barCodeData={offerData.offerItems[0]}
                channelName={offerData.channel.name}
            />
        </div>
    ),
}];

export default stories;
