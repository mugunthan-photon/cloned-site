import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';
// import NavigationHelper from 'yoda-core-components/lib/helpers/NavigationHelper/NavigationHelper';
import SecondaryNavigationPanelConnnected, { SecondaryNavigationPanel } from './SecondaryNavigationPanel';
import mockData from './__stories/mock';

describe('<SecondaryNavigationPanel/> Testing the redux', () => {
    it('Check connected component to exists', () => {
        const mockStore = configureStore([]);
        const action = {
            AnalyticsAction() {
                return true;
            },
            accountAction() {
                return true;
            },
            triggerNavigationClick() {
                return true;
            },
        };
        const store = mockStore({
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: null,
                totalCerts: null,
            },
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: 'Oberoi',
                },
            },
        });
        const props = {
            accounts: {
                userProfile: {
                    firstName: null,
                    accountId: null,
                    rewardsStatus: null,
                    userState: '0',
                    totalCerts: null,
                },
            },
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: 'Oberoi',
                },
            },
            shopDepartmentMenuInfo: mockData.modifiedData,
        };
        const wrapper = mount(
            <Provider store={store}>
                <SecondaryNavigationPanelConnnected actions={action} {...props} />
            </Provider>,
        );
        wrapper.setState({
            displayvericalSlider: true,
            openSlider: true,
        });
        wrapper.find('button').at(0).simulate('click');

        expect(wrapper).to.exist;
    });
    it('FindaStoreSelector else part', () => {
        const mockStore = configureStore([]);
        const action = {
            AnalyticsAction() {
                return true;
            },
            accountAction() {
                return true;
            },
            triggerNavigationClick() {
                return true;
            },
        };
        const store = mockStore({
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: null,
                totalCerts: null,
            },
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: 'Oberoi',
                },
            },
        });

        const wrapper = mount(
            <Provider store={store}>
                <SecondaryNavigationPanelConnnected actions={action} />
            </Provider>,
        );
        wrapper.setState({
            displayvericalSlider: true,
            openSlider: true,
        });
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper).to.exist;
    });
    it('FindaStoreSelector else part', () => {
        const mockStore = configureStore([]);
        const action = {
            AnalyticsAction() {
                return true;
            },
            accountAction() {
                return true;
            },
            triggerNavigationClick() {
                return true;
            },
        };
        const store = mockStore({
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: null,
                totalCerts: null,
            },
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: null,
                },
            },
        });
        const props = {
            accounts: {
                userProfile: {
                    firstName: null,
                    accountId: null,
                    rewardsStatus: null,
                    userState: '0',
                    totalCerts: null,
                },
            },
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: null,
                },
            },
            shopDepartmentMenuInfo: mockData.modifiedData,
        };
        const wrapper = mount(
            <Provider store={store}>
                <SecondaryNavigationPanelConnnected actions={action} {...props} />
            </Provider>,
        );
        wrapper.setState({
            displayvericalSlider: true,
            openSlider: true,
        });
        wrapper.find('.links').at(0).simulate('click');
        expect(wrapper).to.exist;
    });
    /* it('should call mouseOver-instanse', () => {
        const mockStore = configureStore([]);
        const action = {
            AnalyticsAction() {
                return true;
            },
            accountAction() {
                return true;
            },
            triggerNavigationClick() {
                return true;
            },
        };
        const store = mockStore({
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: null,
                totalCerts: null,
            },
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: 'Oberoi',
                },
            },
        });
        const displayShopDepartmentMenu = sinon.spy();
        const wrapper = mount(<Provider store={store}>
            <SecondaryNavigationPanelConnnected actions={action} />
        </Provider>);
        wrapper.setProps({
            shopDepartmentMenuInfo: '',
        });
        expect(displayShopDepartmentMenu.called).to.be.false;
        wrapper.setProps({
            shopDepartmentMenuInfo: '',
        });
        expect(displayShopDepartmentMenu.called).to.be.false;
    }); */

    it('check wrapper to exist2', () => {
        const mockStore = configureStore([]);
        const action = {
            AnalyticsAction() {
                return true;
            },
            accountAction() {
                return true;
            },
            triggerNavigationClick() {
                return true;
            },
        };
        const store = mockStore({
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: null,
                totalCerts: null,
            },
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: 'Oberoi',
                },
            },
        });
        const triggerNavigationClickSpy = sinon.spy();
        // const triggerNavigationClick = () => true;
        const wrapper = mount(<Provider store={store}>
            <SecondaryNavigationPanelConnnected actions={action} />
        </Provider>);
        expect(wrapper).to.exist;
        wrapper.setProps({
            selectedStore: {
                isGeoStore: false,
                storeDetails: {
                },
            },
            actions: {
                triggerNavigationClick: triggerNavigationClickSpy,
            },
            shopDepartmentMenuInfo: '',
        });
        // const instance = wrapper.instance();
        const renderFindStoreButton = sinon.spy();
        // instance.renderFindStore = renderFindStoreButton;
        // instance.renderFindStoreButton();
        // instance.goFindaStore('findastore');
        expect(renderFindStoreButton.called).to.be.false;
        // const windowBkp = global.window;
        // global.window = {
        //     location: {
        //         href: 'http://m.jcpenney.com/',
        //     },
        // };
        console.log(':::');
        wrapper.find('.findStore').simulate('click');
        console.log(wrapper.find('.findStore').debug());
        wrapper.find('.toggleStore').simulate('click');
        console.log(wrapper.find('.toggleStore').debug());
        // expect(window.location.href).to.deep.equal('http://m.jcpenney.com/');
        // // reset window object else other test cases breaking
        // global.window = windowBkp;
    });

    /* it('should not call mouseOver-instanse', () => {
        const mockStore = configureStore([]);
        const action = {
            AnalyticsAction() {
                return true;
            },
            accountAction() {
                return true;
            },
            triggerNavigationClick() {
                return true;
            },
        };
        const store = mockStore({
            userProfile: {
                firstName: null,
                accountId: null,
                rewardsStatus: null,
                userState: null,
                totalCerts: null,
            },
            selectedStore: {
                isGeoStore: true,
                storeDetails: {
                    name: 'Oberoi',
                },
            },
        });
        const displayShopDepartmentMenu = sinon.spy();
        // const event = {
        //     target: {
        //         textContent: 'coupons',
        //     },
        // };
        const wrapper = mount(<Provider store={store}>
            <SecondaryNavigationPanelConnnected actions={action} />
        </Provider>);
        wrapper.setProps({
            shopDepartmentMenuInfo: '',
        });
        // wrapper.instance().displayItem(event);
        expect(displayShopDepartmentMenu.called).to.be.false;
    }); */
});

