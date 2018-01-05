import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import navMockdata from './__stories/mock';
import NavigationMenuConnected, { NavigationMenu, getCategoryUrl, prepareNavigationMenuList } from './NavigationMenu';

describe('<NavigationMenu />', () => {
    const mockStore = configureStore([]);
    let store = {};
    let wrapper;
    const showNavTitle = false;

    beforeEach(() => {
        store = mockStore({
            navigationMenuList: navMockdata,
            deviceType: {},
        });

        wrapper = mount(<Provider store={store}>
            <NavigationMenuConnected showTitle={showNavTitle}/>
        </Provider>);
    });

    it('statefull data', () => {
        expect(wrapper).to.exist;
    });

    it('should display as per store data , Making Sure the Actual Data is rendered', () => {
        expect(store.getState().navigationMenuList).to.equal(navMockdata);
    });
});

describe(' NavigationMenu component testing ', () => {
    let navComponent;
    const spyGetNav = sinon.spy();
    const spyTriggerClick = sinon.spy();
    const spyGetActiveMenu = sinon.spy();
    const spyOnClickAction = sinon.spy();
    const spyOnPrevAction = sinon.spy();

    beforeEach(() => {
        const defaultProps = {
            actions: { getDepartmentsAction: spyGetNav,
                triggerNavigationClick: spyTriggerClick,
                getActiveMenuAction: spyGetActiveMenu,
                getActiveMenuOnClickAction: spyOnClickAction,
                getPreviousMenuAction: spyOnPrevAction,
            },
            deviceType: {},
            datasource: navMockdata,
            navigationMenuList: navMockdata,
        };
        navComponent = mount(
            <NavigationMenu {...defaultProps}/>,
        );
    });

    it('navigationMenuOnClick', () => {
        const navigationMenuOnClick = sinon.spy(navComponent.instance(), 'navigationMenuOnClick');
        const dropdownComp = navComponent.find('DropdownMenu');
        navComponent.update();
        dropdownComp.find('button').at(2).simulate('click');
        expect(navigationMenuOnClick.called).to.equal(true);
        expect(spyTriggerClick.called).to.equal(true);
        expect(spyOnPrevAction.called).to.equal(false);
    });

    it('navigatebackClicked', () => {
        const instance = navComponent.instance();
        instance.actions = {
            getPreviousMenuAction: sinon.spy(),
        };
        instance.navigatebackClicked();
        expect(instance.actions.getPreviousMenuAction.called).to.equal(true);
    });

    it('navigatebackClicked ****', () => {
        const categories = [{
            name: 'for homre',
            id: 'N-bwo3w',
            href: 'https://m.jcpenney.com/v4/categories/N-bwo3w',
            image: {
                url: 'https://s7d9.scene7.com/is/image/JCPenney//DP0802201617141668M',
            },
            groups: [
                {
                    name: 'SHOP BEDDING',
                    categories: [
                        {
                            id: 'N-bwo3wD1nopfz',
                            name: 'comforters & bedding sets',
                        },
                        {
                            id: 'N-bwo3wD1nqf4p',
                            name: 'quilts & bedspreads',
                        },
                    ],
                },
                {
                    name: 'SHOP BATH',
                    categories: [
                        {
                            id: 'N-bwo3wD1nopgk',
                            name: 'bath towels',
                        },
                        {
                            id: 'N-bwo3wD1nopgp',
                            name: 'bath rugs & bath mats',
                        },
                    ],
                },
            ],
            leaf: false,
        },
        ];
        const instance = navComponent.instance();
        instance.actions = {
            triggerNavigationClick: sinon.spy(),
            getActiveMenuOnClickAction: sinon.spy(),
        };
        instance.navigationMenuOnClick(categories);
        // expect(instance.actions.getPreviousMenuAction.called).to.equal(true);
    });

    it('navigationMenuOnClick no', () => {
        const cat = { id: 'N-bwo3w', name: 'bed & bath', href: 'https://m.jcpenney.com/v4/categories/N-bwo3w', links: null, leaf: false, groups: [{ name: 'SHOP BEDDING', categories: [{ id: 'N-bwo3wD1nopfz', name: 'comforters & bedding sets' }, { id: 'N-bwo3wD1nqf4p', name: 'quilts & bedspreads' }] }, { name: 'SHOP BATH', categories: [{ id: 'N-bwo3wD1nopgk', name: 'bath towels' }, { id: 'N-bwo3wD1nopgp', name: 'bath rugs & bath mats' }] }], categories: null };
        const instance = navComponent.instance();
        instance.actions = {
            triggerNavigationClick: sinon.spy(),
            getActiveMenuAction: sinon.spy(),
        };
        instance.navigationMenuOnClick(cat);
        expect(instance.actions.triggerNavigationClick.called).to.equal(true);
    });

    it('getCategoryUrl', () => {
        const links = [{
            rel: 'external',
            href: 'http://www.google.com',
        },
        {
            rel: 'canonical',
            href: 'http://www.jcpenney.com/g/luggage/N-bwo3vD1nnuj7',
        },
        {
            rel: '',
            href: 'http://www.jcpenney.com/g/luggage/N-bwo3vD1nnuj7',
        },
        ];
        const canonicalUrl = getCategoryUrl({ links });
        expect(canonicalUrl).to.be.a('string');
    });

    it('getCategoryUrl', () => {
        const links = {
            rel: 'external',
            href: 'http://www.google.com',
        };
        const canonicalUrl = getCategoryUrl({ links });
        expect(canonicalUrl).to.equal('');
    });

    it('getCategoryUrl', () => {
        const links = [];
        const canonicalUrl = getCategoryUrl({ links });
        expect(canonicalUrl).to.equal('');
    });

    it('prepareNavigationMenuList', () => {
        const categories = [{
            name: 'for homre',
            id: 'N-bwo3w',
            href: 'https://m.jcpenney.com/v4/categories/N-bwo3w',
            image: {
                url: 'https://s7d9.scene7.com/is/image/JCPenney//DP0802201617141668M',
            },
            groups: [
                {
                    name: 'SHOP BEDDING',
                    categories: [
                        {
                            id: 'N-bwo3wD1nopfz',
                            name: 'comforters & bedding sets',
                        },
                        {
                            id: 'N-bwo3wD1nqf4p',
                            name: 'quilts & bedspreads',
                        },
                    ],
                },
                {
                    name: 'SHOP BATH',
                    categories: [
                        {
                            id: 'N-bwo3wD1nopgk',
                            name: 'bath towels',
                        },
                        {
                            id: 'N-bwo3wD1nopgp',
                            name: 'bath rugs & bath mats',
                        },
                    ],
                },
            ],
            leaf: false,
        },
        ];
        const navigationMenuData = prepareNavigationMenuList(categories);
        expect(navigationMenuData).exists;
    });

    it('prepareNavigationMenuList', () => {
        const categories = [{
            name: null,
            id: null,
            href: null,
            image: null,
            groups: null,
            leaf: false,
        },
        ];
        const navigationMenuData = prepareNavigationMenuList(categories);
        expect(navigationMenuData).exists;
    });
});

