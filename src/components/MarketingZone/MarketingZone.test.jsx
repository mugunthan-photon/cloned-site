import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import MarketingZone from './MarketingZone';
import { ZoneContentDataImage, ZoneContentDataImageMap } from './__stories/mock';

describe('<MarketingZone /> ', () => {
    let wrapper;

    it('MarketingZone component width data ', () => {
        wrapper = mount(
            <MarketingZone
                zoneContent={ZoneContentDataImage}
                deviceType="tablet"
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );
        expect(Object.keys(wrapper.props().zoneContent)).to.have.length.above(0);
    });

    it('paintImage without zoneContent ', () => {
        wrapper = mount(
            <MarketingZone
                deviceType="tablet"
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImage()).to.be.null;
    });

    it('constructLeaf ', () => {
        expect(MarketingZone.constructLeaf([{
            link: 'test?X2H2',
        }])).to.be.an('array');
    });

    it('imageWithURL ', () => {
        expect(MarketingZone.imageWithURL({ imagePath: '' })).to.be.null;
    });

    it('imageWithoutURL ', () => {
        expect(MarketingZone.imageWithURL(''));
    });

    it('isDynamic test - true', () => {
        const imageUrl = MarketingZone.imageWithURL({ imagePath: '/sample/test', isDynamic: true });
        expect(imageUrl).to.contain('s7d9.scene7.com');
    });

    it('isDynamic test - false', () => {
        const imageUrl = MarketingZone.imageWithURL({ imagePath: '/sample/test', isDynamic: false });
        expect(imageUrl).to.not.contain('s7d9.scene7.com');
    });

    it('isDynamic test - null', () => {
        const imageUrl = MarketingZone.imageWithURL({ imagePath: '/sample/test', isDynamic: null });
        expect(imageUrl).to.not.contain('s7d9.scene7.com');
    });

    it('isDynamic test ', () => {
        MarketingZone.imageWithURL({ imagePath: '/sample/test', isDynamic: null }, 'desktop');
        // expect(imageUrl).to.not.contain('s7d9.scene7.com');
    });

    // it('isDynamic test ', () => {
    //     console.log(':::', MarketingZone.imageWithURL(''));
    //     wrapper.instance().arrangeVisualNavData();
    //     // expect(imageUrl).to.not.contain('s7d9.scene7.com');
    // });

    it('paintImage  deviceType mobile ', () => {
        wrapper = mount(
            <MarketingZone
                zoneContent={ZoneContentDataImage}
                deviceType="mobile"
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImage()).to.be.an('object');
    });

    it('paintImage  deviceType desktop ', () => {
        wrapper = mount(
            <MarketingZone
                zoneContent={ZoneContentDataImage}
                deviceType="desktop"
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImage()).to.be.an('object');
    });

    it('paintImage  deviceType large ', () => {
        wrapper = mount(
            <MarketingZone
                zoneContent={ZoneContentDataImage}
                deviceType="large"
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImage()).to.be.an('object');
    });

    it('paintImage  deviceType extralarge ', () => {
        wrapper = mount(
            <MarketingZone
                zoneContent={ZoneContentDataImage}
                deviceType="extralarge"
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImage()).to.be.an('object');
    });

    it('paintImageMap with zoneContent', () => {
        wrapper = mount(
            <MarketingZone
                zoneContent={ZoneContentDataImageMap}
                deviceType="large"
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImageMap()).to.be.an('object');
    });

    it('paintImageMap without imageMapDetails', () => {
        const imgMapData = Object.assign({}, ZoneContentDataImageMap, { imageMapDetails: undefined });
        wrapper = mount(
            <MarketingZone
                deviceType="desktop"
                zoneContent={imgMapData}
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImageMap()).to.be.null;
    });

    it('paintImageMap deviceType mobile ', () => {
        wrapper = mount(
            <MarketingZone
                deviceType="mobile"
                zoneContent={ZoneContentDataImageMap}
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImageMap()).to.be.an('object');
    });

    it('paintImageMap deviceType tablet ', () => {
        wrapper = mount(
            <MarketingZone
                deviceType="tablet"
                zoneContent={ZoneContentDataImageMap}
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.paintImageMap()).to.be.an('object');
    });

    it('paintImageMap deviceType desktop ', () => {
        wrapper = mount(
            <MarketingZone
                deviceType="desktop"
                zoneContent={ZoneContentDataImageMap}
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );
        const instance = wrapper.instance();
        expect(instance.paintImageMap()).to.be.an('object');
    });

    it('paintImageMap deviceType random type ', () => {
        wrapper = mount(
            <MarketingZone
                deviceType="extralarge"
                zoneContent={ZoneContentDataImageMap}
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );
        const instance = wrapper.instance();
        expect(instance.paintImageMap()).to.be.an('object');
    });

    it('getImage without data ', () => {
        const imageObject = {
            imageSrc: null,
        };
        wrapper = mount(
            <MarketingZone
                deviceType="extralarge"
                zoneContent={ZoneContentDataImageMap}
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );
        const instance = wrapper.instance();
        expect(instance.getImage(imageObject)).to.be.null;
    });


    it('paintVisualNavigation', () => {
        const visNavSlots = [
            {
                imageName: null,
                imageLink: null,
                imageAlt: null,
                openIn: null,
                windowHeight: null,
                windowWidth: null,
                isDynamic: null,
                h1title: 'Desktop_Home_Zone C_Image_Div 5_clearance_02022017_0000_02282017_0000.jpg',
                imagePath: 'http://s7d9.scene7.com/is/image/JCPenney//DP1212201317371926M',
                seoUrl: 'http://www.jcpenney.com/g/home-store/N-bwo3v?pageType=X2H2',
                departmentId: '2845660840',
                searchTerm: null,
                visNavType: 'Internal',
                slotId: 0,
                taggingValues: null,
                ppId: null,
            },
        ];

        // wrapper = mount(<MarketingZone deviceType="mobile" zoneContent={zoneContentVisualNav} zoneStyleClass="temp" />);
        expect(MarketingZone.paintVisualNavigation(visNavSlots)).to.be.an('object');
    });

    it('getImageMap deviceType desktop ', () => {
        const imageMapAreaDetails = {
            imagemapArea: [],
        };
        wrapper = mount(
            <MarketingZone
                deviceType="desktop"
                zoneContent={ZoneContentDataImageMap}
                zoneStyleClass="temp"
                timerZone="CST"
                displayTimer={false}
            />,
        );

        const instance = wrapper.instance();
        expect(instance.getImageMap(imageMapAreaDetails)).to.be.null;
    });
});
