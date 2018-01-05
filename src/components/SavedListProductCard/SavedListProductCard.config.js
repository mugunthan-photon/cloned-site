const YODA = 'yoda';
const CARTRIDGE = 'cartridge';
const ONE_RECORD_BANNER = 'oneRecordBanner';

const config = {
    cardTypes: {
        LIST: 'list',
        GRID: 'grid',
    },
    cardTheme: {
        CARTRIDGE,
        YODA,
        ONE_RECORD_BANNER,
    },
    ratingSize: {
        [YODA]: 15,
        [CARTRIDGE]: 20,
        [ONE_RECORD_BANNER]: 15,
    },
};

export default config;
