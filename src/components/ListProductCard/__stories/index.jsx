import React from 'react';
import ProductCard from '../ProductCard';
import config from '../ProductCard.config';
import { datasource, priceDetails } from './mock';

const vertCard = {
    width: '300px',
};

const ListVertCard = {
    width: '1000px',
};

const deviceType = {
    isDesktop: true,
};

const showSaveForlater = true;

const stories = [
    {
        name: 'List Product Card',
        story: () => (
            <div>
                <div style={vertCard}>
                    <ProductCard
                        cardType={config.cardTypes.GRID}
                        imageUrl={datasource.image}
                        title={datasource.title}
                        key={datasource.id}
                        rating={datasource.rating}
                        reviewCount={datasource.reviewCount}
                        badge={datasource.badge}
                        bottomBadge={datasource.bottomBadge}
                        skuSwatch={datasource.skuSwatch}
                        price={priceDetails}
                        ecoRebate={datasource.ecoRebate}
                        ppId={datasource.id}
                        showSaveForlater={showSaveForlater}
                        altImageUrl={datasource.altImageUrl}
                        videoId={datasource.videoId}
                        availabilityStatus={datasource.availabilityStatus}
                        deviceType={deviceType}
                        productUrl={datasource.pdpUrl}
                        bulletedCopyAttrs={datasource.bulletedCopyAttrs}
                        compareIn
                    />
                </div>
                <br/>
                <div style={ListVertCard}>
                    <ProductCard
                        cardType={config.cardTypes.LIST}
                        imageUrl={datasource.image}
                        title={datasource.title}
                        key={datasource.id}
                        rating={datasource.rating}
                        reviewCount={datasource.reviewCount}
                        badge={datasource.badge}
                        bottomBadge={datasource.bottomBadge}
                        skuSwatch={datasource.skuSwatch}
                        price={priceDetails}
                        ecoRebate={datasource.ecoRebate}
                        ppId={datasource.id}
                        showSaveForlater={showSaveForlater}
                        altImageUrl={datasource.altImageUrl}
                        videoId={datasource.videoId}
                        availabilityStatus={datasource.availabilityStatus}
                        deviceType={deviceType}
                        productUrl={datasource.pdpUrl}
                        bulletedCopyAttrs={datasource.bulletedCopyAttrs}
                    />
                </div>
            </div>
        ),
    },
];

export default stories;
