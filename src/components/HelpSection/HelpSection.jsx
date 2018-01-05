import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import List from 'yoda-core-components/lib/components/List/List';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import FeatureFlag from 'yoda-core-components/lib/components/FeatureFlag/FeatureFlag';
import newConfig from './HelpSection.config.v1';
import config from './HelpSection.config';
import * as styles from './HelpSection.css';


const cx = classNames.bind(styles);
/**
 *HelpSection component to standardize the styling and html structure of HelpSection on footer
 * This imports config file which has the data for helpList
 * This component also consumes List and Icon from core component
 * */

export default class HelpSection extends Component {
    static defaultProps = {
        iconTheme: '',
        description: '',
        pretext: '',
        contactLink: '',
        wrapperTheme: '',
        titleClass: '',
        listWrapperTheme: '',
        listClass: '',
        config: null,
    }

    static propTypes = {
        iconTheme: PropTypes.string,
        description: PropTypes.string,
        pretext: PropTypes.string,
        contactLink: PropTypes.string,
        wrapperTheme: PropTypes.string,
        titleClass: PropTypes.string,
        listWrapperTheme: PropTypes.string,
        config: PropTypes.objectOf(PropTypes.object),
        listClass: PropTypes.string,
    }
    renderHelpSection(ariaLabelId, dataItem, index) {
        return (
            dataItem.placeholder ? null : <a
                href={dataItem.linkPath}
                className={cx('helpLink')}
                aria-labelledby={ariaLabelId}
                target={dataItem.newTab}
                id={`help-link-${dataItem.id}`}
            >
                <span className={cx('helpIcon', this.props.iconTheme)}>
                    <Icon automationId={`help-icon-${index}`} iconType="svg" classNames="fa" width="24" height="24" viewBox="0 0 1024 1024" name={dataItem.name} PathClassName={styles.helpIconColor} />
                </span>
                <span id={ariaLabelId} className={cx('helpDescription', this.props.description)} key={dataItem.id}>
                    <span className={cx(this.props.pretext)}>{dataItem.text}</span>
                    <strong data-automation-id={`help-text-${index}`} className={cx('helpDescStatus', this.props.contactLink)}>
                        {dataItem.textStrong}
                    </strong>
                </span>
            </a>
        );
    }

    render() {
        const helpSectionRenderer = (dataItem, index) => {
            const helpSection = 'helpSection';
            const ariaLabelId = helpSection + dataItem.id;
            const displayStyle = dataItem.hidden ? { display: 'none' } : { display: 'block' };
            return (
                <div id={`help-link-${dataItem.id}-block`} data-automation-id={`help-link-${dataItem.id}`} className={cx('helpLinkBlock')} style={displayStyle}>
                    {this.renderHelpSection(ariaLabelId, dataItem, index)}
                </div>
            );
        };

        const datasource = this.props.config || config;
        const abTestdatasource = this.props.config || newConfig;
        const getCustomerEngagementLinks = dataSourceList => (
            <List
                datasource={dataSourceList} childRenderer={helpSectionRenderer}
                itemStyleClass={cx('helpListItem', this.props.listClass)}
                listBodyClass={cx('helpListBody')}
                automationId="help-list"
                spacing="None"
            />
        );
        // Entire React DOM
        return (
            <div className={cx('helpSection', this.props.wrapperTheme)}>
                <div data-automation-id="need-help-container" className={cx('containerWidth')}>
                    <h3 data-automation-id="need-help-title" className={cx('helpSectionTitle', this.props.titleClass)}>Need Help? </h3>
                    <div className={cx('helpSectionList', this.props.listWrapperTheme)}>
                        <FeatureFlag name="!selfServiceCustomerEngagement">
                            {getCustomerEngagementLinks(datasource)}
                        </FeatureFlag>
                        <FeatureFlag name="selfServiceCustomerEngagement">
                            {getCustomerEngagementLinks(abTestdatasource)}
                        </FeatureFlag>
                    </div>
                </div>
            </div>
        );
    }
}