describe(' Non Connected Component <SecondaryNavigation/> ', () => {
    it('check wrapper to exist1', () => {
        const triggerNavigationClick = () => true;
        const wrapper = shallow(
            <SecondaryNavigationPanel actions={triggerNavigationClick} />);
        expect(wrapper).to.exist;
        wrapper.setProps({
            selectedStore: {
                isGeoStore: false,
                storeDetails: {
                    name: 'Oberoi',
                },
            },
        });
    });

    it('check wrapper to exist3', () => {
        const wrapper = shallow(
            <SecondaryNavigationPanel />);
        expect(wrapper).to.exist;
        wrapper.setProps({
            selectedStore: {
                isGeoStore: false,
                storeDetails: {
                },
            },
            shopDepartmentMenuInfo: '',
        });
        const instance = wrapper.instance();
        const selectStoreInfo = sinon.spy();
        instance.selectStoreInfo(false);
        expect(selectStoreInfo.called).to.be.false;
        wrapper.find('.links').at(0).simulate('click');
        instance.selectStoreInfo(true);
        expect(selectStoreInfo.called).to.be.false;
    });
    it('check wrapper to exist4', () => {
        const wrapper = shallow(
            <SecondaryNavigationPanel/>);
        expect(wrapper).to.exist;
        wrapper.setProps({
            selectedStore: {
                isGeoStore: false,
                storeDetails: {
                },
            },
            shopDepartmentMenuInfo: '',
        });
    });
    it('check wrapper to exist5', () => {
        const wrapper = shallow(
            <SecondaryNavigationPanel />);
        expect(wrapper).to.exist;
        wrapper.setProps({
            selectedStore: {
                isGeoStore: false,
                storeDetails: {
                },
            },
            shopDepartmentMenuInfo: '',
        });
        const FindaStoreSelector = sinon.spy();
        wrapper.instance().FindaStoreSelector();
        expect(FindaStoreSelector.called).to.be.called;
    });
    it('check wrapper to exist5', () => {
        const wrapper = shallow(
            <SecondaryNavigationPanel />);
        expect(wrapper).to.exist;
        wrapper.setProps({
            selectedStore: {
                isGeoStore: false,
                storeDetails: {
                },
                shopDepartmentMenuInfo: '',
            },
        });
        const closeMenu = sinon.spy();
        wrapper.find('.leftArrowWrapper').simulate('click');
        expect(closeMenu.called).to.be.called;
    });

    // it('check wrapper to exist6', () => {
    //     const triggerNavigationClick = () => true;
    //     const wrapper = mount(
    //         <SecondaryNavigationPanel actions={triggerNavigationClick} />);
    //     expect(wrapper).to.exist;
    //     wrapper.setProps({
    //         selectedStore: {
    //             isGeoStore: false,
    //             storeDetails: {
    //                 name: 'Oberoi',
    //             },
    //         },
    //         shopDepartmentMenuInfo: mockData.modifiedData,
    //     });
    // });

    // it('should call mouseOver-instanse', () => {
    //     const displayShopDepartmentMenu = sinon.spy();
    //     const event = {
    //         target: {
    //             textContent: 'shop departments',
    //         },
    //     };
    //     const wrapper = mount(<SecondaryNavigationPanel />);
    //     wrapper.setProps({
    //         shopDepartmentMenuInfo: mockData.modifiedData,
    //     });
    //     wrapper.instance().displayItem(event);
    //     expect(displayShopDepartmentMenu.called).to.be.false;
    // });

    // it('should not call mouseOver-instanse', () => {
    //     // const displayShopDepartmentMenu = sinon.spy();
    //     // const event = {
    //     //     target: {
    //     //         textContent: 'coupons',
    //     //     },
    //     // };
    //     const wrapper = mount(<SecondaryNavigationPanel />);
    //     wrapper.setProps({
    //         shopDepartmentMenuInfo: '',
    //     });
    //     wrapper.instance().displayShopDepartmentMenu();
    //     // expect(displayShopDepartmentMenu).to.be.called;
    // });

    it('First Level Navigation wrapper to exists', () => {
        const actions = {
            triggerNavigationClick: () => {},
            getDesktopCategoriesVisualNavigationAction: () => {},
        };
        const wrapper = shallow(
            <SecondaryNavigationPanel actions={actions}/>);
        expect(wrapper).to.exist;
        wrapper.setProps({
            selectedStore: {
                isGeoStore: false,
                storeDetails: {
                },
            },
            shopDepartmentMenuInfo: [{
                title: 'for the home',
                image: '/tablet/images/DP0214201717015531M.jpg',
                links: '/g/home-store/N-bwo3v?pageType=X2H2',
                departments: [{
                    key: 'departments',
                    categories: [
                        {
                            id: '100240023',
                            name: 'rugs',
                            targetUrl: '/g/rugs/N-bwo3vD1nohp3',
                            targetWindow: 'SW',
                            pageType: 'XGN',
                        }],
                }],
            }],
        });
        wrapper.setState({
            showShopDepartment: true,
        });
        const navigateurl = sinon.spy();
        wrapper.find('.menuItemLink').props().onClick({ preventDefault: () => {} });
        expect(navigateurl.called).to.be.called;
    });

    it('check togglemenu to cover', () => {
        const actions = {
            triggerNavigationClick: () => {},
            removeOverlay: () => {},
            showOverlay: () => {},
        };
        const wrapper = shallow(
            <SecondaryNavigationPanel actions={actions}/>);
        expect(wrapper).to.exist;
        wrapper.setProps({
            selectedStore: {
                isGeoStore: false,
                storeDetails: {
                },
            },
            shopDepartmentMenuInfo: '',
        });
        const instance = wrapper.instance();
        const toggleMenu = sinon.spy();
        instance.toggleMenu();
        expect(toggleMenu.called).to.be.false;
        let event = {
            target: {
                textContent: 'shop departments',
            },
        };
        instance.displayItem(event);
        event = {
            target: {
                textContent: 'coupons',
            },
        };
        instance.displayItem(event);
    });
});

