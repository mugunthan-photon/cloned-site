import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
/* istanbul ignore next */
const dpUserCookieState = parseInt(Cookies.load('DP_USER_STATE'), 10); // TODOPR: This must be common function in site component in R4
/* istanbul ignore next */
const isUserLoggedIn = dpUserCookieState && dpUserCookieState === 1;
/* istanbul ignore next */
const config = {
  /**
   * TODO: Will be updated when the actual image provided by design team
   * or would be completely replaced by font-icons
   */
    OfferMessage: {
        title: 'Thank You',
        Description: 'You have successfully signed up for offers. Your first offer will be arriving shortly.',
    },
    MoreWaysToShop: [
        {
            key: 1,
            text: 'Coupons',
            linkPath: '/m/jcpenney-coupons/N-mpi6e5',
        },
        {
            key: 2,
            text: 'Recommendations',
            linkPath: '/recommendation',
        },
        {
            key: 3,
            text: 'Gift Registry',
            linkPath: '/giftregistry',
        },
        {
            key: 4,
            text: 'Gift Cards',
            linkPath: 'jsp/browse/marketing/promotion.jsp?pageId=pg40053400007&cm_re=PROMO-M2-MW-_-HP-_-mwtsgiftcards',
        },
        {
            key: 5,
            text: 'Ads & Catalogs',
            linkPath: 'http://storeads.jcpenney.com/mobile/jcpenney/flyers?hide=distribution&amp;locale=en-US&amp;auto_store=true&amp;auto_locate=true',
        },
    ],
    JCPenneyRewardsAndCredits: [
        {
            key: 1,
            text: 'Enroll in JCPenney Rewards',
            linkPath: !isUserLoggedIn ? '/enrollinfo' : '/rewards/rewards/create',
        },
        {
            key: 2,
            text: 'Sign In JCPenney Rewards',
            linkPath: !isUserLoggedIn ? '/linkinfo' : '/rewards/linkaccount',
        },
        {
            key: 3,
            text: 'JCPenney credit card',
            linkPath: 'https://jcp.mycreditcard.mobi/mservicegen4/login.do?subActionId=1000&clientId=jcpenney&accountType=generic&langId=en',
        },
    ],
    TermsLegal: [
        {
            key: 1,
            text: 'Legal',
            linkPath: '/serviceContent?pageId=pg40027900019',
        },
        {
            key: 2,
            text: 'AdChoices',
            linkPath: 'http://www.aboutads.info/choices/',
        },
        {
            key: 3,
            text: 'Recalls',
            linkPath: 'http://www.jcpenney.net/Customers/Product-Recalls.aspx',
        },
    ],
    Privacy: [
        {
            key: 5,
            text: 'Privacy Policy',
            linkPath: '/serviceContent?pageId=pg40027900018',
        },
        {
            key: 6,
            text: 'CA Privacy Rights',
            linkPath: '/serviceContent?pageId=pg40027900020',
        },
        {
            key: 7,
            text: 'CA Supply Chain Act',
            linkPath: '/serviceContent?pageId=pg40055300008',
        },
    ],

};

export default config;
