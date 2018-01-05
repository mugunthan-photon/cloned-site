import React from 'react';
import Button from 'yoda-core-components/lib/components/Button/Button';
import * as styles from './FindaStore.css';

const FindaStoreSelector = (userProfileInfo = {
    firstName: null,
    accountId: null,
    rewardsStatus: null,
    userState: null,
    totalCerts: null,
}, selectedStore = {
    isGeoStore: false,
    storeDetails: {
        name: '',
    },
}, catSelectedPushToNid, analyticsForDefault) => {
    let title = '';
    const analyticsForDefaultLocal = analyticsForDefault;
    if (selectedStore.isGeoStore && selectedStore.storeDetails && selectedStore.storeDetails.name) {
        title = 'Select My Store';
    } else if (selectedStore.storeDetails && selectedStore.storeDetails.name) {
        title = 'Change My Store';
    }

    /* istanbul ignore next */
    const goFindaStore = () => {
        analyticsForDefaultLocal('top:Select Store:findastore');
        location.href = '/findastore';
    };

    return (
        <div className={styles.findSelect}>
            <button data-itemid="root" onClick={catSelectedPushToNid} data-title="MENU" data-name={title} data-pagetype="selectstore" data-nid="selectstore" className={styles.select} >
                {title}
            </button>

            <Button data-itemid="root" onClick={goFindaStore} data-title="MENU" data-name="Find a Store" data-pagetype="base" data-nid="root" buttonType="Primary" size="Lg" className={styles.primary} >
                Find a Store
    </Button>
        </div>
    );
};

export default FindaStoreSelector;
