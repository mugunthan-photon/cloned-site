/* istanbul ignore next */
// const dpUserCookieState = parseInt(Cookies.load('DP_USER_STATE'), 10); // TODOPR: This must be common function in site component in R4
/* istanbul ignore next */
// const isUserLoggedIn = dpUserCookieState && dpUserCookieState === 1;
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
    HelpSection: [
        {
            id: 'give_call',
            key: 1,
            type: 'svg',
            text: 'Give us a call ',
            textStrong: '1-800-322-1189',
            linkPath: '',
            name: 'phone',
        },
        {
            id: 'chat_us',
            key: 4,
            type: 'svg',
            text: 'Need help? ',
            textStrong: 'Customer Service',
            linkPath: '/jsp/customerservice/customerService.jsp?pageId=pg100053',
            name: 'customer-service',
        },
        {
            id: 'ask_us',
            key: 3,
            type: 'svg',
            text: 'Ask us on Twitter ',
            textStrong: '@askJCP',
            linkPath: 'https://twitter.com/askjcp',
            name: 'icon-twitter',
            newTab: '_blank',
        },
    ],
    TermsLegal: [
        {
            key: 1,
            text: 'Legal',
            linkPath: '/jsp/customerservice/serviceContent.jsp?pageId=pg4004600015',
        },
        {
            key: 2,
            text: 'Recalls',
            linkPath: '/jsp/customerservice/serviceContent.jsp?pageId=pg40064800008',
        },
        {
            key: 3,
            text: 'AdChoices',
            imageName: 'AdChoicesImage',
            linkPath: 'http://optout.aboutads.info/#!/',
        },
    ],
    Privacy: [
        {
            key: 5,
            text: 'Privacy Policy',
            linkPath: '/jsp/customerservice/serviceContent.jsp?pageId=pg4003700012&isFooter=true&title=privacy%20policy',
        },
        {
            key: 6,
            text: 'CA Privacy Rts',
            linkPath: '/jsp/customerservice/serviceContent.jsp?pageId=pg4003700013',
        },
        {
            key: 7,
            text: 'CA Supply Chain Act',
            linkPath: '/jsp/customerservice/serviceContent.jsp?pageId=pg40055300008',
        },
    ],
    JCPenneyCredits: [
        {
            key: 1,
            text: 'Pay Bill',
            linkPath: 'https://www.jcpcreditcard.com/consumergen2/login.do?subActionId=1000&clientId=jcpenney&accountType=generic',
        },
        {
            key: 2,
            text: 'Check Balance',
            linkPath: 'https://www.jcpcreditcard.com/consumergen2/login.do?subActionId=1000&clientId=jcpenney&accountType=generic',
        },
        {
            key: 3,
            text: 'Apply Now',
            linkPath: 'https://apply.syf.com/JCPCON?&cHash=1342177401&subActionId=1000&langId=en&sitecode=JCPANFTR17&cmpid=JCPANFTR17', // MNPDPYODA-2802
        },
    ],
    FooterLinks: [
        {
            key: 1,
            text: 'JCPenney Rewards',
            data: [
                {
                    key: 1,
                    text: 'Enroll in Rewards',
                    linkPath: '/rewards',
                    linkPathMobile: '/rewards',
                },
                {
                    key: 2,
                    text: 'Sign In to Rewards',
                    linkPath: '/rewards',
                    linkPathMobile: '/rewards',
                },
                {
                    key: 3,
                    text: 'JCPenney Credit Card',
                    linkPath: '/jsp/customerservice/plccBenefits.jsp',
                    linkPathMobile: 'http://jcp.mycreditcard.mobi/',
                },
            ],
        },
        {
            key: 2,
            text: 'Customer Service',
            data: [
                {
                    key: 1,
                    text: 'Returns',
                    linkPath: '/jsp/customerservice/serviceContent.jsp?pageId=pg100026',
                    linkPathMobile: '/customerService/articles?pageId=returns',
                },
                {
                    key: 2,
                    text: 'Shipping Information',
                    linkPath: '/jsp/customerservice/serviceContent.jsp?pageId=pg4005500014',
                    linkPathMobile: '/customerService/articles?pageId=shipping-info',
                },
                {
                    key: 3,
                    text: 'Rebates',
                    linkPath: '/dotcom/jsp/customerservice/serviceContent.jsp?pageId=pg40036500008&lang=en&stop_mobi=yes',
                    linkPathMobile: '/dotcom/jsp/customerservice/serviceContent.jsp?pageId=pg40036500008&lang=en&stop_mobi=yes',
                },
                {
                    key: 4,
                    text: 'Same Day Pickup',
                    linkPath: '/jsp/browse/marketing/promotion.jsp?pageId=pg40055900009&pageId=pg40058400020',
                    linkPathMobile: '/customerService/articles?pageId=pickup-in-store',
                },
                {
                    key: 5,
                    text: 'My JCP.com Account',
                    linkPath: '/account',
                    linkPathMobile: '/account',
                },
                {
                    key: 6,
                    text: 'Track My Order',
                    linkPath: '/trackorder',
                    linkPathMobile: '/trackorder',
                },
                {
                    key: 7,
                    text: 'Servicio Al Cliente ',
                    linkPath: '/jsp/customerservice/customerService.jsp?pageId=pg100087',
                    linkPathMobile: '',
                },
            ],
        },
        {
            key: 3,
            text: 'Store Services',
            data: [
                {
                    key: 1,
                    text: 'JCP Salon',
                    linkPath: '/g/salon/N-1b2lw2f?',
                    linkPathMobile: '/g/salon/N-1b2lw2f?',
                },
                {
                    key: 2,
                    text: 'Sephora',
                    linkPath: '/g/sephora/N-1b1vba2?pageType=X2H2',
                    linkPathMobile: '/g/sephora/N-1b1vba2?pageType=X2H2',
                },
                {
                    key: 3,
                    text: 'JCP Portraits',
                    linkPath: 'http://www.jcpportraits.com/',
                    linkPathMobile: 'http://www.jcpportraits.com/',
                },
                {
                    key: 4,
                    text: 'JCP Optical',
                    linkPath: 'http://www.jcpenneyoptical.com/',
                    linkPathMobile: 'http://www.jcpenneyoptical.com/',
                },
                {
                    key: 5,
                    text: 'Gift Registry',
                    linkPath: '/jsp/giftregistry/templates/landingV2.jsp?containerId=JCP%7Cpg4005400007&eventRootCatId=cat100630110&eventType=W&grView=public',
                    linkPathMobile: '/giftregistry',
                },
                {
                    key: 6,
                    text: 'JCP Custom Window',
                    linkPath: '/jsp/browse/marketing/promotion.jsp?pageId=pg40064400006',
                    linkPathMobile: '/jsp/browse/marketing/promotion.jsp?pageId=pg40064400006',
                },
                {
                    key: 7,
                    text: 'View All Store Services',
                    linkPath: '/jsp/customerservice/storeService.jsp?pageId=pg100071',
                    linkPathMobile: '/jsp/customerservice/storeService.jsp?pageId=pg100071',
                },
            ],
        },

        {
            key: 4,
            text: 'More Ways To Shop',
            data: [
                {
                    key: 1,
                    text: 'See Our ads',
                    linkPath: '/jsp/browse/marketing/promotion.jsp?pageId=pg40030000010',
                    linkPathMobile: 'http://storeads.jcpenney.com/h/m/jcpenney?auto_locate=true&auto_store=true&hide=distribution&locale=en-US&type=1',
                },
                {
                    key: 2,
                    text: 'Coupons',
                    linkPath: '/m/jcpenney-coupons/N-mpi6e5',
                    linkPathMobile: '/m/jcpenney-coupons/N-mpi6e5',
                },
                {
                    key: 3,
                    text: 'Recommendations',
                    linkPath: '/recommendations',
                    linkPathMobile: '/recommendations',
                },
                {
                    key: 4,
                    text: 'JCPenney Rewards ',
                    linkPath: '/rewards',
                    linkPathMobile: '/rewards',
                },
                {
                    key: 5,
                    text: 'JCPenney Credit Card',
                    linkPath: '/jsp/customerservice/plccBenefits.jsp',
                    linkPathMobile: 'http://jcp.mycreditcard.mobi/',
                },
                {
                    key: 6,
                    text: 'Gift Cards',
                    linkPath: '/jsp/browse/marketing/promotion.jsp?pageId=pg40053400007&cm_re=S1-_-M2-_-GIFTCARDS_DESKTOP',
                    linkPathMobile: '/jsp/browse/marketing/promotion.jsp?pageId=pg40053400007&cm_re=PROMO-M2-MW-_-HP-_-mwtsgiftcards',
                },
                {
                    key: 6,
                    text: 'Accessible view',
                    linkPath: 'http://assistive.jcpenney.com/h5/access/index',
                    linkPathMobile: 'http://assistive.jcpenney.com/h5/access/index',
                },
            ],
        },

        {
            key: 5,
            text: 'Corporate Overview',
            data: [
                {
                    key: 1,
                    text: 'Careers',
                    linkPath: 'http://jobs.jcp.com/',
                    linkPathMobile: 'http://jobs.jcp.com/',
                },
                {
                    key: 2,
                    text: 'Company Info',
                    linkPath: '/jsp/browse/marketing/promotion.jsp?&pageId=pg40036000011',
                    linkPathMobile: '/jsp/browse/marketing/promotion.jsp?&pageId=pg40036000011',
                },
                {
                    key: 3,
                    text: 'Community',
                    linkPath: '/jsp/browse/marketing/promotion.jsp?pageId=pg40013300014',
                    linkPathMobile: '/jsp/browse/marketing/promotion.jsp?pageId=pg40013300014',
                },
                {
                    key: 4,
                    text: 'Media',
                    linkPath: 'http://www.jcpnewsroom.com/',
                    linkPathMobile: 'http://www.jcpnewsroom.com/',
                },
                {
                    key: 5,
                    text: 'Investors',
                    linkPath: 'http://ir.jcpenney.com/phoenix.zhtml?c=70528&p=irol-irHome',
                    linkPathMobile: 'http://ir.jcpenney.com/phoenix.zhtml?c=70528&p=irol-irHome',
                },
            ],
        },
        {
            key: 6,
            text: 'Connect With Us',
            data: [
                {
                    key: 1,
                    text: 'Facebook',
                    iconName: 'socialmedia-facebook',
                    linkPath: 'https://www.facebook.com/jcp',
                    linkPathMobile: 'https://www.facebook.com/jcp',
                },
                {
                    key: 2,
                    text: 'Twitter',
                    iconName: 'socialmedia-twitter',
                    linkPath: 'https://twitter.com/jcpenney',
                    linkPathMobile: 'https://twitter.com/jcpenney',
                },
                {
                    key: 3,
                    text: 'Pinterest',
                    iconName: 'socialmedia-pinterest',
                    linkPath: 'https://www.pinterest.com/jcpenney/',
                    linkPathMobile: 'https://www.pinterest.com/jcpenney/',
                },
                {
                    key: 4,
                    text: 'Google Plus',
                    iconName: 'socialmedia-googleplus',
                    linkPath: 'https://plus.google.com/+jcpenney',
                    linkPathMobile: 'https://plus.google.com/+jcpenney',
                },
                {
                    key: 5,
                    text: 'Youtube',
                    iconName: 'socialmedia-youtube',
                    linkPath: 'https://www.youtube.com/jcpenney',
                    linkPathMobile: 'https://www.youtube.com/jcpenney',
                },
                {
                    key: 6,
                    text: 'JCPenney Blog',
                    iconName: 'socialmedia-blog',
                    linkPath: '/penneypointers',
                    linkPathMobile: '/penneypointers',
                },
            ],
        },
    ],

};

export default config;
