import React from 'react';
import classNames from 'classnames/bind';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Image from 'yoda-core-components/lib/components/Image/Image';
import * as styles from './RootCategoryTemplate.css';

const cx = classNames.bind(styles);

const imagePath = (imgName, deviceType) => {
 // TODO: need to remove domain name
    const path = deviceType.isMobile ? `https://m.jcpenney.com/mobile/images/${imgName}` : `https://m.jcpenney.com/tablet/images/${imgName}`;
    return path;
};

const oneRow = (item, catSelectedPushToNid, deviceType, isLoader) => (
    <li className={styles.hr} key={`hamb-root-${item.name}`}>
        <button className={styles.menuListItemLink} onClick={catSelectedPushToNid} disabled={isLoader} data-pagetype="root" data-targetdurl={item.targetUrl} data-name={item.name} data-title="shop departments " data-nid={item.id} data-automation-id="dropdown-item-button">
            <div className={styles.imageWidth}>
                <Image
                    src={imagePath(item.imageSrc, deviceType)}
                    alt={item.name}
                    automationId="test-automation-image"
                />
            </div>
            <span
                className={cx(styles.menuListItemName, item.styleClass)}
                aria-label={item.name}
            >
                {item.name}
            </span>
            <i className={styles.rightArrow}>
                <Icon iconType="svg" className={cx('svg-icon')} width="14px" height="14px" viewBox="0 0 24 24" name="arrow-right" />
            </i>
        </button>
    </li>
);

const renderMidSection = (items, catSelectedPushToNid, deviceType, isLoader) => {
    const fullDom = [];
    items.forEach((item) => {
        fullDom.push(oneRow(item, catSelectedPushToNid, deviceType, isLoader));
    });
    return fullDom;
};

const RootCategoryTemplate = (depts, catSelectedPushToNid, deviceType, isLoader) => (
    <nav className={styles.dropdownMenu}>
        <ul className={styles.dropdownMenuWrapper}>{renderMidSection(depts,
            catSelectedPushToNid,
            deviceType,
            isLoader)} </ul>
    </nav>
);

export default RootCategoryTemplate;