describe(' NavigationMenu component testing ', () => {
    let navComponent;
    const spyGetNav = sinon.spy();
    const spyTriggerClick = sinon.spy();
    const spyGetActiveMenu = sinon.spy();
    const spyOnClickAction = sinon.spy();
    const spyOnPrevAction = sinon.spy();

    const category = {
        id: 'N-bwo3w',
        href: 'https://m.jcpenney.com/v4/categories/N-bwo3w',
        name: 'bed & bath',
        image: {
            url: 'https://s7d9.scene7.com/is/image/JCPenney//DP0802201617141668M',
        },
        links: [
            {
                rel: 'external',
                href: 'http://www.jcpenney.com/g/bed-and-bath/N-bwo3w?pageType=X2H2',
            },
        ],
        groups: [
            {
                name: 'SHOP BEDDING',
                categories: [
                    {
                        id: 'N-bwo3wD1nopfz',
                        name: 'comforters & bedding sets',
                        links: [
                            {
                                rel: 'canonical',
                                href: 'http://www.jcpenney.com/g/bed-and-bath/N-bwo3w?pageType=X2H2',
                            },
                        ],
                    },
                ],
                links: [
                    {
                        rel: 'canonical',
                        href: 'http://www.jcpenney.com/g/bed-and-bath/N-bwo3w?pageType=X2H2',
                    },
                ],
            },
        ],
        leaf: true,
    };

    beforeEach(() => {
        const menuData = {
            menuListBefore: [
                {
                    currentCategory: 'SHOP BEDDING',
                    previousGroups: 'bed',
                },
                {
                    currentCategory: 'SHOP HOME',
                    previousGroups: 'home',
                },
            ],
        };
        const defaultProps = {
            actions: { getDepartmentsAction: spyGetNav,
                triggerNavigationClick: spyTriggerClick,
                getActiveMenuAction: spyGetActiveMenu,
                getActiveMenuOnClickAction: spyOnClickAction,
                getPreviousMenuAction: spyOnPrevAction,
            },
            deviceType: { isTablet: true },
            datasource: navMockdata,
            navigationMenuData: menuData,
        };
        navComponent = mount(
            <NavigationMenu {...defaultProps}/>,
        );
    });

    it('navigationMenuOnClick nonleaf', () => {
        const navigationMenuOnClick = sinon.spy(navComponent.instance(), 'navigationMenuOnClick');
        const dropdownComp = navComponent.find('DropdownMenu');
        navComponent.update();
        dropdownComp.props().handleMenuClick(category);
        expect(navigationMenuOnClick.called).to.equal(true);
        expect(spyTriggerClick.called).to.equal(true);
        expect(spyOnPrevAction.called).to.equal(false);
    });
});

