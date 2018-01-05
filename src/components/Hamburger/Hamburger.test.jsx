import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import HamburgerConnected, { Hamburger } from './Hamburger';
import RootCategoryTemplate from './RootCategoryTemplate';
import AccordianTemplate from './AccordianLayout';
import FindaStoreSelector from './FindaStoreSelector';
import SelectaStore from './SelectaStore';
import DropdownDefault from './DropdownDefault';
import DefaultTemplate from './config/MenuLevelZero';
import { HambSecondLevel, HambThirdLevel, HambFourthLevel, GeoTrueNoSIgn } from './config/mock';

const { describe, it } = global;

describe(' Connected <Hamburger/> ', () => {
    let wrapper;
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            context: {
                deviceType: {
                    isTablet: false,
                    isMobile: true,
                    isDesktop: false,
                    isBot: false,
                },
                preferences: {
                    hamburger: DefaultTemplate,
                },
            },
            hamburgerZeroLevel: DefaultTemplate,
            hambergurMenu: HambSecondLevel,
        });
        wrapper = mount(<Provider store={store}>
            <HamburgerConnected />
        </Provider>,
        );
    });
    it('Hamburger component should exist ', () => {
        expect(wrapper).to.exist;
    });
});

describe(' <Hamburger/> ', () => {
    let wrapper;
    let instance;
    let sandbox;
    const getCategoriesSpy = sinon.spy();
    const getHoverPanelSpy = sinon.spy();
    const triggerNavigationClickSpy = sinon.spy();
    const props = {
        actions: {
            getCategories: getCategoriesSpy,
            getHoverPanel: getHoverPanelSpy,
            triggerNavigationClick: triggerNavigationClickSpy,
        },
        deviceType: { isMobile: true },
        hambergurMenu: {
            meta: {
                imageSrc: 'DP0214201717015514M.jpg',
                title: 'view all in women',
                viewAllLink: true,
                viewAllTextUrl: '/g/women/N-bwo3x?pageType=X2H2',
            },
        },
        hamburgerZeroLevel: DefaultTemplate,
    };

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        wrapper = mount(
            <Hamburger {...props} />,
        );
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('hambOpenorClose ', () => {
        instance = wrapper.instance();
        const localStore = sandbox.stub(LocalStorage, 'getData', () => "['N-test']");
        instance.hambOpenorClose();
        expect(localStore.calledOnce).to.be.true;
    });

    it('callHoverorRootApi with root', () => {
        instance = wrapper.instance();
        instance.currentNid = 'root';
        instance.callHoverorRootApi();
        expect(getCategoriesSpy.calledOnce).to.be.true;
    });

    it('callHoverorRootApi with NID', () => {
        instance = wrapper.instance();
        instance.currentNid = 'N-test';
        instance.callHoverorRootApi();
        expect(getHoverPanelSpy.calledOnce).to.be.true;
    });

    it('callHoverorRootApi with findastore', () => {
        instance = wrapper.instance();
        instance.currentNid = 'findastore';
        instance.callHoverorRootApi();
        expect(instance.templateSelection).to.equals(3);
    });

    it('callHoverorRootApi with selectstore', () => {
        instance = wrapper.instance();
        instance.currentNid = 'selectstore';
        instance.callHoverorRootApi();
        expect(instance.templateSelection).to.equals(4);
    });

    it('pickLayout root layout', () => {
        instance = wrapper.instance();
        const localStore = sandbox.stub(LocalStorage, 'removeData', () => true);
        instance.templateSelection = 1;
        instance.pickLayout(HambThirdLevel);
        expect(localStore.calledOnce).to.be.true;
    });

    it('pickLayout FindaStoreSelector', () => {
        instance = wrapper.instance();
        instance.templateSelection = 3;
        const ret = instance.pickLayout(HambFourthLevel);
        expect(ret).to.be.an('object');
    });

    it('pickLayout SelectaStore', () => {
        instance = wrapper.instance();
        instance.templateSelection = 4;
        const ret = instance.pickLayout(HambFourthLevel);
        expect(ret).to.be.an('object');
    });

    it('pickLayout accordian layout', () => {
        instance = wrapper.instance();
        instance.templateSelection = 2;
        const ret = instance.pickLayout(HambFourthLevel);
        expect(ret).to.be.an('object');
    });

    it('goToPageViewAll', () => {
        instance = wrapper.instance();
        instance.goToPageViewAll({ target: { dataset: { url: 'https://m.jcpenny.com/g/women' } } });
    });

    it('componentWillReceiveProps', () => {
        instance = wrapper.instance();
        wrapper.setProps({ hambergurMenu: HambThirdLevel });
        expect(instance.props.hambergurMenu).to.be.an('array');
    });

    it('closeMenu', () => {
        instance = wrapper.instance();
        const localStore = sandbox.stub(LocalStorage, 'removeData', () => true);
        instance.closeMenu();
        expect(localStore.calledOnce).to.be.true;
    });

    it('catSelectedPushToNid same Nid', () => {
        instance = wrapper.instance();
        const spy = sinon.spy();
        wrapper.setProps({
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: '',
                },
            },
        });
        const e = {
            nid: 'N-Test',
            itemid: 'N-Test',
        };
        instance.goToPage = spy;
        instance.catSelectedPushToNid(e);
        expect(spy.calledOnce).to.be.true;
    });

    it('catSelectedPushToNid diffrent Nid', () => {
        instance = wrapper.instance();
        const spy = sinon.spy();
        wrapper.setProps({
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: '',
                },
            },
        });
        const e = {
            nid: 'N-Test',
            itemid: 'N-Test',
        };
        instance.currentNid = 'root';
        instance.goToPage = spy;
        instance.currentItemId = 'root';
        instance.catSelectedPushToNid(e);
        expect(spy.calledOnce).to.be.true;
    });

    it('navigationalDefaultValues', () => {
        const localStore = sandbox.stub(LocalStorage, 'setData', () => true);
        instance = wrapper.instance();
        instance.navigationalDefaultValues();
        expect(localStore.called).to.be.true;
    });

    it('goToPage, mobile', () => {
        instance = wrapper.instance();
        const isNidChanged = sandbox.stub(instance, 'isNidChanged', () => true);
        instance.goToPage();
        expect(isNidChanged.called).to.be.true;
    });

    it('goToPage where page type is xgn, mobile ', () => {
        instance = wrapper.instance();
        const navigate = sandbox.stub(instance, 'navigationalDefaultValues', () => true);
        instance.goToPage({ pagetype: 'XGN' });
        expect(navigate.called).to.be.true;
    });

    it('goToPage need to fetch, mobile ', () => {
        instance = wrapper.instance();
        const hovcallHoverorRootApier = sandbox.stub(instance, 'callHoverorRootApi', () => true);
        instance.isNidChanged = () => true;
        instance.goToPage({ pagetype: 'ROOT' });
        expect(hovcallHoverorRootApier.called).to.be.true;
    });

    it('goToPage need to fetch nid not changed, mobile ', () => {
        instance = wrapper.instance();
        instance.isNidChanged = () => false;
        instance.goToPage({ pagetype: 'ROOT' });
    });

    it('goToPage, Tablet', () => {
        wrapper.setProps({
            hambergurMenu: HambThirdLevel,
            deviceType: { isTablet: true, isMobile: false, isDesktop: false, isBot: false },
        });
        instance = wrapper.instance();
        instance.currentNid = 'test';
        instance.goToPage();
        expect(instance.allNids).to.have.lengthOf(0);
    });

    it('goToPage, Tablet equals XGN', () => {
        wrapper.setProps({
            hambergurMenu: HambThirdLevel,
            deviceType: { isTablet: true, isMobile: false, isDesktop: false, isBot: false },
        });
        instance = wrapper.instance();
        const localStore = sandbox.stub(LocalStorage, 'setData', () => true);
        instance.currentNid = 'test';
        instance.goToPage({ pagetype: 'XGN' });
        expect(localStore.called).to.be.true;
    });

    it('isNidChanged', () => {
        instance = wrapper.instance();
        instance.currentNid = 'test';
        instance.allNids = ['test'];
        expect(instance.isNidChanged()).to.be.true;
    });

    it('isNidChanged more data', () => {
        instance = wrapper.instance();
        instance.currentNid = 'test';
        instance.allNids = ['test', 'pass', 'base'];
        expect(instance.isNidChanged()).to.be.true;
    });

    it('goBack', () => {
        instance = wrapper.instance();
        const goToPage = sandbox.stub(instance, 'goToPage', () => true);
        instance.goBack();
        expect(goToPage.called).to.be.true;
    });

    it('goBack, nid is not root and base ', () => {
        instance = wrapper.instance();
        instance.currentNid = 'N-bwx';
        const localStore = sandbox.stub(LocalStorage, 'setData', () => true);
        instance.goBack();
        expect(localStore.called).to.be.true;
    });

    it('goBack, nid is selectstore ', () => {
        instance = wrapper.instance();
        instance.currentNid = 'selectstore';
        instance.goBack();
    });

    it('goBack, nid is not root and base tablet ', () => {
        wrapper.setProps({
            hambergurMenu: HambThirdLevel,
            deviceType: { isTablet: true, isMobile: false, isDesktop: false, isBot: false },
        });
        instance = wrapper.instance();
        instance.currentNid = 'N-bwx';
        const goToPage = sandbox.stub(instance, 'goToPage', () => true);
        instance.goBack();
        expect(goToPage.called).to.be.true;
    });

    it('menuClick ', () => {
        const stopPropagationSpy = sinon.spy();
        instance = wrapper.instance();
        instance.menuClick({
            stopPropagation: stopPropagationSpy,
        });
        expect(stopPropagationSpy.called).to.be.true;
    });

    it('timerOnandReset ', () => {
        instance = wrapper.instance();
        instance.timerOnandReset();
        const resetSpy = sinon.stub(instance, 'goBack');
        wrapper.setState({ loader: true });
        instance.resetOnTimer();
        expect(resetSpy.called).to.be.true;
    });

    it('timerOnandReset not passing', () => {
        instance = wrapper.instance();
        const resetSpy = sinon.stub(instance, 'goBack');
        wrapper.setState({ loader: false });
        instance.resetOnTimer();
        expect(resetSpy.called).to.be.false;
    });

    it('findNidFromUrl', () => {
        instance = wrapper.instance();
        const nid = instance.findNidFromUrl('/g/N-test');
        expect(nid).to.equal('N-test');
    });

    it('findNidFromUrl without /g/', () => {
        instance = wrapper.instance();
        const nid = instance.findNidFromUrl('/m/N-test');
        expect(nid).to.be.undefined;
    });

    it('resetMenu', () => {
        instance = wrapper.instance();
        instance.resetMenu();
        expect(instance.currentTitle).to.equal('MENU');
    });

    it('analytics', () => {
        instance = wrapper.instance();
        instance.allTitles = ['MENU', 'MENU', 'shop departments ', 'women'];
        instance.analytics('lingerie', 'full figure bras', '/g/full-figure-bras/N-bwo3xD1nohpiZ1deZ1daZ1by');
        expect(triggerNavigationClickSpy.called).to.be.true;
    });

    it('analytics without title', () => {
        instance = wrapper.instance();
        instance.allTitles = [];
        instance.analytics('lingerie', 'full figure bras', '/g/full-figure-bras/N-bwo3xD1nohpiZ1deZ1daZ1by');
        expect(triggerNavigationClickSpy.called).to.be.true;
    });

    it('closeorBackButton', () => {
        instance = wrapper.instance();
        instance.allNids = ['N-test'];
        const btn = instance.closeorBackButton();
        expect(btn).to.be.an('object');
    });
    it('signOut', () => {
        instance = wrapper.instance();
        instance.signoutUrl = 'http://m-dt-test4.jcpenney.com/sessiontimeout?timeout=true';
        instance.signOut();
    });
    it('previousMenuTitle', () => {
        instance = wrapper.instance();
        instance.allTitles = ['N-test', 'N-test1'];
        instance.previousMenuTitle();
        expect(instance.previousTitle).to.equals('N-test1');
    });
    it('componentWillUnmount', () => {
        instance = wrapper.instance();
        const unmountSpy = sinon.spy();
        instance.unmount = unmountSpy;
        instance.componentWillUnmount();
        expect(unmountSpy.called).to.be.true;
    });
});


