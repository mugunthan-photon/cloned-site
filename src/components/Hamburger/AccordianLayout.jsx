import React from 'react';
import classNames from 'classnames/bind';
import { Accordion, AccordionSection } from 'yoda-core-components/lib/components/Accordion';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
import * as styles from './AccordianTemplate.css';

const cx = classNames.bind(styles);

let iteratedListIndex = 0;

let selectedIndex = 9999;

const imagePath = (imgName, deviceType) => {
    // TODO: need to remove domain name
    const path = deviceType.isMobile ? `https://m.jcpenney.com/mobile/images/${imgName}` : `https://m.jcpenney.com/tablet/images/${imgName}`;
    return path;
};

const TitleImageSection = (item, goToPageViewAll, deviceType, subTitle) => {
    let titleSec = '';
    /* istanbul ignore next */
    item ?
    titleSec = (<div className={styles.titleSection}>
        <img className={styles.imgPlaceholder} alt={item.title} src={imagePath(item.imageSrc, deviceType)} />

        <span className={styles.title}> {subTitle} </span>
        <button className={styles.viewAll} data-url={item.viewAllTextUrl} onClick={goToPageViewAll}>View All</button>

    </div>) : '';

    return titleSec;
};


const myTheme = {

    accordionTitleClass: styles.panelHeader,
    accordionContainerClass: styles.accordionContainer,
    accordionSectionClass: styles.accordionSection,
    accordionActiveClass: styles.selected,
    accordionPanelClass: styles.panel,
    accordionIconClass: styles.iconBlock,

};

const oneRow = (item, catSelectedPushToNid, meta, itemKey, findNidFromUrl, isLoader) => {
    const accordianSelect = JSON.parse(LocalStorage.getData('yodaHmenuType', true));
    /* istanbul ignore next */
    if (accordianSelect && findNidFromUrl(item.targetUrl) === accordianSelect) {
        selectedIndex = iteratedListIndex;
        LocalStorage.removeData('yodaHmenuType', true);
    }
    return (<li key={`hamb-accord-bottom-${itemKey}-${item.name}`}>
        <button
            className={styles.menuListItemLink}
            onClick={catSelectedPushToNid}
            data-nid={item.nid}
            data-targetedurl={item.targetUrl}
            data-title={meta.departmentName}
            data-name={item.name}
            data-targetdurl={item.targetUrl}
            data-pagetype={item.pageType}
            disabled={isLoader}
            data-automation-id="dropdown-item-button">
            <span
                className={cx(styles.menuListItemName, item.styleClass)}
                aria-label={item.name}
            >
                {item.name}
            </span>
        </button>
    </li>
    );
};


const AccordianList = (items, catSelectedPushToNid, meta, itemKey, findNidFromUrl, isLoader) => {
    const fullDom = [];
    items.forEach((item) => {
        fullDom.push(oneRow(item, catSelectedPushToNid, meta, itemKey, findNidFromUrl, isLoader));
    });
    return fullDom;
};

const AccordianBuilder = (items, catSelectedPushToNid, meta, findNidFromUrl, isLoader) => {
    const fullDom = [];
    Object.keys(items).forEach((itemKey, index) => {
        iteratedListIndex = index;
        const titleLowercase = itemKey.toLowerCase();
        fullDom.push(
            <AccordionSection
                title={titleLowercase} index={index}
                key={`hamb-accord-top-${itemKey}`}
                iconTheme={styles.iconTheme}>
                <div className={styles.dropdownMenu}>
                    <ul className={styles.dropdownMenuWrapper}>{AccordianList(items[itemKey],
                        catSelectedPushToNid,
                        meta, itemKey, findNidFromUrl, isLoader)} </ul>
                </div>
            </AccordionSection>,
        );
    });

    return (
        <Accordion themeConfig={myTheme} selectedAccordionSectionIndex={selectedIndex} isAutoCollapsible automationId={'test-automation-tab-list-0'}>
            {[...fullDom]}
        </Accordion>
    );
};

const AccordianTemplate = (items,
catSelectedPushToNid,
meta,
goToPageViewAll,
deviceType,
findNidFromUrl,
subTitle,
isLoader) => {
    selectedIndex = 9999;
    return (
        <div className={styles.main} data-section="accordian">
            {TitleImageSection(meta, goToPageViewAll, deviceType, subTitle)}
            {AccordianBuilder(items, catSelectedPushToNid, meta, findNidFromUrl, isLoader)}
        </div>
    );
};


export default AccordianTemplate;