describe(' NavigationMenu component testing ', () => {
    let navComponent;
    const spyGetNav = sinon.spy();
    const spyTriggerClick = sinon.spy();
    const spyGetActiveMenu = sinon.spy();
    const spyOnClickAction = sinon.spy();
    const spyOnPrevAction = sinon.spy();
    beforeEach(() => {
        const menuData = {
            menuListBefore: [],
        };
        const defaultProps = {
            actions: { getDepartmentsAction: spyGetNav,
                triggerNavigationClick: spyTriggerClick,
                getActiveMenuAction: spyGetActiveMenu,
                getActiveMenuOnClickAction: spyOnClickAction,
                getPreviousMenuAction: spyOnPrevAction,
            },
            deviceType: { isTablet: true },
            datasource: navMockdata,
            navigationMenuData: menuData,
        };
        navComponent = mount(
            <NavigationMenu {...defaultProps}/>,
        );
        expect(navComponent).to.exist;
    });
});

describe(' NavigationMenu component testing ', () => {
    let navComponent;
    const spyGetNav = sinon.spy();
    const spyTriggerClick = sinon.spy();
    const spyGetActiveMenu = sinon.spy();
    const spyOnClickAction = sinon.spy();
    const spyOnPrevAction = sinon.spy();
    const resetMenuToFalse = sinon.spy();

    beforeEach(() => {
        const defaultProps = {
            actions: { getDepartmentsAction: spyGetNav,
                triggerNavigationClick: spyTriggerClick,
                getActiveMenuAction: spyGetActiveMenu,
                getActiveMenuOnClickAction: spyOnClickAction,
                getPreviousMenuAction: spyOnPrevAction,
            },
            deviceType: { isTablet: true },
            datasource: navMockdata,
            navigationMenuData: navMockdata,
            resetMenuToFalse,
        };
        navComponent = mount(
            <NavigationMenu {...defaultProps}/>,
        );
    });

    it('navigationMenuOnClick nonleaf', () => {
        const category = {
            id: 'N-bwo3w',
            href: 'https://m.jcpenney.com/v4/categories/N-bwo3w',
            name: 'bed & bath',
            image: {
                url: 'https://s7d9.scene7.com/is/image/JCPenney//DP0802201617141668M',
            },
            links: [
                {
                    rel: 'external',
                    href: 'http://www.jcpenney.com/g/bed-and-bath/N-bwo3w?pageType=X2H2',
                },
            ],
            groups: [
                {
                    name: 'SHOP BEDDING',
                    categories: [
                        {
                            id: 'N-bwo3wD1nopfz',
                            name: 'comforters & bedding sets',
                        },
                    ],
                },
            ],
            leaf: true,
        };
        const navigationMenuOnClick = sinon.spy(navComponent.instance(), 'navigationMenuOnClick');
        const dropdownComp = navComponent.find('DropdownMenu');
        navComponent.update();
        dropdownComp.props().handleMenuClick(category);
        expect(navigationMenuOnClick.called).to.equal(true);
        expect(spyTriggerClick.called).to.equal(true);
        expect(spyOnPrevAction.called).to.equal(false);
    });

    it('navigationMenuOnClick nonleaf', () => {
        const category = {
            id: null,
            href: 'https://m.jcpenney.com/v4/categories/N-bwo3w',
            name: 'bed & bath',
            image: {
                url: 'https://s7d9.scene7.com/is/image/JCPenney//DP0802201617141668M',
            },
            links: [
                {
                    rel: 'external',
                    href: 'http://www.jcpenney.com/g/bed-and-bath/N-bwo3w?pageType=X2H2',
                },
            ],
            groups: [
                {
                    name: 'SHOP BEDDING',
                    categories: [
                        {
                            id: 'N-bwo3wD1nopfz',
                            name: 'comforters & bedding sets',
                        },
                    ],
                },
            ],
            leaf: false,
        };
        const navigationMenuOnClick = sinon.spy(navComponent.instance(), 'navigationMenuOnClick');
        const dropdownComp = navComponent.find('DropdownMenu');
        navComponent.setProps({ resetMenu: true });
        navComponent.update();
        dropdownComp.props().handleMenuClick(category);
        expect(navigationMenuOnClick.called).to.equal(true);
        expect(spyTriggerClick.called).to.equal(true);
        expect(spyOnPrevAction.called).to.equal(false);
    });

    it('navigationMenuOnClick nonleaf', () => {
        const category = {
            id: 'N-bwo3w',
            href: 'https://m.jcpenney.com/v4/categories/N-bwo3w',
            name: 'bed & bath',
            image: {
                url: 'https://s7d9.scene7.com/is/image/JCPenney//DP0802201617141668M',
            },
            links: [
                {
                    rel: 'external',
                    href: 'http://www.jcpenney.com/g/bed-and-bath/N-bwo3w?pageType=X2H2',
                },
            ],
            leaf: true,
        };
        const navigationMenuOnClick = sinon.spy(navComponent.instance(), 'navigationMenuOnClick');
        const dropdownComp = navComponent.find('DropdownMenu');
        navComponent.update();
        dropdownComp.props().handleMenuClick(category);
        expect(navigationMenuOnClick.called).to.equal(true);
        expect(spyTriggerClick.called).to.equal(true);
        expect(spyOnPrevAction.called).to.equal(false);
    });
});
