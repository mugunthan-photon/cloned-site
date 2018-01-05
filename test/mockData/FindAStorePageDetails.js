const storeInfoMock =
    {
        stores: [
            {
                id: '2982',
                name: 'Village @ Fairview',
                street: '301 Stacy Rd',
                city: 'Fairview',
                zip: '75069',
                phone: '(972) 549-4094',
                distance: 4.1,
                latitude: 33.13107,
                longitude: -96.64784,
                number: '2982',
                country: null,
                state: 'TX',
                timings: [
                    {
                        days: 'Mon-Sat',
                        time: '10:00am-9:00pm',
                    },
                    {
                        days: 'Sun',
                        time: '12:00pm-7:00pm',
                    },
                ],
                timingsOverrideMessage: null,
                services: [
                    'big and tall',
                    'major appliances',
                    'custom decorating',
                    'furniture',
                    'wedding registry',
                    'portrait studio',
                    'salon',
                    'Sephora',
                    'jewelry',
                ],
            },
            {
                id: '2055',
                name: 'Collin Creek Mall',
                street: '821 N Central Expwy',
                city: 'Plano',
                zip: '75075',
                phone: '(972) 578-8666',
                distance: 12.6,
                latitude: 33.01284,
                longitude: -96.71364,
                number: '2055',
                country: null,
                state: 'TX',
                timings: [
                    {
                        days: 'Mon-Sat',
                        time: '10:00am-9:00pm',
                    },
                    {
                        days: 'Sun',
                        time: '11:00am-7:00pm',
                    },
                ],
                timingsOverrideMessage: null,
                services: [
                    'big and tall',
                    'major appliances',
                    'custom decorating',
                    'wedding registry',
                    'optical',
                    'portrait studio',
                    'salon',
                    'Sephora',
                    'jewelry',
                ],
            },
            {
                id: '2795',
                name: 'Stonebriar Mall',
                street: '2607 Preston Rd',
                city: 'Frisco',
                zip: '75034',
                phone: '(972) 712-2707',
                distance: 13.5,
                latitude: 33.09948,
                longitude: -96.80954,
                number: '2795',
                country: null,
                state: 'TX',
                timings: [
                    {
                        days: 'Mon-Sat',
                        time: '10:00am-9:00pm',
                    },
                    {
                        days: 'Sun',
                        time: '11:00am-7:00pm',
                    },
                ],
                timingsOverrideMessage: null,
                services: [
                    'big and tall',
                    'major appliances',
                    'custom decorating',
                    'furniture',
                    'wedding registry',
                    'optical',
                    'portrait studio',
                    'salon',
                    'Sephora',
                    'jewelry',
                ],
            },
            {
                id: '2946',
                name: 'Plaza @ Rockwall',
                street: '1015 E I 30',
                city: 'Rockwall',
                zip: '75087',
                phone: '(972) 961-9239',
                distance: 19.7,
                latitude: 32.90295,
                longitude: -96.450874,
                number: '2946',
                country: null,
                state: 'TX',
                timings: [
                    {
                        days: 'Mon-Sat',
                        time: '10:00am-9:00pm',
                    },
                    {
                        days: 'Sun',
                        time: '12:00pm-7:00pm',
                    },
                ],
                timingsOverrideMessage: null,
                services: [
                    'big and tall',
                    'major appliances',
                    'custom decorating',
                    'wedding registry',
                    'portrait studio',
                    'salon',
                    'Sephora',
                    'jewelry',
                ],
            },
            {
                id: '0179',
                name: 'Timber Creek Crossng',
                street: '6051 Skillman St',
                city: 'Dallas',
                zip: '75231',
                phone: '(972) 892-2050',
                distance: 22.8,
                latitude: 32.86288,
                longitude: -96.75233,
                number: '0179',
                country: null,
                state: 'TX',
                timings: [
                    {
                        days: 'Mon-Sat',
                        time: '10:00am-9:00pm',
                    },
                    {
                        days: 'Sun',
                        time: '12:00pm-7:00pm',
                    },
                ],
                timingsOverrideMessage: null,
                services: [
                    'big and tall',
                    'major appliances',
                    'custom decorating',
                    'wedding registry',
                    'portrait studio',
                    'salon',
                    'Sephora',
                    'jewelry',
                ],
            },
        ],
        page: [
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=1&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 1,
                selected: true,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=2&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 2,
                selected: false,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=3&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 3,
                selected: false,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=4&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 4,
                selected: false,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=5&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 5,
                selected: false,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=6&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 6,
                selected: false,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=7&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 7,
                selected: false,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=8&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 8,
                selected: false,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=9&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 9,
                selected: false,
            },
            {
                url: 'https://m.jcpenney.com:443/v2.1/stores/?page=10&pageSize=5&limit=50&latitude=33.1632842&longitude=-96.5890166',
                number: 10,
                selected: false,
            },
        ],
    };


export default {
    storeInfoMock,
};