describe('<RootCategoryTemplate/> ', () => {
    it('Tablet', () => {
        const catSelectedPushToNid = () => true;
        const wrapper = shallow(RootCategoryTemplate(HambSecondLevel, catSelectedPushToNid, { isMobile: false }));
        expect(wrapper.find('button')).to.have.length(16);
    });
});

describe('<AccordianTemplate/> ', () => {
    it('Tablet', () => {
        const catSelectedPushToNid = () => true;
        const meta = { imageSrc: 'DP0214201717015514M.jpg', title: 'view all in women', viewAllLink: true, viewAllTextUrl: '/g/women/N-bwo3x?pageType=X2H2' };
        const wrapper = shallow(AccordianTemplate(HambFourthLevel,
            catSelectedPushToNid, meta, catSelectedPushToNid, { isMobile: false }));
        expect(wrapper.find('button')).to.have.length(56);
    });
});

describe('<FindaStoreSelector/> ', () => {
    const userProfile = {
        firstName: null,
        accountId: null,
        rewardsStatus: null,
        userState: null,
        totalCerts: null,
    };
    const selStore = { isGeoStore: true, storeDetails: { name: 'Stonebriar Mall' } };
    const catSelectedPushToNid = () => true;
    it('isGeoStore on and no userState', () => {
        const wrapper = shallow(FindaStoreSelector(userProfile, selStore, catSelectedPushToNid));
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('isGeoStore on and no userState default', () => {
        const wrapper = shallow(FindaStoreSelector(undefined, undefined, catSelectedPushToNid));
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('user sate is true with user info', () => {
        userProfile.userState = true;
        selStore.storeDetails.name = 'name';
        const wrapper = shallow(FindaStoreSelector(userProfile, selStore, catSelectedPushToNid));
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('user state is true and name is null', () => {
        userProfile.userState = true;
        selStore.storeDetails.name = '';
        const wrapper = shallow(FindaStoreSelector(userProfile, selStore, catSelectedPushToNid));
        expect(wrapper.find('button')).to.have.length(1);
    });
});

describe('<SelectaStore/> ', () => {
    const mockStore = configureStore([]);
    const deviceType = { isMobile: true };
    const storeInfo = {
        storeSelectedServices: [],
        count: 0,
        miles: 15,
        nextPageLink: 'http://m.jcpenney.com/v2/stores?limit=15&storeService=&latitude=33.0787152&longitude=-96.8083063&dpAkamaiOverride=1',
    };
    const store = mockStore({
        findAStorePageInfo: storeInfo,
        context: { deviceType },
        galleryStoreReducer: {
            selectedStores: [],
            headerStore: null,
        },
        selectedStore: {
            storeDetails: [],
        },
    });
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <SelectaStore isGeoStore />
            </Provider>);
    });

    it('Select a store should exist', () => {
        expect(wrapper).to.exist;
    });
});

describe('<DropdownDefault/> ', () => {
    const shopDepartmentAction = () => true;
    it('GeoLocation on', () => {
        const geo = { isGeoStore: true, storeDetails: { name: 'Stonebriar Mall' } };
        const wrapper = shallow(DropdownDefault(GeoTrueNoSIgn, shopDepartmentAction, { userState: '0' }, geo));
        expect(wrapper.find('button')).to.have.length(12);
    });

    it('GeoLocation off', () => {
        const geo = { isGeoStore: false, storeDetails: { name: 'Stonebriar Mall' } };
        const wrapper = shallow(DropdownDefault(GeoTrueNoSIgn, shopDepartmentAction, { userState: '0' }, geo));
        expect(wrapper.find('button')).to.have.length(12);
    });

    it('user loged in', () => {
        const geo = { isGeoStore: false, storeDetails: { name: 'Stonebriar Mall' } };
        const wrapper = shallow(DropdownDefault(GeoTrueNoSIgn, shopDepartmentAction, { userState: '1' }, geo));
        expect(wrapper.find('button')).to.have.length(15);
    });
});
