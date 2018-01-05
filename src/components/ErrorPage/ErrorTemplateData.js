const data = {
    404: {
        errorInformation: 'Oops, something went wrong...',
        linkstitle: 'Helpful Links',
        assistancetitle: 'Need Assistance?',
        detailsData: 'We couldnt find the page you were looking for; it may have been changed or removed.',
        informationData: 'Continue browsing our site or choose an option below:',
        leftData: [
            {
                name: 'Back to Home',
                icon: 'home',
                link: 'http://www.jcpenney.com/ ',
            },
            {
                name: 'Find A Store',
                icon: 'icon-location-pin',
                link: 'http://stores.jcpenney.com/ ',
            },
            {
                name: 'Coupons',
                icon: 'coupon',
                link: 'http://www.jcpenney.com/m/jcpenney-coupons/N-mpi6e5 ',
            },
            {
                name: 'Store Ads',
                icon: 'storeadds',
                link: 'http://www.jcpenney.com/jsp/browse/marketing/promotion.jsp?pageId=pg40030000010 ',
            },
        ],
        rightData: [
            {
                name: 'Give us a call',
                icon: 'icon-phone',
                details: '1-800-322-1189',
            },
            {
                name: 'Ask us on Twitter',
                icon: 'icon-twitter',
                details: '@askJCP',
            },
            {
                name: 'Chat with Us',
                icon: 'icon-chat',
                details: 'IM Message',
            },
        ],
    },
    500: {
        errorInformation: 'Oops, something went wrong...',
        linkstitle: 'More Suggestions',
        assistancetitle: 'Need Assistance?',
        detailsData: 'We are unable to connect you to the page requested. Please try your request again.',
        leftData: [
            {
                name: 'Back to Previous Page',
                icon: 'backtopreviouspage',
            },
            {
                name: 'BackToHome',
                icon: 'home',
                link: '/',
            },
        ],
        rightData: [
            {
                name: 'Give us a call',
                icon: 'icon-phone',
                details: '1-800-322-1189',
                category: 'number',
            },
            {
                name: 'Ask us on Twitter',
                icon: 'icon-twitter',
                details: '@askJCP',
            },
            {
                name: 'Chat with Us',
                icon: 'icon-chat',
                details: 'IM Message',
            },
        ],
    },
};


export default data;
