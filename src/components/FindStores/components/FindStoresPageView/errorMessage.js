import { findStores } from '../../../../common/Constants';

export default{
    noStores: {
        type: 'error',
        level: 'section',
        hasClose: false,
        title: findStores.noStorePageTitle,
        content: findStores.noStorePageContent,
    },
    invalidInput: {
        type: 'error',
        level: 'section',
        hasClose: false,
        title: findStores.noStorePageTitle,
        content: findStores.invalidInputContent,
    },
    initialInfo: {
        content: findStores.defaultTitle,
        level: 'section',
        type: 'information',
        hasClose: false,
    },
};
