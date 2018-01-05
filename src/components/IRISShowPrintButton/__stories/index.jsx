import React from 'react';
import ShowBarCode from '../ShowBarCode';
import { offerData, termsText } from '../../../../test/mockData/CouponsData';

const stories = [{
    name: 'IRISShowPrintButton',
    story: () => (
        <div>
            <ShowBarCode
                offerDetails={offerData.offerItems}
                termsText={termsText}
                modalAutoId="barCodeModal"
                channelName={offerData.channel.name}
            />
        </div>
    ),
}];

export default stories;