describe('<SecondaryNavigationPanel/> Mouse Over events', () => {
    let instance;

    beforeEach(() => {
        const actions = {
            triggerNavigationClick: () => {},
            getDesktopCategoriesVisualNavigationAction: () => {},
            removeOverlay: () => {},
            showOverlay: () => {},
        };
        const wrapper = shallow(<SecondaryNavigationPanel actions={actions} />);
        wrapper.setProps({
            shopDepartmentMenuInfo: mockData.modifiedData,
        });
        expect(wrapper).to.exist;
        instance = wrapper.instance();
    });

    it('Reset menu', () => {
        instance.resetMenu();
        expect(instance.state.showShopDepartment).to.equal(false);
        expect(instance.state.hoverDept).to.equal('');
        expect(instance.state.hoverCategory).to.equal('');
        expect(instance.state.hoverDepartmentData).to.equal('');
        expect(instance.state.lastBindedDept).to.equal('');
        expect(instance.state.mousePosition).to.equal(1);
    });

    it('mainDivMouseLeave menu', () => {
        instance.mainDivMouseLeave();
        expect(instance.state.showShopDepartment).to.equal(false);
        expect(instance.state.hoverDept).to.equal('');
        expect(instance.state.hoverCategory).to.equal('');
        expect(instance.state.hoverDepartmentData).to.equal('');
        expect(instance.state.lastBindedDept).to.equal('');
        expect(instance.state.mousePosition).to.equal(1);
    });

    it('onLevel1MouseOver event - Instial load', () => {
        const displayCategory = sinon.spy();
        const event = {
            target: {
                textContent: 'Shop department',
            },
        };
        instance.setState({
            hoverDept: '',
        });
        instance.onLevel1MouseOver(event);
        expect(displayCategory).to.be.called;
    });

    it('onLevel1MouseOver event', () => {
        const displayCategory = sinon.spy();
        const event = {
            target: {
                textContent: 'Shop department',
            },
        };
        instance.setState({
            hoverDept: 'shop',
        });
        instance.onLevel1MouseOver(event);
        expect(displayCategory).to.be.called;
    });

    it('onLevel1MouseOut event-else case', () => {
        const displayCategory = sinon.spy();
        instance.setState({
            hoverDept: 'shop',
            mousePosition: 2,
        });
        instance.onLevel1MouseOut();
        expect(displayCategory.called).to.be.false;
    });

    it('onLevel2MouseOver event-intial load', () => {
        const displayCategory = sinon.spy();
        const event = {
            target: {
                textContent: 'shop',
            },
        };
        instance.setState({
            lastBindedDept: 'Shop',
            hoverCategory: '',
        });
        instance.onLevel2MouseOver(event);
        expect(displayCategory).to.be.called;
    });

    it('onLevel2MouseOver event', () => {
        const displayCategory = sinon.spy();
        const event = {
            target: {
                textContent: 'Shop department',
            },
        };
        instance.setState({
            lastBindedDept: 'Shop',
            hoverCategory: 'Shop',
        });
        instance.onLevel2MouseOver(event);
        expect(displayCategory).to.not.be.called;
    });

    it('onLevel2HeadingMouseOver event', () => {
        instance.setState({
            hoverCategory: 'Shop',
        });
        instance.onLevel2HeadingMouseOver();
        expect(instance.state.hoverCategory).to.equal('');
    });

    it('onLevel2MouseOut event-else case', () => {
        const displayCategory = sinon.spy();
        instance.setState({
            lastBindedDept: 'Shop',
            hoverCategory: 'Shop',
            mousePosition: 1,
        });
        instance.onLevel2MouseOut();
        expect(displayCategory.called).to.be.false;
    });

    it('onLevel3MouseEnter event', () => {
        instance.onLevel3MouseEnter();
        expect(instance.state.mousePosition).to.equal(3);
    });

    it('onLevel2MouseEnter event', () => {
        instance.onLevel2MouseEnter();
        expect(instance.state.mousePosition).to.equal(2);
    });

    it('onLevel2MouseLeave event', () => {
        instance.onLevel2MouseLeave();
        expect(instance.state.mousePosition).to.equal(1);
        expect(instance.state.hoverDept).to.equal('');
        expect(instance.state.lastBindedDept).to.equal('');
    });

    it('onLevel3MouseLeave event', () => {
        instance.onLevel3MouseLeave();
        expect(instance.state.mousePosition).to.equal(2);
        expect(instance.state.hoverCategory).to.equal('');
    });

    it('displayCategory event', () => {
        instance.setState({
            mousePosition: 2,
        });
        instance.displayCategory('FOR THE HOME', 'DEPARTMENTS');
        expect(instance.state.firstLevelHover).to.equal(true);
    });
});
