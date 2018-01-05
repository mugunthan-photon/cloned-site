const config = {
    leftMenuData: {
        menuList: [
            {
                name: 'For The Home',
                url: 'home',
            },
            {
                name: 'Bed & Bath',
                url: 'bed',
            },
            {
                name: 'Window',
                url: 'window',
            },
            {
                name: 'Men',
                url: 'Men',
            },
        ],
    },
    hamburger: {
        guest: [
            {
                name: 'My Account',
                link: '/signin',
                styleClass: '',
                seperator: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'JCPenney Rewards',
                styleClass: '',
                link: '/rewards',
                seperator: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'List',
                styleClass: '',
                link: '/mylist',
                seperator: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'My Jcpenney.com',
                styleClass: '',
                link: '/recommendation',
                seperator: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'Track Order',
                styleClass: '',
                link: '/trackorder',
                seperator: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'Gift Registry',
                styleClass: '',
                link: '/giftregistry',
                seperator: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'JCPenney Credit Card',
                styleClass: '',
                link: 'http://jcp.mycreditcard.mobi/',
                seperator: true,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'Clearance',
                styleClass: '',
                link: '/g/clearance/N-1aznsmx?pageType=X2H2',
                seperator: false,
                isDisplayRequiredInAccountMenu: false,
            },
            {
                name: 'Coupons',
                styleClass: 'coupons',
                link: '/m/jcpenney-coupons/N-mpi6e5',
                seperator: false,
                isDisplayRequiredInAccountMenu: false,
            },
        ],
        signedin: [
            {
                name: 'My Account',
                link: '/account',
                styleClass: '',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'Find a store',
                styleClass: '',
                link: '/findastore',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: false,
            },
            {
                name: 'My Orders',
                styleClass: '',
                link: '/trackorder',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'My Rewards',
                styleClass: '',
                link: '/rewards',
                seperator: false,
                displayCount: 'rewards',
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'My lists',
                styleClass: '',
                link: '/mylist',
                seperator: false,
                displayCount: 'savedItems',
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'Profile Settings',
                styleClass: '',
                link: '/account/dashboard',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'Notifications',
                styleClass: '',
                link: '/account/dashboard/preferences',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'My Jcpenney.com',
                styleClass: '',
                link: '/recommendation',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'Gift Registry',
                styleClass: '',
                link: '/giftregistry',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'JCPenney Credit Card',
                styleClass: '',
                link: 'http://jcp.mycreditcard.mobi/',
                seperator: true,
                displayCount: false,
                isDisplayRequiredInAccountMenu: true,
            },
            {
                name: 'Clearance',
                styleClass: '',
                link: '/g/clearance/N-1aznsmx?pageType=X2H2',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: false,
            },
            {
                name: 'Coupons',
                styleClass: 'coupons',
                link: '/m/jcpenney-coupons/N-mpi6e5',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: false,
            },
            {
                name: 'Sign Out',
                styleClass: 'signout',
                link: '/sessiontimeout',
                seperator: false,
                displayCount: false,
                isDisplayRequiredInAccountMenu: true,
            },
        ],
    },
    headerTypes: {
        MINIMAL_HEADER: 'minimal-header',
        FULL_HEADER: 'full-header',
        SLIM_HEADER: 'slim-header',
    },
    accountInfo: {
        myAccountLabel: 'My Account',
        signInLabel: 'Sign In',
    },
    secondaryNavigationMenu: {
        menuList: [
            {
                name: 'JCPenney Rewards',
                link: '/jsp/rewards/rewardsHome.jsp',
            },
            {
                name: 'Saved Items',
                link: '/cam/jsp/profile/secure/savedItems.jsp',
            },
            {
                name: 'Coupons',
                link: '/m/jcpenney-coupons/N-mpi6e5',
            },
        ],
    },
    desktop: {
        mouseOverDelay: 500,
        hamburger: {
            guest: [
                {
                    name: 'Track Order',
                    link: '/dotcom/jsp/profile/secure/external/orderTrack.jsp',
                },
                {
                    name: 'Gift Registry',
                    link: '/jsp/giftregistry/templates/landingV2.jsp?containerId=JCP|pg4005400007&eventRootCatId=cat100630110&eventType=W&grView=public',
                },
            ],
            signedin: [
                {
                    name: 'My Orders',
                    link: '/dotcom/jsp/profile/secure/orderHistory.jsp?startIndex=1&pageNo=1',
                },
                {
                    name: 'Gift Registry',
                    link: '/jsp/giftregistry/templates/landingV2.jsp?containerId=JCP|pg4005400007&eventRootCatId=cat100630110&eventType=W&grView=public',
                },
            ],
        },
    },
};

export default config;
