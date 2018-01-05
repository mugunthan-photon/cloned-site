const GALLERY = 'gallery';
const YODA = 'yoda';
const CARTRIDGE = 'cartridge';
const ONE_RECORD_BANNER = 'oneRecordBanner';
const PRODUCT_SEARCH = 'productSearch';

const config = {
    cardTypes: {
        LIST: 'list',
        GRID: 'grid',
    },
    cardTheme: {
        CARTRIDGE,
        GALLERY,
        YODA,
        ONE_RECORD_BANNER,
        PRODUCT_SEARCH,
    },
    ratingSize: {
        [GALLERY]: 15,
        [YODA]: 15,
        [CARTRIDGE]: 20,
        [ONE_RECORD_BANNER]: 15,
        [PRODUCT_SEARCH]: 15,
    },
};

export default config;
